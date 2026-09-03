#### Introduction

Dans la quête précédente, tu as vu les concepts de composants *Contrôlés* et *Non contrôlés*.

Nous allons poursuivre en voyant comment nous pouvons utiliser ces concepts avec des données dynamiques que nous recevons de l'entrée du formulaire.

Allons-y ! 🚀

![image](https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1274&q=80)

#### 🤓 À la fin de cette quête, tu seras en mesure de :

✅ Mettre à jour le state de ton composant en fonction de ce qui est saisi dans un formulaire par l'utilisateur.

### Changer la valeur dans le state

Commençons par un exemple avec une liste de composants et un formulaire :

```jsx console
!--- App.js
import QuoteList from "./components/QuoteList";
import QuoteForm from "./components/QuoteForm";

function App() {
  return (
    <main className="App">
      <QuoteForm />
      <QuoteList />
    </main>
  );
}

export default App;
!--- components/QuoteForm.js
import { useState } from "react";

import "./QuoteForm.css";

function QuoteForm() {
  const [character, setCharacter] = useState("Homer Simpson");

  return (
    <form className="QuoteForm" onSubmit={event => event.preventDefault()}>
      <label htmlFor="character">Character:</label>
      <input
        id="name"
        name="character"
        type="text"
        value={character}
        onChange={event => {
          const input = event.target;
          console.log("NAME:", input.name, "VALUE:", input.value);
        }}
      />
    </form>
  );
}

export default QuoteForm;
!--- components/QuoteForm.css
.QuoteForm {
  padding: 1.25em;
  width: 450px;
  font-size: 1.2em;
  padding-left: calc(40px + 1em);
  margin-top: 1rem;
}

.QuoteForm h3 {
  margin: 0 0 0.5rem 0;
}

.QuoteForm label,
.QuoteForm input,
.QuoteForm textarea {
  display: block;
}

.QuoteForm label {
  font-size: 0.925rem;
}

.QuoteForm input,
.QuoteForm textarea {
  margin-bottom: 1em;
  width: 90%;
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.QuoteForm button {
  background: #554478;
  border: 1px solid #554478;
  border-radius: 3px;
  color: #fff;
  font-size: 1rem;
}
!--- components/QuoteList.js
import QuoteCard from "./QuoteCard";

// An array of objects
const quotes = [
  {
    quote:
      "Facts are meaningless. You could use facts to prove anything that's even remotely true.",
    character: "Homer Simpson",
    image:
      "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939"
  },
  {
    quote: "Nothing you say can upset us. We're the MTV generation.",
    character: "Bart Simpson",
    image:
      "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FBartSimpson.png?1497567511638"
  },
  {
    quote: "That's where I saw the leprechaun...He told me to burn things.",
    character: "Ralph Wiggum",
    image:
      "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FRalphWiggum.png?1497567511523"
  },
  {
    quote:
      "Hello, Simpson. I'm riding the bus today because Mother hid my car keys to punish me for talking to a woman on the phone. She was right to do it.",
    character: "Principal Skinner",
    image:
      "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FSeymourSkinner.png?1497567511460"
  }
];

function QuoteList() {
  return (
    <>
      {quotes.map(item => (
        <QuoteCard
          key={item.quote}
          quote={item.quote}
          image={item.image}
          character={item.character}
        />
      ))}
    </>
  );
}

export default QuoteList;
!--- components/QuoteCard.js
import { useState } from "react";

import "./QuoteCard.css";

function QuoteCard({ image, quote, character }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <figure className="QuoteCard">
      <img src={image} alt={character} />
      <figcaption>
        <blockquote>{quote}</blockquote>
        <p>
          <cite>{character}</cite>
          <button
            className={favorite ? "is-favorite" : ""}
            onClick={event => {
              const newFavorite = !favorite;
              setFavorite(newFavorite);
            }}
          >
            &#9733;
          </button>
        </p>
      </figcaption>
    </figure>
  );
}

export default QuoteCard;
!--- components/QuoteCard.css
.QuoteCard {
  display: flex;
  padding: 1.25em;
  width: 400px;
  border: 1px solid #f8f8f8;
  border-radius: 2px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  font-size: 1.2em;
}

.QuoteCard figcaption {
  width: 100%;
}

.QuoteCard img {
  display: flex;
  max-height: 120px;
  margin-right: 1.5rem;
}

.QuoteCard blockquote {
  margin: 0 0 1rem 0;
}

.QuoteCard figcaption p {
  margin: 0.125rem 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.QuoteCard figcaption p button {
  color: #eee;
}

.QuoteCard figcaption p button.is-favorite {
  color: #ecc94b;
}
```

Dans cet exemple, nous avons un formulaire de base avec un input dans le fichier `QuoteForm.js`.

Comme tu peux le voir, nous créons un state spécifique `character` que nous utilisons comme value pour notre input : tu peux également remarquer que nous utilisons `event.preventDefault` lorsque le formulaire est soumis.

Par défaut, lorsqu'un utilisateur soumet un formulaire (en appuyant sur la touche entrée par exemple), la page se recharge. En utilisant `event.preventDefault`, nous empêchons que cela se produise.

Jusqu'à présent, l'input est inutile, car, comme tu l'as peut-être remarqué, rien ne se passe si tu essayes de taper quelque chose dedans.

Maintenant que la valeur provient du state, tu dois changer cette valeur lorsque l'événement `change` sera émis et détecté via `onChange`.

Afin de récupérer l'événement, nous allons devoir modifier notre *event listener* (ou *event handler* : gestionnaire d'événement), qui pour l'instant ne fait qu'un affichage dans la console. Voici son code actuel (on met juste ce qui est envoyé par `onChange`) :

```javascript
(event) => {
  const input = event.target;
  console.log("NAME:", input.name, "VALUE:", input.value);
}
```

Essaye de modifier le code de la sandbox précédente de façon à ce que l'état change lorsque l'utilisateur saisi quelque chose dans l'input. 

De même, si tu souhaites que l'entrée soit initialisée avec une chaîne vide, tu peux écraser la valeur initiale `"Homer Simpson"` avec une chaîne de caractères vide afin que l'input soit vide au chargement du composant.

````solution
```jsx
function QuoteForm() {
  const [character, setCharacter] = useState("");

  return (
    <form className="QuoteForm" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="character">Character:</label>
      <input
        id="name"
        name="character"
        type="text"
        value={character}
        onChange={(event) => {
          const input = event.target;
          setCharacter(input.value);
        }}
      />
    </form>
  );
}
```
````

Après ces modifications, ton champ `input` réagit enfin à la saisie de l'utilisateur !

En résumé, le composant contrôlé fonctionne selon un cycle qui peut être illustré comme suit :

![image](https://storage.googleapis.com/quest_editor_uploads/fwUD02xUCVZQBayJsrpkPFhqZidSGofS.svg)

* La `value` du champ est définie par une valeur provenant du state du composant.
* Lorsqu'une modification est effectuée dans le champ, elle est prise en compte pour modifier la valeur du state.

### Le gestionnaire d'événements dans des fonctions

Dans les projets React, tu verras qu'écrire l'*event listener* à l'intérieur des accolades derrière `onChange` a tendance à rendre notre code moins lisible, d'autant plus que les *event listeners* contiennent souvent plus de lignes que cet exemple.

C'est pourquoi ils sont souvent écrits dans des fonctions séparées...

```jsx
function QuoteForm() {
  const [character, setCharacter] = useState("");

  // We move the code outside of the onChange and onSubmit into separate function for better readability 
  const handleSubmit = (event) => event.preventDefault();

  const handleChange = (event) => {
    setCharacter(event.target.value);
  };

  return (
    <form className="QuoteForm" onSubmit={handleSubmit}>
      <label htmlFor="character">Character:</label>
      <input
        id="name"
        name="character"
        type="text"
        value={character}
        onChange={handleChange}
      />
    </form>
  );
}
```

### Dernière étape

Dernière étape ! Maintenant que tu as déplacé le code des *event listenenrs* hors du JSX, tu seras plus à l'aise pour enrichir leur code.

#### Limitation de la saisie à 30 caractères

Pour faire quelque chose dans l'esprit du formulaire d'inscription de GitHub, ou du champ de saisie d'un tweet de Twitter, nous allons limiter la saisie dans l'`input` à 30 caractères, et afficher un indicateur, permettant à l'utilisateur de savoir combien de caractères supplémentaires peuvent être tapés.

Afin de pouvoir récupérer facilement la longueur maximale, déclare-la comme une constante, juste au-dessus de la déclaration de la fonction `QuoteForm` :

```javascript
const MAX_LENGTH = 30; // Feel free to change the value
```

Dans l'*event listener*, si le nombre maximal de caractères a déjà été atteint, nous ignorons toutes les nouvelles entrées.

Comment y parvenir ? Eh bien, il y a plus d'une façon de le faire.

Mais voici probablement le moyen le plus simple :

* Dans la fonction `handleChange`, vérifier la nouvelle valeur en utilisant `event.target.value`.
* Si la longueur de la nouvelle valeur est inférieure à la longueur maximale, stocker la valeur dans le state.
* Sinon, ne rien faire !

Essaye de mettre cela en œuvre par toi-même !

```hidden
Montrer la solution|||javascript|||Des problèmes de compréhension ?|||0|||Cacher
const handleChange = (event) => {
  if (event.target.value.length <= MAX_LENGTH) {
    setCharacter(event.target.value);
  }
};
```

#### Ajout d'un repère visuel

En plus d'empêcher la poursuite de la saisie au-delà d'un seuil maximal, deux indicateurs visuels peuvent être ajoutés :

* une classe CSS pour entourer le champ d'une bordure verte ou rouge, selon que le maximum est atteint ou non.
* un texte "nombre de caractères restants" sous le champ.

Dans le premier cas, nous devrons vérifier la même condition que dans l'écouteur d'événements : le maximum a-t-il été atteint ? 
En fonction de la réponse, une classe ou une autre sera attribuée à l'attribut `className` de la balise `<input>`. 

C'est encore le rendu conditionnel ! Les classes à appliquer sont `length-ok` (moins que la longueur maximale) et `length-maximum-reached` (dans l'autre cas).

Dans le second cas, nous pourrons calculer la différence entre `MAX_LENGTH` et la longueur de la chaîne `character` stockée dans le state , et nous pourrons afficher cette valeur :`caractères restants`.

Encore une fois, nous te laissons y réfléchir. Essaye de le faire toi-même avant de vérifier la solution.

````solution
```jsx
const MAX_LENGTH = 30; // Feel free to change the value

function QuoteForm() {
  const [character, setCharacter] = useState("");

  const handleSubmit = (event) => event.preventDefault();

  const handleChange = (event) => {
    if (event.target.value.length <= MAX_LENGTH) {
      setCharacter(event.target.value);
    }
  };

  // SOLUTION for conditional border color : compute a BOOLEAN
  // telling if we've reached the maximum, and use it in the input's className
  const maximumReached = character.length >= MAX_LENGTH;

  // SOLUTION for displaying the number of remaining characters :
  // we compute it here and use it below
  const numRemaining = MAX_LENGTH - character.length;

  return (
    <form className="QuoteForm" onSubmit={handleSubmit}>
      <label htmlFor="character">Character:</label>
      <input
        className={maximumReached ? "length-maximum-reached" : "length-ok"}
        id="name"
        name="character"
        type="text"
        value={character}
        onChange={handleChange}
      />
      <small className="remaining-characters">
        {numRemaining} remaining characters
      </small>
    </form>
  );
}
```
````

Une démo du code final :

```jsx render
!--- App.js
import QuoteList from "./components/QuoteList";
import QuoteForm from "./components/QuoteForm";

function App() {
  return (
    <main className="App">
      <QuoteForm />
      <QuoteList />
    </main>
  );
}

export default App;
!--- components/QuoteForm.js
import { useState } from "react";

import "./QuoteForm.css";

const MAX_LENGTH = 30; // Feel free to change the value

function QuoteForm() {
  const [character, setCharacter] = useState("");

  const handleSubmit = event => event.preventDefault();

  const handleChange = event => {
    if (event.target.value.length <= MAX_LENGTH) {
      setCharacter(event.target.value);
    }
  };

  // SOLUTION for conditional border color : compute a BOOLEAN
  // telling if we've reached the maximum, and use it in the input's className
  const maximumReached = character.length >= MAX_LENGTH;

  // SOLUTION for displaying the number of remaining characters :
  // we compute it here and use it below
  const numRemaining = MAX_LENGTH - character.length;

  return (
    <form className="QuoteForm" onSubmit={handleSubmit}>
      <label htmlFor="character">Character:</label>
      <input
        className={maximumReached ? "length-maximum-reached" : "length-ok"}
        id="name"
        name="character"
        type="text"
        value={character}
        onChange={handleChange}
      />
      <small className="remaining-characters">
        {numRemaining} remaining characters
      </small>
    </form>
  );
}

export default QuoteForm;
!--- components/QuoteForm.css
.QuoteForm {
  padding: 1.25em;
  width: 450px;
  font-size: 1.2em;
  padding-left: calc(40px + 1em);
  margin-top: 1rem;
}

.QuoteForm h3 {
  margin: 0 0 0.5rem 0;
}

.QuoteForm label,
.QuoteForm input,
.QuoteForm textarea {
  display: block;
}

.QuoteForm label {
  font-size: 0.925rem;
}

.QuoteForm input,
.QuoteForm textarea {
  margin-bottom: 1em;
  width: 90%;
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.QuoteForm button {
  background: #554478;
  border: 1px solid #554478;
  border-radius: 3px;
  color: #fff;
  font-size: 1rem;
}

.QuoteForm .length-ok {
  border: 1px solid #9ae6b4;
}

.QuoteForm .length-maximum-reached {
  border: 1px solid #fc8181;
}

.QuoteForm .remaining-characters {
  color: #555;
}
!--- components/QuoteList.js
import QuoteCard from "./QuoteCard";

// An array of objects
const quotes = [
  {
    quote:
      "Facts are meaningless. You could use facts to prove anything that's even remotely true.",
    character: "Homer Simpson",
    image:
      "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939"
  },
  {
    quote: "Nothing you say can upset us. We're the MTV generation.",
    character: "Bart Simpson",
    image:
      "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FBartSimpson.png?1497567511638"
  },
  {
    quote: "That's where I saw the leprechaun...He told me to burn things.",
    character: "Ralph Wiggum",
    image:
      "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FRalphWiggum.png?1497567511523"
  },
  {
    quote:
      "Hello, Simpson. I'm riding the bus today because Mother hid my car keys to punish me for talking to a woman on the phone. She was right to do it.",
    character: "Principal Skinner",
    image:
      "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FSeymourSkinner.png?1497567511460"
  }
];

function QuoteList() {
  return (
    <>
      {quotes.map(item => (
        <QuoteCard
          key={item.quote}
          quote={item.quote}
          image={item.image}
          character={item.character}
        />
      ))}
    </>
  );
}

export default QuoteList;
!--- components/QuoteCard.js
import { useState } from "react";

import "./QuoteCard.css";

function QuoteCard({ image, quote, character }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <figure className="QuoteCard">
      <img src={image} alt={character} />
      <figcaption>
        <blockquote>{quote}</blockquote>
        <p>
          <cite>{character}</cite>
          <button
            className={favorite ? "is-favorite" : ""}
            onClick={event => {
              const newFavorite = !favorite;
              setFavorite(newFavorite);
            }}
          >
            &#9733;
          </button>
        </p>
      </figcaption>
    </figure>
  );
}

export default QuoteCard;
!--- components/QuoteCard.css
.QuoteCard {
  display: flex;
  padding: 1.25em;
  width: 400px;
  border: 1px solid #f8f8f8;
  border-radius: 2px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  font-size: 1.2em;
}

.QuoteCard figcaption {
  width: 100%;
}

.QuoteCard img {
  display: flex;
  max-height: 120px;
  margin-right: 1.5rem;
}

.QuoteCard blockquote {
  margin: 0 0 1rem 0;
}

.QuoteCard figcaption p {
  margin: 0.125rem 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.QuoteCard figcaption p button {
  color: #eee;
}

.QuoteCard figcaption p button.is-favorite {
  color: #ecc94b;
}
```

# 💪 Challenge

### Synchronisation de l'affichage avec l'input

Tu vas construire un formulaire qui affichera le contenu saisi dans l'input, à l'intérieur d'un élément `<h1>`.

* Pour soumettre ce défi, tu dois faire un fork de ce template :

```jsx live
!--- App.js
import MyTitleForm from "./MyTitleForm";

function App() {
  return (
    <main>
      <MyTitleForm />
    </main>
  );
}

export default App;
!--- MyTitleForm.js
import { useState } from "react";

function MyTitleForm() {
  const [title, setTitle] = useState("Awesome Title");

  return (
    <header>
      <h1>Bad Title</h1>
      <label htmlFor="title">Title :</label>
      <input id="title" type="text" />
    </header>
  );
}

export default MyTitleForm;
```

* Ajoute ton code au fichier correspondant, afin que la saisie des entrées de l'utilisateur soient affichées à la fois dans l'input et dans le `<h1>`.
* Inspire toi de l'approche détaillée dans cette quête pour transformer le composant non contrôlé en composant contrôlé.
* Transforme la valeur saisie par l'utilisateur, en la traitant pour ignorer le caractère `*`. Tu peux t'inspirer de la façon dont nous avons ignoré les entrées de l'utilisateur au-delà de la longueur maximale, dans le dernier exemple.
* [Ceci](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) s'avérera utile, afin de décider si tu dois modifier le state.
* Poste le lien vers ton fork pour valider ta quête.

# 🧐 Critères de validation

* [ ] Le lien fourni pointe vers ton fork du template.
* [ ] Le champ `<h1>` doit changer en même temps que la valeur dans le `<input>`.
* [ ] La valeur du `<input>` n'est pas fixe et provient du *state*.
* [ ] La valeur de l'`<input>` est mise à jour en utilisant un gestionnaire d'événement associé à `onChange`.
* [ ] Le caractère "*" n'est pas affiché lorsqu'il est saisi.