---
title: "Intégration d'une caméra Tapo dans Home Assistant"
excerpt: "Guide complet pour connecter une caméra Tapo C200 à Home Assistant via RTSP. Surveillez votre domicile et exploitez l'IA pour des automatisations avancées."
date: "2025-10-26"
coverImage: "/images/covers/camera-tapo-integration.png"
category: "integration"
tags: ["home assistant", "camera", "tapo", "rtsp", "surveillance"]
keywords: ["tapo c200", "home assistant", "caméra", "rtsp", "surveillance", "domotique", "ia"]
author: "Alexandre Lebegue"
---

# Intégration d'une caméra Tapo dans Home Assistant

L'intégration de caméras dans Home Assistant ouvre de nombreuses possibilités pour votre installation domotique. Au-delà de la simple surveillance, vous pouvez créer des automatisations intelligentes basées sur la détection de mouvement, enregistrer des captures pour vos notifications, ou même utiliser l'intelligence artificielle via N8N pour analyser les images et détecter des événements spécifiques (présence de personnes, de véhicules, etc.).

## Pourquoi intégrer des caméras ?

L'ajout de caméras à Home Assistant permet de :

- **Surveillance en temps réel** : visualiser vos caméras directement depuis le tableau de bord
- **Automatisations avancées** : déclencher des actions basées sur la détection de mouvement
- **Notifications enrichies** : recevoir des captures d'écran avec vos alertes
- **Analyse par IA** : utiliser N8N pour détecter des objets, personnes ou comportements
- **Enregistrements locaux** : stocker vos vidéos sur votre serveur sans abonnement cloud
- **Intégration scénarios** : combiner avec d'autres capteurs pour des automatisations complexes

## Matériel requis

Ce tutoriel utilise la **Tapo C200**, une caméra Wi-Fi économique et performante :

- **Prix** : environ 20€ sur Amazon
- **Résolution** : 1080p Full HD
- **Vision nocturne** : oui (infrarouge)
- **Détection de mouvement** : oui
- **Pan & Tilt** : rotation 360° horizontale, 114° verticale
- **Support RTSP** : compatible avec Home Assistant

Le tutoriel peut varier en fonction des marques mais il reste globalement le même, bien vérifier si la caméra est compatible rtsp avant de se lancer ! 

### Qu'est-ce que le RTSP ?

**RTSP** (Real Time Streaming Protocol) est un protocole réseau permettant de diffuser des flux vidéo en temps réel. Contrairement aux solutions cloud propriétaires, RTSP vous permet de :

- Contrôler totalement vos flux vidéo
- Éviter la dépendance aux serveurs du fabricant
- Réduire la latence de visualisation
- Intégrer facilement dans Home Assistant

## Configuration de la caméra Tapo

### Étape 1 : Installation initiale

1. Téléchargez l'application **Tapo** (iOS/Android)
2. Créez un compte TP-Link si nécessaire
3. Ajoutez votre caméra en suivant l'assistant de configuration
4. Connectez la caméra à votre réseau Wi-Fi domestique

### Étape 2 : Récupérer l'adresse IP

1. Ouvrez l'application **Tapo**
2. Sélectionnez votre caméra dans la liste
3. Cliquez sur l'icône **⚙️ Paramètres** (en haut à droite)

<center>
<img src="/images/articles/tapo_cam/image-3.png" />
</center>


4. Accédez à **Informations de l'appareil**

<center>
<img src="/images/articles/tapo_cam/image-2.png" />
</center>

5. Notez l'**adresse IP** affichée (format : `192.168.x.x`)


💡 **Conseil** : configurez une IP fixe pour votre caméra dans les paramètres de votre routeur pour éviter qu'elle change.

### Étape 3 : Activer le compte caméra

Pour permettre l'accès RTSP, vous devez créer des identifiants dédiés :

1. Dans l'application Tapo, sélectionnez votre caméra
2. Allez dans **⚙️ Paramètres**
3. Sélectionnez **Configuration avancée**
4. Cliquez sur **Compte de la caméra**
5. Activez l'option et créez un compte :
   - **Nom d'utilisateur** : choisissez un identifiant
   - **Mot de passe** : créez un mot de passe

⚠️ **ATTENTION** : n'utilisez pas les caractères `$` et `!` dans le mot de passe, car ils peuvent causer des problèmes de connexion RTSP.


<center>
<img src="/images/articles/tapo_cam/image-1.png" />
</center>


## Intégration dans Home Assistant

### Étape 1 : Accéder aux intégrations

1. Connectez-vous à votre interface Home Assistant
2. Allez dans **Paramètres** → **Appareils et services**

### Étape 2 : Ajouter la caméra

1. Cliquez sur le bouton **+ Ajouter une intégration**
2. Recherchez et sélectionnez **Generic Camera**
3. Remplissez les informations de configuration

### Étape 3 : Configuration de la connexion RTSP

Entrez les paramètres suivants :

**URL du flux** :
```
rtsp://[ADRESSE_IP_CAMERA]:554/stream1
```

Exemple : `rtsp://192.168.1.100:554/stream1`

**Paramètres de connexion** :
- **Protocole de streaming** : TCP
- **Type d'authentification** : Basic
- **Nom d'utilisateur** : le nom d'utilisateur créé dans l'app Tapo
- **Mot de passe** : le mot de passe créé dans l'app Tapo

**Options de sécurité** :
- ⬜ Décochez **Vérifier le certificat SSL**

<center>
<img src="/images/articles/tapo_cam/image-4.png" />
</center>


### Étape 4 : Validation

1. Cliquez sur **Suivant**
2. Cochez **Tout semble correct** même si l'aperçu ne s'affiche pas immédiatement
   
   💡 Il s'agit d'un bug connu de Home Assistant - la configuration fonctionne malgré l'absence d'aperçu
   
3. Cliquez sur **Terminer**
4. Retournez sur votre **Aperçu** (Dashboard)
5. La caméra devrait maintenant s'afficher ! 🎉

## Utilisation et automatisations

### Ajouter au tableau de bord

Pour afficher votre caméra sur le dashboard :

1. Éditez votre tableau de bord
2. Ajoutez une carte **Picture Entity** ou **Picture Glance**
3. Sélectionnez votre entité caméra
4. Configurez la taille et le positionnement

### Exemples d'automatisations

**Notification avec capture lors d'une détection** :
```yaml
automation:
  - alias: "Alerte mouvement caméra entrée"
    trigger:
      - platform: state
        entity_id: binary_sensor.tapo_c200_motion
        to: 'on'
    action:
      - service: notify.mobile_app
        data:
          title: "Mouvement détecté"
          message: "Activité à l'entrée"
          data:
            image: /api/camera_proxy/camera.tapo_c200
```

**Enregistrement automatique** :
```yaml
automation:
  - alias: "Enregistrer lors d'une détection"
    trigger:
      - platform: state
        entity_id: binary_sensor.tapo_c200_motion
        to: 'on'
    action:
      - service: camera.record
        target:
          entity_id: camera.tapo_c200
        data:
          duration: 30
          filename: '/config/www/recordings/entree_{{ now().strftime("%Y%m%d_%H%M%S") }}.mp4'
```

## Dépannage

### La caméra ne se connecte pas

- Vérifiez que l'adresse IP est correcte
- Confirmez que le compte caméra est bien activé dans l'app Tapo
- Assurez-vous que le mot de passe ne contient pas de caractères spéciaux problématiques
- Testez l'URL RTSP dans VLC Media Player : **Média** → **Ouvrir un flux réseau**

### Le flux est lent ou saccadé

- Utilisez `stream2` au lieu de `stream1` pour une qualité réduite : `rtsp://IP:554/stream2`
- Vérifiez la qualité de votre signal Wi-Fi
- Envisagez une connexion Ethernet si possible (via adaptateur USB)

### La caméra se déconnecte régulièrement

- Configurez une IP statique pour la caméra
- Vérifiez les paramètres d'économie d'énergie dans l'app Tapo
- Redémarrez le routeur et la caméra

## Intégration avec N8N pour l'IA

Une fois votre caméra connectée à Home Assistant, vous pouvez utiliser N8N pour :

- **Analyse d'images par IA** : détecter des personnes, véhicules, animaux
- **Reconnaissance faciale** : identifier des personnes spécifiques
- **Détection d'objets** : alertes personnalisées selon ce qui est détecté
- **Analyse comportementale** : détecter des patterns inhabituels
- **Classification d'événements** : trier automatiquement les détections importantes

Exemple de workflow N8N simple : capturer une image lors d'une détection et l'envoyer à une API de vision par ordinateur pour analyse.

## Ressources

- [Documentation Tapo C200](https://www.tp-link.com/fr/support/download/tapo-c200/)
- [Generic Camera - Home Assistant](https://www.home-assistant.io/integrations/generic/)
- [Guide RTSP](https://www.home-assistant.io/integrations/stream/)
- [Exemples d'automatisations caméra](https://community.home-assistant.io/c/blueprints-exchange/)

## Conclusion

Votre caméra Tapo est maintenant intégrée à Home Assistant et prête à être utilisée pour la surveillance et les automatisations. Cette base vous permet de créer des scénarios avancés, de recevoir des notifications enrichies, et même d'exploiter l'intelligence artificielle via N8N pour des détections sophistiquées. Dans les prochains articles, nous explorerons des cas d'usage concrets avec analyse d'images et automatisations intelligentes.