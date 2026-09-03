###### ⚠️ Avant de commencer cette quête, tu dois avoir terminé les quêtes suivantes :

```quests
1262,1267,1268,1269, 1270, 1278, 1281, 1283, 1282
```

# Introduction

Dans les quêtes précédentes, tu **as découvert les bases de Javascript; nous avons parlé de la syntaxe, des variables, des types de données, des conditions, des fonctions, des tableaux, des objets et des boucles.**

Jusqu'à présent, nous avons surtout travaillé avec une console. ~~Ce qui est assez ennuyeux, n'est-ce pas ?~~

Il est maintenant temps d'apprendre à manipuler les **éléments HTML en utilisant Javascript.**

**Commençons!**




![image](https://upload.wikimedia.org/wikipedia/commons/5/5a/DOM-model.svg)

# 🤓 A la fin de cette quête, tu seras capable de

* ✅ **Comprendre ce qu'est le DOM**
* ✅ **Faire des changements mineurs aux éléments HTML** en utilisant Javascript

- - -

# 🤷‍♂️ Qu'est-ce que le DOM?

**DOM signifie Document Object Model.** C'est une **interface** utilisée pour **manipuler le contenu d'une page HTML**.
Lorsque ton navigateur analyse ton code HTML et CSS, il crée également une **représentation du document sous la forme d'un objet Javascript**.
Nous utiliserons ce **modèle** pour manipuler notre page web.

# 📰 L'Objet Document?

Pour accéder à cet **objet document**, nous pouvons utiliser **l'objet `document`** fourni automatiquement par notre navigateur.

Va dans ton navigateur web, ouvre une page Google et la console et regardons ce fameux **"Document Object"**.

```javascript
console.log(document);
```

Tu devrais voir `#document` dans la console. C'est notre **objet document**.

![image](https://storage.googleapis.com/quest_editor_uploads/Ia3Ojc5cVfKChIDkZRwIcmaSfxDtTGLF.png)

**Clique sur le bouton à gauche**. Que vois-tu ?

Tu devrais voir **la page HTML que tu regardes actuellement !**
Voici notre **"Document Object"** rendu graphiquement par le navigateur : 

![image](https://storage.googleapis.com/quest_editor_uploads/2VgBLZNtYUmX2py7YcHdkpqzIRYM1ngT.png)

Chaque **élément de l'arbre HTML est appelé** un **noeud**.
Cet **objet document et ses noeuds sont dotés de nombreuses propriétés et méthodes** (rappelle-toi que les méthodes sont des fonctions dans les objets).
**Tu peux trouver la liste de toutes ces méthodes ici:**

```resource
https://developer.mozilla.org/en-US/docs/Web/API/Document
# MDN Document API
Description de l'API Document et toutes les propriétés et méthodes disponibles pour l'objet document.
```

---


# 🎯 Sélectionner et modifier des éléments HTML

Voyons comment **sélectionner un élément du DOM.** L'objet document est fourni avec une **méthode appelée `querySelector`.**
La **méthode** `querySelector` fonctionne **de la même manière qu'un sélecteur CSS**. **Entre parenthèses,** il suffit **d'écrire le sélecteur souhaité.**

```javascript
const someDivClass = document.querySelector('.my-div');
const someImg = document.querySelector('.my-img');
const someDivId = document.querySelector('#another-div');
const someH1 = document.querySelector('.my-div h1');
```

Maintenant, **nous avons accès à toutes les propriétés et méthodes pour cet élément spécifique.**
Tu peux trouver toutes les propriétés et méthodes disponibles pour l'élément image ici :

```resource
https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
# HTMLImageElement
L'interface HTMLImageElement représente un élément HTML <img>, fournissant les propriétés et les méthodes utilisées pour manipuler les éléments d'image.
```

Essayons d'utiliser une des méthodes.
Par exemple, nous pourrions changer la source de l'image en utilisant la propriété `src` de l'élément image.

```javascript
myImg.src = "https://placecats.com/200/286";
```

### 🔬Fais une expérience 

Nous venons de voir comment sélectionner un élément du DOM et modifier l'une de ses propriétés.
Dans l'exemple suivant, ton but est de sélectionner l'élément du DOM `img-cat` et de changer le src de l'image par autre chose.

```js live
!--- index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Change the img src</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <h1>Change the image source!</h1>
    <img
      src="https://placecats.com/200/287"
      alt="Happy cat"
      class="img-cat"
    />
    <script src="index.js"></script>
  </body>
</html>
!--- index.js
// your code here
```

```alert-info
# Interagis avec le code !
Ouvre ce codesandbox dans une autre fenêtre pour une meilleure expérience
```

````solution
```js
// We create a variable catImage set to our first DOM node that have the class .img-cat
const catImage = document.querySelector('.img-cat');

// We set the source of the image to a new url
catImage.src = "https://placecats.com/200/286";
```
````

**Bien joué !**

#### InnerHTML

La **méthode innerHTML est utilisée pour modifier le contenu d'une balise HTML.**

```javascript
const title = document.querySelector('.title');
title.innerHTML = "Hello, Bob!";
```

Dans cet exemple, nous sélectionnons le h1 avec la classe title, et nous changeons le contenu par Hello, Bob !

### 🔬Fais une expérience

Maintenant que tu sais comment demander à l'utilisateur de taper du texte ([prompt](https://developer.mozilla.org/fr/docs/Web/API/Window/prompt)), modifier le contenu d'une balise de titre et utiliser [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) (``` `Hi, I'm, ${name}` ```); essaye d'écrire un code qui demande à l'utilisateur de taper son nom (dans la zone d'invite) et d'afficher "Hello" + son nom sur la page.

```js live
!--- index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <h1 class="title">Hello, World!</h1>

    <script src="index.js"></script>
  </body>
</html>
!--- index.js
// your code here
```

```alert-info
# Interagis avec le code !
Ouvre ce codesandbox dans une autre fenêtre pour une meilleure expérience
```

````solution
```js
// We create a variable userName set to the result of prompt
const userName = prompt("What's your name");

// We create a variable set to the first element that match .title
const title = document.querySelector('.title');

// We replaced what's between the two tag by a template string with userName
title.innerHTML = `Hello, ${userName}`;
```
````

## D'autres méthodes de sélection des éléments

Tu peux également utiliser `document.getElementById` ou `document.getElementByTagName` pour sélectionner des éléments HTML, ils sont également pris en charge par les anciens navigateurs tels qu'Internet Explorer 6 - 7 (ce qui n'est pas le cas de querySelector).

```javascript
const title = document.getElementById('title');
const heading = document.getElementsByTagName('h1');
```

### 🔬Fais une expérience :

En utilisant la [documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement), modifie ces propriétés sur les images :

* La largeur devrait être égale à 500
* Alt devrait être égale à "A cute wild bear."

Tu dois utiliser **getElementById** à la place de **querySelector.**

```js live
!--- index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <h1>Change image properties</h1>
    <img src="https://placebear.com/800/500" alt="Bear Image" id="bear-img" />
    <script src="index.js"></script>
  </body>
</html>
!--- index.js
const bearImg = document.getElementById("bear-img");

// your code here
```

```alert-info
# Interagis avec le code !
Ouvre ce codesandbox dans une autre fenêtre pour une meilleure expérience
```

````solution
```js
const bearImg = document.getElementById("bear-img");

// We change the width and the alt of the image
bearImg.style.width = "500px";
bearImg.alt = "A cute wild bear";
```
````


# Sélectionner plusieurs éléments qui ont la même classe/la même balise

Si tu utilises `document.querySelector`, s'il y a plus d'un élément avec le même sélecteur dans le document (ex multiple `h1`), celui **sélectionné** par **défaut** sera **la première occurrence.**

Si tu veux obtenir une liste avec plusieurs éléments, tu peux utiliser `document.querySelectorAll`.

La méthode collectera tous les éléments qui correspondent à ton sélecteur.

```javascript
const allHeadings = document.querySelectorAll('h1');
```

```alert-warning
La valeur retournée est de type [HTMLCollection](https://developer.mozilla.org/fr/docs/Web/API/HTMLCollection). C'est une structure de données qui ressemble aux tableaux. Tu peux utiliser les `[]` pour accéder à un élément par exemple : `allHeadings[0]`. Mais d'autres fonctionnalités des tableaux ne sont pas disponibles sur une `HTMLCollection`, comme les les méthodes `push` ou `pop`. Quand tu essaies de travailler sur une collection, vérifie dans la documentation que ce que tu veux faire existe bien.
```

### 🔬Fais une expérience 

Dans cet exemple, il y a cinq balises d'image avec la même image. Dans le fichier JS, tu as un tableau avec cinq images différentes d'ours.

Essaye de sélectionner les 5 `img` en utilisant `querySelectorAll`, puis crée une boucle for pour remplacer la propriété src `img` par les images du tableau.


```js live
!--- index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <h1>Replace Bill Murray's pictures by Bear pictures</h1>
    <img src="https://placecats.com/200/300" />
    <img src="https://placecats.com/200/300" />
    <img src="https://placecats.com/200/300" />
    <img src="https://placecats.com/200/300" />
    <img src="https://placecats.com/200/300" />
    <script src="index.js"></script>
  </body>
</html>
!--- index.js
const bearsPictures = [
  "https://placebear.com/500/279",
  "https://placebear.com/500/280",
  "https://placebear.com/500/300",
  "https://placebear.com/500/302",
  "https://placebear.com/500/305"
];

// your code here
```

```alert-info
# Interagis avec le code !
Ouvre ce codesandbox dans une autre fenêtre pour une meilleure expérience
```

````solution
```js
const bearsPictures = [
  "https://placebear.com/500/279",
  "https://placebear.com/500/280",
  "https://placebear.com/500/300",
  "https://placebear.com/500/302",
  "https://placebear.com/500/305",
];

// We create a variable set to the array with all element that match the selector img
const images = document.querySelectorAll('img');

// We loop as many time as we have img elements
for (let i = 0; i < images.length; i++) {
  // For each loop turn we change the current image for the corresponding image in the array
  images[i].src = bearsPictures[i];
}
```
````

# 📚 Ressources

```resource
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents
# Mdn Manipulation de documents
Ressource officielle sur la manipulation de DOM
```

# Prêt à poursuivre ton voyage dans la manipulation de DOM ?

Si tu es prêt, tu peux passer à la **prochaine quête**

```quests
1554
```