# OnlyAlec - Prank Site 🔺

Un site prank façon faux "OnlyFans" pour piéger Alec Vionnet, le cône.
Créé avec amour (et beaucoup de CSS/JS vanilla). 

## 🚀 Lancer en local

Le site ne nécessite **aucun serveur**, **aucun build**, et **aucune dépendance complexe**.

1. Ouvre le dossier où se trouvent les fichiers.
2. Double-clique simplement sur le fichier `index.html`.
3. Il s'ouvrira dans ton navigateur par défaut, et tout fonctionnera parfaitement !

## 🌍 Déployer en 3 étapes (Glisser-Déposer)

Puisque le site est 100% statique (HTML/CSS/JS), le plus simple est d'utiliser **Netlify Drop** :

1. Rends-toi sur [Netlify Drop](https://app.netlify.com/drop).
2. Glisse le dossier contenant le projet (le dossier entier, avec `index.html`, `assets`, etc.) dans la zone pointillée sur le site.
3. Attends 10 secondes... Ton site est en ligne ! Tu pourras même changer le nom du lien généré dans les paramètres du site (Site Settings > Change site name).

*Alternatives :*
- **GitHub Pages** : Pousse ce dossier sur un repo GitHub public, va dans "Settings" > "Pages", et déploie depuis la branche "main".
- **Vercel** : Connecte ton GitHub ou installe la CLI Vercel et tape `vercel` dans le dossier.

> ⚠️ **Important avant le déploiement final :** N'oublie pas d'éditer la balise `<meta property="og:image">` dans `index.html` avec l'URL finale de ton site pour que la miniature apparaisse quand tu envoies le lien sur WhatsApp !

## 📝 Modifier les textes et le contenu

Tous les textes, phrases débiles, prix et posts du faux feed sont centralisés dans un seul fichier : **`config.js`**.

Ouvre `config.js` dans n'importe quel éditeur de texte (Notepad, TextEdit, VS Code) et tu verras :
- `phrases` : La banque des phrases qui apparaissent quand on clique sur Alec dans le champ.
- `posts` : Les publications du feed. Tu peux modifier le texte avant la révélation (`beforeText`), après la révélation (`afterText`), et le prix (`price`). Tu peux aussi ajuster le zoom de la photo avec `imagePos` et `imageScale`.
- `reviews` : Les faux avis.
- `toasts` : Les fausses notifications qui pop en haut de l'écran.

Pas besoin de toucher au reste du code !
# OnlyAlec
