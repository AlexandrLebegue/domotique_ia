---
title: "Installation de N8N sur un serveur Proxmox"
excerpt: "Guide complet pour installer N8N sur Proxmox avec LXC. Automatisez vos tâches domotiques avec ce puissant outil d'orchestration workflow open-source."
date: "2025-10-25"
coverImage: "/images/covers/n8n_cover_installation.png"
category: "installation"
tags: ["n8n", "proxmox", "automation", "workflow", "lxc"]
keywords: ["n8n", "proxmox", "automation", "workflow", "orchestration", "domotique", "lxc"]
author: "Alexandre Lebegue"
---

# Installation de N8N sur un serveur Proxmox

N8N est une plateforme d'automatisation workflow open-source qui permet de connecter différents services et d'automatiser des tâches complexes. En domotique, N8N peut servir à créer des scénarios avancés, synchroniser des données entre Home Assistant et d'autres services, envoyer des notifications personnalisées, ou encore gérer des webhooks pour vos automatisations.

## Qu'est-ce que N8N ?

N8N (n8n.io) est un outil d'automatisation qui offre :

- **Interface visuelle** : création de workflows par glisser-déposer
- **+400 intégrations** : Home Assistant, MQTT, Telegram, Discord, etc.
- **Auto-hébergé** : contrôle total de vos données
- **Open-source** : gratuit et personnalisable
- **Workflows complexes** : conditions, boucles, transformations de données

### Applications en domotique

- Automatisations avancées entre Home Assistant et services externes
- Notifications personnalisées (Telegram, Discord, email)
- Synchronisation de données avec Google Sheets ou bases de données
- Gestion de webhooks pour contrôler vos appareils
- Récupération de données météo, transport, etc.
- Création de tableaux de bord personnalisés

## Prérequis

Avant de commencer, assurez-vous d'avoir :

- Un serveur Proxmox configuré et fonctionnel (version 7.0+)
- Accès root via SSH ou interface web Proxmox
- Au moins 2 GB RAM et 10 GB d'espace disque disponibles
- Connexion internet stable

## Vérification de la configuration Proxmox

### Vérifier les dépôts

Proxmox doit être configuré en mode open-source (sans souscription entreprise) :

1. Connectez-vous à l'interface web Proxmox
2. Allez dans **Datacenter** → **Votre nœud** → **Updates** → **Repositories**
3. Vérifiez que le dépôt entreprise est désactivé ou supprimé :
   - ❌ `pve-enterprise` (nécessite souscription)
   - ✅ `pve-no-subscription` (gratuit)
4. Si des pve-entreprise sont soucrits, les désactiver en cliquant sur disabled.


## Installation automatique avec LXC

N8N s'installe facilement dans un conteneur LXC grâce au script Proxmox VE Helper Scripts.

### Étape 1 : Accéder au shell Proxmox

1. Connectez-vous à l'interface web Proxmox
2. Sélectionnez votre nœud dans l'arborescence
3. Cliquez sur **Shell**

### Étape 2 : Exécuter le script d'installation

Copiez et exécutez cette commande dans le shell :

```bash
bash -c "$(wget -qLO - https://github.com/tteck/Proxmox/raw/main/ct/n8n.sh)"
```

Une console va alors s'ouvrir 

<center>
<img src="/images/articles/n8n/image-1.png" />
</center>


### Étape 3 : Configuration de l'installation

Le script vous guidera à travers plusieurs options :

#### Configuration recommandée pour débutants

Choisir l'option default setting pour simplifier l'installation.

<center>
<img src="/images/articles/n8n/image.png" />
</center>

L'installation se fera automatiquement

@todo rajouter ici la suite aec une image lorsque l'instllation a reussi ... 

#### Configuration avancée (optionnel)

Si vous choisissez la configuration avancée, vous pouvez configurer l'ensemble des paramètres souhaités, il suffit de suivre les instructions :

```bash
# Exemple de configuration personnalisée
ID: 110
Hostname: n8n-automation
Disk: 12 GB
CPU: 2 cores
RAM: 4096 MB
Network: vmbr0
IP: 192.168.1.100/24
Gateway: 192.168.1.1
```

### Étape 4 : Attendre la fin de l'installation

L'installation prend généralement 3-5 minutes. Le script va :

1. Télécharger l'image du conteneur
2. Créer le conteneur LXC
3. Installer Node.js et N8N
4. Configurer le service systemd
5. Démarrer N8N automatiquement

## Configuration initiale de N8N

### Accéder à l'interface web

Une fois l'installation terminée :

1. Notez l'adresse IP affichée dans le terminal
2. Ouvrez votre navigateur et accédez à : `http://IP_DU_CONTENEUR:5678`

Exemple : `http://192.168.1.100:5678`

### Créer le compte administrateur

Au premier accès :

1. **Email** : votre adresse email
2. **Mot de passe** : choisissez un mot de passe fort (12+ caractères)
3. **Nom** : votre nom d'utilisateur
4. Cliquez sur **Create account**

### Configuration des paramètres

Allez dans **Settings** (icône engrenage) :

```yaml
# Paramètres recommandés
Timezone: Europe/Paris
Date format: DD/MM/YYYY
Time format: 24h
Language: English (FR non disponible)
```

## Vérification du bon fonctionnement

### Test 1 : Créer un workflow simple

1. Cliquez sur **+ New workflow**
2. Ajoutez un nœud **Schedule Trigger** :
   - Interval : `Every 1 minute`
3. Ajoutez un nœud **HTTP Request** :
   - Method : `GET`
   - URL : `https://api.ipify.org?format=json`
4. Connectez les deux nœuds
5. Cliquez sur **Execute Workflow**

Vous devriez voir votre IP publique dans le résultat.

### Test 2 : Vérifier le service systemd

Connectez-vous au conteneur via SSH :

```bash
# Depuis Proxmox
pct enter 110  # Remplacez par votre ID de conteneur

# Vérifier le statut
systemctl status n8n

# Le service doit afficher "active (running)"
```

### Test 3 : Consulter les logs

```bash
# Logs en temps réel
journalctl -u n8n -f

# Dernières 100 lignes
journalctl -u n8n -n 100
```

## Ressources

- [Documentation officielle N8N](https://docs.n8n.io/)
- [Forum communautaire N8N](https://community.n8n.io/)
- [Proxmox VE Helper Scripts](https://tteck.github.io/Proxmox/)
- [Exemples de workflows](https://n8n.io/workflows/)
- [Intégration Home Assistant](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.homeassistant/)

## Conclusion

N8N est maintenant installé et opérationnel sur votre serveur Proxmox. Vous pouvez créer des automatisations puissantes pour votre installation domotique, connecter différents services, et orchestrer des workflows complexes. Dans les prochains articles, nous verrons des exemples concrets d'automatisations avancées avec N8N et Home Assistant.