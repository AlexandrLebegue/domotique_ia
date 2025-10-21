# Blog Domotique Home Assistant

Blog Next.js + TypeScript centré sur Home Assistant avec chatbot IA intégré.

## 🚀 Installation

```bash
# Installation des dépendances
npm install

# Lancement en développement
npm run dev

# Build production
npm run build
npm start
```

Le site sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
blog-domotique/
├── app/                        # Pages Next.js App Router
│   ├── layout.tsx             # Layout principal
│   ├── page.tsx               # Page d'accueil
│   ├── chatbot/               # Page chatbot IA
│   ├── tutoriels/             # Page tutoriels
│   ├── articles/[slug]/       # Pages articles dynamiques
│   ├── a-propos/              # Page à propos
│   └── api/                   # API Routes
│       ├── chat/              # Endpoint chatbot
│       └── contact/           # Endpoint formulaire
├── components/                # Composants React réutilisables
│   ├── Navbar.tsx            # Navigation
│   ├── Footer.tsx            # Pied de page
│   ├── ArticleCard.tsx       # Card article
│   ├── ArticleList.tsx       # Liste d'articles
│   └── MarkdownRenderer.tsx  # Rendu Markdown
├── lib/                       # Utilitaires et services
│   ├── markdown.ts           # Gestion des articles
│   └── ai_services.ts        # Service IA OpenRouter
├── models/                    # Interfaces TypeScript
│   └── Article.ts            # Modèle Article
├── content/                   # Articles Markdown
│   ├── installation-home-assistant.md
│   ├── nabu-casa-configuration.md
│   ├── integration-zigbee.md
│   └── automation-presence.md
└── public/images/            # Images statiques
    ├── covers/               # Images de couverture
    ├── hero/                 # Images hero
    └── screenshots/          # Captures d'écran
```

## ✍️ Ajouter un article

### 1. Créer le fichier Markdown

Créez un nouveau fichier `.md` dans le dossier `content/` :

```bash
touch content/mon-nouvel-article.md
```

### 2. Ajouter le frontmatter YAML

```yaml
---
title: "Titre de votre article"
excerpt: "Résumé court de l'article (2-3 phrases)"
date: "2024-01-25"
coverImage: "/images/covers/mon-image.jpg"
category: "installation|integration|automation"
tags: ["tag1", "tag2", "tag3"]
keywords: ["mot-clé1", "mot-clé2", "mot-clé3"]
author: "Alexandre Lebegue"
---
```

### 3. Écrire le contenu

```markdown
# Titre principal

Votre introduction...

## Section 1

Votre contenu avec du **gras**, de l'*italique*.

### Sous-section

```yaml
# Exemple de code YAML
key: value
```

## Section 2

- Liste à puces
- Élément 2
- Élément 3

## Conclusion

Votre conclusion...
```

### 4. Ajouter une image de couverture

Placez votre image dans `public/images/covers/` avec le même nom que dans le frontmatter.

### 5. Build et test

```bash
npm run dev
```

Votre article sera automatiquement disponible sur `/articles/mon-nouvel-article`

## 🎨 Thème et design

Le site utilise un thème blanc épuré avec Tailwind CSS :

- **Couleurs principales** : Blanc (#FFFFFF), Gris clair (#F5F5F5)
- **Accent** : Bleu (#3B82F6)
- **Typographie** : Inter (corps), Poppins (titres)
- **Animations** : Transitions douces, fade-in, hover effects

## 🤖 Chatbot IA

Le chatbot utilise OpenRouter API avec le modèle Mistral.

### Configuration

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=votre_clé_api
```

### Fonctionnement

1. Le chatbot charge automatiquement les métadonnées de tous les articles
2. L'IA recommande des articles pertinents selon la question
3. Les articles sont affichés élégamment dans la réponse

## 📝 Frontmatter requis

Chaque article doit contenir ces champs :

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `title` | string | Titre de l'article | "Installation Home Assistant" |
| `excerpt` | string | Résumé court | "Guide complet pour..." |
| `date` | string | Date publication (ISO) | "2024-01-15" |
| `coverImage` | string | Chemin image | "/images/covers/img.jpg" |
| `category` | string | Catégorie | "installation", "integration", "automation" |
| `tags` | array | Tags | ["docker", "linux"] |
| `keywords` | array | Mots-clés pour IA | ["installation", "serveur"] |
| `author` | string (optionnel) | Auteur | "Alexandre Lebegue" |

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Lancement production
npm start

# Lint
npm run lint
```

## 📦 Technologies utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **React Markdown** - Rendu Markdown
- **Gray Matter** - Parsing frontmatter
- **Rehype Highlight** - Coloration syntaxique
- **React Player** - Lecteur YouTube
- **Day.js** - Gestion des dates
- **Axios** - Requêtes HTTP

## 🌟 Fonctionnalités

✅ Routing dynamique pour les articles  
✅ Chatbot IA avec recommandations d'articles  
✅ Syntax highlighting pour code  
✅ Support YouTube embeds  
✅ Table des matières auto-générée  
✅ Design responsive mobile/tablet/desktop  
✅ Accessibilité (ARIA, keyboard navigation)  
✅ SEO optimisé  
✅ Mode sombre (à venir)  

## 📄 Licence

MIT License - Alexandre Lebegue © 2024

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📧 Contact

Pour toute question, utilisez le formulaire de contact sur la page [À propos](/a-propos).

## 🔗 Liens utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Home Assistant](https://www.home-assistant.io/)
- [Forum HACF](https://forum.hacf.fr/)