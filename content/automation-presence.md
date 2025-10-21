---
title: "Créer une automation de détection de présence"
excerpt: "Automatisez votre maison intelligente avec la détection de présence. Lumières, chauffage et sécurité s'adaptent automatiquement à votre présence."
date: "2024-01-22"
coverImage: "/images/covers/automation-presence.svg"
category: "automation"
tags: ["automation", "presence", "detection", "mouvement", "smartphone"]
keywords: ["automation", "présence", "détection", "mouvement", "PIR", "smartphone", "géofencing"]
author: "Alexandre Lebegue"
---

# Créer une automation de détection de présence

La détection de présence est la pierre angulaire d'une maison intelligente. Elle permet d'automatiser l'éclairage, le chauffage, la sécurité et bien plus encore.

## Méthodes de détection

### 1. Détecteurs de mouvement PIR

Les capteurs PIR (Passive Infrared) détectent les mouvements :

- **Avantages** : Peu coûteux, fiables, longue durée de vie sur batterie
- **Inconvénients** : Détection temporaire, peut rater une présence immobile

**Modèles recommandés** :
- Aqara Motion Sensor (~15€)
- Philips Hue Motion Sensor (~40€)
- Sonoff SNZB-03 (~10€)

### 2. Présence par smartphone

Le suivi de smartphone via GPS ou Wi-Fi :

- **Avantages** : Précis, détection de départ/arrivée
- **Inconvénients** : Consomme de la batterie, vie privée

### 3. Capteurs multisensors

Combinent plusieurs technologies :

- Mouvement
- Luminosité
- Température
- Humidité

## Configuration de base

### Ajouter un détecteur de mouvement

```yaml
# configuration.yaml
binary_sensor:
  - platform: mqtt
    name: "Détecteur Salon"
    state_topic: "zigbee2mqtt/detecteur_salon"
    payload_on: "true"
    payload_off: "false"
    device_class: motion
```

### Suivi de présence par smartphone

Installez l'application Home Assistant Companion et activez le suivi :

```yaml
# configuration.yaml
device_tracker:
  - platform: ha_mobile_app
```

## Automations simples

### Lumière automatique au mouvement

```yaml
# automations.yaml
automation:
  - alias: "Lumière couloir mouvement"
    description: "Allume la lumière du couloir lors d'un mouvement la nuit"
    
    trigger:
      - platform: state
        entity_id: binary_sensor.detecteur_couloir
        to: 'on'
    
    condition:
      - condition: sun
        after: sunset
        before: sunrise
    
    action:
      - service: light.turn_on
        target:
          entity_id: light.couloir
        data:
          brightness: 100
      
      - delay: '00:03:00'
      
      - service: light.turn_off
        target:
          entity_id: light.couloir
```

### Mode "Absent" automatique

```yaml
automation:
  - alias: "Activation mode absent"
    trigger:
      - platform: state
        entity_id: 
          - device_tracker.smartphone_alex
          - device_tracker.smartphone_marie
        to: 'not_home'
        for: '00:10:00'
    
    condition:
      - condition: state
        entity_id: device_tracker.smartphone_alex
        state: 'not_home'
      - condition: state
        entity_id: device_tracker.smartphone_marie
        state: 'not_home'
    
    action:
      - service: climate.set_temperature
        target:
          entity_id: climate.thermostat
        data:
          temperature: 18
      
      - service: light.turn_off
        target:
          entity_id: all
      
      - service: alarm_control_panel.alarm_arm_away
        target:
          entity_id: alarm_control_panel.maison
```

## Automations avancées

### Détection de présence multi-capteurs

Combinons plusieurs capteurs pour une détection plus précise :

```yaml
# helpers.yaml
input_boolean:
  presence_salon:
    name: "Présence Salon"
    icon: mdi:account

# automations.yaml
automation:
  - alias: "Détection présence salon"
    trigger:
      - platform: state
        entity_id: 
          - binary_sensor.detecteur_mouvement_salon
          - binary_sensor.detecteur_mouvement_canape
        to: 'on'
    
    action:
      - service: input_boolean.turn_on
        target:
          entity_id: input_boolean.presence_salon
      
      - service: timer.start
        target:
          entity_id: timer.absence_salon
        data:
          duration: '00:10:00'

  - alias: "Fin présence salon"
    trigger:
      - platform: event
        event_type: timer.finished
        event_data:
          entity_id: timer.absence_salon
    
    action:
      - service: input_boolean.turn_off
        target:
          entity_id: input_boolean.presence_salon
```

### Éclairage adaptatif

L'éclairage s'adapte au moment de la journée :

```yaml
automation:
  - alias: "Éclairage adaptatif salon"
    trigger:
      - platform: state
        entity_id: binary_sensor.detecteur_salon
        to: 'on'
    
    action:
      - choose:
          # Matin (6h-8h) : lumière douce
          - conditions:
              - condition: time
                after: '06:00:00'
                before: '08:00:00'
            sequence:
              - service: light.turn_on
                target:
                  entity_id: light.salon
                data:
                  brightness: 50
                  color_temp: 400
          
          # Journée : lumière normale
          - conditions:
              - condition: sun
                after: sunrise
                before: sunset
            sequence:
              - service: light.turn_on
                target:
                  entity_id: light.salon
                data:
                  brightness: 100
          
          # Soirée (18h-23h) : lumière chaude
          - conditions:
              - condition: time
                after: '18:00:00'
                before: '23:00:00'
            sequence:
              - service: light.turn_on
                target:
                  entity_id: light.salon
                data:
                  brightness: 80
                  color_temp: 500
          
          # Nuit : lumière minimale
          - conditions:
              - condition: time
                after: '23:00:00'
                before: '06:00:00'
            sequence:
              - service: light.turn_on
                target:
                  entity_id: light.salon
                data:
                  brightness: 20
                  rgb_color: [255, 100, 0]
```

### Simulation de présence

En vacances, simulez une présence :

```yaml
automation:
  - alias: "Simulation présence vacances"
    trigger:
      - platform: time
        at: '19:00:00'
    
    condition:
      - condition: state
        entity_id: input_boolean.mode_vacances
        state: 'on'
    
    action:
      # Allume des lumières aléatoires
      - service: light.turn_on
        target:
          entity_id: >
            {{ ['light.salon', 'light.cuisine', 'light.chambre'] | random }}
      
      - delay:
          minutes: "{{ range(30, 120) | random }}"
      
      - service: light.turn_off
        target:
          entity_id: all
```

## Optimisation

### Éviter les faux positifs

```yaml
automation:
  - alias: "Lumière avec délai anti-rebond"
    trigger:
      - platform: state
        entity_id: binary_sensor.detecteur_couloir
        to: 'on'
        for: '00:00:02'  # Délai de 2 secondes
    
    action:
      - service: light.turn_on
        target:
          entity_id: light.couloir
```

### Timer d'extinction intelligent

```yaml
script:
  extinction_intelligente:
    sequence:
      - service: timer.cancel
        target:
          entity_id: timer.lumiere_couloir
      
      - service: timer.start
        target:
          entity_id: timer.lumiere_couloir
        data:
          duration: >
            {% if is_state('sun.sun', 'below_horizon') %}
              00:05:00
            {% else %}
              00:02:00
            {% endif %}
```

## Blueprints recommandés

Utilisez des blueprints pour simplifier la création :

```yaml
# Exemple d'import de blueprint
automation:
  - use_blueprint:
      path: homeassistant/motion_light.yaml
      input:
        motion_entity: binary_sensor.detecteur_salon
        light_target: light.salon
        no_motion_wait: 300
```

## Dépannage

### Lumières qui clignotent

Problème : Détecteur trop sensible

```yaml
# Augmenter le délai
trigger:
  - platform: state
    entity_id: binary_sensor.detecteur
    to: 'on'
    for: '00:00:05'  # 5 secondes au lieu de 2
```

### Détection manquée

```yaml
# Vérifier l'état du capteur
sensor:
  - platform: template
    sensors:
      detecteur_batterie:
        friendly_name: "Batterie détecteur"
        value_template: "{{ state_attr('binary_sensor.detecteur', 'battery') }}"
        unit_of_measurement: '%'
```

## Bonnes pratiques

1. **Testez progressivement** : Commencez par une pièce
2. **Documentez** : Ajoutez des descriptions à vos automations
3. **Utilisez des conditions** : Évitez les actions non désirées
4. **Mode debug** : Activez les logs pour comprendre le comportement

```yaml
# Activer les logs pour une automation
logger:
  default: warning
  logs:
    homeassistant.components.automation: debug
```

## Conclusion

La détection de présence transforme une maison en habitat vraiment intelligent. Commencez simple et étoffez progressivement pour un confort optimal.

## Ressources

- [Blueprints communautaires](https://community.home-assistant.io/c/blueprints-exchange)
- [Documentation Automations](https://www.home-assistant.io/docs/automation/)
- [Cookbook d'automations](https://www.home-assistant.io/cookbook/)