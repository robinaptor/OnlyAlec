const CONFIG = {
  // Banque de phrases aléatoires pour les bulles (tirage "sac mélangé")
  phrases: [
    // Classiques
    "Vous inquiétez pas, c'est pas la taille qui compte, c'est le goût.",
    "Je cherche une naine. Oui, une vraie. Non, c'est pas une blague. (Si.)",
    "Oui je suis un cône. Non, je vends pas de glace.",
    "Mes grandes oreilles ? C'est pour mieux t'écouter. Ou pour capter la 5G.",
    "L'amour n'a pas de taille. Par contre, il a un prix.",
    "Attention : cône de signalisation. Risque de tomber amoureux.",
    "Les meilleurs parfums sont dans les petits flacons. Les meilleurs mecs aussi. Enfin… moi.",
    "Mes critères : de l'humour, moins d'1m50, des pâtes. Tout est négociable sauf les pâtes.",
    "Je cherche une naine. Une étoile, hein. Je suis romantique, pas dérangé.",
    
    // Vendeur de contenu
    "Abonne-toi ! J'ai déjà un abonné : mon père. Il est pas content.",
    "Contenu exclusif : moi qui regarde mon téléphone pendant 45 minutes.",
    "Pieds : 14,99 €. Chaussures : gratuites. Chaussettes : négociable.",
    "Mes photos sont floutées. C'est pas de la pudeur, c'est de la pitié.",
    "Pack Découverte : 3 photos de moi qui essaie de faire une pose.",
    "100 % bio, 0 % talent.",
    "Mon banquier m'a dit d'arrêter. Je l'ai bloqué.",
    "Promotion exceptionnelle : je te parle pas pendant 24h pour 5€.",
    
    // Romantique en détresse
    "Mon dernier date m'a dit « tu es unique ». Je crois que c'était un compliment.",
    "Je cherche l'amour. Et mes clés. L'un des deux me suffira.",
    "Offre : un jardin, des pâtes, et 0 € de revenus.",
    "J'ai un jardin. Je dis ça, je dis rien.",
    "Moins d'1m50 et fan de pâtes ? Écris-moi. Plus grande ? Écris-moi quand même, j'ai personne.",
    "J'ai acheté deux brosses à dents au cas où. Ça fait 3 ans.",
    "Je pleure pas, c'est le pollen. Enfin, le pollen de la solitude.",
    
    // Spam de clics
    "Aïe ! Pas sur la pointe !",
    "Tu cliques comme tu swipes : sans réfléchir.",
    "Continue, ça me chatouille. Et ça booste mes stats.",
    "T'as pas mieux à faire ? Moi non plus, je suis un cône.",
    "Un peu de respect, je suis vérifié (par ma mère).",
    "OK t'es fan. Descends, la suite est payante.",
    "Tu sais que tu me fais mal virtuellement ?",
    "On se connaît ? Parce que tu me touches beaucoup là.",
    
    // Phrases de con pures
    "Un cône, c'est juste un triangle qui a réussi.",
    "Je suis tellement pointu que j'ai même des avis pointus.",
    "Techniquement, je suis la moitié d'un sablier.",
    "Si je tombe, je roule en rond. C'est la physique, pas ma faute.",
    "J'ai pas de ventre, j'ai une base solide.",
    "On dit que j'ai la tête dans les nuages, mais c'est juste la forme.",
    "Je peux te piquer si tu t'approches trop."
  ],

  // Posts du faux OnlyFans
  posts: [
    {
      id: 1,
      pinned: true,
      time: "il y a 2 min",
      likes: "2 likes",
      comments: 2,
      beforeText: "📌 AVIS DE RECHERCHE : Alec cherche une naine. Sérieux uniquement (enfin, drôles).",
      afterText: "Ouais, c'est moi. T'es déçu ? T'as raison.",
      imagePos: "50% 50%", 
      imageScale: "100%", // Photo entière
      price: "0,00 €"
    },
    {
      id: 2,
      pinned: false,
      time: "il y a 1 h",
      likes: "1 like",
      comments: 0,
      beforeText: "Nouvelle photo exclusive 🔥 (vous allez pas en revenir)",
      afterText: "Mon visage. T'attendais quoi ?",
      imagePos: "50% 52%", 
      imageScale: "350%", // Zoom sur visage
      price: "4,99 €"
    },
    {
      id: 3,
      pinned: false,
      time: "il y a 3 h",
      likes: "0 like",
      comments: 0,
      beforeText: "Mes oreilles sous tous les angles 👂",
      afterText: "Des oreilles. Grandes. Voilà.",
      imagePos: "34% 47%", 
      imageScale: "400%", // Zoom sur oreille gauche
      price: "2,99 €"
    },
    {
      id: 4,
      pinned: false,
      time: "hier",
      likes: "3 likes",
      comments: 1,
      beforeText: "Pieds 🦶 (contenu premium)",
      afterText: "Des chaussures. Je t'avais prévenu.",
      imagePos: "50% 92%", 
      imageScale: "250%", // Zoom sur chaussures
      price: "14,99 €"
    },
    {
      id: 5,
      pinned: false,
      time: "hier",
      likes: "1 like",
      comments: 0,
      beforeText: "Moi qui fais ✌️ pour attirer une naine (ça marche pas)",
      afterText: "Une main. Qui fait ✌️. Y'a pas de piège.",
      imagePos: "78% 47%", 
      imageScale: "450%", // Zoom sur main ✌️
      price: "4,99 €"
    },
    {
      id: 6,
      pinned: false,
      time: "il y a 2 jours",
      likes: "0 like",
      comments: 0,
      beforeText: "Vue de dessous (ma mère s'est allongée par terre)",
      afterText: "Le dessous d'un cône. Il y a rien dedans.",
      imagePos: "50% 71%", 
      imageScale: "300%", // Zoom sur base
      price: "9,99 €"
    },
    {
      id: 7,
      pinned: false,
      time: "il y a 3 jours",
      likes: "2 likes",
      comments: 0,
      beforeText: "3 h du mat, je cherche une naine sur Google Maps",
      afterText: "Mes cheveux à 3 h du mat. Sans commentaire.",
      imagePos: "49% 32%", 
      imageScale: "400%", // Zoom sur cheveux
      price: "1,99 €"
    },
    {
      id: 8,
      pinned: false,
      time: "il y a 1 sem",
      likes: "1 like",
      comments: 0,
      isTextOnly: true,
      beforeText: "💌 Message privé d'Alec",
      afterText: "\"Salut.\"\n— Alec (il t'a fait payer pour ça)",
      imagePos: "center",
      imageScale: "cover",
      price: "24,99 €"
    }
  ],

  // Les avis
  reviews: [
    { stars: 5, text: "J'ai payé 0 € et j'ai quand même été déçu.", author: "Kevin, 42 ans" },
    { stars: 1, text: "Je cherchais des photos. J'ai trouvé un cône.", author: "Sandrine" },
    { stars: 5, text: "Alec, rends-moi mes pâtes.", author: "Jean-Michel" },
    { stars: 5, text: "À quand le feat avec Mathieu ?", author: "Selena" }
  ],

  // Toasts aléatoires
  toasts: [
    "🔔 Jean-Michel vient de s'abonner (0 €)",
    "🔔 Alec a liké sa propre photo",
    "🔔 Sandrine a quitté la page (choquée)",
    "🔔 Ta mère te suggère de fermer cet onglet",
    "🔔 Un paiement de 69,99 € a presque été initié",
    "🔔 Alec est en train de taper..."
  ]
};
