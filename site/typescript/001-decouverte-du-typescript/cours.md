Cette quête permet de découvrir le langage de programmation TypeScript, en commençant par comprendre son utilité par rapport au JavaScript, puis en découvrant sa syntaxe.
#### Objectifs
- Comprendre l'intérêt du TypeScript
- Installer les logiciels nécessaires pour développer en TypeScript
- Découvrir la syntaxe du TypeScript

### TypeScript, pourquoi ?

![](http://blog.soat.fr/wp-content/uploads/2016/03/ts_skyline_fglogo-1024x300.png)

TypeScript est un langage de programmation libre, développé par Microsoft. C'est un surensemble de JavaScript, ce qui signifie qu'il est 100% rétrocompatible avec JavaScript, ce qui veut donc dire que l'on peut coder en pur JavaScript dans un fichier « .ts » (extension d'un fichier TypeScript) sans aucun problème. Les fichiers « .ts » sont transformés en JavaScript grâce au transpileur TypeScript.

TypeScript ajoute de nombreuses fonctionnalités (ou en simplifie grandement l'utilisation) par rapport au JavaScript. Une des fonctionnalités les plus importantes est le typage des données, voyons un exemple qui montre les limites du JavaScript sur ce point.

Imaginons une fonction JavaScript qui renvoie l'addition de deux nombres :

```typescript
function add(a, b) {
    return a + b;
}

console.log(add(4, 2));
// 6
```

Notre fonction 'add' retourne bien le résultat additionné, tout va bien ! Testons maintenant d'envoyer des chaines de caractère à la place de nombres :

```typescript
console.log(add("4", "2"));
// 42
```

Cette fois le résultat n'est plus 6 mais "42", ce qui est logique, car le signe `+` entouré de deux chaines de caractères effectue une concaténation, et non une addition.

Pour rendre ce code plus propre et plus sécurisé, nous devrions donc ajouter une gestion d'erreur qui lancerait une exception si les paramètres ne sont pas des nombres, et nous devrions gérer ce cas avec un `try/catch` à l'endroit ou l'on appelle la fonction `add()` :

```typescript
function add(a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw "parameters must be numbers";
    }
    return a + b;
}

try {
    console.log(add("4", "2"));
} catch (e) {
    console.log("Error occured : " + e);
}

```

```typescript
Error occured : parameters must be numbers

```

Le TypeScript offre une solution plus simple et plus propre : il permet de spécifier le type attendu par la fonction :

```typescript
function add(a : number, b : number) {
    return a + b;
}

console.log(add(4, 2));
// 6
```

Avec cette syntaxe, il sera impossible d'envoyer autre chose qu'un nombre à la fonction, sinon le transpileur nous indiquera une erreur et ne générera pas le code JavaScript !

```resource
https://www.dunebook.com/typescript-vs-javascript-why-typescript-is-next-to-big-thing/
# JS vs TS - Why typescript is next to Big Thing
Pour en savoir plus sur les avantages de TypeScript
```

```resource
https://fr.wikipedia.org/wiki/TypeScript
# TypeScript - Wikipedia
En apprendre plus sur le projet TypeScript
```

### Installer et utiliser le transpileur TypeScript

![](images/002-installer-et-utiliser-le-transpileur-typescript.webp)

Tu souhaites pouvoir coder en typescript pas vrai ? Pour cela tu as besoin d'un outil capable d'interpréter le Typescript. Dans ce cas : un transpileur.

> Point culture: Compiler, c'est convertir un programme d'une forme compréhensible (haut niveau) vers une forme difficilement compréhensible (bas niveau). Transpiler, c'est convertir un langage haut niveau vers un autre langage haut niveau.

```typescript
sudo npm install -g typescript
```

Tu peux maintenant tester que TypeScript est bien installé avec cette commande :

```typescript
tsc -v
```

Tu devrais normalement voir le numéro de version de TypeScript, ce qui signifie que tu es prêt à coder en TypeScript !

Crée un fichier `add.ts` qui contient notre précédent code :

```typescript
function add(a : number, b : number) {
    return a + b;
}

console.log(add(4, 2));

```

Lance maintenant le transpileur TypeScript afin de créer le fichier JavaScript que l'on pourra lancer :

```typescript
tsc add.ts
```

Un fichier `add.js` est maintenant apparu, tu peux le lancer grâce à Node.js :

```typescript
node add.js
```

Et on voit le résultat `6` s'afficher dans le terminal comme prévu !

Regarde maintenant le contenu de ce fichier `add.js` :

```typescript
function add(a, b) {
    return a + b;
}

console.log(add(4, 2));

```

Surprise, tu te retrouves avec exactement le même code qu'au début ! C'est en fait tout à fait normal, étant donné que le JavaScript ne gère pas le typage de données. C'est le transpileur (la commande `tsc`) qui s'occupe de vérifier que le code est correct et que le bon type est envoyé à la fonction. En revanche, d'autres fonctionnalités de TypeScript peuvent générer un fichier JavaScript différent, par exemple pour les classes, qui sont traduites en JavaScript en prototypes, comme tu peux le voir dans le Playground en ressource plus bas.

Vérifions que TypeScript nous empêche de nous tromper de type en modifiant le fichier `add.ts` et en relançant la transpilation :

```typescript
function add(a : number, b : number) {
    return a + b;
}

console.log(add("4", "2"));
```

```typescript
tsc add.ts
```

Et effectivement, tsc affiche bien une erreur et empêche d'obtenir notre `add.js` :

```typescript
add.ts(5,17): error TS2345: Argument of type ``4`` is not assignable to parameter of type 'number'.
```

Je te conseille de jouer avec le Playground afin de bien comprendre la syntaxe du typage de données.

```resource
https://www.typescriptlang.org/play/index.html
# TypeScript Playground
Un bac à sable pour découvrir le TypeScript. Les exemples rajoutent à chaque fois des fonctionnalités de TypeScript et sont de plus en plus complexes, mais pour l'instant pas besoin d'aller plus loin que "Adding Types", nous reviendrons sur les classes dans la prochaine quête.
```

```resource
https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
# TypeScript in 5 minutes
Montre comment installer TypeScript, et ses fonctionnalités principales
```

## Challenge
### Tranformer du code JavaScript en code TypeScript

Voici un morceau de code JavaScript :

```typescript
function hello(name) {
    console.log("Hello " + name);
}

const firstName = "bob";

hello(firstName);
hello(firstName + " marley");

function concat(a, b) {
    return a + b;
}

const wcs = concat("Wild", concat("Code", "School"));
console.log(wcs);
```

Tranforme ce code pour qu'il devienne du TypeScript, en précisant le type des données où c'est nécessaire. Poste ensuite ton résultat via un gist.

### Critères de validation

* [ ] Les types doivent être spécifiés où il faut
* [ ] Le code doit pouvoir être transpilé, puis lancé sans problème et afficher le même résultat dans la console