---
title: "Intégration Zigbee avec Home Assistant"
excerpt: "Guide complet pour intégrer vos appareils Zigbee dans Home Assistant avec Zigbee2MQTT. Configuration, ajout d'appareils et automatisations."
date: "2024-01-20"
coverImage: "/images/covers/zigbee-integration.jpg"
category: "integration"
tags: ["zigbee", "zigbee2mqtt", "mqtt", "integration", "capteurs"]
keywords: ["zigbee", "zigbee2mqtt", "mqtt", "integration", "capteur", "ampoule", "sonoff"]
author: "Alexandre Lebegue"
---

# Intégration Zigbee avec Home Assistant

Le protocole Zigbee est l'un des plus populaires pour la domotique. Découvrons comment l'intégrer facilement avec Home Assistant via Zigbee2MQTT.

## Qu'est-ce que Zigbee ?

Zigbee est un protocole de communication sans fil :

- **Basse consommation** : idéal pour les capteurs sur batterie
- **Réseau maillé** : chaque appareil étend la portée
- **Standard ouvert** : compatible multi-marques
- **Sécurisé** : chiffrement AES-128

## Matériel nécessaire

### Coordonnateur Zigbee

Choisissez une clé USB Zigbee :

- **Sonoff Zigbee 3.0 USB Dongle Plus** (recommandé, ~15€)
- **ConBee II** (~40€)
- **CC2531** (obsolète, non recommandé)

### Appareils Zigbee compatibles

Exemples d'appareils :

- Capteurs de température (Aqara, Sonoff)
- Ampoules (Philips Hue, IKEA Tradfri)
- Interrupteurs sans fil
- Détecteurs de mouvement
- Prises connectées

## Installation de Zigbee2MQTT

### Méthode 1 : Add-on Home Assistant OS

Si vous utilisez Home Assistant OS :

1. Allez dans **Paramètres** → **Modules complémentaires**
2. Cherchez **Zigbee2MQTT**
3. Cliquez sur **Installer**

### Méthode 2 : Docker

Pour une installation Docker :

```yaml
# docker-compose.yml
version: '3'
services:
  zigbee2mqtt:
    container_name: zigbee2mqtt
    image: koenkk/zigbee2mqtt
    restart: unless-stopped
    volumes:
      - ./zigbee2mqtt-data:/app/data
      - /run/udev:/run/udev:ro
    ports:
      - 8080:8080
    environment:
      - TZ=Europe/Paris
    devices:
      - /dev/ttyUSB0:/dev/ttyUSB0
```

## Configuration

### Fichier configuration.yaml

Éditez `/app/data/configuration.yaml` :

```yaml
# Home Assistant integration
homeassistant: true

# MQTT settings
mqtt:
  base_topic: zigbee2mqtt
  server: mqtt://localhost:1883
  user: votre_user
  password: votre_password

# Serial settings
serial:
  port: /dev/ttyUSB0
  
# Frontend
frontend:
  port: 8080

# Advanced
advanced:
  log_level: info
  pan_id: GENERATE
  network_key: GENERATE
  channel: 11
```

## Installation du broker MQTT

Zigbee2MQTT nécessite un broker MQTT (Mosquitto) :

```bash
# Ajout au docker-compose.yml
  mosquitto:
    container_name: mosquitto
    image: eclipse-mosquitto:2
    restart: unless-stopped
    ports:
      - 1883:1883
      - 9001:9001
    volumes:
      - ./mosquitto/config:/mosquitto/config
      - ./mosquitto/data:/mosquitto/data
      - ./mosquitto/log:/mosquitto/log
```

Configuration Mosquitto (`mosquitto.conf`) :

```
persistence true
persistence_location /mosquitto/data/
log_dest file /mosquitto/log/mosquitto.log

listener 1883
allow_anonymous false
password_file /mosquitto/config/password.txt
```

## Ajout d'appareils Zigbee

### Mode appairage

1. Ouvrez l'interface Zigbee2MQTT (`http://IP:8080`)
2. Cliquez sur **Permit join (All)**
3. Mettez votre appareil en mode appairage :
   - Capteur Aqara : maintenez le bouton 5 secondes
   - Ampoule Philips Hue : allumez/éteignez 6 fois
   - Prise Sonoff : maintenez le bouton 5 secondes

### Renommer les appareils

Donnez des noms explicites :

```yaml
# Dans l'interface Zigbee2MQTT
Ancien nom: 0x00158d0001a2b3c4
Nouveau nom: capteur_temperature_salon
```

## Intégration dans Home Assistant

### Configuration MQTT

Dans Home Assistant, configurez MQTT :

```yaml
# configuration.yaml
mqtt:
  broker: localhost
  port: 1883
  username: votre_user
  password: votre_password
  discovery: true
  birth_message:
    topic: 'hass/status'
    payload: 'online'
  will_message:
    topic: 'hass/status'
    payload: 'offline'
```

### Auto-découverte

Les appareils Zigbee apparaissent automatiquement dans **Paramètres** → **Intégrations** → **MQTT**.

## Exemples d'utilisation

### Capteur de température

```yaml
# automation.yaml
automation:
  - alias: "Alerte température élevée"
    trigger:
      - platform: numeric_state
        entity_id: sensor.capteur_temperature_salon
        above: 25
    action:
      - service: notify.mobile_app
        data:
          message: "Température salon: {{ states('sensor.capteur_temperature_salon') }}°C"
```

### Ampoule Zigbee

```yaml
# scripts.yaml
script:
  ambiance_cinema:
    sequence:
      - service: light.turn_on
        target:
          entity_id: light.salon_zigbee
        data:
          brightness: 50
          color_temp: 400
```

### Détecteur de mouvement

```yaml
# automation.yaml
automation:
  - alias: "Lumière couloir automatique"
    trigger:
      - platform: state
        entity_id: binary_sensor.detecteur_couloir
        to: 'on'
    condition:
      - condition: sun
        after: sunset
    action:
      - service: light.turn_on
        target:
          entity_id: light.couloir
```

## Optimisation du réseau Zigbee

### Placement du coordonnateur

- Éloignez-le des sources de brouillage (Wi-Fi, Bluetooth)
- Position centrale dans la maison
- Utilisez un câble USB rallonge si nécessaire

### Routeurs Zigbee

Les appareils alimentés (prises, ampoules) agissent comme routeurs et étendent le réseau. Placez-en stratégiquement.

### Choix du canal

Évitez les interférences Wi-Fi :

```yaml
# Canaux Zigbee recommandés: 11, 15, 20, 25
advanced:
  channel: 15
```

## Dépannage

### Appareil ne s'appaire pas

1. Vérifiez que "Permit join" est activé
2. Rapprochez l'appareil du coordonnateur
3. Réinitialisez l'appareil (consultez la doc du fabricant)

### Appareil hors ligne

```bash
# Vérifier les logs Zigbee2MQTT
docker logs -f zigbee2mqtt

# Vérifier la qualité du signal (LQI)
# Dans l'interface Zigbee2MQTT, onglet "Map"
```

### Performances

Surveillez les métriques :

```yaml
# sensors.yaml
sensor:
  - platform: mqtt
    state_topic: "zigbee2mqtt/bridge/state"
    name: "Zigbee2MQTT Status"
```

## Ressources

- [Documentation Zigbee2MQTT](https://www.zigbee2mqtt.io/)
- [Liste des appareils supportés](https://www.zigbee2mqtt.io/supported-devices/)
- [Forum Zigbee2MQTT](https://github.com/Koenkk/zigbee2mqtt/discussions)

## Conclusion

L'intégration Zigbee via Zigbee2MQTT offre flexibilité et compatibilité avec de nombreux appareils. C'est un excellent investissement pour étendre votre installation domotique.