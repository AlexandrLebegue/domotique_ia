# 🚀 Google Cloud Deployment Guide

This guide explains how to deploy the Blog Domotique application to Google Cloud Run with Secret Manager integration.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Secret Manager Configuration](#secret-manager-configuration)
- [Artifact Registry Setup](#artifact-registry-setup)
- [Local Docker Build (Optional)](#local-docker-build-optional)
- [Cloud Build Deployment](#cloud-build-deployment)
- [Manual Cloud Run Deployment](#manual-cloud-run-deployment)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

1. **Google Cloud Account** with billing enabled
2. **gcloud CLI** installed and configured
   ```bash
   # Install gcloud CLI: https://cloud.google.com/sdk/docs/install
   
   # Initialize and authenticate
   gcloud init
   gcloud auth login
   ```

3. **Required APIs** enabled:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable secretmanager.googleapis.com
   gcloud services enable artifactregistry.googleapis.com
   ```

4. **Set your project ID**:
   ```bash
   export PROJECT_ID="your-project-id"
   gcloud config set project $PROJECT_ID
   ```

---

## Initial Setup

### 1. Set Environment Variables

```bash
# Project configuration
export PROJECT_ID="your-project-id"
export REGION="europe-west1"  # or your preferred region
export SERVICE_NAME="blog-domotique"
export REPO_NAME="blog-domotique-repo"

# Set as default
gcloud config set project $PROJECT_ID
gcloud config set run/region $REGION
```

---

## Secret Manager Configuration

### 1. Create Secrets in Secret Manager

```bash
# Create secret for OpenRouter API key
echo -n "your-openrouter-api-key-here" | \
  gcloud secrets create openrouter-api-key \
    --data-file=- \
    --replication-policy="automatic"

# Verify secret was created
gcloud secrets list
```

### 2. Grant Cloud Run Access to Secrets

```bash
# Get the Cloud Run service account
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
export SERVICE_ACCOUNT="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

# Grant access to the secret
gcloud secrets add-iam-policy-binding openrouter-api-key \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/secretmanager.secretAccessor"
```

### 3. Update Secrets (when needed)

```bash
# Add new version of secret
echo -n "new-api-key-here" | \
  gcloud secrets versions add openrouter-api-key --data-file=-

# View secret versions
gcloud secrets versions list openrouter-api-key
```

---

## Artifact Registry Setup

### 1. Create Docker Repository

```bash
gcloud artifacts repositories create $REPO_NAME \
  --repository-format=docker \
  --location=$REGION \
  --description="Docker repository for Blog Domotique"
```

### 2. Configure Docker Authentication

```bash
gcloud auth configure-docker ${REGION}-docker.pkg.dev
```

---

## Local Docker Build (Optional)

Test your Docker build locally before deploying:

```bash
# Build the image
docker build -t blog-domotique:local .

# Run locally (with environment variables)
docker run -p 8080:8080 \
  -e NODE_ENV=production \
  -e REACT_APP_OPENROUTER_API_KEY="your-key-here" \
  -e NEXT_PUBLIC_SITE_URL="http://localhost:8080" \
  blog-domotique:local

# Test health endpoint
curl http://localhost:8080/api/health
```

---

## Cloud Build Deployment

### Option 1: Automatic Deployment (Recommended)

Set up Cloud Build trigger for automatic deployment on git push:

```bash
# Connect your repository (GitHub/GitLab/Bitbucket)
# This opens a browser to authorize the connection
gcloud builds triggers create github \
  --name="blog-domotique-deploy" \
  --repo-name="blog-domotique" \
  --repo-owner="your-github-username" \
  --branch-pattern="^main$" \
  --build-config="cloudbuild.yaml"
```

After setup, every push to the `main` branch will automatically build and deploy.

### Option 2: Manual Cloud Build

Deploy manually using Cloud Build:

```bash
# Submit build (from project root)
gcloud builds submit \
  --config cloudbuild.yaml \
  --substitutions=_REGION=$REGION,_SERVICE_NAME=$SERVICE_NAME,_ARTIFACT_REGISTRY_REPO=$REPO_NAME
```

---

## Manual Cloud Run Deployment

If you prefer manual deployment without Cloud Build:

### 1. Build and Push Docker Image

```bash
# Build image
docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${SERVICE_NAME}:latest .

# Push to Artifact Registry
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${SERVICE_NAME}:latest
```

### 2. Deploy to Cloud Run

```bash
gcloud run deploy $SERVICE_NAME \
  --image=${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${SERVICE_NAME}:latest \
  --platform=managed \
  --region=$REGION \
  --allow-unauthenticated \
  --port=8080 \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10 \
  --timeout=300s \
  --set-env-vars="NODE_ENV=production,NEXT_PUBLIC_SITE_URL=https://your-service-url.run.app" \
  --set-secrets="REACT_APP_OPENROUTER_API_KEY=openrouter-api-key:latest"
```

### 3. Get Service URL

```bash
gcloud run services describe $SERVICE_NAME \
  --region=$REGION \
  --format='value(status.url)'
```

---

## Environment Variables

### Required Environment Variables

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `REACT_APP_OPENROUTER_API_KEY` | Secret | OpenRouter API key | `sk-or-v1-xxx...` |
| `NEXT_PUBLIC_SITE_URL` | Env Var | Public URL of the site | `https://your-app.run.app` |
| `NODE_ENV` | Env Var | Node environment | `production` |

### Update Environment Variables

```bash
# Update regular environment variables
gcloud run services update $SERVICE_NAME \
  --region=$REGION \
  --update-env-vars="NEXT_PUBLIC_SITE_URL=https://new-url.run.app"

# Update secrets (create new version first, then update)
echo -n "new-key" | gcloud secrets versions add openrouter-api-key --data-file=-

# Cloud Run will automatically use the latest version
# Or specify a version:
gcloud run services update $SERVICE_NAME \
  --region=$REGION \
  --update-secrets="REACT_APP_OPENROUTER_API_KEY=openrouter-api-key:2"
```

---

## Monitoring and Logs

### View Logs

```bash
# Stream logs in real-time
gcloud run services logs tail $SERVICE_NAME --region=$REGION

# View recent logs
gcloud run services logs read $SERVICE_NAME --region=$REGION --limit=50
```

### Cloud Console

Access detailed metrics and logs in the [Cloud Console](https://console.cloud.google.com/run):
- Navigate to Cloud Run → Select your service
- View metrics, logs, and revisions

---

## Custom Domain Setup

### 1. Map Custom Domain

```bash
gcloud run domain-mappings create \
  --service=$SERVICE_NAME \
  --domain=blog.yourdomain.com \
  --region=$REGION
```

### 2. Update DNS Records

Follow the instructions provided by the command above to update your DNS records.

---

## Cost Optimization Tips

1. **Scale to Zero**: Default configuration scales to 0 instances when idle (no cost)
2. **Memory Allocation**: Use minimal memory (512Mi) for this application
3. **CPU Allocation**: CPU is allocated only during request processing
4. **Free Tier**: Cloud Run includes 2 million requests/month free

### Estimated Monthly Cost

- **Low traffic** (< 10k requests/month): **~$0** (free tier)
- **Medium traffic** (100k requests/month): **~$5-10**
- **High traffic** (1M requests/month): **~$40-60**

---

## Troubleshooting

### Build Failures

```bash
# Check build logs
gcloud builds list --limit=5
gcloud builds log BUILD_ID

# Common issues:
# - Missing dependencies: Check package.json
# - Build timeout: Increase timeout in cloudbuild.yaml
# - Memory issues: Increase machine type in cloudbuild.yaml
```

### Deployment Failures

```bash
# Check service status
gcloud run services describe $SERVICE_NAME --region=$REGION

# Common issues:
# - Secret not found: Verify secret name and permissions
# - Port mismatch: Ensure container listens on PORT env var (8080)
# - Memory limit: Increase memory allocation
```

### Runtime Errors

```bash
# View recent logs
gcloud run services logs read $SERVICE_NAME --region=$REGION --limit=100

# Test health endpoint
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format='value(status.url)')
curl $SERVICE_URL/api/health

# Common issues:
# - Missing environment variables: Check env vars are set correctly
# - API key issues: Verify secret contains correct key
# - Cold start timeouts: Increase timeout or min-instances
```

### Secret Manager Issues

```bash
# List secrets
gcloud secrets list

# View secret metadata (not the value)
gcloud secrets describe openrouter-api-key

# Check IAM permissions
gcloud secrets get-iam-policy openrouter-api-key

# Test secret access from Cloud Run service account
gcloud secrets versions access latest --secret=openrouter-api-key
```

---

## Cleanup

To remove all deployed resources:

```bash
# Delete Cloud Run service
gcloud run services delete $SERVICE_NAME --region=$REGION

# Delete secrets
gcloud secrets delete openrouter-api-key

# Delete Artifact Registry repository
gcloud artifacts repositories delete $REPO_NAME --location=$REGION

# Delete Cloud Build triggers (if any)
gcloud builds triggers delete blog-domotique-deploy
```

---

## Security Best Practices

1. ✅ **Never commit secrets** to git (use `.gitignore`)
2. ✅ **Use Secret Manager** for sensitive data
3. ✅ **Enable IAM permissions** with least privilege
4. ✅ **Use HTTPS only** (enforced by Cloud Run)
5. ✅ **Regular updates** of dependencies and base images
6. ✅ **Monitor logs** for suspicious activity
7. ✅ **Use environment-specific** configurations

---

## Additional Resources

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Secret Manager Documentation](https://cloud.google.com/secret-manager/docs)
- [Cloud Build Documentation](https://cloud.google.com/build/docs)
- [Artifact Registry Documentation](https://cloud.google.com/artifact-registry/docs)

---

## Support

For issues specific to this deployment:
1. Check the troubleshooting section above
2. Review Cloud Run logs
3. Verify all prerequisites are met
4. Consult Google Cloud documentation

For application-specific issues, refer to the main README.md file.