## Objectifs

* Afficher des données dans un composant React
* Afficher/masquer une partie du JSX en fonction d'une condition

## Pré-requis

````stepper
# Valider les quêtes suivantes
```quests
2328, 2332
```
````

## Introduction

Dans la quête précédente, nous avons vu comment créer, exporter et importer un composant.

Nous allons maintenant découvrir comment afficher des données dans un composant et comment afficher ou masquer conditionnellement du JSX.

![](https://storage.googleapis.com/quest_editor_uploads/0n0LKHOvevAuRCOCMxvI993pDI5D7spX.png)

## Sommaire

## Petit retour sur le JSX

Comme nous l'avons dit dans la quête précédente, JSX te permet de mettre du balisage dans du JavaScript. Dans ce balisage, les accolades te permettent de "revenir" en JavaScript afin d'intégrer une variable de ton code et l'afficher :

```jsx live editor
function SayHello() {
  const message = "Hello !";

  return <p>{message}</p>
}

export default SayHello;
```

```alert-warning
Attention, le JSX supporte uniquement l'**affichage des types primitifs** !
```

Tu peux également y *exécuter* du JavaScript :

```jsx live editor
function SayHello() {
  const message = "Hello !";

  return <p>{message.toUpperCase()}</p>
}

export default SayHello;
 ```

Comme tu peux le constater, nous avons mis la chaîne de caractères `message` en majuscules. Cela fonctionne car la méthode [toUpperCase](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) retourne une valeur de type `String` qui est un type primitif.

```alert-warning
Attention, néanmoins, tu ne peux pas exécuter n'importe quel code javascript dans du JSX.
```

```alert info
Ce qui est important de retenir ici c'est que lorsque que tu écris du code JavaScript entre accolades `{}` dans du JSX, celui-ci va être interprété.
```

### Expressions VS Instructions


En JavaScript, tu dois bien distinguer les *expressions* qui retournent une valeur des *instructions* qui peuvent servir à tester des valeurs comme un `if` ou bien à répéter d'autres instructions comme un `for`.

Pour plus de détails, tu peux regarder la vidéo ci-dessous :

```youtube
https://www.youtube.com/watch?v=WVyCrI1cHi8
```

Maintenant que nous distinguons bien la différence entre *expressions* et *instructions*, et bien, tu dois retenir que dans le **JSX**, tu peux uniquement utiliser des **expressions** !

### Démonstration

Prenons un exemple. Si en fonction d'un mot particulier nous souhaitons afficher une icône correspondante dans du JSX nous procéderions comme suit :

```jsx live editor
function WeatherIcon() {
  const weather = "sunny";

  return <p>{weather === "sunny" ? "☀️" : "☁️"}</p>
}

export default WeatherIcon;
```

Ici, nous avons mis une condition grâce à [l'opérateur ternaire](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) qui est une expression JavaScript.
Change la valeur de la variable `weather` (`"rainy"` par exemple) et tu verras apparaitre le nuage à la place du soleil.

Comment faire lorsque nos conditions sont plus complexes ou lorsque nous devons utiliser plusieurs instructions ?

Tu peux créer une fonction qui renvoie une valeur !

```jsx live editor

function WeatherIcon() {
  const weather = "sunny";

  const printIcon = (name) => {
    const weatherMap = {
      sunny: "☀️",
      cloudy: "☁️",
      rainy: "🌧️",
      stormy: "🌩️"
    }
  
    return weatherMap[name]
  }

  return <p>{printIcon(weather)}</p>
}

export default WeatherIcon;
```

Ici, nous avons utilisé une fonction comme expression pour gérer la logique en dehors du JSX. L'appel de fonction `printIcon(weather)` est une expression et retourne une valeur primitive : elle peut être utilisée à l'intérieur du JSX.

Tu peux t'amuser à changer la valeur de la variable `weather` pour voir les icônes changer.

## Challenge

Dans ce challenge, tu vas rendre ton composant `PokemonCard` dynamique en utilisant des données d'une variable plutôt que des données "en dur".

`````stepper nonLinear
# Crée une nouvelle branche

Ouvre ton projet existant et crée une nouvelle branche appelée `components.2`. Cette branche sera utilisée pour développer les fonctionnalités du composant `PokemonCard`. Assure-toi de partir de la branche `components.1`.

# Ajoute des données Pokémon

Dans le fichier `PokemonCard.tsx`, en dehors de la fonction `PokemonCard`, ajoute la déclaration suivante :

```js
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

function PokemonCard() {
  // ...
}

export default PokemonCard;
```

Cette variable `pokemonList` contient des données pour deux Pokémons : "Bulbasaur" et "Mew". "Bulbasaur" a une image définie, tandis que "Mew" n'en a pas.

# Rends le composant dynamique

À l'intérieur de la fonction `PokemonCard`, crée une variable appelée `pokemon` : affecte-lui le premier Pokémon du tableau `pokemonList`.

```js
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

function PokemonCard() {
  const pokemon = pokemonList[0];

  // ...
}

export default PokemonCard;
```

Ensuite, utilise les données de `pokemon` (`pokemon.name` et `pokemon.imgSrc`) pour remplacer les textes et attributs fixes de l'affichage.

Rappelle-toi : tu peux injecter des variables dans un bloc d'affichage JSX avec les accolades `{}`.

```jsx
function SayHello() {
  const message = "Hello !";

  return <p>{message}</p>
}
```

Ici, tu cherches à :

1. Injecter `pokemon.name` dans la `<figcaption>` de ton composant :

```jsx
<figcaption>bulbasaur</figcaption>
```

````solution
```jsx
<figcaption>{pokemon.name}</figcaption>
```
````

2. Injecter `pokemon.imgSrc` dans l'attribut `src` de l'image (et `pokemon.name` dans l'attribut `alt`) :

```jsx
<img
  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
  alt="bulbasaur"
/>
```

````solution
```jsx
<img
  src={pokemon.imgSrc}
  alt={pokemon.name}
/>
```
````

# Gère l'affichage de l'image

Modifie ton code pour afficher l'image du Pokémon seulement si `pokemon.imgSrc` est défini. Si l'image est disponible, utilise une balise `<img>` pour l'afficher. Sinon, affiche un paragraphe `<p>` avec "???" en texte. Utilise l'opérateur ternaire `?:` pour cela.

Une solution partielle pour la mise en place du ternaire :

````solution
```jsx
{/* condition */ ? (
  <img src={...} alt={...} />
) : (
  <p>???</p>
)}
```
````

Des soucis sur la condition ?

````solution
Tu injectes dans le `src` de ta balise `<img>` la variable `pokemon.imgSrc`. Si la valeur de `pokemon` est cet objet :

```js
{
  name: "bulbasaur",
  imgSrc:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
}
```

La valeur de `pokemon.imgSrc` est `"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"`.

 Si la valeur de `pokemon` est cet objet :

```js
{
  name: "mew",
}
```

La valeur de `pokemon.imgSrc` est `undefined` : le pokémon n'a pas de propriété `imgSrc`.

Pour réaliser ta condition, tu dois comparer `pokemon.imgSrc` avec `undefined` :

```jsx
{pokemon.imgSrc !== undefined ? (
  <img src={...} alt={...} />
) : (
  <p>???</p>
)}
```
````

# Change de Pokémon

Modifie le code pour que la variable `pokemon` contienne le deuxième Pokémon du tableau `pokemonList` : tu auras un Pokémon sans image ("Mew"). Assure-toi que ta condition fonctionne pour afficher l'image uniquement si elle est disponible. Sinon, ton code doit afficher le paragraphe avec "???".
`````

Assure-toi que ton composant `PokemonCard` est dynamique et s'adapte aux données des Pokémons dans `pokemonList`.

Fournis le lien vers la branche `components.2` de ton dépôt GitHub pour valider cette étape.

### Critères de validation

* [ ] Le code est disponible sur GitHub et peut-être cloné.
* [ ] Le pokémon *bulbasaur* continue de s'afficher normalement lorsque la variable `pokemon` contient le premier pokémon du tableau. Le nom du pokémon est utilisé en texte alternatif de l'image et dans la `figcaption` de la figure.
* [ ] Si la variable `pokemon` contient le deuxième pokémon du tableau, alors *???* est affiché à la place de l'illustration du pokémon. Le nom du pokémon reste utilisé dans la `figcaption` de la figure.

Ce que tu devrais avoir dans :

````tabs files

!--- PokemonCard.tsx

```jsx
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

function PokemonCard() {
  const pokemon = pokemonList[1];

  return (
    <figure>
      {pokemon.imgSrc != null ? (
        <img src={pokemon.imgSrc} alt={pokemon.name} />
      ) : (
        <p>???</p>
      )}
      <figcaption>{pokemon.name}</figcaption>
    </figure>
  );
}

export default PokemonCard;
```
````