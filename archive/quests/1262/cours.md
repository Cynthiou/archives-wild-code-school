## Objectifs

* Comprendre ce qu'est JavaScript
* Découvrir ce que tu peux faire avec

## Introduction

Pour commencer ton périple, et avant de coder, tu dois comprendre ce qu'est JavaScript, et comment il fonctionne.

Dans cette quête, tu vas voir **ce qu'est JavaScript**, quelle est son histoire, et ce que tu peux faire avec.

![image](https://storage.googleapis.com/quest_editor_uploads/kMQp530PHYBYo6YSxFS0tBZDUErkIoUj.png)

## Sommaire

## Définition

Tu sais que l'**HTML** définit **la structure** d'une page web.
Le CSS donne du style aux pages.

**Mais du coup, quel est le rôle du JS ici ?**
C'est un langage de programmation qui ajoute de l'interactivité aux pages web.

![Source: HostGator on Giphy](https://storage.googleapis.com/quest_editor_uploads/X5mLGHhqR3xtOnCuAYk390Rj7CP6zn1t.gif)*Source: [HostGator on Giphy](https://giphy.com/gifs/HostGator-webhosting-hostgator-webhost-fuJPZBIIqzbt1kAYVc)*

## L'histoire de JS

JavaScript a été conçu pour être utilisé côté **frontend** (dans le navigateur donc). Mais depuis **2009**, il est possible de créer du code **backend** (côté serveur donc) avec **NodeJS** ! 🔥

![Portrait of Brian Eich](https://storage.googleapis.com/quest_editor_uploads/2ts9EH2ghEZZ5wzd1gd85oTAmieJfZKX.png)

> 🤓 Selon la légende, Brendan Eich a écrit JavaScript en 10 jours

**📚 Pour connaître l'historique du JS, regarde cette courte vidéo:**

```youtube
https://www.youtube.com/watch?v=Sh6lK57Cuk4
```

```alert-warning
Bien que leurs **noms** semblent **similaires**, JavaScript est totalement **différent de Java**.
JS est appelé **Java**Script car quand il a été créé, **Java était populaire**, donc les créateurs ont pensé qu'ajouter **Java** dans son nom le rendrait plus accessible.

![Java is to JavaScript as Ham is to Hamster](https://storage.googleapis.com/quest_editor_uploads/GDEHgO1LAWfNflluyhBR7h6f2zFu5tDq.png)

> Source: [Segue Technologies](https://www.seguetech.com/)
```

## ECMAScript Standards

Comme tout langage de programmation, **JavaScript a son lot de règles et de spécifications**.
Ces specs sont implémentées dans un standard appelé **ECMAScript** (**ES**).
Chaque nouvelle version d'ECMAScript vient avec des nouvelles **features**, des nouvelles **normes** sur la **façon d'écrire le JavaScript**.
Tu as pu entendre parler de **ES6** qui a été introduit en 2015 et a ajouté de nombreuses fonctionnalités au langage. JavaScript à partir d'ES6 et au-delà (ES6+) est parfois appelé le "JavaScript moderne".

![Illustration of the evolution of ECMAScript](https://storage.googleapis.com/quest_editor_uploads/5ncBD8CFRjGuYe5IgD7hLcGwKilObaNq.png)

> **image source:** [https://engineering.carsguide.com.au/javascript-context-ecmascript-84d709ef9165](https://engineering.carsguide.com.au/javascript-context-ecmascript-84d709ef9165)

Si tu es curieux, tu peux jeter un coup d’œil aux spécifications ici.

```ressource
https://tc39.es/ecma262/
# ECMAScript 2025 Language Specifications
Ce lien pointe vers la spécification officielle d'ECMAScript. Ce n'est pas un document accessible pour les débutants. Mais il peut permettre de comprendre comment JS fonctionne "sous le capot". Jette y un coup d'oeil et garde le lien pour y revenir plus tard ;) 

```

## Que peut-on faire avec JavaScript?

Eh bien on peut:

* [Créer une plateforme de streaming comme Netflix](https://www.netflix.com/)
* [Créer des animations 3D](https://cineshader.com/)
* [Créer des jeux](https://play2048.co/)
* [Créer de l'art](https://p5js.org/sketches/2213463/)
* [Créer des robots](https://lab.reaal.me/jsrobot/)
* [Créer des interfaces pour des navettes spatiales](https://twitter.com/jason_mayes/status/1267227834096861184?lang=fr)
* [Créer un fameux réseau social](https://www.facebook.com/)
* Et encore bien d'autres choses...

## Syntaxe de base

### Hello World

La manière la plus simple d'expliquer la syntaxe d'un langage de programmation est d'écrire un programme **"Hello, World!"**.
"Hello, World!" est un programme **qui écrit le texte "Hello, World!"**.

![Hello, World!](https://storage.googleapis.com/quest_editor_uploads/WAMZJ1SV2IgHHdtrCqCuRxGGuq1ds9XD.png)Le but ? Donner une idée de la structure et de la syntaxe du langage utilisé.

```javascript
console.log("Hello, World!");
```

Tu as ici un "Hello, world!" en JS. Ça semble assez simple non ?
Si tu es curieux et que tu souhaites voir d'autres programmes "Hello, world!", regarde cet article sur Wikipedia :

```resource
https://en.wikipedia.org/wiki/%22Hello,_World!%22_program#Examples
# 'Hello, World!' dans différents langages de programmation
Dans cet article, tu verras comment écrire 'Hello, world!' dans différents langages de programmation.
```

> 😅 L'un des pires programme "Hello, world!", est celui d'un langage appelé **malbolge**.
> Malbolge est un langage de programmation conçu dans l'unique idée de créer un langage horrible et difficile !
> Voici un "Hello, world!" en malbolge...

```
(=<`#9]~6ZY32Vx/4Rs+0No-&Jk)"Fh}|Bcy?`=*z]Kw%oG4UUS0/@-ejc(:'8dc
```

## Comment fonctionne JavaScript ?

JavaScript est ce qu'on appelle un langage **haut-niveau**.
Cela signifie que **JavaScript est éloigné du langage machine**.
Tout le code que l'on exécute sur notre machine est transformé en code binaire (**0 et 1**).
JavaScript est plus proche du **langage humain que du langage machine**.
Un langage de programmation seul est quelque peu inutile, c'est comme parler un langage que personne ne comprend.

Mais, comment JavaScript est transformé en **langage machine** ?
Ton navigateur a le pouvoir de traduire ton code JS en langage machine avec ce qu'on appelle un **Moteur JavaScript (JS Engine)**.
Ce moteur (par exemple le moteur **V8** dans Google Chrome) va "lire" notre JS et le traduire, ce qui fait que notre ordinateur va le comprendre.

![JavaScript Engine Schema](https://storage.googleapis.com/quest_editor_uploads/F623ezBPVZUP6wmGaGMHDetwTCkIxZaS.png)image source : [https://medium.com/@zoebai\_70369/javascript-engine-368037453a1c](https://medium.com/@zoebai_70369/javascript-engine-368037453a1c)

## Résumé
* JavaScript n'a rien à voir avec Java
* JavaScript est un langage de programmation haut-niveau.
* ECMAScript est le standard qui définit les règles et spécifications de JavaScript
* Tu peux utiliser JavaScript côté frontend et backend (grâce à NodeJS)

```resource
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
# What is JavaScript?
Une très bonne ressource qui explique ce qu'est JavaScript
```

```resource
https://javascript.info/intro
# An Introduction to JavaScript
Une autre très bonne ressource qui explique tout ce dont tu as besoin de savoir sur JavaScript.
```