## Objectifs

* Comprendre ce qu'est un composant React
* Comprendre la hiérarchie des composants
* Apprendre à exporter et importer des composants

## Pré-requis

````stepper
# Valider la quête suivante
```quests
2328
```
````

## Introduction

Dans la quête précédente, nous avons vu comment initialiser une application React.

Nous allons maintenant découvrir ce qu'est un composant, comment le créer et comment l'utiliser.

## Sommaire

## Qu'est-ce qu'un composant ?

Un composant est une partie (un morceau, une brique...) d'une interface utilisateur. Il permet d'isoler cet élément et les interactions éventuelles qui y sont liées (un événement au clic par exemple).

Regarde ce screenshot :

![interface utilisateur avec les composants mis en évidence](https://storage.googleapis.com/quest_editor_uploads/XsimrosrBSFmnjtIPUPEXJjjPXwAYd96.jpg)

Tu peux imaginer certains composants de la page. Par exemple :

* Un composant pour la barre de navigation.
* Un composant pour la partie de droite.
* Un composant pour la partie centrale.
* Un composant pour la partie de gauche.

Si tu regardes chacun de ces "morceaux", tu peux les découper eux-mêmes en sous-composants...

### La hiérarchie des composants

Dans React, les composants forment une hiérarchie. C'est-à-dire que certains composants sont **imbriqués** dans d'autres composants.

Souviens-toi au chapitre précédent : le composant `App` était le composant principal de notre application. C'est en fait le composant racine  : `App` va contenir tous les composants de l'application, et ces composants seront imbriqués dans `App`.

Voici un exemple de hiérarchie de composants :

![App contient des composants qui peuvent contenir leurs propres composants](https://storage.googleapis.com/quest_editor_uploads/7RlehQMHPavmwbeSDJ4KQGh20b8UIs57.png)

Dans cette hiérarchie :

- `App` contient les composants `Header`, `CardList` et `Footer`.
- `CardList` contient plusieurs composants `Card`.

C'est un exemple basique de ce que tu seras amené à voir et réaliser.

```alert-info
Point de vocabulaire : `App` est le composant **parent** de `Header`, `CardList` et `Footer`. Les composants  `Header`, `CardList` et `Footer` sont conséquent des **enfants** de `App`.
```

### Pourquoi utiliser des composants ?

Tu as plusieurs raisons d'utiliser des composants :

- Les composants sont réutilisables et extensibles. Dans notre schéma précédent, nous allons créer une fois le composant `Card` et l'appeler plusieurs fois.
- Le fait de pouvoir découper une interface complexe en composants permet de gagner du temps lors du développement (il est plus facile de répartir des composants à développer entre les membres d'une équipe) et lors des phases de debug (il est plus facile de s'y retrouver dans une architecture de fichiers où tout est bien rangé que dans un immense et unique fichier HTML).
- Lorsque tu as des composants interactifs, le fait qu'ils aient leur propre code JavaScript permet de grandement limiter les bugs éventuels.

```ressource
https://react.dev/learn/thinking-in-react
# Penser en React
Tu trouveras ici un bon résumé sur la démarche de construction avec des composants.
```

### Le JSX

Dans la suite des quêtes, nous allons parler régulièrement de JSX. Qu'est-ce que c'est ? 

Le JSX est un language de balisage qui ressemble au HTML. Tu peux d'ailleurs y utiliser toutes les balises HTML existantes ou presque, ainsi que les attributs qui peuvent compléter ces balises.

Mais attention, **le JSX n'est pas du HTML** et il comporte des différences. Il est impossible d'utiliser des mots-clés réservés de JavaScript dans du JSX comme par exemple l'attribut `class` qui est également le mot-clé qui sert à déclarer une classe en JavaScript.

Le JSX permet d'inclure directement du code JavaScript, pour afficher le contenu d'une variable, rendre une liste d'éléments depuis un tableau, ajouter des conditions, etc.

Enfin, le JSX est ce que va retourner ton composant React.

```ressource
https://react.dev/learn/writing-markup-with-jsx
# Introduction au JSX
Tu trouveras plus de détails ici.
```

```alert-warning
Accorde une attention particulère aux [Règles du JSX](https://react.dev/learn/writing-markup-with-jsx#the-rules-of-jsx)
```

## Bon, et concrètement ?

Ouvre ton projet pokedex dans ton IDE. Commence par nettoyer ton composant `App` en remplaçant le code existant par celui-ci :

```jsx
import "./App.css";

function App() {
  return (
    <section>
      <h1>Hello React</h1>
    </section>
  );
}

export default App;
```

Pour le moment, il affiche uniquement un titre `h1` dans une `section` (lance `npm run dev` pour voir l'application dans ton navigateur). Pour expérimenter, nous pouvons **"exporter"** ce titre sous forme d'un composant dans un fichier à part. Cela nous permettra de l'**importer** pour l'utiliser dans `App` ensuite.

Crée un fichier `MyTitle.tsx` et écris dedans le code suivant pour créer ton composant :

```jsx
function MyTitle() {
  return <h1>Hello React</h1>;
}

export default MyTitle;
```

```alert-info
Dans React, il est impératif d'utiliser le [Pascal case](https://www.theserverside.com/definition/Pascal-case) pour créer tes composants.
```

```alert-info
Une bonne pratique consiste à créer nos composants dans un répertoire `components` dans le dossier `src` du projet.
```

### Vous avez dit import / export ?

Dans l'exemple précédent, tu as déclaré le composant `MyTitle` avec le mot-clé `function`. Puis, tu as exporté ce composant avec les mots-clés `export default`. En faisant cela, tu as rendu disponible le composant `MyTitle` à l'extérieur de ce fichier.

Maintenant si tu souhaites pouvoir utiliser ce composant dans le composant `App`, tu dois importer `MyTile` dans `App` en procédant comme suit :

```jsx
import "./App.css";

import MyTitle from "./components/MyTitle";

function App() {
  return (
    <section>
      <h1>Hello React</h1>
    </section>
  );
}

export default App;
```

Maintenant, tu peux remplacer ton titre `h1` par le composant `MyTitle` que tu viens d'importer :

```jsx
import "./App.css";

import MyTitle from "./components/MyTitle";

function App() {
  return (
    <section>
      <MyTitle />
    </section>
  );
}

export default App;
```

Si tu regardes dans ton navigateur, il n'y a aucune différence. Mais côté développeur, nous venons de créer notre premier composant réutilisable !

## Récapitulatif

- Tu peux découper une interface utilisateur en plusieurs composants.
- Un composant est un bloc réutilisable et extensible.
- Tu peux créer une arborescence de composants potentiellement infinie dont la racine sera toujours `App`.
- Pour pouvoir utiliser tes composants, tu utilises les **imports** et les **exports**.
- Dans du JSX, tu peux appeler un composant par son nom comme si c'était une balise HTML auto-fermante.

## Challenge

Pour cette étape, crée un composant appelé `PokemonCard` qui affiche une carte Pokémon dans ton app React.

````stepper nonLinear
# Crée une nouvelle branche

Tout d'abord, ouvre ton projet créé dans la quête précédente, et crée une nouvelle branche appelée `components.1`. Cette branche servira à développer ton composant `PokemonCard`. Assure-toi de créer la branche à partir de ta branche principale `main`.

# Crée un composant

Dans ton projet, crée un dossier appelé `components` à la racine du dossier `src` (tu l'as peut-être déjà fait). À l'intérieur de ce dossier `components`, crée un fichier nommé `PokemonCard.tsx`.

# Ajoute un contenu à ton composant

Dans le fichier `PokemonCard.tsx`, crée un composant React appelé `PokemonCard`. Ce composant doit contenir une balise `<figure>`.

# Ajoute l'image du Pokémon

À l'intérieur de la balise `<figure>`, ajoute une balise `<img>` avec l'attribut `src` défini sur l'URL suivante : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`. Cette image représente le Pokémon "Bulbasaur".

# Ajoute le nom du Pokémon

Ajoute également une balise `<figcaption>` avec le texte "Bulbasaur". Cela sera le nom du Pokémon affiché sous l'image.

# Affiche ton composant dans App

Dans le fichier `App.tsx`, supprime tout le contenu du composant `App` pour partir d'une fonction "vide" :

```tsx
import './App.css'

function App() {
  return (
    
  );
}

export default App;
```

Ajoute une balise `<div>`. À l'intérieur de cette balise `<div>`, affiche le composant `PokemonCard` que tu viens de créer.
````

Assure-toi que ton composant `PokemonCard` est correctement créé et affiché dans ton application. N'oublie pas de vérifier que ton serveur de développement est toujours lancé, sinon refait un `npm run dev`.

Fournis le lien vers la branche `components.1` de ton dépôt GitHub pour valider cette étape.

### Critères de validation

- Le code est disponible sur GitHub sur une branche `components.1`
- Un composant `PokemonCard` est créé dans le dossier `src/components`.
- Le composant `PokemonCard` est appelé dans le composant `App`.
- Le pokémon s'affiche correctement.

Ce que tu devrais avoir dans :

````tabs files
!--- App.tsx

```jsx
import "./App.css";

import PokemonCard from "./components/PokemonCard";

function App() {
  return (
    <div>
      <PokemonCard />
    </div>
  );
}

export default App;
```

!--- PokemonCard.tsx

```jsx
function PokemonCard() {
  return (
    <figure>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        alt="bulbasaur"
      />
      <figcaption>bulbasaur</figcaption>
    </figure>
  );
}

export default PokemonCard;
```
````