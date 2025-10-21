---
title: "Configuration de Nabu Casa pour Home Assistant"
excerpt: "Découvrez comment configurer Nabu Casa (Home Assistant Cloud) pour un accès sécurisé à distance et profiter de l'intégration Google Assistant et Alexa sans configuration complexe."
date: "2024-01-18"
coverImage: "/images/covers/nabu-casa.jpg"
category: "installation"
tags: ["nabu-casa", "cloud", "accès-distant", "google-assistant", "alexa"]
keywords: ["nabu casa", "cloud", "accès distant", "remote", "google assistant", "alexa", "configuration"]
author: "Alexandre Lebegue"
---

# Configuration de Nabu Casa pour Home Assistant

Nabu Casa est le service cloud officiel de Home Assistant qui simplifie l'accès à distance et les intégrations avec les assistants vocaux. C'est aussi un excellent moyen de soutenir le développement du projet.

## Qu'est-ce que Nabu Casa ?

Nabu Casa (Home Assistant Cloud) offre :

- **Accès distant sécurisé** sans configuration de ports ou de DNS
- **Intégration Google Assistant** en quelques clics
- **Intégration Amazon Alexa** simplifiée
- **Webhooks sécurisés** pour les notifications
- Support financier du projet Home Assistant

## Prix et abonnement

- **5€/mois** ou **55€/an**
- Essai gratuit de 30 jours
- Annulation possible à tout moment

## Étape 1 : Activation de Nabu Casa

### Depuis l'interface Home Assistant

1. Allez dans **Paramètres** → **Home Assistant Cloud**
2. Cliquez sur **Démarrer**
3. Créez un compte ou connectez-vous
4. Entrez vos informations de paiement

```yaml
# L'intégration se configure automatiquement
# Aucune modification de configuration.yaml n'est nécessaire
```

## Étape 2 : Configuration de l'accès distant

Une fois activé, l'accès distant est automatique :

1. Votre instance sera accessible via une URL unique : `https://xxx.ui.nabu.casa`
2. Utilisez cette URL depuis n'importe où dans le monde
3. La connexion est sécurisée avec SSL automatique

### Test de connexion

Testez votre accès distant :

- Connectez-vous en 4G/5G sur votre téléphone
- Ouvrez `https://votre-id.ui.nabu.casa`
- Authentifiez-vous avec vos identifiants Home Assistant

## Étape 3 : Intégration Google Assistant

### Activation

1. Dans **Home Assistant Cloud**, activez **Google Assistant**
2. Ouvrez l'application **Google Home**
3. Ajoutez l'intégration **Home Assistant**
4. Connectez-vous avec votre compte Nabu Casa

### Synchronisation des entités

Choisissez quelles entités exposer :

```yaml
# configuration.yaml
cloud:
  google_actions:
    filter:
      include_domains:
        - light
        - switch
        - climate
      exclude_entities:
        - light.chambre_enfant
```

### Commandes vocales

Exemples de commandes :

- "Ok Google, allume la lumière du salon"
- "Ok Google, règle le thermostat à 20 degrés"
- "Ok Google, active la scène film"

## Étape 4 : Intégration Alexa

### Configuration

1. Dans **Home Assistant Cloud**, activez **Alexa**
2. Ouvrez l'app **Amazon Alexa**
3. Allez dans **Skills et jeux**
4. Recherchez **Home Assistant**
5. Activez la skill et connectez votre compte

### Découverte des appareils

Dites "Alexa, découvre mes appareils" ou :

```yaml
# Les appareils sont automatiquement synchronisés
# Configuration optionnelle dans configuration.yaml
cloud:
  alexa:
    filter:
      include_entities:
        - light.salon
        - switch.cuisine
```

## Fonctionnalités avancées

### Webhooks

Les webhooks Nabu Casa permettent des notifications push :

```yaml
# automation.yaml
automation:
  - alias: "Notification porte ouverte"
    trigger:
      - platform: state
        entity_id: binary_sensor.porte_entree
        to: 'on'
    action:
      - service: notify.mobile_app
        data:
          message: "La porte d'entrée a été ouverte"
          data:
            push:
              sound: default
```

### Surveillance de l'état

Vérifiez l'état de Nabu Casa :

```yaml
# sensors.yaml
sensor:
  - platform: template
    sensors:
      cloud_status:
        friendly_name: "État Nabu Casa"
        value_template: "{{ states('cloud') }}"
```

## Avantages vs. inconvénients

### ✅ Avantages

- Configuration ultra-simple
- Pas de ports à ouvrir
- SSL automatique et sécurisé
- Support le projet Home Assistant
- Mises à jour automatiques

### ⚠️ Inconvénients

- Coût mensuel/annuel
- Dépendance à un service tiers
- Latence légèrement supérieure à un accès direct

## Alternatives

Si Nabu Casa ne vous convient pas :

1. **DuckDNS + Let's Encrypt** (gratuit, plus complexe)
2. **Tailscale** (VPN, gratuit)
3. **Cloudflare Tunnel** (gratuit, configuration moyenne)
4. **VPN classique** (OpenVPN, WireGuard)

## Dépannage

### Impossible de se connecter

Vérifiez que :

- Votre abonnement est actif
- Home Assistant est à jour
- Votre connexion Internet fonctionne

```bash
# Vérifier les logs
docker logs homeassistant | grep cloud
```

### Problèmes avec Google Assistant

1. Désynchronisez les appareils
2. Attendez 5 minutes
3. Redites "Ok Google, synchronise mes appareils"

## Conclusion

Nabu Casa est la solution la plus simple pour accéder à Home Assistant à distance et intégrer les assistants vocaux. Le coût modeste soutient directement le développement du projet open-source.

## Ressources

- [Documentation Nabu Casa](https://www.nabucasa.com/)
- [FAQ Home Assistant Cloud](https://www.home-assistant.io/cloud/faq/)
- [Status Nabu Casa](https://status.nabucasa.com/)