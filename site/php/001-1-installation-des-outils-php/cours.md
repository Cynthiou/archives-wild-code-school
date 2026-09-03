```title-book
Introduction
```

Le but de cette quête est d'installer et configurer les outils nécessaires pour développer en PHP sous Linux (pour les autres OS, suivre les ressources plus bas). Les outils listés ci-dessous ne sont pas tous indispensables. Cependant, tous sont à connaître, et tu auras la possibilité d'en choisir d'autres par la suite.


# 🤓Objectifs

- ✅ Installer PHP et comprendre comment le configurer,
- ✅ Exécuter son premier script PHP sur sa machine.

## Qu'est-ce-que PHP ?


PHP (acronyme récursif pour PHP Hypertext Preprocessor) est un langage de programmation créé par Rasmus Lerdorf en 1994. C'est l'un des langages les plus utilisés pour créer des pages web dynamiques. C'est un langage *backend* car il s’exécute principalement côté serveur à l'aide d'un serveur HTTP. Il permet, entre autres, d'afficher des données dynamiquement, de traiter des formulaires, ou encore de se connecter à une base de données.
```ressource
https://www.php.net/manual/fr/intro-whatis.php
# Documentation officielle
```

![PHP Logo](images/001-php-logo.png)

## Installer PHP 🐘

```alert-warning
Avant d'aller plus loin, assures toi que tu n'as pas déjà PHP d'installé sur ta machine. Pour cela, tu peux tout simplement taper dans ton terminal `php --version`. Si tu as quelque chose comme `PHP 8.1...` qui s'affiche, alors tu peux directement passer au chapitre "Exécuter du PHP sur un serveur". Si tu n'as pas PHP **OU** si ta version est inférieure à la version 8.2, suis les procédures ci-dessous (choisis l'onglet correspondant à ton OS)

Si jamais tu possèdes un autre OS que ceux listés ci-dessous, ou d'une version plus ancienne, n'hésite pas à chercher sur ton moteur de recherche préféré comment installer ou mettre à jour PHP sur ta machine en particulier.
```

````tabs os
!--- Linux
Cette procédure fonctionne si tu n'as pas encore installé PHP OU si tu as une autre version antérieure déjà installée.

Tape dans ton terminal :

```bash
sudo add-apt-repository deb https://ppa.launchpadcontent.net/ondrej/php/ubuntu jammy main 
```

puis

```bash
sudo apt update
```

Tu viens de rajouter une nouvelle source où venir télécharger des versions plus récentes de PHP. Tu vas maintenant pouvoir taper :

```bash
sudo apt install php8.2
```

Tu viens d'installer PHP8.2, félicitations.

**Remarque :** si tu avais déjà une autre version de PHP installée, la nouvelle version est celle activée par défaut, mais l'ancienne n'est pas pour autant effacée. Les éventuelles extensions de PHP installées sur une précédente version ne sont pas disponible sur la nouvelle, il faut donc les réinstaller, voir la section dédiée plus loin dans las quête. Si tu souhaites changer la version *active*, il faut que tu tapes la commande suivante puis que tu choisisses la version de ton choix `sudo update-alternatives --config php`

>**Installation de PHP8.2 sur Ubuntu :**
>https://php.watch/articles/install-php82-ubuntu-debian

!--- Mac
Pour Mac, PHP est déjà installé par défaut sur certains modèle (mais pas forcément dans la bonne version), et il n'est plus installé sur les machines les plus récentes.

Si tu n'as pas PHP, ou pas la bonne version, jettes un œil ci-dessous.

>**How to install PHP latest version on MacOS via Homebrew?**
>https://crunchify.com/how-to-install-php-latest-version-on-macos/
!--- Windows

Pour Windows, commence par aller télécharger la dernière version PHP x64 Thread Safe sur https://windows.php.net/download/.

Créés ensuite à la racine du disque ou est installé ton système d'exploitation (généralement le disque C:\) un dossier `php` dans lequel tu extraira les fichiers contenus dans cette archive.

Fais ensuite une copie du fichier `php.ini-development`, qui doit donc être présent dans le dossier `C:\php\` puis renomme le `php.ini`.

Il te faudra ensuite ajouter PHP à ta variable d'environnement PATH. Pour ce faire, commence par taper 'environnement' dans la barre de recherche du menu démarrer en bas à gauche de ton écran, puis clique sur '*Modifier les variables d'environnement système*'.
Ensuite, dans l'onglet Avancé, sélectionne variables d'environnement. Clique sur Path, puis éditer, et ajoute une nouvelle ligne `C:\php`.

Redémarre ton ordinateur et, si tout s'est bien passé, tu devrais voir la version de PHP que tu viens d'installer en tapant dans ton terminal la commande `php --version`.

Tu peux aussi retrouver ces instructions détaillées en anglais dans le tutorial suivant :

>**How to Install PHP on Windows**
>https://www.sitepoint.com/how-to-install-php-on-windows/#installphp
>
>Concentre toi sur la partie "How to Install PHP", et arrête toi avant la "Step 5", tu n'as pas besoin d'Apache >pour le moment (voire même pas du tout). Si tu veux t'assurer que PHP est correctement installé, n'oublies pas : `php --version` dans ton terminal.
````

## Installer des extensions

PHP possède un grand nombre d'extensions (certaines étant activées par défaut, d'autre étant à installer en fonction des besoins). Au cours de ta formation, tu seras sans doute amené à installer certaines d'entre elles. 

````tabs os
!--- Linux

```sh
sudo apt install php8.2-XXX
```

où "XXX" correspond au nom de l'extension. Tu peux déjà en installer les suivantes qui te seront utiles par la suite :

```bash
sudo apt install php8.2-xml php8.2-mbstring php8.2-intl
```

!--- Mac
```bash
brew install php-XXX
```

où "XXX" correspond au nom de l'extension. Tu peux déjà en installer les suivantes qui te seront utiles par la suite :

```bash
brew install php-xml php-mbstring php-intl
```
!--- Windows

Pour Windows, les extensions installées doivent être activées en passant par le fichier php.ini.

Dans le fichier php.ini présent dans ton dossier d'installation PHP (`C:\php\` si tu as suivi les étapes précédentes), tu trouveras des lignes commençant par `extension=`, éventuellement commentées par un `;` en début de ligne. Pour activer une extension, il faut supprimer ce `;`.

Nous te recommandons d'activer les extensions suivantes, si ce n'est pas déjà fait, qui te seront utiles par la suite :
1. curl
1. mbstring
1. openssl
1. pdo_mysql

Une fois que tu as décommenté ces extensions pour les activer, enregistre php.ini. Tu peux maintenant fermer ce fichier et ignorer la dernière étape de cette quête,  *Configuration de PHP*, le fichier php.ini-development que tu as renommé précédemment étant déjà configuré selon nos besoins.
````


## Premières lignes de script 📜 


Tu vas écrire tes premières lignes de code PHP dans un fichier dont l’extension sera obligatoirement `.php`. Les fichiers PHP commencent avec une balise `<?php` sur la 1ère ligne, pour définir que le fichier contient du code PHP. De plus, chaque ligne d’instructions au sein du fichier doit se terminer par un point virgule `;`.

Crée un fichier `hello.php` qui contient les lignes suivantes :

```shell
<?php
echo 'Hello Wilders';
```

Il existe 2 manières d’exécuter du code PHP :

- Dans un terminal, avec la Command Line Interface (CLI) de PHP et le nom du fichier à exécuter : `php hello.php`

- Dans un navigateur web, en utilisant un serveur HTTP

Avec le CLI, seul le fichier demandé sera exécuté. Le résultat s'affiche directement dans le terminal. 

Tu peux tester avec ce que tu viens de faire. Dans ton terminal, déplace-toi à l'emplacement du fichier *hello.php* si ce n’est pas déjà fait. Pour en être sûr, exécute `ls` dans ton terminal, tu devrais y voir le fichier désiré. Exécute ensuite `php hello.php`. Ton **Hello wilder!** devrait apparaître dans ton terminal.
### Executer du PHP avec un serveur

Pour ton développement au quotidien, tu as besoin d'un serveur HTTP le plus simple d'utilisation et de configuration. Et ça tombe bien, car PHP intègre en interne son propre serveur HTTP !

> **Attention**, ce serveur interne à PHP n'est à utiliser que durant la phase de développement. En production, tu utiliseras un serveur plus robuste comme Apache ou Nginx.

Pour lancer le serveur interne de PHP, il suffit d'ouvrir un terminal, de se placer dans le dossier dans lequel tu veux exécuter ton code PHP et de taper la commande :

```shell
php -S localhost:8000
```

ensuite, tu n'auras plus qu'à ouvrir la page http://localhost:8000/hello.php dans ton navigateur pour afficher ton fichier PHP.

Par convention, le port 8000 est utilisé, mais tu pourrais lancer plusieurs serveurs PHP en même temps. Dans ce cas-là, tu devrais choisir des ports différents (8001, 8002...) si 8000 est déjà occupé. 

Lors de tes prochains développements, les fichiers accessibles via un navigateur Web depuis internet vont se trouver dans un dossier que, par convention, l'on nomme _public_. On y trouve, entre autres, le point _d'entrée_ de ton site. Le reste de ton code sera dans un dossier appelé, encore une fois par convention, _src_.

Pour éviter d'avoir à saisir http://localhost:8000/public/hello.php pour accéder à ton site, tu peux à la place saisir la commande

```shell
php -S localhost:8000 -t public/
```

l'option `-t` (target) demande en paramètre le dossier dans lequel se situent les fichiers PHP que tu veux lancer via ton navigateur.

Ces scripts feront eux-mêmes appel aux fichiers PHP dans les autres dossiers comme _src_, mais toi, tu n'auras jamais à les appeler directement via ton navigateur.

> Remarque : le serveur PHP n'est fonctionnel que le temps durant lequel il est lancé. Si tu le stoppes (avec `ctrl+C`, même sur Mac) ou si tu fermes le terminal à partir duquel il est lancé, le serveur s'arrêtera et tes pages PHP ne seront plus accessibles.

```resource
https://www.grafikart.fr/tutoriels/php/serveur-web-interne-778
# Le serveur HTTP interne de PHP
Une petite vidéo pour apprendre les différentes options de ce serveur
```

## Configuration de PHP ⚙️
````tabs
!--- Linux

Bravo, tu as installé PHP. Nous allons maintenant le configurer. Cette configuration se fait dans un fichier appelé *php.ini*. Tu peux localiser le fichier en exécutant la commande `php --ini`. Tu devrais avoir au moins une ligne avec ce résultat :

```sh
/etc/php/8.2/cli/php.ini
```
```alert-warning
Attention à bien choisir le fichier "cli" de la bonne version, car il y a un fichier _php.ini_ par environnement et par version de PHP. Par exemple, si Apache est installé sur ta machine, tu auras un fichier _php.ini_ dédié à cet environnement.
```

Dans le cas de PHP8.2, le fichier _php.ini_ utilisé par le CLI et le serveur HTTP de développement est le même : _/etc/php/8.2/cli/php.ini_


Par défaut, PHP n'affiche pas les erreurs (ce qui est très bien quand tu es en production).

Par contre, quand tu es en développement, ça peut t'intéresser ! Tu vas donc configurer le fichier _php.ini_ pour que ces erreurs s'affichent.

Ouvre le fichier en mode administrateur avec l'éditeur de ton choix.

Comme par exemple gnome-text-editor sur Ubuntu (si cet éditeur ne fonctionne pas, essaie en un autre comme nano qui s'ouvre directement dans le terminal) :

```shell
sudo gnome-text-editor /etc/php/8.X/cli/php.ini
```

Le fichier contient beaucoup de lignes appelées _directives_.

```alert-warning
Attention, tout le début du fichier contient principalement des commentaires (qui permettent de comprendre à quoi sert chacune de ces directives). Ignore toutes ces lignes qui commencent par un `;`, tu dois chercher et modifier les lignes **sans** point virgule au départ, sinon tu ne ferais qu'éditer un commentaire ce qui n'aurait aucun effet.
```


Trouve la ligne qui indique

```shell
display_errors = Off
```

et change-la en :

```shell
display_errors = On
```

De même, juste au-dessus, trouve la ligne

```shell
error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT
```

et modifie-la en :

```shell
error_reporting = E_ALL
```

Tu viens de dire à PHP d'afficher les erreurs en général (et tous les types d'erreurs).

Nous n'allons pas modifier d'autres directives pour le moment, mais tu seras sans doute amené à le faire de temps à autre.

Si le serveur PHP de développement tourne déjà, pense à le relancer pour que les modifications soient bien prises en compte. Dans la fenêtre de ton terminal où tourne ton serveur PHP, appuie sur les touches `Ctrl` + `C` pour couper le serveur, et relance la commande `php -S localhost:8000` comme précédemment.


!--- Mac

Bravo, tu as installé PHP. Nous allons maintenant le configurer. Cette configuration se fait dans un fichier appelé *php.ini*. Tu peux localiser le fichier en exécutant la commande `php --ini`. Tu devrais avoir au moins une ligne avec ce résultat :

```sh
/etc/php/8.2/cli/php.ini
```
```alert-warning
Pour les utilisateurs Mac et selon les modèles (puce Intel ou M1, M2) la commande `php --ini` peut donner `/usr/local/etc/php/8.2/php.ini` ou `/opt/homebrew/etc/php/8.2/php.ini`.
Il se peut également (selon ton OS) que tu ne trouves pas de fichier php.ini, mais un `php.ini.default`. Tu dois copier ce fichier et le renommer en supprimant l'extension `.default`.
```
```alert-warning
Attention à bien choisir le fichier "cli" de la bonne version, car il y a un fichier _php.ini_ par environnement et par version de PHP. Par exemple, si Apache est installé sur ta machine, tu auras un fichier _php.ini_ dédié à cet environnement.
```

Dans le cas de PHP8.2, le fichier _php.ini_ utilisé par le CLI et le serveur HTTP de développement est le même : _/etc/php/8.2/cli/php.ini_


Par défaut, PHP n'affiche pas les erreurs (ce qui est très bien quand tu es en production).

Par contre, quand tu es en développement, ça peut t'intéresser ! Tu vas donc configurer le fichier _php.ini_ pour que ces erreurs s'affichent.

Ouvre le fichier en mode administrateur avec l'éditeur de ton choix.

Comme par exemple nano (si cet éditeur ne fonctionne pas, essaie en un autre) :

```shell
sudo nano /etc/php/8.X/cli/php.ini
```
Astuce : sur nano, les raccourcis sont indiqué en bas de la fenêtre. Le symbole "^" signifie touche Controle.

Le fichier contient beaucoup de lignes appelées _directives_.

```alert-warning
Attention, tout le début du fichier contient principalement des commentaires (qui permettent de comprendre à quoi sert chacune de ces directives). Ignore toutes ces lignes qui commencent par un `;`, tu dois chercher et modifier les lignes **sans** point virgule au départ, sinon tu ne ferais qu'éditer un commentaire ce qui n'aurait aucun effet.
```


Trouve la ligne qui indique

```shell
display_errors = Off
```

et change-la en :

```shell
display_errors = On
```

De même, juste au-dessus, trouve la ligne

```shell
error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT
```

et modifie-la en :

```shell
error_reporting = E_ALL
```

Tu viens de dire à PHP d'afficher les erreurs en général (et tous les types d'erreurs).

Nous n'allons pas modifier d'autres directives pour le moment, mais tu seras sans doute amené à le faire de temps à autre.

Si le serveur PHP de développement tourne déjà, pense à le relancer pour que les modifications soient bien prises en compte. Dans la fenêtre de ton terminal où tourne ton serveur PHP, appuie sur les touches `Ctrl` + `C` pour couper le serveur, et relance la commande `php -S localhost:8000` comme précédemment.


!--- Windows
Pour Windows, tu peux ignorer cette partie si tu as suivi toutes les étapes de cette quête jusqu'ici et passer directement au challenge.

````

```resource
https://www.youtube.com/watch?v=UEteb-otzFM
# Comprendre le fonctionnement d'un serveur Web
En une courte vidéo.
```

## Challenge
### Vers tes premiers pas en PHP

![](http://images.innoveduc.fr/php_parcours/install/elephant.gif)
1. Créer un dossier **mon-premier-script-php** et se placer dedans avec un terminal.
1. Créer un fichier `hello.php` qui affiche **Hello Wilder!**.
1. Lancer le serveur interne de PHP.
1. Ouvrir l'URL [http://localhost:8000/hello.php](http://localhost:8000/hello.php) et vérifier que le navigateur affiche "Hello Wilder!".
1. Créer un fichier `info.php` pour qu'il affiche les informations de notre configuration de PHP avec la fonction [phpinfo()](http://php.net/manual/fr/function.phpinfo.php)
1. Ouvrir l'URL [http://localhost:8000/info.php](http://localhost:8000/info.php) et vérifier que le navigateur affiche une page avec les infos sur ton installation de PHP.
1. Mettre une capture d'écran de ta page [http://localhost:8000/info.php](http://localhost:8000/info.php) dans le champ réponse.

### Critères de validation
- La page affiche les informations de ton serveur PHP.