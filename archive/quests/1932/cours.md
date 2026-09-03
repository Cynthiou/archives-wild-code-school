## Objectifs

Découvrir les méthodes des tableaux :

* `includes` et `indexOf` pour déterminer l'existence ou l'emplacement d'une valeur dans un tableau.
* `join` et `split` pour transformer un tableau en chaine de caractères et vice-versa.
* `slice` pour extraire une partie d'un tableau.
* `concat` et `splice` pour ajouter/supprimer des elements.
* `reverse` et `sort` pour ré-ordonner les items.

## Pré-requis

Avoir validé la quête suivante :

```quests
1281
```

## Introduction

Dans la quête précédente, tu as appris comment créer des tableaux, accéder à leurs éléments et récupérer leur taille.
Tu as aussi pu voir que ces tableaux pouvaient être manipulés grâce à des méthodes telles que `push`, `pop`, `shift` et `unshift`.
Durant cette quête, tu vas approfondir tes connaissances sur les tableaux en apprenant à utiliser quelques méthodes de plus, qui te seront probablement utiles pour la suite.

## Sommaire

## Includes

`includes` retourne `true` si l'argument correspond à un élément du tableau ou `false` sinon.


```js
const fruits = ["Kiwi", "Apple", "Pineapple"];
console.log(fruits.includes("Kiwi")); // true
console.log(fruits.includes("Banana")); // false
```

**🔬 Fais une expérience**

Regarde si le tableau contient la chaine "Lion" (avec un `console.log`).


```js live console
const animals = ["Lion", "Monkey", "Tiger"];
```

````solution
```javascript
console.log(animals.includes("Lion")); // true
```
````

## IndexOf

`indexOf` retournera la position (l'index) du premier élément dans le tableau qui correspond à l'argument. **Cette fonction retourne `-1` si et seulement si aucun élément ne correspond**.

```js
const fruits2 = ["Kiwi", "Apple", "Pineapple", "Kiwi"];
//                 0        1         2          3
console.log(fruits2.indexOf("Kiwi"));
// Will return 0 
```

**🔬 Fais une expérience**

En utilisant uniquement la méthode `indexOf` vue juste avant, essaie d'écrire ta propre version de la fonction `includes` qu'on appelera `arrayIncludes` et qui fonctionnera avec deux arguments au lieu d'un : Le premier sera un tableau arbitraire (*array*) et le second sera une valeur (*value*) à chercher dans le tableau. Comme la méthode originale `includes`, ta fonction devra renvoyer  `true` quand la valeur est dans le tableau et `false` sinon.


```js live console
function arrayIncludes(array, value) {

}
```

````solution
```javascript
function arrayIncludes(array, value) {
  return array.indexOf(value) !== -1;
}
```
````

## Join

`join` transformera un tableau en chaine de caractères. Tu peux spécifier quel caractère utiliser en tant que séparateur :

```js
const fruits = ["Kiwi", "Apple", "Pineapple"];
const fruitsString = fruits.join();
console.log(fruitsString);
// Kiwi,Apple,Pineapple

const fruitsString2 = fruits.join("-");
console.log(fruitsString2);
// Kiwi-Apple-Pineapple

const fruitsString3 = fruits.join("*");
console.log(fruitsString3);
// Kiwi*Apple*Pineapple
```

## Split

C'est un peu l'opération inverse de `join`. `split` part d'une chaine de caractères pour former un tableau. On donne en argument le caractère permettant de séparer les éléments.


```js
const fruitsString = "Kiwi,Apple,Pineapple"
const fruits = fruitsString.split(',');
console.log(fruits);
// [ 'Kiwi', 'Apple', 'Pineapple' ]
```


**🔬 Fais une expérience**

En utilisant `split` et `join`, essaie de transformer la chaine `Wild_Code_School` en  `Wild Code School` en seulement une ligne de JS.

```js live console
const withUnderscores = "Wild_Code_School";
//const withSpaces = ;
//console.log(withSpaces);
```

````solution
```javascript
const withSpaces = withUnderscores.split('_').join(' ');
```
````

## Slice

La méthode `slice` peut être utilisée pour créer une copie d'un tableau ou pour obtenir un sous-tableau. Cette méthode accepte deux paramètres optionnels permettant de délimiter la partie du tableau que l'on souhaite extraire. Par exemple :

```js
const fruits = ['pomme', 'banane', 'orange', 'kiwi', 'mangue'];

// Extraire du 2ème élément (index 1) jusqu'à la fin
console.log(fruits.slice(1)); 
// Résultat : ['banane', 'orange', 'kiwi', 'mangue']

// Extraire du 2ème (index 1) au 4ème élément (index 4 exclus)
console.log(fruits.slice(1, 4)); 
// Résultat : ['banane', 'orange', 'kiwi']

// Extraire les 2 derniers éléments avec un index négatif
console.log(fruits.slice(-2)); 
// Résultat : ['kiwi', 'mangue']

// Copier tout le tableau
console.log(fruits.slice()); 
// Résultat : ['pomme', 'banane', 'orange', 'kiwi', 'mangue']
```

La méthode `slice` fonctionne aussi sur les chaînes de caractères.

```js
const texte = "Bonjour le monde";

// Extraire à partir du caractère 8
console.log(texte.slice(8)); 
// Résultat : "le monde"

// Extraire de l'index 0 à 7 (exclus)
console.log(texte.slice(0, 7)); 
// Résultat : "Bonjour"

// Extraire les 5 derniers caractères
console.log(texte.slice(-5)); 
// Résultat : "monde"
```

```alert-info
`slice()` ne modifie pas le tableau/string original
```

## Splice

```alert-warning
Attention à ne pas confondre avec la méthode **slice**. Et oui, à une lettre près, tu n'auras pas le même résultat !
```
Cette méthode peut être utilisée pour supprimer et/ou insérer de nouveaux éléments à une position définie dans un tableau.

Comme arguments, `splice` prend dans cet ordre :
- L'index de l'élément à supprimer ou à remplacer (obligatoire)
- Le nombre total d'élément(s) à supprimer ou remplacer (optionnel)
- Le nouvel élément à insérer (optionnel)
- Le deuxième nouvel élément à insérer après le premier (optionnel)
- Tu peux en fait mettre un nombre infini d'éléments à insérer dans le tableau en renseignant d'autres arguments.

### Exemples
**Gérer une liste de tâches**
```js
const taches = ['réunion', 'appeler client', 'rapport', 'pause café', 'emails'];

// Supprimer une tâche terminée à l'index 2
taches.splice(2, 1);
console.log(taches); 
// Résultat : ['réunion', 'appeler client', 'pause café', 'emails']

// Ajouter une nouvelle tâche urgente en début de liste
taches.splice(0, 0, 'URGENT: bug à corriger');
console.log(taches); 
// Résultat : ['URGENT: bug à corriger', 'réunion', 'appeler client', 'pause café', 'emails']

```

**Modifier des scores de jeu**

```js
const scores = [150, 200, 180, 220, 195];

// Remplacer le 3ème score
scores.splice(2, 1, 250);
console.log(scores); 
// Résultat : [150, 200, 250, 220, 195]

// Supprimer les 2 derniers scores
scores.splice(-2);
console.log(scores); 
// Résultat : [150, 200, 250]
```

**Gérer des participants à un événement**
```js
const participants = ['Alice', 'Bob', 'Charlie', 'David', 'Emma'];

// Bob et Charlie annulent, remplacés par Frank
participants.splice(1, 2, 'Frank');
console.log(participants); 
// Résultat : ['Alice', 'Frank', 'David', 'Emma']

// Ajouter 2 nouveaux participants après Alice
participants.splice(1, 0, 'Sophie', 'Lucas');
console.log(participants); 
// Résultat : ['Alice', 'Sophie', 'Lucas', 'Frank', 'David', 'Emma']
```

**Manipuler des dates**

```js
const mois = ['janvier', 'février', 'mars', 'juin', 'juillet'];

// Oups, on a oublié avril et mai !
mois.splice(3, 0, 'avril', 'mai');
console.log(mois); 
// Résultat : ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet']
```

Pour t'exercer à utiliser `splice`, tu peux essayer de re-coder `push`, `pop`, `shift`, `unshift` avec !

## Concat

`concat` fusionnera deux tableaux en un seul :


```js
const equipeA = ['Alice', 'Bob', 'Charlie'];
const equipeB = ['David', 'Emma'];

const touteLequipe = equipeA.concat(equipeB);
console.log(touteLequipe); 
// Résultat : ['Alice', 'Bob', 'Charlie', 'David', 'Emma']

console.log(equipeA); 
// Résultat : ['Alice', 'Bob', 'Charlie'] (inchangé)
```

## Reverse

`reverse` mettra les premiers éléments en dernier et les derniers en premier.

```js
const playlist = ['Chanson A', 'Chanson B', 'Chanson C', 'Chanson D'];

playlist.reverse();
console.log(playlist); 
// Résultat : ['Chanson D', 'Chanson C', 'Chanson B', 'Chanson A']
```

## Sort

Si tu veux trier les éléments d'un tableau, tu peux utiliser la méthode `sort` :

```js
const fruits2 = ["Kiwi", "Apple", "Pineapple", "Kiwi"];
console.log(fruits2.sort());
// ["Apple", "Kiwi", "Kiwi", "Pineapple"]
```

````alert warning
Avec des nombres, le résultat peut être un peu surprenant :

```javascript
const numbers = [1, 20, 45, 2, 3, 5, 8];
console.log(numbers.sort());
// [1, 2, 20, 3, 45, 5, 8]
```
````

En effet, si tu appelle la méthode `sort` sans arguments, cette dernière va convertir en interne les éléments du tableau en chaine de caractère et faire un tri par **ordre alphabétique**. Si tu souhaites avec un tri dans l'**ordre numérique**, tu auras besoin de fournir un argument à `sort` : il s'agit d'une *fonction de rappel* (*callback function*) qui indique comment les éléments doivent être ordonnés. Tu peux lire [cette partie de la documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description) pour plus d'informations.


```js
const numbers = [1, 20, 45, 2, 3, 5, 8];
console.log(numbers.sort(function(a, b){
	return a - b;
}));

//syntaxe plus courte
console.log(numbers.sort((a, b) => a - b));

// [1, 2, 3, 5, 8, 20, 45]
```

## Resources

```ressource
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods
# MDN - Array
Tu pourras découvrir ici l'intégralité des méthodes disponibles pour manipuler les tableaux
```

## Challenge

Dans ce challenge, tu vas pouvoir pratiquer l'utilisation de méthodes communes sur les tableaux.

Tu vas démarrer avec cette chaine mystérieuse : `iu@zfiz)!uzqzf!snoi??alutargnocze&gfuzyafzygfzmgfu%f`

* Utilise `split` pour la transformer en tableau, de manière à ce que chaque lettre devienne un élément (une chaine vide devrait être utilisée en tant que séparateur).
* Découpe le tableau avec `slice`. tu dois extraire un sous tableau qui débute à partir du 15ième (inclus) jusqu'au 32ième élément (exclu). Conseil : rappelle-toi que les index commencent à 0 !
* Utilise `splice` pour remplacer 2 elements depuis l'index 5 par un unique élément : la lettre `t`.
* Inverse l'ordre des éléments avec `reverse`.
* Avec `join`, re-transforme à nouveau le tableau en chaine de caractères (en utilisant une chaine vide en tant que séparateur).

Voici ton point de départ :

```javascript
const mysteriousString = `iu@zfiz)!uzqzf!snoi??alutargnocze&gfuzyafzygfzmgfu%f`;
console.log('step 0 : ',  mysteriousString);

// step1 : split the myserious string it into an array, so that each letter becomes an item (the separator should be an empty string).
const step1 = mysteriousString; // TODO : change this line
console.log('step 1 : ', step1);

// step2 : get a slice of the array : take elements from the 15th included to the 32nd excluded (remember indexes start at 0 !)
const step2 = step1; // TODO : change this line
console.log('step 2 : ', step2);

// step3 : Splice the array to replace 2 elements from index 5 with only one element : the letter 't'
const step3 = step2.slice(); // making a copy
// TODO : call splice on step3 with the correct arguments
// step3.splice(...)
console.log('step 3 : ', step3);

// step4 : reverse the array
const step4 = step3; // TODO : change this line
console.log('step 4 : ', step4);

// step5 : each element of the array back into a string (the separator should be an empty string)
const step5 = step4; // TODO : change this line
console.log('step 5 : ', step5);
```

Poste ton code en solution quand tu auras terminé.

### Critères de validation

* [ ] Les transformations successives ont été réalisées comme décrites dans les instructions
* [ ] Les `console.log` ne sont pas modifiés
* [ ] Le message final à la dernière étape a du sens