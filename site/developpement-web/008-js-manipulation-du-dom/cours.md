## Objectifs

* Découvrir le DOM
* Rendre une page web dynamique en JS
* Utiliser des fonctionnalités avancées de JavaScript

## Pré-requis

````stepper
# Connaitre les bases du langage JavaScript
```javascript
let order = null;
let isConfirmed = false;

while (isConfirmed === false) {
  order = prompt("thé ou café ?");

  isConfirmed = confirm(`confirmer votre commande : ${order}`);
}

alert(`votre ${order} sera prêt dans une minute`);
```
````

## Introduction

Cette quête reprend les bases de la manipulation du DOM (Document Object Model) en JavaScript. La manipulation du DOM est essentielle pour créer des pages web interactives et dynamiques.

Tu vas sélectionner, modifier et gérer les éléments HTML pour enrichir tes compétences en développement web.

## Sommaire

## Manipuler le DOM

La manipulation du DOM est basée sur 3 opérations fondamentales :

* récupérer un élément de la page,
* créer des éléments supplémentaires,
* écouter des éléments pour réagir aux interactions.

Pour en savoir plus, voici des ressources recommandées :

```ressource
https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model/Introduction
Introduction au DOM sur MDN
```

```ressource
https://fr.javascript.info/dom-nodes
Le cours sur le DOM de JavaScript.info
```

Aussi, tu peux explorer chacune de ces opérations avec nos ressources dédiées.

### Récupérer un élément

Pour découvrir le DOM et apprendre à sélectionner en JavaScript, consulte la quête suivante :

```quests
1259
```

### Créer un élément

Apprend à ajouter de nouveaux éléments au DOM grâce à cette quête :

```quests
1554
```

### Écouter un élément

Apprend à gérer les événements en écoutant les interactions des utilisateurs avec les éléments du DOM :

```quests
1555
```

## JS "moderne"

En manipulant le DOM, tu rencontreras des syntaxes modernes de JavaScript qui permettent d'écrire du code plus concis et moins sujet aux erreurs. Voici une introduction à quelques syntaxes couramment utilisées :

### Méthodes fonctionnelles

Les méthodes fonctionnelles comme map, forEach et filter permettent de manipuler les tableaux de manière expressive.

```quests
1589
```

### Destructuration

L'affectation par décomposition, ou destructuration, permet d'extraire des données des tableaux ou des objets de manière concise.

```quests
1830
```

```xtext arrow
Ces syntaxes peuvent paraître déroutantes au début, mais elles deviendront familières avec la pratique et tu les rencontreras souvent dans des exemples de code.
```

## Challenge

Avec la manipulation du DOM, tu peux créer facilement des éléments HTML à partir de données.

Crée un site web pour l'adoption de chats. Voici une base à forker pour t'aider à démarrer :

```js render
!--- index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Adopt a cat</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <header>
      <h1>Adopt a cat!</h1>
    </header>
    <div class="cards">
      <figure class="card">
        <img
          class="card-img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Savannah_Cat_portrait.jpg/160px-Savannah_Cat_portrait.jpg"
        />
        <figcaption class="card-body">
          <h2 class="card-title">Billy</h2>
          <button class="card-button" onclick="alert('Billy adopted !')">
            Adopt Now
          </button>
        </figcaption>
      </figure>
    </div>
    <script type="module" src="./index.js"></script>
  </body>
</html>

!--- index.js
import "./styles.css";

const cards = document.querySelector(".cards");

const animalsToAdopt = [
  {
    name: "Lucky",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tiffanie_at_cat_show.jpg/199px-Tiffanie_at_cat_show.jpg"
  },
  {
    name: "Symba",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Tiffany4_%282018%3B_cropped_2023%29.jpg/240px-Tiffany4_%282018%3B_cropped_2023%29.jpg"
  },
  {
    name: "Léo",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Norskskogkatt_Evita_3.JPG/245px-Norskskogkatt_Evita_3.JPG"
  },
  {
    name: "Milo",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/CyprusShorthair.jpg/320px-CyprusShorthair.jpg"
  },
  {
    name: "Charly",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Highlander-7.jpg/293px-Highlander-7.jpg"
  }
];

function createCard(animal) {
  const { picture, name } = animal;

  const card = document.createElement("figure");
  card.classList.add("card");
  cards.appendChild(card);

  const cardImg = document.createElement("img");
  cardImg.src = picture;
  cardImg.alt = name;
  cardImg.classList.add("card-img");
  card.appendChild(cardImg);

  // Step2:

  // Create the cardBody (figcaption), add the class card-body and add it to the card

  // Create the cardTitle h2, add the class card-title,
  // set the text inside the tag to the "title" parameter of this function
  // and add it to the cardBody

  // Create the cardButton button, add the class card-button,
  // set the text inside the tag to be "Adopt Now"
  // and add it to the cardBody

  // Step 3: Listen for click events on the cardButton button,
  // and run an alert when the button is clicked
}

/* Step 1: Use forEach instead of for-loop to iterate over animalsToAdopt and create cards */
for (const animal of animalsToAdopt) {
  createCard(animal);
}

!--- styles.css
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  font-family: roboto, sans-serif;
}
h1 {
  padding: 0;
  margin: 0;
}
header {
  display: flex;
  padding: 20px;
  align-items: center;
  background-color: coral;
  height: 100px;
  width: 100%;
}
.cards {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.card {
  border-radius: 10px;
  width: 200px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.card-img {
  border-radius: 10px 10px 0 0;
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1;
}
.card-body {
  padding: 10px 20px;
}
.card-body h2 {
  margin: 10px 0px;
}
.card-button {
  border: none;
  border-radius: 10px;
  height: 50px;
  background-color: lightblue;
  width: 100%;
}
```


````stepper
# Crée une carte pour chaque animal avec forEach

Le code de départ contient une boucle sur `animalsToAdopt` avec une instruction `for...of` pour créer une carte pour chaque élément du tableau :

```javascript
for (const animal of animalsToAdopt) {
  createCard(animal);
}
```

Modifie ce code pour utiliser une syntaxe équivalente avec [la méthode `forEach`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#exemples).

# Complète les cartes avec de nouveaux éléments

Ajoute les éléments suivants :

- `cardBody` : une `<figcaption>` avec la classe `card-body` ajoutée à `card`.
- `cardTitle` : un `<h2>` avec la classe `card-title`, ajoute le `name` passé en paramètre en contenu du h2 (avec `textContent`) et ajoute-le à `cardBody`.
- `cardButton` : un bouton avec la classe `card-button`, le texte `"Adopt Now"` (avec `textContent`) et ajoute-le à `cardBody`.

# Alerte adoption

Utilise `addEventListener` pour écouter l'événement `click` sur `cardButton` et afficher une alerte lorsque le bouton est cliqué.
````

Une fois que tu as terminé, poste le lien de ton fork en solution de cette quête.

### Critères de validation

* [ ] Il y a une carte pour chaque élément du tableau
* [ ] La carte contient tous les éléments
* [ ] Les boutons lancent une alerte au clic

Voici une solution possible :


```js render
!--- index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Adopt a cat</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <header>
      <h1>Adopt a cat!</h1>
    </header>
    <div class="cards">
      <figure class="card">
        <img
          class="card-img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Savannah_Cat_portrait.jpg/160px-Savannah_Cat_portrait.jpg"
        />
        <figcaption class="card-body">
          <h2 class="card-title">Billy</h2>
          <button class="card-button" onclick="alert('Billy adopted !')">
            Adopt Now
          </button>
        </figcaption>
      </figure>
    </div>
    <script type="module" src="./index.js"></script>
  </body>
</html>

!--- index.js
import "./styles.css";

const cards = document.querySelector(".cards");

const animalsToAdopt = [
  {
    name: "Lucky",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tiffanie_at_cat_show.jpg/199px-Tiffanie_at_cat_show.jpg"
  },
  {
    name: "Symba",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Tiffany4_%282018%3B_cropped_2023%29.jpg/240px-Tiffany4_%282018%3B_cropped_2023%29.jpg"
  },
  {
    name: "Léo",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Norskskogkatt_Evita_3.JPG/245px-Norskskogkatt_Evita_3.JPG"
  },
  {
    name: "Milo",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/CyprusShorthair.jpg/320px-CyprusShorthair.jpg"
  },
  {
    name: "Charly",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Highlander-7.jpg/293px-Highlander-7.jpg"
  }
];

function createCard(animal) {
  const { name, picture } = animal;

  const card = document.createElement("figure");
  card.classList.add("card");
  cards.appendChild(card);

  const cardImg = document.createElement("img");
  cardImg.src = picture;
  cardImg.alt = name;
  cardImg.classList.add("card-img");
  card.appendChild(cardImg);

  // Step2:

  // Create the cardBody (figcaption), add the class card-body and add it to the card
  const cardBody = document.createElement("figcaption");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  // Create the cardTitle h2, add the class card-title,
  // set the text inside the tag to the "title" parameter of this function
  // and add it to the cardBody
  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = name;
  cardBody.appendChild(cardTitle);

  // Create the cardButton button, add the class card-button,
  // set the text inside the tag to be "Adopt Now"
  // and add it to the cardBody
  const cardButton = document.createElement("button");
  cardButton.classList.add("card-button");
  cardButton.textContent = "Adopt Now";
  cardBody.appendChild(cardButton);

  // Step 3: Listen for click events on the cardButton button,
  // and run an alert when the button is clicked
  cardButton.addEventListener("click", () => alert(`${name} adopted !`));
}

/* Step 1: Use forEach instead of for-loop to iterate over animalsToAdopt and create cards */
animalsToAdopt.forEach(createCard);

!--- styles.css
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  font-family: roboto, sans-serif;
}
h1 {
  padding: 0;
  margin: 0;
}
header {
  display: flex;
  padding: 20px;
  align-items: center;
  background-color: coral;
  height: 100px;
  width: 100%;
}
.cards {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.card {
  border-radius: 10px;
  width: 200px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.card-img {
  border-radius: 10px 10px 0 0;
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1;
}
.card-body {
  padding: 10px 20px;
}
.card-body h2 {
  margin: 10px 0px;
}
.card-button {
  border: none;
  border-radius: 10px;
  height: 50px;
  background-color: lightblue;
  width: 100%;
}
```