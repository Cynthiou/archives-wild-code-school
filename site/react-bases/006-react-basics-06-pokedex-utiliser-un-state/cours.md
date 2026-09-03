## Objectifs

- Comprendre la notion de state dans React
- Apprendre à utiliser un state dans un composant.

## Pré-requis

````stepper
# Valider les quêtes suivantes
```quests
2328, 2332, 2336, 2374, 2375
```
````

## Introduction

Dans les quêtes précédentes, nous avons vu comment créer des composants, utiliser les props et les typer avec Typescript. 

Nous allons maintenant découvrir ce qu'est le state dans React.

![](images/001-introduction.jpg)

## Sommaire

## Le state

Nous avons vu au travers des quêtes précédentes comment récupérer des valeurs venant de l'extérieur d'un composant grâce aux `props`. Nous allons maintenant voir comment gérer des valeurs dynamiques à l'intérieur d'un composant grâce au state.

Dans React, un "state" est géré avec des fonctions de type "hook" : ce sont des fonctions dont le nom commence par `use`. Dans le cas d'un state, tu vas "prévenir" React que tu veux utiliser un état à l'intérieur de ton composant avec le hook `useState` (littéralement, "utiliser un état"). Comment ça se présente ?

Regardons déjà ce que nous retourne ce fameux hook `useState` :

```jsx console
import { useState } from "react";

function App() {
  const state = useState("hello");

  console.log(state)

  return <p>Hello world !</p>;
}

export default App;
```

Tu peux voir que `useState` te renvoie un tableau avec deux éléments : le premier est une valeur, et le second est une fonction `dispatchSetState`. 

Le premier élément de ce tableau est en fait la valeur dynamique que nous voulons manipuler dans notre composant : cela pourrait être un état coché/décoché par exemple. La chaine de caractères `"hello"` en pramètre du `useState` est la valeur initiale : vois ça comme la valeur par défaut d'une case à cocher.

Le second élément est une fonction qui va te permettre de mettre à jour la première valeur qui représente le state.

```alert-error
Pour modifier la valeur d'un state tu dois **toujours** utiliser la fonction prévue à cet effet.
```

Tu peux récupérer ces 2 éléments du tableau retourné par `useState` dans des variables pour plus de lisibilité :

```jsx:4
  const state = useState("hello");
  const message = state[0];
  const setMessage = state[1];
```

Pour aller plus vite, l'usage dans React est d'utiliser cette écriture avec une destructuration du tableau :

```jsx:4
  const [message, setMessage] = useState("hello");
```

```xtext arrow
Par convention, tu dois nommer le "setter" d'un state par le nom de la variable précédé du mot *set* : si le state est stocké dans une variable `message`, alors tu dois nommer le setter `setMessage`.
```

Un autre exemple avec un état "compteur" (`count` : valeur initiale : `0`) :

```jsx console
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  console.log(count);

  return <p>Hello world !</p>;
}

export default App;
```

Dans la suite de cette quête, nous allons utiliser cet exemple pour compter un nombre de clics.

### Comment utiliser le state ?

Avant de commencer, nous allons utiliser une notion que nous verrons plus en détail dans la suite du parcours : les **event listeners**.

En React pour placer un **event listener** sur un bouton par exemple, tu peux procéder comme suit :

```jsx console
function App() {
  const handleClick = () => {
    console.log("you clicked");
  };

  return <button type="button" onClick={handleClick}>Click</button>;
}

export default App;
```

Comme tu peux le voir, nous avons placé un attribut `onClick` sur le `button` rendu par notre JSX. À cet attribut `onClick`, nous avons assigné un callback (une fonction de rappel) qui est exécuté quand un clic est déclenché sur le boutton.

Ici, `handleClick` est un gestionnaire d'évènements. Les fonctions de gestion d'évènements :

- Doivent être définies à l'intérieur des composants si elles utilisent un ou plusieurs setters de state.
- Par convention, elles ont un nom qui commence par `handle`, suivi du nom de l'événement.

Tu verras ainsi souvent `onClick={handleClick}`, `onMouseEnter={handleMouseEnter}`, etc.

Si tu transposes ça à du JavaScript vanilla, cela revient exactement au même de faire :

```js console
const btn = document.createElement("button");

btn.textContent = "Click";

const handleClick = () => {
  console.log("you clicked");
};

btn.addEventListener("click", handleClick);

document.body.appendChild(btn);
```

```alert warning
Les fonctions transmises aux gestionnaires d'événements doivent être transmises et non appelées. Concrètement :

- le passage d'une fonction est correct : `<button onClick={handleClick}>`
- l'appel d'une fonction est incorrect : `<button onClick={handleClick()}>`

La différence est subtile. Dans le premier exemple, la fonction `handleClick` est transmise en tant que gestionnaire d'évènement. Cela indique à React de s'en souvenir et de n'appeler notre fonction que lorsque l'utilisateur clique sur le bouton (`onClick`).

Dans le deuxième exemple, les parenthèses `()` à la fin de `handleClick()` lance la fonction immédiatement pendant le rendu, sans aucun clic.
```

Quand ta fonction de gestion d'évenements est courte, une option est de la passer directement sans déclarer de variable `handleClick` :

```jsx console
function App() {
  return <button type="button" onClick={() => console.log("you clicked")}>Click</button>;
}

export default App;
```

C'est aussi très pratique quand tu as plusieurs boutons, chacun avec un comportement spécifique :

```jsx console
function App() {
  return (
    <>
      <button type="button" onClick={() => console.log("you clicked here")}>
        Click here
      </button>
      <button type="button" onClick={() => console.log("you clicked there")}>
        Click there
      </button>
    </>
  );
}

export default App;
```

Revenons-en maintenant au **state**.

Si nous souhaitons modifier le state d'un composant, nous pouvons le faire suite à une action de l'utilisateur. Par exemple :

```jsx console
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click
      </button>
    </div>
  );
}

export default App;
```

Dans cet exemple, lorsque tu cliques sur le bouton, le compteur est incrémenté de 1. Et... L'affichage se met automatiquement à jour !

```xtext arrow
C'est là tout l'intérêt du state : lorsque tu modifies un state avec son *setter*, alors ton composant est rendu à nouveau : tout le code qui se trouve à l'intérieur est re-exécuté et l'affichage est mis à jour avec le nouveau JSX retourné.
```

### Primitive / Non Primitive

Nous avons vu précédemment comment mettre à jour un state avec des valeurs primitives (des nombres). Qu'en-est-il des valeurs non primitives comme les *objets* ?

Eh bien souviens-toi qu'une variable ne contient pas réellement l'objet, mais plutôt une référence vers celui-ci. Nous devons donc produire un nouvel objet pour rendre la modification "visible", comme suit :

```jsx console
import { useState } from "react";

function App() {
  const [user, setUser] = useState({ name: "Bob" });

  const handleClick = () => {
    // user.name = "Alice"; => NO !!!
    setUser({ name: "Alice" });
  };

  return (
    <div>
      <p>{user.name}</p>
      <button type="button" onClick={handleClick}>
        Click
      </button>
    </div>
  );
}

export default App;
```

Avec la syntaxe directe, sans variable `handleClick` :

```jsx console
import { useState } from "react";

function App() {
  const [user, setUser] = useState({ name: "Bob" });

  return (
    <div>
      <p>{user.name}</p>
      <button type="button" onClick={() => setUser({ name: "Alice" })}>
        Click
      </button>
    </div>
  );
}

export default App;
```

```alert-warning
**Important !**

Pour modifier la valeur d'un state, tu dois toujours utiliser le setter de ce state.
```

```resource
https://react.dev/learn/managing-state
N'hésite pas à aller voir la documentation officielle qui regorge d'exemples et d'explications détaillées sur tout ce que tu as vu jusque là.
```

```resource
https://react.dev/reference/react/useState
Regarde aussi la partie sur le hook lui-même 😉
```

## Challenge

Dans ce challenge, tu vas mettre en place un state `pokemonName` dans `App` et ajouter des boutons pour changer le Pokémon affiché.

````stepper nonLinear
# Crée une nouvelle branche

Ouvre ton projet existant et crée une nouvelle branche appelée `state.1`. Cette branche sera utilisée pour développer les fonctionnalités liées à la gestion de l'état (state). Assure-toi de partir de la branche `props.2`.

# Crée un state pokemonName

Dans le composant `App`, crée un state `pokemonName` en utilisant un état (useState). Initialise ce state à `"bulbasaur"`.

# Affiche en fonction du state

Ajuste le code pour que le pokémon passé en prop à `PokemonCard` soit celui qui porte le nom `pokemonName` :

```jsx
import { useState } from "react";
import "./App.css";

import PokemonCard from "./components/PokemonCard";

const pokemonList = [/* ... */];

function App() {
  const [pokemonName, setPokemonName] = useState("bulbasaur");

  const pokemon = pokemonList.find((pokemon) => pokemon.name === pokemonName);

  if (pokemon == null) {
    throw new Error("Invalid pokemon name");
  }

  return (
    <div>
      <PokemonCard pokemon={pokemon} />
    </div>
  );
}

export default App;
```

```xtext arrow
Dans ce code :

* La méthode [.find()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find) permet de fouiller le tableau `pokemonList` pour trouver celui qui matche avec le critère `pokemon.name === pokemonName` : littéralement, le pokemon dans `pokemonList` dont le `name` est égal à la valeur du state `pokemonName`.
* La méthode `.find()̀  peut renvoyer une valeur vide si aucun élément du tableau ne correspond : c'est la raison d'être du `if` qui génère une erreur avec `throw new Error("Invalid pokemon name")`. Cette partie est surtout pour satisfaire l'exigence de TypeScript.
```

# Ajoute un bouton par pokémon

Dans le composant `App`, ajoute deux boutons, l'un avec le texte "bulbisaur" et l'autre avec le texte "mew". Ces boutons serviront à naviguer entre les Pokémons.

# Mets à jour le state

À l'aide des fonctions de gestion d'événements (`onClick`), associe des fonctions pour mettre à jour le state `pokemonName` au clic sur les boutons "bulbasaur" et "mew". Chacun de tes boutons a un comportement spécifique : ne crée pas de fonction `handleClick`, mais utilise la syntaxe directe `onClick={() => setPokemonName(...)}`.
````

Assure-toi que les boutons fonctionnent correctement et mettent à jour le Pokémon affiché en fonction de `pokemonName`.

Fournis le lien vers la branche `state.1` de ton dépôt GitHub pour valider cette étape.

### Critères de validation

* Le composant `App` affiche des boutons "bulbasaur" et "mew".
* Les boutons "bulbasaur" et "mew" permettent de choisir le pokémon affiché.
* Le pokémon choisi s'affiche correctement.

Ce que tu devrais avoir dans :

````tabs files
!--- App.tsx
```jsx
import { useState } from "react";
import "./App.css";

import PokemonCard from "./components/PokemonCard";

const pokemonList = [
  {
    name: "bulbasaur",
    imgSrc:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    name: "mew",
  },
];

function App() {
  const [pokemonName, setPokemonName] = useState("bulbasaur");

  const pokemon = pokemonList.find((pokemon) => pokemon.name === pokemonName);

  if (pokemon == null) {
    throw new Error("Invalid pokemon name");
  }

  return (
    <div>
      <nav>
        <button type="button" onClick={() => setPokemonName("bulbasaur")}>
          bulbasaur
        </button>
        <button type="button" onClick={() => setPokemonName("mew")}>
          mew
        </button>
      </nav>
      <PokemonCard pokemon={pokemon} />
    </div>
  );
}

export default App;
```
````