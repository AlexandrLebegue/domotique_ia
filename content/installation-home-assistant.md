---
title: "Installation de Home Assistant sur serveur dédié"
excerpt: "Guide complet pour installer Home Assistant sur un serveur Linux avec Docker. Configuration initiale et bonnes pratiques pour démarrer votre aventure domotique."
date: "2024-01-15"
coverImage: "/images/covers/installation-serveur.svg"
category: "installation"
tags: ["home-assistant", "docker", "linux", "serveur", "installation"]
keywords: ["installation", "serveur", "docker", "linux", "setup", "home assistant"]
author: "Alexandre Lebegue"
---

# Installation de Home Assistant sur serveur dédié

Home Assistant est une plateforme open-source puissante pour centraliser et automatiser votre maison connectée. Dans ce guide, nous allons voir comment l'installer sur un serveur Linux dédié avec Docker.

## Prérequis

Avant de commencer, assurez-vous d'avoir :

- Un serveur Linux (Ubuntu 22.04 ou Debian 11 recommandé)
- Docker et Docker Compose installés
- Un accès SSH à votre serveur
- Au moins 2 GB de RAM et 32 GB de stockage

## Étape 1 : Installation de Docker

Si Docker n'est pas encore installé sur votre serveur, commencez par l'installer :

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation des dépendances
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Ajout de la clé GPG Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Ajout du repository Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installation de Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## Étape 2 : Création du fichier docker-compose

Créez un répertoire pour Home Assistant et son fichier de configuration :

```bash
mkdir -p ~/homeassistant
cd ~/homeassistant
nano docker-compose.yml
```

Ajoutez la configuration suivante :

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - ./config:/config
      - /etc/localtime:/etc/localtime:ro
    restart: unless-stopped
    privileged: true
    network_mode: host
```

## Étape 3 : Lancement de Home Assistant

Démarrez le conteneur :

```bash
docker compose up -d
```

Vérifiez que le conteneur fonctionne :

```bash
docker ps
```

## Étape 4 : Configuration initiale

1. Ouvrez votre navigateur et accédez à `http://IP_DU_SERVEUR:8123`
2. Créez votre compte administrateur
3. Configurez votre localisation et timezone
4. Choisissez les intégrations à activer

## Bonnes pratiques

### Sauvegarde régulière

Créez un script de sauvegarde automatique :

```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
tar -czf ~/backups/homeassistant-$DATE.tar.gz ~/homeassistant/config
```

### Mise à jour

Pour mettre à jour Home Assistant :

```bash
cd ~/homeassistant
docker compose pull
docker compose up -d
```

### Logs

Consultez les logs en cas de problème :

```bash
docker logs -f homeassistant
```

## Sécurité

N'oubliez pas de sécuriser votre installation :

- Utilisez un mot de passe fort
- Activez l'authentification à deux facteurs
- Configurez un reverse proxy avec SSL (nginx ou Traefik)
- Limitez l'accès par IP si possible

## Conclusion

Votre Home Assistant est maintenant opérationnel ! Dans les prochains articles, nous verrons comment ouvrir les ports pour l'accès externe et configurer Nabu Casa pour un accès sécurisé depuis l'extérieur.

## Ressources

- [Documentation officielle Home Assistant](https://www.home-assistant.io/installation/)
- [Forum communautaire français](https://forum.hacf.fr/)
- [Docker Hub](https://hub.docker.com/r/homeassistant/home-assistant)