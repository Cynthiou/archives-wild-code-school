###### ⚠️ Avant de commencer cette quête, tu dois avoir terminé les quêtes suivantes :

```quests
1259, 1554
```

# Introduction

Précédemment, tu as vu **qu'est-ce que le DOM** et comment **changer le DOM en ajoutant ou en supprimant un élément HTML**.

Maintenant il est temps d'apprendre comment **réagir à un événement en utilisant Javascript**.

**Débutons !**

# 🤓 A la fin de cette quête, tu seras capable : 

* ✅ **D'écouter les événements** sur les éléments HTML **(clic, survol, ...)**

- - -

# Gestionnaires d'événements

Maintenant que tu sais comment sélectionner un élément, modifier une propriété et créer des éléments, il est temps d'ajouter un peu d'interactivité !

Pour cela, nous pouvons utiliser des gestionnaires d'événements.

Pour la gestion des clics, tu peux modifier la propriété `onclick` en y affectant une fonction.

```javascript
someDiv.onclick = function () {
  someDiv.style.backgroundColor = "red";
};
```

## AddEventListener

Nous pouvons également utiliser une méthode appelée `addEventListener`.

`addEventListener` est une méthode qui accepte comme premier paramètre le type d'événement, et le second est  **une fonction de rappel (*callback function*).**

```javascript
someDiv.addEventListener('click', function () {
  someDiv.style.backgroundColor = "red";
});
```

`addEventListener` peut être utilisé pour écouter un grand nombre d'événements différents, tels que:

- click
- mousedown
- mouseup
- mousemove
- mouseover
- mouseleave
- ...

### 🔬 Fais une expérience:

Essaye de modifier quelques éléments de ce code.  

- Lorsque l'utilisateur clique sur l'image, cela doit changer la source de l'image (`src`) et le texte de la propriété `alt`
- Lorsque l'utilisateur survole le titre, la couleur du texte doit changer 
- Lorsque la souris quitte le titre, la couleur doit revenir au noir

```codesandbox
https://codesandbox.io/s/laughing-brook-xd2mm-jgrzq?file=/src/index.js
```

```hidden
Montrer la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
// We create the variables for imgDog and for title
const imgDog = document.querySelector('.img-dogs');
const title = document.querySelector('.title');

// We add a listener on the dog image, when the user clicks on the latter, it changes the src 
imgDog.addEventListener('click', function () {
  imgDog.src = "https://placedog.net/300";
  imgDog.alt = "Happy cute dog";
});

// We add a listener on the title, when the user places the mouse over the element, it changes the color 
title.addEventListener('mouseover', function () {
  title.style.color = "blue";
});

// We add a listener on the title, when the mouse leaves the element, it changes the color 
title.addEventListener('mouseleave', function () {
  title.style.color = "black";
});
```

- - -

# Travailler avec un <form>

Voyons comment nous pouvons obtenir des informations à partir d'éléments d'un formulaire.
Nous pouvons ajouter une fonction qui sera exécutée lorsqu'un formulaire est envoyé, en utilisant la propriété `onsubmit` sur l'élément `form`.

```javascript
const form = document.querySelector("#form");

form.onsubmit = function () {
  console.log("Hello world!");
};
```

Le problème avec cette approche est que lorsque l'on appelle `onsubmit`, la page se rafraîchit (un comportement par défaut des navigateurs).

```codesandbox
https://codesandbox.io/s/form-dom-1-ye6gb?file=/src/index.js
```

Pour empêcher la page de se rafraîchir, nous pouvons utiliser une **méthode** que nous obtenons dans l'objet `event` appelée **`preventDefault`**.

**preventDefault** empêchera la page de se recharger.

```javascript
const form = document.querySelector("#form");

form.onsubmit = function (event) {
  event.preventDefault();
  console.log("Hello, world!");
};
```

De plus, nous pourrions obtenir la valeur de l'`input` afin de pouvoir afficher le nom que l'utilisateur a tapé.

```javascript
const form = document.querySelector("#form");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");

form.onsubmit = function (event) {
  event.preventDefault();
  console.log(`Hello, ${firstName.value} ${lastName.value}`);
};
```

### 🔬Fais une expérience : 
C'est à ton tour maintenant, voici un formulaire où l'utilisateur peut taper la tâche qu'il doit faire. 
Lorsque l'utilisateur clique sur le bouton, un nouvel élément `li` doit être ajouté à la `todolist`.

Celui-ci est un peu plus difficile, on va donc te donner ce que tu dois faire étape par étape (essaie de le faire par toi-même, regarde les étapes si tu n'y arrive pas) :

````stepper
# Si vraiment tu n'y arrives pas sans aide :

# Étape 1:
Crée les variables pour le `form`, l'`input` et la todolist (`ul`)

# Étape 2:
Ajoute une fonction anonyme exécutée à la soumission du form (`onsubmit`, avec `event` en paramètre)

# Étape 3:
Dans la fonction, utilise `event.preventDefault` pour éviter le rafraichissement de la page

# Étape 4:
Ensuite, crée une autre variable et utilise `createElement` pour créer un nouveau noeud `li`

# Étape 5
À l'intérieur de cet élément `li`, ajoute la valeur de l'`input` (en utilisant `innerHTML` et `input.value`)

# Étape 6:
Ajoute dans l'élément `ul` l'élément `li` juste créé

Étape 7:
Efface la valeur de la saisie pour que le texte ne reste pas (input.value = "")
````

N'hésite pas à essayer, celui-ci est un peu plus difficile mais tu peux le faire !

```codesandbox
https://codesandbox.io/s/jolly-solomon-kv6bb?file=/src/index.js
```

```hidden
Montrer la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
// We create the variables that we set to the DOM elements 
const form = document.querySelector("#form");
const inputTodo = document.querySelector("#todoInput");
const todolist = document.querySelector("#todolist");

// Onsubmit we will run a function
form.onsubmit = function (event) {
  // We want to prevent the page to reload
  event.preventDefault();

  // We create a variable that we set to a new li node
  const newTodo = document.createElement("li");
  // We add the text to the li
  newTodo.innerHTML = inputTodo.value;
  // We add the li to the ul 
  todolist.appendChild(newTodo);
  // We clear the value of the input
  inputTodo.value = "";
};
```

---

# Changer une classe



L'utilisation de la méthode `classList.toggle` sur un élément ajoutera la classe si la classe n'est pas là, si la classe est déjà présente alors elle la supprimera.
C'est utile, par exemple, dans le cas où tu veux créer un menu déroulant. Lorsque l'utilisateur clique dessus, cela supprime ou ajoute la classe `visible`.

```javascript
element.classList.toggle("mystyle");
```

### 🔬 Fais une expérience : 
Dans cet exemple, nous avons un bouton et une liste d'animaux emoji. Cette liste a la propriété `display: none`.
L'ajout de la classe visible sur l'élément la transformera en `display : block`.

En utilisant ce que nous avons appris, crée un `listener` sur le bouton; au clic, ajoute ou supprime la classe `visible` sur l'élément qui porte la classe `dropdown-menu-content` (en utilisant la méthode `toggle`).

```codesandbox
https://codesandbox.io/s/crazy-volhard-gcmsx?file=/src/index.js
```

```hidden
Montrer la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
// We create a variable dropdownBtn set to the DOM button node
const dropdownBtn = document.querySelector(".dropdown-btn");
// We create a variable dropdownMenu set to the DOM element
const dropdownMenu = document.querySelector(".dropdown-menu-content");

// We listen for a click event
dropdownBtn.addEventListener("click", function () {
  // On click we toggle the class visible on the dropdown
  dropdownMenu.classList.toggle("visible");
});
```

## Obtenir des informations sur l'événement

Comme tu l'as vu tout à l'heure, la fonction de rappel que tu donnes à un **addEventListener** peut accepter un paramètre; ce paramètre est l'**objet `event`.** 

L'objet `event` contient beaucoup de propriétés et de méthodes concernant l'événement qui vient de se produire.

```javascript
const title = document.querySelector(".title");

title.addEventListener("click", function (event) {
  console.log(event);
  title.style.color = "red";
});

document.body.addEventListener("mousemove", function (event) {
  console.log(event);
});
```

[Ouvre cette page](https://kdo1p.csb.app/), Ouvre la console de ton navigateur et déplace ta souris sur l'écran.

Tu devrais voir l'objet `event`.

Si tu cliques sur le bouton, tu devrais voir toutes les différentes propriétés attachées à cet objet.

Par exemple, nous avons accès à la position de la souris sur l'écran avec `clientX` et `clientY`.

### 🔬Fais une expérience : 
Utilise tes connaissances en matière de DOM pour afficher et mettre à jour la position de la souris chaque fois que l'utilisateur déplace la souris sur l'écran.
Tu dois utiliser `innerHTML` et un template string pour modifier le texte de `title-cursor-position`.

```codesandbox
https://codesandbox.io/s/hungry-mclean-qmbgj-2-qmbgj?from-embed
```

```hidden
Montrer la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
// We create a variable set to the title with the cursor position
const titleCursorPosition = document.querySelector("#title-cursor-position");

// We listen to mouse movement on the body
document.body.addEventListener("mousemove", function (event) {
  // Everytime the mouse moves, we change the text in the element
  titleCursorPosition.innerHTML = `x:${event.clientX}, y:${event.clientY}`;
});
```

---

# ☝️ Résumé

- Le DOM ou Document Object Model est une **interface** fournie par le navigateur qui nous donne accès à une représentation objet du document HTML
- Les éléments du DOM sont appelés des **noeuds**
- Le DOM nous donne accès à un grand nombre de propriétés et de méthodes que nous pouvons utiliser pour modifier les propriétés des éléments
- Nous pouvons utiliser **addEventListener** pour `écouter` les événements se produisant sur un certain élément
    - Nous devons fournir une **fonction de callback** à addEventListener, cette fonction de callback accepte un paramètre `event` qui donne accès à un objet avec des méthodes et des propriétés **utiles** sur l'événement en cours.

---

# 📚 Ressources

```ressource
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents
# Mdn Manipulating documents
Très bonne ressource de MDN sur la Manipulation du DOM
```