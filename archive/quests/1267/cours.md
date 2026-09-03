## Objectifs

* Ajouter du JavaScript à tes sites web
* Afficher des **messages** dans la **console de ton navigateur**
* Faire des **calculs** et des **comparaisons** avec Javascript
* Écrire des commentaires dans ton code

## Pré-requis

Avoir validé la quête suivante :

```quests
1262
```

## Introduction

Précédemment, tu as **découvert ce qu'était le JS**.
**Avant de commencer à coder**, nous avons un petit truc à faire : apprendre la **syntaxe** !

**En langage humain**, un langage de programmation **possède un ensemble de règles** que tu dois suivre, sinon ton code ne fonctionnera pas 😛

**C'est parti !**

![image](https://storage.googleapis.com/quest_editor_uploads/OSZhgeX5LUDhtoBZQHBmc9Wypp5uAupT.png)

## Sommaire

## Comment ajouter du JS dans une page web?

Quels sont les ingrédients pour écrire du JS ?
La première chose dont tu as besoin est une page HTML. Ouvre ton IDE préféré et crée un nouveau **document HTML**. À la fin de ce document, juste avant de fermer le tag `</body>`, ajoutes un tag `<script>`

> ☝️ Il existe d'autres façons d'inclure du code Javascript dans ton HTML. Mais **ajouter la balise <script> à la fin** de ton document est la façon la plus simple, la plus sûre et la plus compatible de le faire. Par exemple, cela garantira que ton navigateur a chargé tous les éléments HTML avant d'exécuter ton code JS. Si tu es curieux, regarde [cette discussion](https://stackoverflow.com/questions/10808109/script-tag-async-defer).

**Ta page doit ressembler à cela:**

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>My website</h1>
    <script>
        // JAVASCRIPT GOES HERE!
    </script>
  </body>
</html>
```

C'est à cet endroit précis, entre les deux `<script>` tags que l'on va écrire notre code Javascript

Commençons notre programme "Hello World".

```jsx
<script>
   console.log("Hello, World!");
</script>
```

Bien joué ! Tu as juste créé ton premier code Javascript! Si tu ouvres ton fichier `index.html` dans ton navigateur, tu ne dois rien voir de particulier.
C'est normal, le message que tu as créé est uniquement visible dans **la console du navigateur**.

### Ajouter un fichier externe

Comme avec CSS, il est recommandé d'écrire du Javascript dans un fichier `.js` séparé.

Crée un nouveau fichier appelé `script.js`. Tu peux utiliser le nom de ton choix, mais par convention les fichiers JavaScript sont appelés `script.js`, `main.js` ou `index.js`.

Ensuite, **à l'intérieur de ce fichier , tu peux directement écrire du… Javascript** ! (obviously 😏)

```javascript
console.log("Hello, World");
```

Une fois que cela est fait, ajoute l'attribut `src` (comme tu ferais pour une image) à ta balise `script` et donne lui **le chemin de ton fichier JS**.

```jsx
<script src="script.js"></script>
```

## La console du navigateur

Nos navigateurs web ont beaucoup d'outils tous plus fantastiques les uns que les autres, qui sont là pour nous aider à comprendre **ce qui se passe dans nos applications**.

L'un d'eux est la **console**.
La console va certainement être **ton meilleur ami pour debugger** tes programmes. C'est là où tu pourras voir les messages d'erreurs, les avertissements ou même des choses que tu essaies par toi même pour vérifier une hypothèse (par example : "je ne suis plus très sûr si *"1" == 1* vaut *true* ou *false*" --> "je tape simplement cette expression dans la console de mon navigateur pour vérifier !") 

```resource
https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-developer-console#:~:text=You%20can%20also%20enter%20into%20the%20JavaScript%20Console%20by%20using,focus%20immediately%20to%20the%20Console.
# How to Use the Javascript Developer Console
Cet article va te donner quelques tips pour utiliser la console.
```

### Ouvrir la console

```tabs
!--- Chrome
Pour ouvrir la console dans Chrome, clic-droit dans la page > **inspecter**, puis clique sur l'onglet **Console**, *that's it* !
P.S. : Tu peux aussi simplement appuyer sur `F12`

![JS console Chrome](https://storage.googleapis.com/quest_editor_uploads/8nJ4x8sA4jl9twKLVN42tpvTbPU7dzKm.gif)

!--- Firefox

Pour ouvrir la console dans Firefox, clic-droit dans la page > **Examiner l'élément**, puis cliques sur l'onglet **Console**, *that's it* !
P.S. : Tu peux aussi simplement appuyer sur `F12`

![Firefox console Js](https://storage.googleapis.com/quest_editor_uploads/2N2LLHpxEkXzLZ0619LojhhqPs3Xe1SE.gif)
```

**Tu devrais voir "Hello, World!" s'afficher dans la console**

## Syntaxe de base

![image](https://storage.googleapis.com/quest_editor_uploads/XyyYiToB2SFnoq7cQHWmZaf4kRxH6l1O.jpg)

Le code Javascript **se termine avec un point-virgule _(semi-colon 🇬🇧 )_**
Le point-virgule indique la fin de la commande.

**Si tu oublies ce point-virgule**, Javascript va automatiquement l'ajouter pour chaque retour à la ligne. C'est le mécanisme **ASI _(Automatic Semicolon Insertion)_**. Mais il faut faire attention, en te fiant à ce mécanisme, tu peux rencontrer des erreurs qui seront alors difficile à repérer.

```resource 
https://dev.to/adriennemiller/semicolons-in-javascript-to-use-or-not-to-use-2nli
# Semicolons in JavaScript: To Use or Not to Use? Read some explanations and thoughts about how ASI works.
```

```javascript
console.log("Hello, world!");
console.log("Hi, world!");
```

### String

Les *strings* en Javascript sont des chaînes de caractères. Elles doivent être entourées de guillemets _(quotes 🇬🇧)_ (simple ou double)

```javascript
console.log("Hello, world");
console.log('Hello, world');
```

### Console.log

`console.log` est une **fonction Javascript** (on parlera un peu plus des fonctions dans un futur proche)

**Une fonction en Javascript est un bout de code réutilisable** que l'on peut **appeler** pour effectuer certaines opérations.

**Le Javascript et le navigateur** viennent avec tout un tas de **fonctions intégrées**, mais tu verras un peu plus tard que **tu peux écrire tes propres fonctions**.

`console.log` est une de ces **fonctions apportées par le navigateur** à travers ce qu'on appelle **les APIs web**.
Ces APIs web ne font pas partie des standards ECMAScript.

Pour utiliser `console.log`, tu as juste besoin de mettre ton message **entre les parenthèses**. Et parce que ton message est un **String**, il doit être entre des guillemets.

```javascript
console.log("your message")
```

#### Différents types de messages

On peut écrire du Javascript directement dans la console du navigateur pour tester du code.
Il y a différents types de message de console.
`console.log` est celui qu'on va utiliser le plus souvent, il affiche le message de la manière la plus simple.

Mais il y a aussi:

* console.info ⇒ pour afficher des informations
* console.error ⇒ pour afficher des erreurs
* console.warn ⇒ pour afficher des avertissements
* ...

**🔬 Expérimente**

Essaie d'écrire de multiples messages dans la console en utilisant ces commandes et vois ce que ça donne.

![Hello World console](https://storage.googleapis.com/quest_editor_uploads/flvI9MEwzrNzDLfyoCAIWaiU07UGJtjw.png)

### Erreurs

Si tu fais une erreur dans ton code, tu verras un message d'erreur apparaître dans la console, qui va t'aider à comprendre ce qu'il se passe.


Ex: Si j'écris `console.loge` au lieu de `console.log`

![Error js console](https://storage.googleapis.com/quest_editor_uploads/rMErMVq9kn7wXBzmzlsrL6oZkxkYczJo.png)Tu peux voir que la console me dit `console.loge is not a function`.

### Sensibilité à la casse

Javascript est **sensible à la casse.** **Écrire `console.log` et `console.Log` n'est pas la même chose !**
Souviens-t'en pour éviter des erreurs bêtes 😏

### Écrire des commentaires

Une chose importante en développement est de **documenter ton code**.
**Documenter ton code** va le rendre **plus lisible** pour toi, mais aussi pour les autres développeurs qui peuvent être amenés à travailler dessus.
Une façon de documenter est d'écrire des **commentaires**.
![Writing](https://storage.googleapis.com/quest_editor_uploads/hDka8783eE62aMKEc72vtotQavwj24Gf.png)
Les **commentaires de code** ne seront pas **affichés dans la page;** Ils sont là juste pour toi, te permettre de **prendre quelques notes** ou pour **expliquer ton code aux autres**.

**Commentaire simple ligne:**

```javascript
// This is a comment
```

**Commentaire multiple lignes:**

```javascript
/* This comment
is on multiple lines */
```

**Commentaire pour documentation:**

```javascript
/**
* This comment
* is used for
* documentation
*/
```

**🔬 Expérimente**

Écris quelques commentaires dans le fichier JS que tu as créé au début !

### Opérations arithmétiques

Javascript nous permet d'écrire des **operations arithmétiques.**
Faisons un peu de **maths** avec Javascript (oui oui des maths !)

![Mathematic board](https://storage.googleapis.com/quest_editor_uploads/0a3f1eJ7R2bWmfCE1uiycR6mCGI1LeCy.png)
**Addition:**

```javascript
1 + 1
// => 2
```

**Soustraction:**

```javascript
2 - 2
// => 0
```

**Multiplication**

```javascript
2 * 3
// => 6
```

**Division:**

```javascript
6 / 2
// => 3
```

**Modulo (donne le reste d'une division euclidienne):**

```javascript
6 % 2
// => 0
```

### Opération logiques : comparaisons

Tu peux aussi utiliser Javascript pour comparer des valeurs.
Javascript te donnera une réponse qui vaudra soit `true`, soit `false` (on appelle cela   un *booléen*).

![Apple comparison](https://storage.googleapis.com/quest_editor_uploads/pNjQUEGmCS6HKvRxDHPF0bZalgRQUDdq.png)

**Valeur égale et type égal**
Dans ce cas, on va regarder si les valeurs sont **strictement égales**.
Cela signifie que les **valeurs et types sont les mêmes**.

```javascript
1 === 1; // true ✅
"Bob" === "Bob"; // true ✅
"Bob" === "bob"; // false ❌
1 === "1"; // false ❌
```

**Valeur égale**
Dans ce cas, on regarde seulement **si les valeurs sont égales.**

```javascript
1 == 1; // true ✅
1 == "1"; // true ✅
```

**Différentes valeurs**
Dans ce cas, on regarde si les **valeurs sont différentes.**

```javascript
1 != 2; // true ✅
1 != "1"; // false ❌
```

**Valeur différente ou type différent**

Dans ce cas, nous vérifions si les **valeurs ou le type sont différents.**

```javascript
1 !== "1" ;
// true ✅

1 !== 1 ;
// faux ❌
```

**Supérieur à, supérieur ou égal**
Ici, on vérifie que  la **valeur est supérieure à une autre**
en ajoutant le symbole d'égalité `=` juste après le `>`, on peut vérifier si la valeur est supérieure ou égale.

```javascript
2 > 1; // true ✅
2 >= 2; // true ✅
```

Ça fonctionne aussi dans l'autre sens avec le symbole inférieur `<`.

```javascript
2 < 3; // true ✅
2 <= 2; // true ✅
```

**🔬 Expérimente**
Essaies de faire quelques comparaisons basiques dans ta console.

## Indentation

Comme en HTML, en CSS, ainsi que dans beaucoup d'autres langages de programmation, il est **essentiel** d'organiser son code pour en améliorer la lisibilité.

![identation](https://storage.googleapis.com/quest_editor_uploads/gl6FFxnAz0RRlXCvldltZMs8KMl2P23o.png)
Parfois, ton IDE (_Integrated development environment_, comme VSCode) va **automatiquement indenter ton code pour toi.**
Cela dit, il est essentiel de savoir formater son code correctement !
Généralement, en JS, à chaque fois que tu ouvres des accolades (_curly braces_ 🇬🇧), tu ajoutes une **tabulation** (ou deux espaces).

```javascript
const person = {
	name: "Bob", 
	age: 30,
	sayHello: function(){
		console.log("Hello");
	}
}
```

## Résumé

- Tu peux écrire du Javascript dans une page HTML en utilisant les tags `<script>`
- Tu peux écrire des messages dans la console de ton navigateur en utilisant `console.log`
- Tu peux faire des calculs basiques et comparer deux éléments en JS.