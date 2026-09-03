## Objectifs

* Installer node
* Configurer un premier projet

## Pré-requis

`````stepper
# Connaitre les bases du langage JavaScript
```javascript
let order = null;
let isConfirmed = false;

while (isConfirmed === false) {
  order = prompt("thé ou café ?");

  isConfirmed = confirm(`confirmer votre commande : ${order}`);
}

alert(`votre ${order} sera prêt dans une minute`);
```
# Être à l'aise avec l'utilisation du terminal
```bash
mkdir my-project
cd my-project
```
# Savoir installer un logiciel sur ton système
````tabs
!--- Ubuntu
```bash
sudo apt install <something>
```
!--- Mac OS
```bash
brew install <something>
```
!--- Windows
Télécharger le programme d'installation et double-cliquer dessus.
````
`````

## Introduction

Tu sais exécuter du JavaScript dans ton navigateur, en utilisant une balise `<script>` ou en tapant du code dans la console de l'inspecteur.

Dans cette quête, tu vas utiliser un environnement d'exécution *en dehors* du navigateur : **Node.js**. Avec "node", tu vas exécuter du JavaScript dans ton terminal et créer tes propres **packages**.

## Sommaire

## Pourquoi Node.js ?

Node.js a été créé en 2009 par Ryan Dahl. Aujourd'hui, il est utilisé par des millions de développeurs pour construire des applications web et des services. Fun fact : Netflix et LinkedIn utilisent Node.js pour leurs serveurs !

## Installation

Commence par l'installer sur ta machine et par découvrir son écosystème en suivant cette quête :

```quests
1334
```

```quiz
true|||true|||true
# Quelle est la commande pour vérifier la version de Node.js installée ?
[x] node --version
[] apt version node
# Quelle est la commande pour initialiser un projet Node.js ?
[x] npm init
[] npm run start
```

### Configurer son environnement

Comprendre la notion d'environnement de développement est crucial. Suis cette quête pour apprendre à configurer ton environnement :

```quests
1024
```

```quiz
true|||true|||true
# Quel est le rôle du fichier .env dans un projet ?
[x] définir des variables d'environnement
[] écrire des scripts dans le langage env
# Comment exécuter un fichier JavaScript avec Node.js ?
[x] avec la commande "node"
[] avec la commande "node-exec"
```

## Faire du code de qualité

La qualité du code est essentielle pour tout projet. Apprends comment écrire du code propre et maintenable en suivant cette quête :

```quests
1387
```

```quiz
true|||true|||true
# Qu'est-ce qu'un linter ?
[x] un outil qui analyse le code source pour détecter les erreurs, les vulnérabilités et les problèmes de style afin d'améliorer la qualité du code
[] un outil qui affiche plein de messages dans la console alors que mon code marche
# Comment configurer Biome dans un projet Node.js ?
[x] npx @biomejs/biome init
[] Créer un fichier biomerc.json
```

## Utiliser des packages existants

Le site https://www.npmjs.com/ référence beaucoup de bibliothèques (des packages) publiés par des développeurs et des développeuses du monde entier pour te faciliter la vie. 

```quests
1797
```

Pense à d'autres projets simples où tu pourrais utiliser des paquets NPM. Note tes idées pour de futurs projets.

## Pour aller plus loin

Ta future entreprise peut utiliser une des alternatives à `npm`, comme `pnpm` ou `yarn`. D'autres concepts avancés se cachent dans ton fichier `package.json`. Si tu veux les découvrir maintenant, tu peux regarder cette quête :

```quests
1820
```

## Challenge

Dans ce défi, tu devras installer un paquet appelé CowSay. C'est un paquet qui affichera dans ton terminal une petite vache avec le message de ton choix :

```
 ______________________________
< Hello I'm Romain from Reims! >
 ------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

### Étapes

1. Crée un nouveau dossier avec le nom de ton choix et initialise un projet dedans avec `npm`.

```alert-warning
Tu vas utiliser pour cet exercice la syntaxe [ESM](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules) : `import` pour importer un module, et `"type": "module"` dans ton `package.json`.
```

2. Crée un fichier `.env` et un fichier `index.js` dans ton projet.
3. Dans ton fichier `.env`, crée une variable `NAME` avec ton nom et une variable `CAMPUS` avec le nom de ton campus.
4. Installe le module `cowsay`. Lis la [documentation](https://www.npmjs.com/package/cowsay) pour apprendre à l'utiliser dans ton fichier `index.js`.
5. Exécute ton fichier `index.js` à l'aide de la commande `node` et assure-toi que la vache affiche un message qui utilise les informations de ton fichier `.env`.
6. Crée maintenant un fichier `.gitignore` afin d'ignorer ton dossier `node_modules` et ton fichier `.env`. Push ton travail sur GitHub. Partage le lien du repo comme solution du challenge.

### Critères de validation

* [ ] Le module `cowsay` est installé et correctement utilisé.
* [ ] Le dossier `node_modules` et le fichier `.env` ne sont pas dans le dépôt GitHub.

## Une solution possible

```javascript
import { say } from "cowsay";

const { NAME, CAMPUS } = process.env;

console.log(say({ text: `Hello I'm ${NAME} from ${CAMPUS}!` }));
```