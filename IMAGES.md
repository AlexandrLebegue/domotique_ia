# Guide des Images pour le Blog

Ce document explique comment ajouter des images pour votre blog Home Assistant.

## 📁 Structure des Images

```
public/images/
├── covers/          # Images de couverture des articles (ratio 16:9)
├── hero/            # Images pour la section hero de l'accueil
└── screenshots/     # Captures d'écran pour les tutoriels
```

## 🖼️ Images Requises

### Images de Couverture d'Articles

Les articles actuels nécessitent les images suivantes :

1. **`/images/covers/installation-serveur.jpg`**
   - Pour l'article: "Installation de Home Assistant sur serveur dédié"
   - Dimensions recommandées: 1200x675px (16:9)
   - Contenu suggéré: Serveur, logo Home Assistant, Docker

2. **`/images/covers/nabu-casa.jpg`**
   - Pour l'article: "Configuration de Nabu Casa"
   - Dimensions recommandées: 1200x675px
   - Contenu suggéré: Logo Nabu Casa, cloud, connexion sécurisée

3. **`/images/covers/zigbee-integration.jpg`**
   - Pour l'article: "Intégration Zigbee"
   - Dimensions recommandées: 1200x675px
   - Contenu suggéré: Clé Zigbee, capteurs, réseau maillé

4. **`/images/covers/automation-presence.jpg`**
   - Pour l'article: "Automation de détection de présence"
   - Dimensions recommandées: 1200x675px
   - Contenu suggéré: Détecteur de mouvement, smartphone, maison

## 🎨 Où Trouver des Images

### Options Gratuites

1. **Unsplash** (https://unsplash.com/)
   - Recherches: "smart home", "server", "technology", "iot"
   - Licence libre, haute qualité

2. **Pexels** (https://www.pexels.com/)
   - Recherches: "home automation", "raspberry pi", "sensors"
   - Gratuit pour usage commercial

3. **Pixabay** (https://pixabay.com/)
   - Recherches similaires
   - Licence CC0

### Créer vos Propres Images

1. **Canva** (https://www.canva.com/)
   - Templates pour blog
   - Facile à utiliser
   - Version gratuite disponible

2. **Figma** (https://www.figma.com/)
   - Design plus avancé
   - Gratuit pour projets personnels

## 📐 Spécifications Techniques

### Images de Couverture d'Articles

```
Format: JPG ou WebP
Dimensions: 1200x675px (ratio 16:9)
Poids max: 200 KB (optimisé)
Qualité: 80-85%
```

### Optimisation

Utilisez un outil comme:
- **TinyPNG** (https://tinypng.com/)
- **Squoosh** (https://squoosh.app/)
- **ImageOptim** (Mac)

## 🔧 Comment Ajouter une Image

### 1. Placer l'Image

```bash
# Copier votre image dans le bon dossier
cp mon-image.jpg blog-domotique/public/images/covers/
```

### 2. Mettre à Jour le Frontmatter

Dans votre article `.md`, assurez-vous que le chemin est correct :

```yaml
---
coverImage: "/images/covers/mon-image.jpg"
---
```

### 3. Vérifier

L'image sera automatiquement utilisée dans:
- La card de l'article (ArticleCard)
- La page d'article (hero section)
- Les réseaux sociaux (Open Graph)

## 🎯 Images Temporaires

Pour tester rapidement sans images, vous pouvez utiliser des services de placeholder:

### Placeholder.com

```yaml
coverImage: "https://via.placeholder.com/1200x675/3B82F6/FFFFFF?text=Home+Assistant"
```

### Unsplash Random

```yaml
coverImage: "https://source.unsplash.com/1200x675/?smart-home,technology"
```

## 📝 Checklist Image

Avant de publier un article :

- [ ] Image de couverture ajoutée (1200x675px)
- [ ] Image optimisée (<200 KB)
- [ ] Nom de fichier en minuscules sans espaces
- [ ] Chemin correct dans le frontmatter
- [ ] Alt text descriptif (pour accessibilité)
- [ ] Test visuel sur mobile et desktop

## 🌟 Conseils de Design

1. **Cohérence** : Utilisez un style visuel cohérent
2. **Contraste** : Assurez du contraste pour la lisibilité
3. **Minimalisme** : Restez fidèle au thème épuré du site
4. **Pertinence** : L'image doit refléter le contenu
5. **Qualité** : Privilégiez la qualité sur la quantité

## 🔍 Exemples de Recherche

Pour trouver les bonnes images sur Unsplash:

```
- "server rack technology"
- "home automation system"
- "zigbee sensor"
- "motion detector"
- "smart home hub"
- "raspberry pi home assistant"
```

## 📱 Responsive

Les images s'adaptent automatiquement :
- Next.js Image component optimise le chargement
- Différentes tailles générées automatiquement
- Lazy loading activé par défaut

---

**Besoin d'aide ?** Consultez la [documentation Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)