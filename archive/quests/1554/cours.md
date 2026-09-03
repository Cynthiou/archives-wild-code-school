###### ⚠️ Avant de commencer cette quête, tu dois avoir terminé la quête suivante :

```quests
1259
```

# Introduction

Lors de la quête précédente, tu as découvert le DOM et comment sélectionner et changer les propriétés d'un **noeud**.

Maintenant il est temps d'aller plus loin et de créer/enlever des éléments ainsi que de changer leur style.

**Débutons !**

# 🤓 A la fin de cette quête, tu seras capable de

* ✅ **Ajouter et supprimer un élément HTML au DOM**
* ✅ **Changer la classe d'un élément DOM** en utilisant Javascript

---


# Créer un nouvel élément HTML

Maintenant que tu sais comment obtenir un élément. Voyons comment nous pouvons **créer un nouvel élément!**

**Pour créer un élément**, utilise la méthode `createElement` :

```javascript
const newCatImage = document.createElement('img');
```

Dans ce cas, parce que nous voulons créer une image, nous devons donner une **source** à cette nouvelle image (et un **texte alternatif** pour des questions d'accessibilité):

```javascript
newCatImage.src = "https://placecats.com/408/287";
newCatImage.alt = "chat trop mignon";
```

Enfin, pour l'ajouter au DOM, nous pouvons utiliser la méthode `appendChild`.
La méthode `appendChild` va **ajouter l'élément passé** **à la fin de l'élément sur lequel tu utilises la méthode.**

**Dans cet exemple, ceci ajoutera `newCatImage` à la fin de `document.body`:**

```javascript
document.body.appendChild(newCatImage);
```

Cette méthode est **également disponible sur d'autres noeuds HTML**, par exemple, **tu peux l'utiliser pour ajouter un élément à une `<div>`.**

```javascript
const myDiv = document.querySelector('.myDiv');
myDiv.appendChild(myElement);
```

### 🔬 Fais une expérience

Dans cet exemple, une des images est manquante sur la deuxième carte.
En utilisant ce que nous venons de voir, crée un nouvel élément image, et utilise appendChild pour l'ajouter au bas de la deuxième carte.

```js live
!--- index.js
// Your code here

!--- index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Sandbox</title>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: sans-serif;
      }
    </style>
  </head>

  <body>
    <div id="app"></div>
    <div class="first-card">
      <h1 class="card-title">First cat:</h1>
      <img src="https://placecats.com/400/200" class="card-img" />
    </div>
    <div class="second-card">
      <h1 class="card-title">second cat:</h1>
    </div>
    <script src="src/index.js"></script>
  </body>
</html>
```

```alert-info
# Interagis avec le code !
Ouvre ce codesandbox dans une autre fenêtre pour une meilleure expérience
```

```hidden
Montrer la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
// We create a variable secondCard set to the second-card DOM node
const secondCard = document.querySelector('.second-card');

// We create a variable secondCat set too a new DOM element 'img'
const secondCat = document.createElement('img');

// We add the src attribute
secondCat.src = "https://placecats.com/408/287";
secondCat.alt = "chat trop mignon";

// We add the secondCat to the secondCard
secondCard.appendChild(secondCat);
```

---


# Changer la position d'un Élément du DOM

**Pour changer la position d'un élément, utilise `appendChild`.**
Passe l'élément que tu veux déplacer comme paramètre; cela ne créera pas de copie mais déplacera l'élément.

```javascript
newDiv.appendChild(newCatImage);
```

### 🔬 Fais une expérience

Essaye de déplacer la position de l'élément du bas vers le haut.

```js live
!--- index.js
// Your code here

!--- index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Sandbox</title>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: sans-serif;
      }
    </style>
  </head>

  <body>
    <div id="app"></div>
    <div id="first-div">
      <h1>Move the cat here:</h1>
      <img src="https://placecats.com/200/139" id="first-cat-img" />
    </div>
    <div id="second-div">
      <h1>Move this cat up:</h1>
      <img src="https://placecats.com/200/135" id="second-cat-img" />
    </div>
    <script src="src/index.js"></script>
  </body>
</html>
```

Essaye de déplacer la position du second chat en le plaçant juste à côté du premier chat

```alert-info
# Interagis avec le code !
Ouvre ce codesandbox dans une autre fenêtre pour une meilleure expérience
```

```hidden
Montrer la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
const secondCat = document.querySelector('#second-cat-img');
const firstDiv = document.querySelector('#first-div');

firstDiv.appendChild(secondCat);
```

---


# Supprimer un Élément du DOM

Tu peux **supprimer** un élément du DOM en **utilisant la propriété `remove`.**

```javascript
myElement.remove();
```

### 🔬 Fais une expérience 

Cet exemple contient des photos de chats et de chiens... Mais ils ne sont pas amis les uns avec les autres...
Supprime toutes les photos qui contiennent des chiens (ou des chats, à toi de voir).

Pour cela utilise `document.querySelectorAll` et utilise une boucle `for` et appele la méthode `remove` sur chaque élément.

```js live
!--- index.js
// Your code here

!--- index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Sandbox</title>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: sans-serif;
      }
    </style>
  </head>

  <body>
    <h1>Delete all the Dogs or Cats!</h1>
    <img src="https://placedog.net/300/200" class="img-dog" />
    <img src="https://placecats.com/408/286" class="img-cat" />
    <img src="https://placedog.net/320/200" class="img-dog" />
    <img src="https://placecats.com/408/287" class="img-cat" />
    <img src="https://placedog.net/350/200" class="img-dog" />
    <img src="https://placedog.net/340/200" class="img-dog" />
    <img src="https://placecats.com/409/287" class="img-cat" />
    <script src="src/index.js"></script>
  </body>
</html>
```

```hidden
Montrer la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
// We create a variable set to the array with all element that match the selector img-dog
const dogs = document.querySelectorAll(".img-dog");

// We loop as many times as we have img-dog elements
for (let i = 0; i < dogs.length; i++) {  
  // For each loop turn we remove the current dog image  
  dogs[i].remove();
}
```

# Changer le style des éléments
Il est possible de **changer le style d'un élément HTML** en utilisant la propriété `style`.
Le **nom de la propriété** doit être écrit en utilisant le **camel case** (nous ne pouvons pas utiliser de `-` lors du nommage en Javascript).

Exemple:

```javascript
someDiv.style.backgroundColor = "lightblue";
someText.style.fontSize = "20px";
```

### 🔬 Fais une expérience 
Essaye de modifier le CSS sur cette page:

* La box devrait être `yellow`, avec une hauteur de 300px et une largeur de 400px
* Le texte devrait être de 60px, centré et de couleur 'lightblue'

```js live
!--- index.js
// Your code here

!--- index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Sandbox</title>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: sans-serif;
      }

      .box {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        background-color: peru;
        color: white;
      }
    </style>
  </head>

  <body>
    <h1 class="title">Change the text!</h1>
    <div class="box">Change the box!</div>

    <script src="src/index.js"></script>
  </body>
</html>
```

```hidden 
Montrer la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
// We create two variables for both title and box DOM elements
const title = document.querySelector('.title');
const box = document.querySelector('.box');

// We change the style of the elements
title.style.color = 'lightblue';
title.style.fontSize = '60px';
title.style.textAlign = "center";
box.style.backgroundColor = 'yellow';
box.style.height = '300px';
box.style.width = '400px';
```

---


# Ajouter/Supprimer une classe à un élément

Il est aussi possible **d'ajouter/supprimer une classe sur un élément.**

```javascript
element.classList.add('myClass');
element.classList.remove('myClass');
```

Note que, dans ce cas, comme la nature de l'élément est spécifiée (**classList**), nous n'avons pas besoin d'utiliser le `.` avant le nom de la classe.

### 🔬 Fais une expérience

Dans cette page, il y a déjà quelques petites boîtes, et elles ont une classe CSS spécifique `box`. Crée une nouvelle boîte avec `createElement`, ajoute à cet élément la classe `box`, puis ajoute-la à la div `container-boxes`.

```js live
!--- index.js
// Your code here

!--- index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Sandbox</title>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: sans-serif;
      }
      .container-box {
        display: flex;
      }
      .box {
        display: inline-block;
        height: 100px;
        width: 100px;
        margin: 10px;
        background-color: coral;
      }
    </style>
  </head>

  <body>
    <div class="container-boxes">
      <h1>Create a third box</h1>
      <div class="box"></div>
      <div class="box"></div>
    </div>

    <script src="src/index.js"></script>
  </body>
</html>
```

```hidden
Montrer la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
// We create a variable thirdBox set to a new div element
const thirdBox = document.createElement("div");

// We add a "box" class to the element 
thirdBox.classList.add("box");

// We create a variable containerBox set to the DOM node with the class "container-boxes"
const containerBox = document.querySelector(".container-boxes");

// We add the thirdBox inside containerBox 
containerBox.appendChild(thirdBox);
```


---



# Prêt à poursuivre ton voyage dans la manipulation de DOM ?

Si tu es prêt, tu peux passer à la **prochaine quête**

```quests
1555
```