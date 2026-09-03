# Introduction

Maintenant que tu connais les bases de ce qu'est git et comment créer un dépôt GitHub, il est temps d'apprendre **comment nous pouvons utiliser git sur notre machine locale.**

![Github](images/001-github.jpg)

##

## 🤓 **À la fin de cette quête, tu seras en mesure de:**

* ✅ comprendre la **structure d'un dépôt Git local** (*répertoire de travail*, *répertoire intermédiaire*, *dépôt*)
* ✅ Initialiser un **dépôt Git local** sur ton ordinateur
* ✅ Sauvegarder **les modifications de fichiers** dans un dépôt Git local

- - -

# **Anatomie d'un dépôt local Git**

**Théorie**

Contrairement à GitHub, qui est un site Web, Git est un logiciel que tu installes sur ton ordinateur.

*Puisque tout se passe sur ton ordinateur, nous parlons de Git local.*

Voici la structure typique d'un dépôt sur ta machine locale selon Git :

![image](images/002-image.png)
*Les flèches `add`, `commit` et `checkout` correspondent aux commandes Git que tu verras plus tard, ne t'en préoccupe pas trop pour le moment !*

Cette vidéo t'expliquera plus en détail la structure:

```youtube
https://www.youtube.com/watch?v=n-p1RUmdl9M
```

**Entraine toi**

Tu as peut-être déjà remarqué que le flux de travail Git (créer / modifier un fichier, valider pour enregistrer la modification) ressemble beaucoup à ce que tu as fait sur GitHub dans la quête précédente.

Sauf que GitHub propose une interface utilisateur graphique (*GUI* en abrégé), tandis que Git s'exécute en ligne de commande (*CLI* en abréviation anglaise), c'est-à-dire dans ton terminal.

Tu vas donc répéter ce que tu as déjà fait sur GitHub, mais cette fois sur ta machine locale!
Avant tout, tu vas installer git sur ton système.

`````tabs
!--- Linux
Sur Linux, git pourrait déjà être installé. Vérifie en entrant cette commande dans ton terminal => `git --version` (Le résultat doit être git version 2.**.*)

Sinon, tu vas devoir l'installer par toi même.
Clique sur ce lien (https://git-scm.com/download/linux)

Dans ton terminal, vérifie ton installation en tapant **git --version**

Puis dans ton terminal, tu vas renseigner ton nom d'utilisateur et ton email (les mêmes que sur la plateforme github)

1. Renseigne ton nom d'utilisateur: `git config --global user.name "FIRST_NAME LAST_NAME"`
2. Renseigne ton email : `git config --global user.email "MY_NAME@example.com"`
3. Ajoute aussi cette configuration (c'est un peu tôt pour t'expliquer en détail mais si tu ne le fais pas git va te poser la question quand tu essaieras de récupérer du code distant) `git config --global pull.rebase false`
4. Enfin, termine par cette dernière configuration, qui configure git pour utiliser le nom "main" et non plus "master" comme branche par défaut, ce qui te facilitera la vie quand tu vas utiliser Github (qui lui utilise le nom "main") `git config --global init.defaultBranch main`



!--- Mac
Pour installer git sur Mac, clique sur ce lien (https://git-scm.com/download/mac)

Dans ton terminal, vérifie ton installation en tapant **git --version**

Puis dans ton terminal, tu vas renseigner ton nom d'utilisateur et ton email (les mêmes que sur la plateforme github)

1. Renseigne ton nom d'utilisateur: `git config --global user.name "FIRST_NAME LAST_NAME"`
2. Renseigne ton email : `git config --global user.email "MY_NAME@example.com"`
3. Ajoute aussi cette configuration (c'est un peu tôt pour t'expliquer en détail mais si tu ne le fais pas git va te poser la question quand tu essaieras de récupérer du code distant) `git config --global pull.rebase false`
4. Enfin, termine par cette dernière configuration, qui configure git pour utiliser le nom "main" et non plus "master" comme branche par défaut, ce qui te facilitera la vie quand tu vas utiliser Github (qui lui utilise le nom "main") `git config --global init.defaultBranch main`



!--- Windows
Pour Windows, tu dois installer un nouveau terminal : Git Bash.

Peut-être que tu l'as déjà installé sur ta machine. Si c'est le cas, tu peux passer à la suite. Sinon, clique sur ce lien (https://gitforwindows.org/) puis sur Download, exécute l'installeur et suis les instructions suivantes :

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
Dans ton terminal, vérifie ton installation en tapant **git --version**

Puis dans ton terminal, tu vas renseigner ton nom d'utilisateur et ton email (les mêmes que sur la plateforme github)

1. Renseigne ton nom d'utilisateur: `git config --global user.name "FIRST_NAME LAST_NAME"`
2. Renseigne ton email : `git config --global user.email "MY_NAME@example.com"`
3. Ajoute aussi cette configuration (c'est un peu tôt pour t'expliquer en détail mais si tu ne le fais pas git va te poser la question quand tu essaieras de récupérer du code distant) `git config --global pull.rebase false`
4. Enfin, termine par cette dernière configuration, qui configure git pour utiliser le nom "main" et non plus "master" comme branche par défaut, ce qui te facilitera la vie quand tu vas utiliser Github (qui lui utilise le nom "main") `git config --global init.defaultBranch main`
`````



# ☝️Résumé

* Git est un système de contrôle de version
* Git t'aide à conserver l'historique de tes fichiers et à travailler en équipe
* Github est une plateforme en ligne qui propose des services tels que **l'hébergement de code** mais c'est aussi un réseau social où tu peux participer à des projets open source, partager et découvrir de nouveaux projets.

- - -

Pour réaliser le challenge retiens bien ce qui suit :

* Quelle commande te permet de transformer un dossier classique en un projet git local ? `git init`
* Quelle est la commande pour placer un fichier dans le répertoire intermédiaire (staging) ? `git add`
* Quelle commande utilises tu pour réaliser un commit ? `git commit`

# 💪 Challenge

1. Crée un nouveau répertoire nommé `wild-git` et déplace-toi dedans depuis ton terminal
2. Quand tu t'es assuré d'être dans le bon dossier, initialise un nouveau dépôt git pour transformer ton dossier en un projet git local
3. Crée un fichier vide nommé "wild.txt"
4. Ajoute ce fichier à l'index de git (aussi appelé *staging*)
5. Commite ce fichier avec le message suivant "At Wild Code School, we code without shoes."
6. Écrit la commande suivante `git log -p` et colle le résultat en solution du challenge

# 🧐 Critères de validation :

* [ ] La solution contient le message suivant : "At Wild Code School, we code without shoes."