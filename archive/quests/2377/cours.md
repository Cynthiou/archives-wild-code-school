## Objectifs

* Faire communiquer plusieurs composants entre eux avec un même state.

## Pré-requis

````stepper
# Valider les quêtes suivantes
```quests
2328, 2332, 2336, 2374, 2375, 2376, 2378
```
````

## Introduction

Dans les quêtes précédentes, nous avons vu comment utiliser les composants, les props et le state.

![](https://storage.googleapis.com/quest_editor_uploads/agnlSDUTI5eortestGfE8NQxqhrCvdy7.jpg)

## Sommaire

## Un problème de communication.

Prenons comme exemple cette architecture d'application :

![](https://storage.googleapis.com/quest_editor_uploads/VzQSesOtGgbltoQCzEUbRvhivDiA9YC9.jpg)

Ici, nous avons un composant `InputMessage` et un composant `DisplayMessage` affichés dans `App`. Le composant `InputMessage` affiche un input de type text contrôlé par son state `message`.

Tu peux le coder de cette façon :

```jsx live
!--- App.js
import InputMessage from "./InputMessage";
import DisplayMessage from "./DisplayMessage";

function App() {
  return (
    <>
      <InputMessage />
      <DisplayMessage />
    </>
  );
}

export default App;
!--- InputMessage.js
import { useState } from "react";

function InputMessage() {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return <input name="message" onChange={handleChange} />;
}

export default InputMessage;
!--- DisplayMessage.js
function DisplayMessage() {
  return <p></p>
}

export default DisplayMessage;
```

Maintenant, je souhaite afficher le message dans le composant `DisplayMessage` : comment faire ?

## Encore et toujours la hiérarchie !

Afin de faire communiquer entre eux deux composants, tu dois faire remonter le state au premier ancêtre commun !

Explications :

Si tu reprends notre schéma, le state `message` est déclaré dans le composant `InputMessage`. Tu ne peux pas y accéder dans le composant `DisplayMessage`. Pour régler le problème, tu peux faire remonter le state `message` dans le composant `App`, puis faire redescendre le state dans `InputMessage` et dans `DisplayMessage` grâce aux props.

![](https://storage.googleapis.com/quest_editor_uploads/9QwhajnaDSXvmCbjiw0ZgA7UG5B0ASR3.jpg)

Tu connais déjà le `state`. Tu connais également les `props`. Combine les deux afin de régler notre problème :

```jsx live
!--- App.js
import { useState } from "react";

import InputMessage from "./InputMessage";
import DisplayMessage from "./DisplayMessage";

function App() {
  const [message, setMessage] = useState("");

  return (
    <>
      <InputMessage setMessage={setMessage} />
      <DisplayMessage message={message} />
    </>
  );
}

export default App;
!--- InputMessage.js
function InputMessage({ setMessage }) {
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return <input name="message" onChange={handleChange} />;
}

export default InputMessage;
!--- DisplayMessage.js
function DisplayMessage({ message }) {
  return <p>{message}</p>
}

export default DisplayMessage;
````

Le state est déclaré dans `App` et partagé avec `InputMessage` et `DisplayMessage` avec des props :

* Nous passons `setMessage` en props au composant `InputMessage` pour lui permettre de modifier le state.
* Nous passons `message` en props au composant `DisplayMessage` pour lui permettre d'afficher la valeur du state.

Tu peux tester par toi-même : si tu modifies le contenu de l'input, alors ces modifications s'afficheront également dans le paragraphe juste en dessous !

## Challenge

Dans ce challenge, tu vas créer un nouveau composant `NavBar` qui contiendra les boutons de navigation et tu partagera le state de ton `App` avec ce composant en utilisant les props.

`````stepper nonLinear
# Crée une nouvelle branche

Ouvre ton projet existant et crée une nouvelle branche appelée `state.2`. Cette branche sera utilisée pour développer les fonctionnalités liées au partage de state. Assure-toi de partir de la branche `rendering-list.1`.

# Crée le composant NavBar

Dans le répertoire `components` de ton projet, crée un nouveau composant appelé `NavBar.tsx`. Ce composant sera responsable de l'affichage des boutons de navigation (mais plus tard : pour le mettre en place, un `hello, world!` fait l'affaire).

```jsx
function NavBar() {
  return <nav>hello, world!</nav>;
}

export default NavBar;
```

Utilise-le dès maintenant dans `App` (n'oublie pas l'import) :

```jsx
function App() {
  const [pokemonName, setPokemonName] = useState("bulbasaur");

  const pokemon = pokemonList.find((pokemon) => pokemon.name === pokemonName);

  if (pokemon == null) {
    throw new Error("Invalid pokemon name");
  }

  return (
    <div>
      <nav>
        {pokemonList.map((onePokemonFromTheList) => (
          <button
            key={onePokemonFromTheList.name}
            type="button"
            onClick={() => setPokemonName(onePokemonFromTheList.name)}
          >
            {onePokemonFromTheList.name}
          </button>
        ))}
      </nav>
      <NavBar />
      <PokemonCard pokemon={pokemon} />
    </div>
  );
}
```

# Déplace les boutons dans NavBar

Copie le bloc `<nav>` avec les boutons depuis le composant `App` et colle-le dans le composant `NavBar`. 

À ce stade, le code de `NavBar` ne peut pas marcher et c'est normal : `pokemonList` et `setPokemonName` ne sont pas définis dans ce composant, mais dans `App`.

# Utilise les props

Dans `NavBar`, ajoute les props nécessaires pour permettre le fonctionnement des boutons. Tu as besoin de recevoir `setPokemonName` et `pokemonList`.

Pour te faire gagner un ~~peu~~ beaucoup de temps, voici les types des props à déclarer dans `NavBar` :

```js
interface Pokemon {
  name: string;
  imgSrc?: string;
}

interface NavBarProps {
  setPokemonName: (name: string) => void;
  pokemonList: Pokemon[];
}
```

Dans `App`, envoie les valeurs à `NavBar` :

```jsx hl[23]
function App() {
  const [pokemonName, setPokemonName] = useState("bulbasaur");

  const pokemon = pokemonList.find((pokemon) => pokemon.name === pokemonName);

  if (pokemon == null) {
    throw new Error("Invalid pokemon name");
  }

  return (
    <div>
      <nav>
        {pokemonList.map((onePokemonFromTheList) => (
          <button
            key={onePokemonFromTheList.name}
            type="button"
            onClick={() => setPokemonName(onePokemonFromTheList.name)}
          >
            {onePokemonFromTheList.name}
          </button>
        ))}
      </nav>
      <NavBar setPokemonName={setPokemonName} pokemonList={pokemonList} />
      <PokemonCard pokemon={pokemon} />
    </div>
  );
}
```

# Supprime les boutons de App

Maintenant que les boutons sont fonctionnels dans `NavBar`, supprime-les du composant `App` :

```jsx
function App() {
  const [pokemonName, setPokemonName] = useState("bulbasaur");

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
```
`````

Assure-toi que les boutons fonctionnent correctement avec le composant `NavBar`.

Fournis le lien vers la branche `state.2` de ton dépôt GitHub pour valider cette étape.

### Critères de validation

* L'application contient un composant `NavBar` qui affiche les boutons de navigation.
* Les boutons sont fonctionnels.

Ce que tu devrais avoir dans :

````tabs files
!--- App.tsx

```jsx
import { useState } from "react";
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
          onClick={() => setPokemonName(onePokemonFromTheList.name)}
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