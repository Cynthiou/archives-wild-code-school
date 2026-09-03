## Objectifs

* Implémenter un *event listener* dans React
* Exploiter des événements spécifiques à React

## Pré-requis

````stepper
# Valider les quêtes suivantes
```quests
2328, 2332, 2336, 2374, 2375, 2376, 2378, 1795, 2377
```
````

## Introduction

Précédemment, nous avons abordé la notion d'*event listener*. Nous allons approfondir cette notion dans le cadre spécifique de React.

![](https://storage.googleapis.com/quest_editor_uploads/4zQ719kg2vEQTlGDL2HKfv4fPTU6M9SK.webp)

## Sommaire

## Rappel du DOM
Les événements HTML sont des "choses" qui arrivent aux éléments HTML. Ils sont générés automatiquement par le navigateur pour toutes nos actions (taper du texte, bouger la souris, survoler un élément, en sortir, cliquer sur un bouton...).

```resource
https://www.w3schools.com/tags/ref_eventattributes.asp
Liste non exhaustive d’événements HTML
```

Lorsque tu codes des pages HTML, JavaScript permet de "réagir" à ces événements en les écoutant de manière spécifique. Rappelle-toi... Le fameux :

```js
const doSomething = () => {
  // do something
};

element.addEventListener('click', doSomething)`
```

## Et dans React ?

Dans React, tu dois oublier la méthode `addEventListener` et utiliser les attributs comme `onClick` directement dans les balises :

```jsx
<button onClick={doSomething}>Click Me</button>
```

Dans React, note que la syntaxe des attributs est en camelCase :

* `onclick` => `onClick`
* `onchange` => `onChange`
* `onmouseleave` => `onMouseLeave`
* ...

Un exemple complet :

```jsx render
function Button () {
  const handleClick = () => {
    alert("Yes, you clicked me!");
  };

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}

export default Button;
```

Génial ! tu sais maintenant écouter les actions de tes utilisateurs.

```resource
https://react.dev/learn/responding-to-events#adding-event-handlers
Pour en savoir plus sur la gestion des événements React.
```

Minute... Comment faire si tu veux déclencher quelque chose sans action d'un utilisateur ? Un bandeau cookies par exemple ?

## Des événements spécifiques à React

Pour cela, tu peux utiliser un autre *hook* de React : `useEffect`. Nous allons le découvrir rapidement aujourd'hui et reviendrons plus en profondeur dessus un peu plus tard pour mieux le comprendre...

Pour le moment, retiens sa syntaxe : `useEffect`(`fonction fléchée`, `tableau vide`)

Soit :

```jsx
useEffect(
   () =>  {
     // ton code à exécuter
   }, 
   []
);
```

Par exemple : 

```jsx render, console
import { useEffect } from "react";

function App() {
  useEffect(
    () => {
      console.log("Welcome in this amazing world, this is an automatic message !!!");
    },
    []
  );

  return <p>Hello !</p>;
};

export default App;
```

```resource
https://react.dev/learn/synchronizing-with-effects
Pour en savoir plus, tu peux consulter la doc officielle.
```

## Challenge

Dans ce challenge, tu vas travailler avec les événements de React pour déclencher des [alertes](https://developer.mozilla.org/fr/docs/Web/API/Window/alert) à des moments spécifiques de la vie de ton application.

```stepper nonLinear
# Crée une nouvelle branche

Ouvre ton projet existant et crée une nouvelle branche appelée `events.1`. Cette branche sera utilisée pour développer les fonctionnalités liées aux événements. Assure-toi de partir de la branche `state.2`.

# Ouvre une alerte au démarrage

Dans le composant `App`, ouvre une alerte au "démarrage" de l'application avec le message `"hello pokemon trainer :)"`. Tu peux utiliser le hook `useEffect` ici.

# Ouvre une alerte lors de la sélection de Pikachu

Dans le composant `NavBar`, détecte lorsque le Pokémon sélectionné devient `"pikachu"`. Lorsque cela se produit, ouvre une alerte avec le message `"pika pikachu !!!"`. Tu ne devrais pas utiliser le hook `useEffect` ici (voir ["You Might Not Need an Effect"](https://beta.reactjs.org/learn/you-might-not-need-an-effect)).
```

Vérifie que les alertes s'affichent correctement au démarrage de l'application et lorsque Pikachu est sélectionné dans `NavBar`.

Fournis le lien vers la branche `events.1` de ton dépôt GitHub pour valider cette étape.

### Critères de validation

* L'application ouvre une alerte avec le message `"hello pokemon trainer :)"` au démarrage.
* L'application ouvre une alerte avec le message `"pika pikachu !!!"` quand le pokemon choisi devient `"pikachu"`.

Ce que tu devrais avoir dans :

````tabs files
!--- App.tsx

```jsx
import { useEffect, useState } from "react";
import "./App.css";

import PokemonCard from "./components/PokemonCard";
import NavBar from "./components/NavBar";

const pokemonList = [
  {
    name: "bulbasaur",
    imgSrc:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    name: "charmander",
    imgSrc:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  },
  {
    name: "squirtle",
    imgSrc:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
  },
  {
    name: "pikachu",
    imgSrc:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  },
  {
    name: "mew",
  },
];

function App() {
  const [pokemonName, setPokemonName] = useState("bulbasaur");

  useEffect(() => {
    alert("hello pokemon trainer :)");
  }, []);

  const pokemon = pokemonList.find((pokemon) => pokemon.name === pokemonName);

  if (pokemon == null) {
    throw new Error("Invalid pokemon name");
  }
  return (
    <div>
      <NavBar setPokemonName={setPokemonName} pokemonList={pokemonList} />
      <PokemonCard pokemon={pokemon} />
    </div>
  );
}

export default App;
```

!--- NavBar.tsx

```jsx
interface Pokemon {
  name: string;
  imgSrc?: string;
}

interface NavBarProps {
  setPokemonName: (name: string) => void;
  pokemonList: Pokemon[];
}

function NavBar({ setPokemonName, pokemonList }: NavBarProps) {
  return (
    <nav>
      {pokemonList.map((onePokemonFromTheList) => (
        <button
          key={onePokemonFromTheList.name}
          type="button"
          onClick={() => {
            if (onePokemonFromTheList.name === "pikachu") {
              alert("pika pikachu !!!");
            }
            setPokemonName(onePokemonFromTheList.name);
          }}
        >
          {onePokemonFromTheList.name}
        </button>
      ))}
    </nav>
  );
}

export default NavBar;
```
````