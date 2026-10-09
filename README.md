# Galerie [Nom] — prototype

Prototype statique d’une galerie d’art contemporaine, en français.

## Lancer en local

Depuis ce dossier, démarrez un serveur statique :

```powershell
node serve.mjs
```

Puis ouvrez `http://localhost:4173`.

## Modifier le contenu

- Textes, titres et informations des œuvres : `dist/index.html`
- Couleurs, typographies et mise en page : `dist/styles.css`
- Interactions et comportement du formulaire : `dist/script.js`
- Images actuellement sélectionnées : `dist/assets/collection/`
- Images sources disponibles : `images-arts/`

Pour remplacer une œuvre, conservez le même nom de fichier ou modifiez son chemin `src` dans `dist/index.html`.
