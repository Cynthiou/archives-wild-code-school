###### ⚠️ Avant de démarrer cette quête, tu dois avoir complété celle-ci :

```quests
1282
```

# Introduction

Dans les quêtes précédentes, nous avons abordé les **objets en Javascript**.

Dans cette quête, nous irons plus loin avec ce que l'on appelle le **paradigme de Programmation Orientée Objet (POO).**

Un **paradigme de programmation** est une façon d'écrire du code. En POO, cette façon d'écrire est basée sur la notion d'objet. Les objets sont une abstraction à laquelle peuvent s'apparenter **les choses du monde réel.**

Regardons ça de plus près.

![image](https://storage.googleapis.com/quest_editor_uploads/pxbUB07ZOsQgy7q0N7pgJtPnRUCqIyxy.jpeg)

# 🤓 A la fin de cette quête, tu seras capable :

* ✅ De comprendre les grands principes de Programmation Orientée Objet (POO)
* ✅ De comprendre le concept d'héritage

- - -

# 🌏 Un monde d'objets

Prenons un exemple simple, imagine que tu veuilles **créer un jeu.**

Dans ce jeu, il y a des héros qui combattent des ennemis.

Imagine qu'il y a beaucoup d'ennemis différents.

Les ennemis peuvent avoir différents **noms**, différents **niveaux** et différentes **attaques**.

Créons cela en JavaScript en utilisant des objets :

```javascript
const enemies = [
  {
    name: "Spider", 
    level: 1, 
    emoji: "🕷",
    attackName: "bites", 
    attack: function () {
      return `${this.name} ${this.attackName} you!`;
    }
  },
  {
    name: "Snake", 
    level: 6, 
    emoji: "🐍", 
    attackName: "bites", 
    attack: function () {
      return `${this.name} ${this.attackName} you!`;
    }
  },
  {
    name: "Bear", 
    level: 25, 
    emoji: "🐻", 
    attackName: "scratches", 
    attack: function () {
      return `${this.name} ${this.attackName} you!`;
    }
  }
];
```

Comme tu peux le voir, à chaque fois que nous créons un nouvel ennemi, nous **recréons toutes les propriétés de l'objet.**
Nous créons une fonction à chaque fois, même si c'est toujours la même.

Nous nous répétons... Ce qui n'est pas bon pour la programmation.

# 🏭 Une fonction "factory"

Et si tu pouvais écrire une fonction qui s'occupe de créer un objet initialisé avec les bonnes paires clé/valeurs pour éviter de te répéter ?

Tu pourrais appeler cette fonction "createEnemy". Cette dernière accepterait quelques paramètres et renverrait un objet avec la bonne structure, les bonnes propriétés.

```javascript
function createEnemy(name, level, emoji, attackName) {
  const enemy = {};

  enemy.name = name;
  enemy.level = level;
  enemy.emoji = emoji; 
  enemy.attackName = attackName;

  enemy.attack = function () {
    return `${this.name} ${this.attackName} you!`;
  };

  return enemy;
}

const enemies = [
  createEnemy("Spider", 1, "🕷", "bites"),
  createEnemy("Snake", 6, "🐍", "bites"),
  createEnemy("Bear", 25, "🐻", "scratches"),
];

console.log(enemies);
```

Comme tu peux le constater, c'est beaucoup plus facile comme ça ! Ce que nous venons de créer s'appelle une fonction "factory" (**factory** signifie **usine** en anglais), tout simplement car elle produit de nouveaux objets !

### 🔬 Teste par toi-même

Essaie maintenant de créer une nouvelle fonction produisant des héros !

Les héros doivent avoir un nom, un niveau, une arme et une fonction pour dire bonjour qui renvoie une phrase avec leur nom.

Crée ensuite deux héros en appelant cette fonction.

```codesandbox
https://codesandbox.io/s/constructor-function-kznz9?fontsize=14&hidenavigation=1&module=%2Fsrc%2Findex.js&theme=dark
```

```hidden
Afficher la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
function createHero(name, level, weapon) {
  const hero = {};

  hero.name = name;
  hero.level = level;
  hero.weapon = weapon;

  hero.sayHello = function () {
    console.log(`hello, I'm ${this.name}`);
  };

  return hero;
}

const bob = createHero("Bob", 18, "Sword");
const john = createHero("John", 21, "Bazooka");

console.log(bob);
console.log(john);
```

# 🏗️ Une fonction "**constructor**"

Il existe une méthode **plus efficace** que la création d'une *factory* en Javascript.

Dans l'exemple précédent, nous utilisions un objet vide que nous devions retourner. Voyons une autre façon de faire la même chose avec une fonction constructrice (**constructor function**) :

```javascript
function Enemy(name, level, emoji, attackName) {
  this.name = name;
  this.level = level;
  this.emoji = emoji;
  this.attackName = attackName;

  this.attack = function () {
    return `${this.name} ${this.attackName} you!`;
  };
}
```

Que vois-tu ici ?

Eh bien, c'est un peu la même chose, mais cette fois nous n'avons pas à créer ni **retourner** l'objet.

**Essayons d'appeler la fonction...**

```javascript
const spider = Enemy("Spider", 1, "🕷", "bites");
console.log(spider);
// undefined
```

Comme tu peux le constater, notre **constructor** ne renvoie rien, **il ne fonctionne donc pas comme une factory**.

As-tu remarqué que nous avons mis le nom de la fonction **avec une majuscule** ?

Il s'agit d'une convention en JS : toutes les fonctions constructrices doivent avoir un nom écrit en PascalCase (pour les différencier des autres fonctions "classiques").

La majuscule nous indique que cette fonction doit être utilisée avec le mot clé `new`.

Le **mot-clé** `new` va automatiquement **créer puis retourner l'objet**, sur lequel notre fonction va agir pour initialiser ce dernier.

```javascript
const spider = new Enemy("Spider", 1, "🕷", "bites");
console.log(spider);
// Enemy {name: "spider", level: 1, emoji: "🕷", attackName: "bites"…}
```

Plutôt cool, n'est-ce pas ?

### 🔬 Teste par toi-même

Maintenant, crée le même type de fonction pour construire les héros.

```codesandbox
https://codesandbox.io/s/class-oop-0dse2?file=/src/index.js
```

```hidden
Afficher la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
function Hero(name, level, weapon) {
  this.name = name;
  this.level = level;
  this.weapon = weapon;

  this.sayHello = function () {
    return `Hello I'm ${this.name}`;
  };
}

const bob = new Hero("Bob", 12, "Sword");

console.log(bob);
```

# A partir d'ES6, JS a vraiment la "class" !

A partir de la norme ES6, les classes viennent simplifier la définition et la création d'instances.

Voyons comment nous pouvons créer une classe en Javascript :

```javascript
class Enemy{
  constructor(name, level, emoji, attackName) {
    this.name = name;
    this.level = level;
    this.emoji = emoji;
    this.attackName = attackName;
  }

  attack(){
    return `${this.name} ${this.attackName} you!`;
  }
}

const enemies = [
  new Enemy("Spider", 1, "🕷", "bites"),
  new Enemy("Snake", 6, "🐍", "bites"),
  new Enemy("Bear", 25, "🐻", "scratches"),
];

console.log(enemies[0]);
console.log(enemies[0].attack());
```

Tu utilises simplement le mot-clé "class" suivi du **nom de la classe** que tu veux créer et ensuite tu écris ton **constructor** (qui est exactement la même fonction que la précédente que nous avons créée quand nous n'utilisions pas les classes).

Ensuite, il suffit d'écrire tes méthodes dessus et **voila !**

```alert-info
Si tu échanges avec des développeurs JS, il te diront probablement que JavaScript est en réalité un "langage basé sur les prototypes". Aujourd'hui les classes viennent ajouter du **"sucre syntaxique"** au langage pour cacher une certaine complexité liée à l'utilisation des prototypes, mais en réalité JS fonctionne différemment "sous le capot".
```


### 🔬 Teste par toi-même :

Crée une classe pour nos héros.

```codesandbox
https://codesandbox.io/s/class-oop-0dse2?file=/src/index.js
```

```hidden
Afficher la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
class Hero {
  constructor(name, level, weapon) {
    this.name = name;
    this.level = level;
    this.weapon = weapon;
  }

  sayHello() {
    return `Hello my name is ${this.name}`;
  }
}

const bob = new Hero("Bob", 10, "Sword");
console.log(bob.sayHello());
```

# Une dernière petite étape

Nous venons de parcourir un long chemin... Nous avons presque fini, il nous reste une dernière chose à voir.

As-tu remarqué que nos héros et nos ennemis ont des choses en commun ?

Par exemple, ils ont tous les deux un **nom et un niveau**.

Il serait donc souhaitable de ne pas avoir à répéter ces propriétés au sein des classes *Enemy* et *Hero* !

On pourrait donc créer une classe "Personnage" (Character) qui définit ces deux propriétés et dire que "Ennemi" et "Hero" sont des personnages et doivent donc posséder ces propriétés.

*Enemy* **est** donc un type particulier de *Character*, de même que *Hero* **est** un type particulier de *Character*.

En Programmation Orientée Objet, **quand on peut dire que "A" est un "B", on dit que la classe A hérite de B.**

Il est possible de faire cela en Javascript avec le mot-clé "extends".

```javascript
class Character{
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
}

class Enemy extends Character{
  constructor(name, level, emoji, attackName) {
    super(name, level);
    this.emoji = emoji;
    this.attackName =  attackName;  
    this.enemy = true;
  }

  attack() {
    return `${this.name} ${this.attackName} you!`;
  }
}

const spider = new Enemy("Spider", 1, "🕷", "bites");
console.log(spider.name);
```

Tu peux voir que dans le constructeur de *Enemy*, nous utilisons le mot clé `super`. 

Ce mot clé `super` suivi de parenthèses va simplement **appeler le constructeur de la classe parente** de *Enemy* (c'est-à-dire *Character*) pour initialiser les propriétés "name" et "level" sur l'ennemi en cours de construction.

### 🔬 Teste par toi-même :

En utilisant le même code, crée la classe des héros qui étend personnage.

```codesandbox
https://codesandbox.io/s/suspicious-shadow-szb1s?file=/src/index.js
```

```hidden
Afficher la solution|||javascript|||Des problèmes pour trouver la solution ? |||0|||Masquer
class Hero extends Character {
  constructor(name, level, weapon) {
    super(name, level);
    this.weapon = weapon;
  }

  sayHello() {
    return `Hello, I'm ${this.name}`;
  }
}

const bob = new Hero("Bob", 20, "Sword");
console.log(bob.sayHello());
```

Voici une vidéo explicative de la notion d'héritage :

```youtube
https://www.youtube.com/watch?v=MfxBfRD0FVU
```

- - -

# ☝️ En résumé

* La programmation orientée objet est un paradigme de programmation, c'est une **manière d'écrire du code**
* Une fonction constructrice (aussi appelé "constructeur") permet de créer plusieurs **instances** (objets) en initialisant ses propriétés. On peut voir le constructeur comme "le moule" et une instance comme "un gateau".
* Nous pouvons créer une classe qui hérite des propriétés d'une autre classe en utilisant `extends`. Si nous voulons nous référer à la classe parente dans la classe fille, on devra utiliser le mot clé `super`

- - -