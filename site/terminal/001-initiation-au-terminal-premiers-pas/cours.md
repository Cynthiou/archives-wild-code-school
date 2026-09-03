## Objectifs

* Naviguer dans les dossiers de ton ordinateur.
* Créer et gérer des fichiers et dossiers.
* Effectuer des tâches simples de manière efficace et uniforme, quel que soit ton système d'exploitation.

## Introduction

Pourquoi le terminal ?

Le terminal te permet de donner des instructions précises à ton ordinateur à l'aide de commandes. Cela t’évite les pièges des interfaces graphiques, souvent différentes d'un système à l'autre, et te permet de travailler de manière standardisée.

**C'est fait pour toi !** Si tu n’as jamais utilisé un terminal auparavant, cette quête te guidera pas à pas. Suis simplement les étapes, et n'hésite pas à demander de l'aide à un camarade ou à un formateur si besoin.

## Sommaire

## Étape 1 : Ouvrir le terminal

Apprenons à ouvrir le terminal sur ta machine.

`````tabs
!--- Linux

1. Utilise le raccourci **Ctrl + Alt + T** (fonctionne sur la plupart des distributions).
2. Si cela ne fonctionne pas, cherche "Terminal" dans ton menu Applications.

!--- macOS

1. Clique sur l’icône de **Spotlight** (la loupe en haut à droite de ton écran ou tape **Cmd + Espace**).
2. Tape `Terminal` et appuie sur **Entrée**.

!--- Windows
Pour Windows, le plus simple est d'utiliser un nouveau terminal : Git Bash. Cette version du terminal te servira aussi quand tu utiliseras l'outil Git plus tard en formation : tu vas gagner du temps :)

Clique sur ce lien (https://gitforwindows.org/) puis sur Download, exécute l'installeur et suis les instructions suivantes :

````stepper
# Etape 1
Accepte la licence d'utilisation.
# Etape 2
Coche les options suivantes :
 - Windows Explorer Integration
    - Git Bash Here
 - Git LFS (Large File Support)
 - Associate .git* configuration files with the default text editor
 - Associate .sh files to be run with Bash
 - Add a Git Bash Profile to Windows Terminal
 - Scalar (Git add-on to manage large-scale repositories)
# Etape 3
Choisis : "*Use Visual Studio Code as Git's default editor*".
# Etape 4
Coche "*Override the default branch name for new repositories*" et dans le champ de texte garde l'option proposée `main`.
# Etape 5
Coche l'option recommandée "*Git from the command line and also from 3rd-party software*".
# Etape 6
Coche l'option "*Use bundled OpenSSH*".
# Etape 7
Coche l'option "*Use the OpenSSL library*".
# Etape 8
Coche l'option "*Checkout as-is, commit Unix-style line endings*".
```alert info
Cette option change le caractère invisible utilisé en fin de ligne qui est le CRLF pour Windows ("\r\n") et le LF pour Linux et Mac ("\n").
Sur un projet de groupe, avec des contributeurs pouvant avoir des OS différents, il est souvent préférable de configurer git localement pour faire des commits de type LF. Pour ce qui est du checkout, le "as-is" permettra d'éviter d'avoir des erreurs sur toutes les lignes sous Windows si un linter est configuré pour demander des fins de ligne en LF.
```
# Etape 9
Coche l'option "*Use MinTTY (the default terminal of MSYS2)*".
# Etape 10
Garde l'option par défaut ("*Default (fast-forward or merge)*").
# Etape 11
Sélectionne "*None*", il n'est pas utile d'installer le Git Credential Manager car tu verras comment mettre en place l'authentification par clé SSH par la suite.
# Etape 12
Coche les deux options :
 - Enable file system caching
 - Enable symbolic links
# Etape 13
Coche "*Enable experimental support for pseudo consoles*". Tu peux aussi si tu le souhaites cocher la seconde option "*Enable experimental built-in fyle system monitor*".
```alert error
Il est très important à ce stade de bien cocher la première option, sinon tu risques d'avoir des problèmes pour utiliser certaines fonctionnalités et devoir préfixer la majorité de tes commandes par winpty. En activant le support expérimental, tu pourras utiliser normalement le terminal comme sur un système Unix.
```
# Etape 14
Procède à l'installation.
````

Si tu utilises `cmd` ou `PowerShell` plutôt que `Git Bash`, certaines commandes comme `ls` ou `touch` nécessiteront des adaptations (voir les notes dans les sections suivantes).
`````

**Mini-challenge :** Ouvre le terminal sur ta machine et tape la commande suivante pour afficher ton système d'exploitation :

```bash
uname -a
```

## Étape 2 : Premiers pas avec les commandes de base

Voici quelques commandes simples pour explorer ton ordinateur.

### Afficher le dossier actuel

Tape :

```bash
pwd
```

Cela montre où tu te trouves dans l’arborescence des fichiers.

### Voir le contenu d’un dossier

Tape :

```bash
ls
```

(Sur Windows sans WSL, utilise `dir`.)

### Se déplacer dans un dossier

Tape :

```bash
cd nom_du_dossier
```

Exemple :

```bash
cd Documents
```

Pour revenir en arrière :

```bash
cd ..
```

**Mini-challenge :** Navigue jusqu’à ton dossier "Documents" ou équivalent, puis reviens au dossier précédent.

## Étape 3 : Créer et gérer des fichiers

### Créer un dossier

Tape :

```bash
mkdir MonSite
```

Cela crée un nouveau dossier nommé `MonSite`.

```alert-warning
La casse (minuscule ou majuscule, avec ou sans espace entre les mots...) est importante. Dans cet exemple, le dossier créé s'appelle `MonSite` avec un `M` et un `S` majuscules, et les 2 mots sont collés (pas d'espace entre les 2).

Tu dois faire attention à suivre chaque détail pour éviter des erreurs. 
```

### Entrer dans un dossier

Tape :

```bash
cd MonSite
```

### Créer un fichier

Tape :

```bash
touch index.html
```

(Sur Windows sans WSL, utilise `echo > index.html`.)

### Modifier un fichier

Tape :

```bash
nano index.html
```

(Si `nano` n’est pas disponible, utilise un éditeur comme `vim`.)

Ajoute ce contenu :

```twig
<!doctype html>
<title>Hello World</title>
<h1>Hello World</h1>
```

Ensuite, sauvegarde et quitte. Avec `nano`, fais **Ctrl + O**, puis **Entrée**, puis **Ctrl + X** (avec `vim`, **Echap**, puis **:wq** et **Entrée**).

**Mini-challenge :** Vérifie que le fichier `index.html` a bien été créé en listant le contenu du dossier avec `ls`.

## Étape 4 : Ouvrir un fichier dans le navigateur

### Trouver le chemin absolu

Tape :

```bash
pwd
```

Copie le chemin affiché.

### Ouvrir le fichier

Ajoute le nom du fichier au chemin, puis ouvre-le dans ton navigateur. Par exemple :

- Sur Linux :
  - Tape dans ton navigateur : `/home/ton_nom/MonSite/index.html`.
- Sur macOS :
  - Tape dans ton navigateur : `/Users/ton_nom/MonSite/index.html`.
- Sur Windows :
  - Tape dans ton navigateur : `C:\Users\ton_nom\MonSite\index.html`.

**Mini-challenge :** Ouvre `index.html` dans ton navigateur et vérifie que "Hello World" s’affiche.

---

## Résoudre les erreurs

Voici des solutions aux problèmes courants :

- **Commande non reconnue** : Vérifie l’orthographe et si le terminal est ouvert au bon endroit.
- **Fichier introuvable** : Assure-toi d’être dans le bon dossier en utilisant `pwd` et `ls`.

## Étape finale : Défi collaboratif

- **Ta mission :** Vérifie que ton fichier `index.html` fonctionne. Ensuite, trouve un camarade et teste son fichier.
- Si l’un de vous rencontre un problème, travaillez ensemble pour trouver une solution.

**Bravo !** Tu as réalisé tes premiers pas avec le terminal. Tu peux démarrer ton apprentissage dans de bonnes conditions !