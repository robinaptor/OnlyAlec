# MISSION

Tu es un dev front-end créatif de très haut niveau (direction artistique, motion design, humour absurde). Code un site PRANK complet pour mon pote Alec Vionnet : un faux « OnlyFans » baptisé « OnlyAlec », où Alec dit chercher une naine.

Parcours du visiteur : il arrive dans un champ parallax animé où Alec est cliquable (chaque clic = une phrase débile) → il scrolle jusqu'à un faux profil façon OnlyFans avec paywall et photos floutées → il « paie » → faux paiement, puis révélation : tout était une blague, il n'y avait rien derrière le flou.

Principe comique n°1 : le DEADPAN. Finition d'agence ultra pro + contenu complètement débile : c'est le contraste qui fait rire. On ne casse jamais le 4e mur avant la révélation finale.

# VOIX ET GARDE-FOUS

- Tout est en français, à la 1re personne, dans la voix d'Alec : prétentieux, romantique en détresse, vendeur de contenu « exclusif » qui n'a rien à montrer.
- On se moque d'ALEC (son ego, ses oreilles, sa forme de cône, ses pâtes, sa solitude, ses prix délirants). Jamais des personnes de petite taille : pas d'insulte, pas de blague dégradante.
- Aucune nudité, aucun contenu sexuel explicite : les « photos exclusives » sont uniquement des recadrages de la photo d'Alec. Sous-entendus légers OK.

# LA PHOTO (jointe, à ranger dans assets/alec.jpg)

Environ 1080x1350, fond noir pur, AUCUNE transparence. C'est « Alec le cône » : un cône jaune au grain halftone, un vrai visage granuleux incrusté (joues roses de cartoon), de grandes oreilles, des cheveux noirs bouclés au sommet, des bras de dessin animé années 30 avec gants blancs (main gauche sur la hanche, main droite qui fait ✌️), deux jambes noires fines, de grosses chaussures blanches.
Repères approximatifs (x%/y% de l'image) : visage 50/52 ; oreille gauche 34/47 ; oreille droite 65/47 ; main ✌️ 78/47 ; main sur la hanche 29/64 ; cheveux 49/32 ; dessous du cône 50/71 ; chaussures 50/92.
Le fond étant noir pur, la scène du hero est NOCTURNE : ciel exactement #000000 derrière Alec, mask-image pour fondre les bords de la photo (sans rogner gants, oreilles ni chaussures), herbes au premier plan qui cachent le bas, halo derrière lui. Aucun rectangle noir ne doit JAMAIS être visible. (Si assets/alec-cutout.png existe, utilise-le à la place et passe sur un champ de jour doré.)

# STACK ET LIVRABLES

- HTML + CSS + JS vanilla, zéro build, scripts CLASSIQUES (pas de modules ES, pas de fetch local) : ça doit marcher en double-cliquant sur index.html, puis se déployer par glisser-déposer (Netlify Drop, Vercel, GitHub Pages). GSAP + ScrollTrigger via cdnjs autorisés, mais le site doit rester utilisable si le CDN est bloqué. Si ton outil impose React/Vite/Next, garde exactement les mêmes comportements.
- Fichiers : index.html, style.css, main.js, config.js (tous les textes, prix, phrases et posts modifiables facilement, bien commentés), assets/alec.jpg, README.md (lancer en local + déployer en 3 étapes).
- Mobile-first (390 px) puis desktop (1440 px). Le lien sera envoyé sur WhatsApp : parfait au pouce, dans un navigateur intégré, sur Safari iOS et Chrome Android (préfixes -webkit-, 100svh avec fallback, safe-area).
- <html lang="fr">, meta robots noindex,nofollow, Open Graph (titre « Alec Vionnet – cherche une naine 🔞 », image = la photo, URL absolue en commentaire à remplacer après déploiement), favicon emoji 🔺.

# DIRECTION ARTISTIQUE

- Hero : conte de fées nocturne bizarre, façon clip fauché. Illustration à plat, formes simples, bords un peu irréguliers, grain de papier : la photo granuleuse et le dessin animé 1930 doivent s'y fondre (collage photocopié). Palette : noir photo #000000, indigo nuit #1B1240, magenta d'horizon #B5287E, jaune cône #F5C518, rose joue #FF8FB1.
- Profil : parodie PRÉCISE d'OnlyFans (mêmes patterns d'UI) : fond blanc, accent #00AFF0, interface propre. Logo « OnlyAlec » en texte stylisé, aucune icône copiée.
- Typo : deux familles Google Fonts bien distinctes, Lilita One (titres, bulles BD) + Figtree (UI), avec de vraies fallbacks.
- Pas de look « template IA » : pas de dégradés violets génériques, de cartes toutes identiques, d'étiquettes en majuscules espacées, de fade-in sur chaque section ni de hover sur chaque carte.
- Deux moments « wow » seulement : le hero et la révélation finale. Le reste est sobre et crédible. Le mouvement ambiant est réservé au hero ; ailleurs, l'animation répond à une action (clic, déblocage, paiement).

# PARTIE 1 : HERO, ALEC DANS SON CHAMP

Plein écran (100svh). Titre discret en haut : « OnlyAlec » + « Alec cherche une naine. »
Séquence d'entrée unique (~1,8 s) : noir total → le spot s'allume → Alec tombe du ciel avec un rebond → le champ s'anime.

Calques parallax (du fond vers l'avant), tout en SVG/CSS inline, aucune image externe :

1. ciel dégradé + étoiles qui scintillent
2. lune géante avec halo
3. nuages-silhouettes qui défilent en boucle
4. trois rangées de collines
5. champ de tournesols lumineux qui ondulent (ils pivotent doucement vers le curseur) + lucioles (30 desktop / 12 mobile, dérive sinusoïdale + clignotement)
6. ALEC, avec un spot de lumière en cône derrière lui (mix-blend-mode: screen)
7. hautes herbes au premier plan qui se balancent et cachent ses chaussures
8. pollen flou tout devant (le plus rapide)

- vignette et grain de film par-dessus.

Parallax : une seule boucle requestAnimationFrame ; chaque calque a un data-depth ; valeurs lissées par lerp (~0.08) ; uniquement transform: translate3d et opacity. Sources : pointeur (desktop) ; scroll, doigt et léger balancement automatique (mobile). AUCUNE popup de permission (pas de gyroscope). Ne jamais bloquer le scroll natif.

Alec vivant : respiration (scaleY 1 → 1.02), balancement ±1,5°, ombre au sol, transform-origin aux chaussures. Après 2,5 s sans action, un « 👆 clique sur Alec » se met à pulser.

CLIC / TAP sur Alec (hitbox = tout le cône, vrai <button> accessible) :

- squash & stretch (~450 ms, cubic-bezier(.34,1.56,.64,1)), navigator.vibrate(15), « pop » synthétisé en WebAudio (muet par défaut, bouton 🔊 visible) ;
- une BULLE DE BD avec une phrase de la banque ci-dessous : position et angle aléatoires autour d'Alec (jamais sur son visage ni hors écran), rotation ±6°, pop élastique, elle flotte vers le haut et disparaît après ~3,5 s. Jusqu'à 6 bulles en même temps : le spam de clics crée un nuage de phrases débiles. Tirage « sac mélangé » : aucune phrase ne revient avant que toutes soient passées ;
- compteur de clics → événements : 5 « Arrête de me toucher » + secousse ; 10 pluie d'emojis 🔺👂🍝 ; 20 Alec « se vexe » (il rougit, bulle spéciale) ; 35 grosse flèche qui rebondit « Scrolle, la suite est payante » ; 50 auto-scroll doux vers le profil, bulle « OK t'es fan, viens ».
  En bas : « Voir son profil 🔞 » avec chevron animé.

# PARTIE 2 : LE PROFIL « ONLYALEC » (au scroll)

Transition « rideau » : le hero zoome légèrement et s'efface pendant que le profil monte par-dessus avec des coins arrondis. Barre du haut sticky.

- Barre : logo, icônes maison / cloche (badge « 69 ») / message, bouton « S'abonner ».
- Header : bannière (mini-champ nocturne qui boucle), avatar rond = recadrage serré sur le visage d'Alec (bague jaune + pastille verte « en ligne »), « Alec Vionnet » + badge vérifié bleu, @alec_cherche_une_naine.
- Bio : « Salut c'est Alec 👋 Je cherche une naine. Oui, une vraie. Non c'est pas une blague (si). Candidatures ouvertes, humour exigé. »
- Stats (icônes + compteurs) : 📸 9 photos, 🎥 0 vidéo (floue), ❤️ 3 likes (dont 2 de ma mère). Pastille « 🔴 EN LIVE : Alec regarde son plafond » avec un compteur de spectateurs qui varie.
- Encart abonnement : « S'abonner : 0,00 € le 1er mois, puis 69,99 €/mois », ruban « -100 % : offre limitée à ta curiosité ». Onglets Posts / Médias / Boutique (Boutique → « Rupture de stock : il me reste juste mon charisme »).
- FIL DE POSTS : avatar, nom, « il y a 2 min », légende débile, média, actions ❤️ 💬 💸 Pourboire, 2 commentaires bidons. Médias = recadrages de la photo (repères ci-dessus, zoom x3 à x6), FLOUTÉS (blur ~22 px + grain), avec cadenas et bouton « 🔒 Débloquer pour 4,99 € ». Posts (légende → image → légende « après » la révélation) :
  1. 📌 « AVIS DE RECHERCHE : Alec cherche une naine. Sérieux uniquement (enfin, drôles). » → photo entière → « Ouais, c'est moi. T'es déçu ? T'as raison. »
  2. « Nouvelle photo exclusive 🔥 (vous allez pas en revenir) » → visage → « Mon visage. T'attendais quoi ? »
  3. « Mes oreilles sous tous les angles 👂 » → oreilles → « Des oreilles. Grandes. Voilà. »
  4. « Pieds 🦶 (contenu premium) » → chaussures → « Des chaussures. Je t'avais prévenu. »
  5. « Moi qui fais ✌️ pour attirer une naine (ça marche pas) » → main → « Une main. Qui fait ✌️. Y'a pas de piège. »
  6. « Vue de dessous (ma mère s'est allongée par terre) » → dessous du cône → « Le dessous d'un cône. Il y a rien dedans. »
  7. « 3 h du mat, je cherche une naine sur Google Maps » → cheveux → « Mes cheveux à 3 h du mat. Sans commentaire. »
  8. « 💌 Message privé d'Alec » → texte flouté → « "Salut." Alec (il t'a fait payer pour ça) »
- Avis d'abonnés : ★★★★★ « J'ai payé 0 € et j'ai quand même été déçu. » Kevin, 42 ans ; ★☆☆☆☆ « Je cherchais des photos. J'ai trouvé un cône. » Sandrine ; ★★★★★ « Alec, rends-moi mes pâtes. » Jean-Michel.
- Barre CTA collante en bas sur mobile : « S'abonner pour 0 € ».

# PARTIE 3 : FAUX PAIEMENT ET RÉVÉLATION

Déclencheurs : tout bouton « S'abonner », « Débloquer », « Pourboire », et le CTA collant.
RÈGLE ABSOLUE : aucun vrai champ de saisie bancaire, aucune donnée saisie ou envoyée nulle part, aucun stockage. La blague ne doit jamais pouvoir récupérer ni encourager la saisie d'une vraie info.

1. Bottom-sheet (mobile) / modale (desktop) « Paiement sécurisé 🔒 (chiffré en ROT13) » avec 3 offres : « Fan occasionnel : 0 € puis 69,99 €/mois », « Vrai fan : 14,99 €/mois (149,99 € barré) », « Fan à vie : 1 000 000 € (recommandé par Alec) ». Bénéfices débiles : « ✔ accès à mes photos floues », « ✔ réponse de ma mère sous 48 h », « ✔ mon respect (valeur : 0 €) ».
2. Moyen de paiement : faux formulaire réaliste mais PRÉ-REMPLI et NON MODIFIABLE (readonly/disabled, sans attribut name, autocomplete off), valeurs évidemment bidon : titulaire « TOI-MÊME », carte « 6969 6969 6969 6969 », exp. « 12/99 », CVV « 000 ». Alternatives cliquables : 🪙 Bitcoin (Monopoly), 🍝 Un plat de pâtes, 🤝 Une promesse.
3. « Payer » → écran de traitement plein écran, barre de progression et statuts successifs (~1,3 s chacun) : « Connexion à ta banque… 🏦 » → « Vérification du solde… (aïe) » → « Appel de ta mère pour autorisation… » → « Conversion des euros en pâtes… 🍝 » → la barre bloque à 99 % pendant 3 s → « Erreur 418 : I'm a teapot ☕ » → « Paiement ACCEPTÉ ✅ ». Total 10 à 12 s max.
4. RÉVÉLATION : flash blanc, confettis (cônes 🔺 + 🤡), gros titre « T'AS CRU QUOI ? 🤡 », sous-titre « Aucun paiement effectué. Aucune donnée collectée. Alec est juste… Alec. » Tous les médias se défloutent en cascade (stagger 150 ms) et chaque légende devient sa légende « après ».
5. Fin : reçu façon ticket de caisse (« Merci pour votre achat de RIEN », total 0,00 €, « Alec Vionnet SARL, Sans Aucun Revenu Légitime »), bouton « Me rembourser » qui s'enfuit sous le doigt ou le curseur, bouton « Piéger un autre pote 😈 » (Web Share API + fallback copier le lien), bouton « Rejouer ». Bonus final : « Plot twist : Alec cherche vraiment une naine… de jardin 🌷 ».

# GAGS BONUS (sans alourdir)

Faux bandeau cookies à l'arrivée sur le profil (« On utilise des cookies (au chocolat) » avec [Accepter] et [Accepter quand même]) ; toasts de fausses notifs toutes les 6 à 10 s (« 🔔 Jean-Michel vient de s'abonner (0 €) », « Alec a liké sa propre photo », « Sandrine a quitté la page (choquée) ») ; titre d'onglet « Alec t'attend… 🥺 » quand on quitte la page ; 7 taps sur le logo = pluie de cônes et Alec qui tourne sur lui-même.

# BANQUE DE PHRASES (bulles du hero + commentaires)

À mettre dans config.js, puis ajoutes-en 30 du même niveau (courtes, moins de 110 caractères, absurdes, auto-ironiques).
Classiques

- Vous inquiétez pas, c'est pas la taille qui compte, c'est le goût.
- Je cherche une naine. Oui, une vraie. Non, c'est pas une blague. (Si.)
- Oui je suis un cône. Non, je vends pas de glace.
- Mes grandes oreilles ? C'est pour mieux t'écouter. Ou pour capter la 5G.
- L'amour n'a pas de taille. Par contre, il a un prix.
- Attention : cône de signalisation. Risque de tomber amoureux.
- Les meilleurs parfums sont dans les petits flacons. Les meilleurs mecs aussi. Enfin… moi.
- Mes critères : de l'humour, moins d'1m50, des pâtes. Tout est négociable sauf les pâtes.
- Je cherche une naine. Une étoile, hein. Je suis romantique, pas dérangé.
  Vendeur de contenu
- Abonne-toi ! J'ai déjà un abonné : mon père. Il est pas content.
- Contenu exclusif : moi qui regarde mon téléphone pendant 45 minutes.
- Pieds : 14,99 €. Chaussures : gratuites. Chaussettes : négociable.
- Mes photos sont floutées. C'est pas de la pudeur, c'est de la pitié.
- Pack Découverte : 3 photos de moi qui essaie de faire une pose.
- 100 % bio, 0 % talent.
  Romantique en détresse
- Mon dernier date m'a dit « tu es unique ». Je crois que c'était un compliment.
- Je cherche l'amour. Et mes clés. L'un des deux me suffira.
- Offre : un jardin, des pâtes, et 0 € de revenus.
- J'ai un jardin. Je dis ça, je dis rien.
- Moins d'1m50 et fan de pâtes ? Écris-moi. Plus grande ? Écris-moi quand même, j'ai personne.
  Spam de clics
- Aïe ! Pas sur la pointe !
- Tu cliques comme tu swipes : sans réfléchir.
- Continue, ça me chatouille. Et ça booste mes stats.
- T'as pas mieux à faire ? Moi non plus, je suis un cône.
- Un peu de respect, je suis vérifié (par ma mère).
- OK t'es fan. Descends, la suite est payante.
  Phrases de con pures
- Un cône, c'est juste un triangle qui a réussi.
- Je suis tellement pointu que j'ai même des avis pointus.
- Techniquement, je suis la moitié d'un sablier.
- Si je tombe, je roule en rond. C'est la physique, pas ma faute.
- J'ai pas de ventre, j'ai une base solide.

# CONTRAINTES TECHNIQUES

- Perf : n'anime que transform et opacity, will-change ciblé, une seule boucle rAF mise en pause quand l'onglet est caché, particules réduites sur mobile, moins de 1,5 Mo hors photo.
- Mobile : tout marche au tap (zéro dépendance au hover), pas de scroll horizontal, pas de zoom au double-tap, safe-area OK.
- prefers-reduced-motion : champ statique, pas de parallax, transitions en simples fondus (bulles et faux paiement restent fonctionnels).
- Accessibilité : focus visible, contrastes OK, modales avec focus trap + Échap, aria-label sur Alec.
- Vie privée : zéro cookie, zéro tracking, zéro popup de permission, zéro stockage persistant, zéro requête vers un serveur à nous (polices et CDN mis à part).
- Pas de lorem ipsum, pas de TODO : tout doit marcher du premier coup.

# FAÇON DE TRAVAILLER

1. Regarde la photo jointe.
2. Fais un mini design plan (palette de 4 à 6 hex, 2 polices, concept de layout en quelques lignes) puis relis-le : si une partie ressemble à ce que tu ferais pour n'importe quelle page, change-la. Ne me pose pas de questions : si une info manque, fais un choix malin et dis-le en une ligne à la fin.
3. Code TOUT, fichier par fichier, complet.
4. Auto-vérifie : mobile 390 px + desktop 1440 px, aucune erreur console, aucun rectangle noir autour d'Alec, parcours complet (clics → scroll → paiement → révélation), bouton « Me rembourser » impossible à attraper.
5. Termine par : comment lancer en local, comment déployer en 3 étapes, où modifier les textes (config.js).
