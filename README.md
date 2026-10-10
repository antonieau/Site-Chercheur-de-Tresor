# Chercheur de Trésor

Site statique en français consacré à l’art, aux objets de découverte et à la restauration du patrimoine bâti. L’ensemble conserve une direction visuelle sobre et éditoriale, sur fond ivoire, avec une large place accordée aux photographies.

## Lancer le site en local

Depuis ce dossier :

```powershell
node serve.mjs
```

Puis ouvrez `http://127.0.0.1:4173`.

## Pages

- `dist/index.html` : accueil, sélection de six œuvres, présentation du projet et contact ;
- `dist/galerie/index.html` : galerie complète avec visionneuse et navigation au clavier, accessible à l’adresse `/galerie/` ;
- `dist/a-propos/index.html` : présentation personnelle et portrait, accessible à l’adresse `/a-propos/` ;
- `dist/styles.css` : styles communs et mises en page responsive ;
- `dist/script.js` : menu mobile, animations, visionneuses et formulaire de démonstration.

## Ajouter des photographies

Les originaux restent dans `images-arts/`. Le serveur ne publie que `dist/`, il faut donc copier chaque photographie destinée au site dans `dist/assets/images-arts/`, puis ajouter son élément `<figure>` dans `dist/galerie/index.html` avec :

- une légende descriptive sans attribution non vérifiée ;
- un texte alternatif précis ;
- `loading="lazy"` pour les images situées après le premier écran ;
- un chemin correctement encodé si le nom du fichier contient des espaces (par exemple `%20`).

Le portrait est réservé à `dist/a-propos/index.html`. Le formulaire de contact est une démonstration et n’envoie aucune donnée.
