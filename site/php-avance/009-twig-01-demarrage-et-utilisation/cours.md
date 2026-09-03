**⚠️ Avant de commencer cette quête, tu dois avoir terminé la quête suivante :**
​

```quests
1624
```


```title-book
Introduction
```

Jusqu'à maintenant, tu insérais du PHP directement dans tes pages HTML. Cependant, cette approche reste souvent peu lisible et laborieuse à écrire, par exemple :

```php
<ul>
<?php foreach ($contacts as $contact) : ?>
<li>
    <a href="show.php?id=<?= $contact['id'] ?>"><?= $contact['firstname'] . ' ' . $contact['lastname'] ?></a>
</li>
<?php endforeach; ?>
<ul>

```

Dans un souci de séparation et d’architecture du code, nous avons besoin dorénavant de bien compartimenter notre code. 
	
Pour réaliser cela, des moteurs de templates ont été créés. Twig (développé par l’équipe de Symfony) est aujourd’hui l’un des plus populaires. 

Un moteur de template est un outil qui va vous permettre de simplifier la syntaxe de la partie front de votre site. Dans notre cas, il va permettre la séparation entre le HTML et le PHP. 

## 🤓 À la fin de cette quête, tu seras capable de :
- ✅ Comprendre le fonctionnement d'un moteur de _templates_
- ✅ Utiliser Twig


# Introduction aux moteurs de *templates*

En développant votre application web, vos pages vont devenir de plus en plus complexe. De plus en plus de code logique (validation et gestion des formulaires, requêtes SQL, *etc.*) se mélangera avec votre affichage HTML (les vues de votre site).

Si vous souhaitez qu’un designer ou qu’un intégrateur travaille dessus, ces derniers devront faire un travail de séparation qui ne correspond pas aux taches de leur métier. 

La solution va donc être de séparer les vues de la logique. Cette séparation est utilisée dans l'architecture MVC (Modèle, Vue, Contrôleur) que tu vas largement utiliser.

Afin de rendre nos vues les plus adaptées à une potentielle modification d’un designer ou d’un intégrateur, nous avons choisi d’utiliser un moteur de template et, dans notre cas, Twig. D’autres existent tel que Blade ou encore Smarty.

Twig possède sa propre syntaxe, qu’il va traduire à l’exécution en HTML / PHP. Enfin, la dernière étape reste inchangée. Le code PHP est interprété, et seul du HTML est envoyé à ton navigateur (le code source HTML que tu peux voir).


Les avantages des moteurs de _templates_ sont multiples :  

- Lisibilité : la syntaxe est souvent plus compréhensible que le PHP "pur", et de ce fait plus facile à apprendre et/ou lire par des intégrateurs/graphistes qui ne connaîtraient pas la syntaxe du PHP.

- Facilité : le code est plus facile à écrire et apporte des raccourcis, des fonctionnalités difficilement adaptables en PHP pur, sans écrire beaucoup de code.

- Meilleure séparation du code : il n'y a plus directement de PHP dans les fichiers de vue. La maintenabilité s'en trouve généralement améliorée. En effet, les *templates* ne sont pas censés contenir de logique complexe, ce sont juste des réceptacles pour accueillir des données dynamiques.
- Héritage : comme pour la POO, il est possible de mettre en place un système d'héritage entre _templates_. Cela facilite la réutilisabilité de certaines parties, et limite grandement les répétitions d'une vue à l'autre. Un gain de temps non négligeable !

- Système de cache : les moteurs de _templates_ modernes sont accompagnés d'un système de cache performant qui assure un affichage des pages optimisé en terme de rapidité.

- Sécurisation des variables : Au revoir les `htmlentities()` et autres fonctions d'échappement. Tout cela est pris en compte automatiquement. 

- Les _templates_ peuvent également être utilisés pour générer des e-mails HTML, du XML, des PDF, _etc_.

```resource
https://eilgin.github.io/php-the-right-way/#templating
# Intérêt d'utiliser des moteurs de templates en PHP
Pour information, l'ensemble de ce site "La bonne manière en PHP" est une mine d'or d'informations sur tout ce qu'un développeur PHP doit connaître.
```

### Intégrer Twig dans un projet PHP

Bien qu'initialement créé pour être utilisé dans un projet Symfony, Twig, comme beaucoup d'autres *composants* ou *librairies,* peut être installé indépendamment et utilisé dans tout type de projet. Cela signifie que tu peux utiliser les capacités de Twig dans un projet qui n'implémente aucun *framework*.

```alert-info
Avant de commencer, tu vas récupérer du code depuis un dépôt Github pour réaliser cette quête.
Rend-toi sur <https://github.com/WildCodeSchool/quest-twig> et clic sur "Use this template" afin d'obtenir un nouveau *repository* personnel.
Ensuite clone ce nouveau dépôt personnel dans un répertoire local de ta machine. 
Et voilà tu as à présent un micro projet qui intègre le moteur Twig.
```

```alert-warning

Twig est un moteur de rendu pour PHP, qui normalement s'installe via Composer. 



Si l'appel à Twig dans les fichiers est déjà en place, il faut néanmoins demander à composer de télécharger le code PHP de cette librairie dont on dépend maintenant. Depuis la racine du dossier tu dois donc exécuter `composer install`. Tu vois ainsi les fichiers se télécharger.
```

```alert-error
Il se peut qu'à l'installation de Twig via composer, on t'indique une erreur avec comme raison une "extension php manquante". Il s'agit surement de la librairie `php-xml`. Comme il s'agit d'une extension PHP, celle ci ne peut s'installer via composer. Elle nécessite plutôt une installation via brew (Mac OS), apt (Linux) ou via des fichiers `.dll` (Windows) [Installer une extension PHP sous Windows](https://www.php.net/manual/fr/install.pecl.windows.php)
```

```alert-success
Mais tout va bien se passer. Promis. 🤓 
```



Revenons au repository que tu viens de cloner. Une configuration basique de Twig y est déjà faite.

Deux fichiers sont présentés ici : 
- Le fichier de configuration Twig présent dans ton dossier `/config`.
- Le fichier index.php présent dans ton dossier `/public` qui est ta page d'accueil accessible à l'utilisateur. 

##### `config/twig.php`:

```php

// tu indiques ici à Twig où aller chercher tes fichiers de vues
$loader = new Twig\Loader\FilesystemLoader(__DIR__ . '/../src/View');
$twig = new Twig\Environment($loader, ['debug' => true]);

```

- Le loader (La classe `Twig\Loader\FilesystemLoader`) est un objet que tu vas utiliser afin de configurer ton environnement. Celui ci demande un paramètre, qui sera le répertoire dans lequel tes fichiers de vues en `*.twig` se trouveront.

- Un nouvel objet de classe `TwigEnvironment` sera ensuite créé. Celui ci prend l'objet loader en paramètre et sera accessible à tous les autres fichiers qui utiliseront un `require` de ce fichier de configuration

##### `public/index.php`:

```php

// Get a $twig object from this file.
require_once __DIR__ . '/../config/twig.php';

$name = 'Wilder';

echo $twig->render('home.html.twig', ['name' => $name]);

```

- Enfin, pour afficher un fichier de vue, tu utiliseras la méthode `render` de ton objet `TwigEnvironment` précédemment créé. Celle ci prend en premier paramètre le nom du fichier de vue (qui doit se trouver dans le répertoire configuré dans le loader). En second paramètre, tu passeras à la méthode render un tableau contenant toutes les variables que tu souhaites afficher dynamiquement dans ta vue.

```alert-info
# Note importante
Le fichier de vue ne sera plus un fichier _.php_ mais un fichier d'extension ***.html.twig***. C'est une convention. Tu pourrais mettre n'importe quelle extension, tant que Twig arrive à accéder à ton fichier, il le lira et interprètera le contenu.
```

# Utiliser Twig

### La syntaxe de base de Twig

Commence par regarder cette nouvelle vidéo pour en apprendre davantage sur la syntaxe de base de Twig (déclaration de variables, `if`, `for`), _etc._

```youtube
https://www.youtube.com/watch?v=mimZikLd6NA
```

N'hésite pas à parcourir également la [documentation officielle](https://twig.symfony.com/doc/3.x/) qui reprend les syntaxes des structures de contrôle, mais également les nombreux filtres existants qui te feront gagner beaucoup de temps.

### Composition d'une page

```alert-warning
Avant de commencer à coder, lis bien les explications ci-dessous 👇 
```

Afin de créer un template Twig, tu peux partir d'une page contenant une structure HTML basique.
Ensuite tu peux y insérer des éléments dynamiques, et des structures de contrôles (conditions, boucles...)
Tout ça, tu viens de le voir dans la vidéo juste avant.

Nous allons te montrer comment passer à tes templates Twig, des variables définies dans tes fichiers PHP. 

Lors de l'appel à la vue (au template Twig), tu utilises la fonction `render()`. Et bien, tout simplement, il faudra ajouter en deuxième paramètre de cette fonction (le premier étant le chemin du fichier Twig concerné), un tableau associatif contenant la liste des variables que tu souhaites utiliser dans ton template. 

Voici un exemple avec la variable `$name` : 

```php

// Get a $twig object from this file.
require_once __DIR__ . '/../config/twig.php';
$name = 'Wilder';
echo $twig->render('home.html.twig', ['name' => $name]);
```

Et dans le template `src/View/home.html.twig` :

```twig
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bonjour</title>
    <link rel="icon" href="/assets/images/favicon.png">
    <link rel="stylesheet" href="/assets/css/styles.css">
</head>

<body>
    <h1>Bonjour {{ name }} !</h1>
</body>
</html>
```

Ainsi la page affichera : **"Hello Wilder !"** Tu remarques que la méthode `render()` de Twig ne fait que te renvoyer une (longue) chaîne de caractères contenant le HTML à afficher sur la page. Il faut donc bien penser à l'afficher via un `echo`.  

### Le debug

Twig nous apporte un outil améliorant considérablement la façon dont nous allons débugger notre code. 
Il s'agit de la méthode `dump()`, qui s'utilise comme un `var_dump`, mais dans une page Twig. 
Cette extension n'est pas installée par défaut dans Twig, mais nous l'avons ajouter dans le fichier de configuration de Twig (cf. `config/twig.php` :  `$twig->addExtension(new DebugExtension());`)

```twig

{{ dump(variableIWantToExamine) }}

```

L'affichage obtenu est particulièrement utile quand il s'agit d'examiner un objet ou un tableau.

Pour plus d'informations => [documentation !](https://twig.symfony.com/doc/3.x/functions/dump.html).

# 💪 Challenge

### Mise en place de Twig

```alert-info
N'hésite pas à t'aider du code présenté précédemment pour avancer sur ce challenge
```

- Dans un nouveau fichier */public/products.php*, ajoute l'initialisation du tableau ci-dessous :

```php
$products = ['guitare', 'bass', 'bonjo', 'cithare', 'lyre', 'harpe'];
```

*Tu peux changer le nom des produits si tu te sens inspiré ;-)*

* Crée une vue `products.html.twig` dans le dossier `src/View/`, reprenant une structure HTML de base.
* Depuis ton nouveau fichier products.php appelle ton template `products.html.twig` en lui passant ton tableau `$products` via l’appel à la méthode `render()` de l'objet `$twig`.
* Dans cette vue, **en utilisant la syntaxe de Twig**, tu dois boucler sur le tableau et afficher les produits dans une liste HTML.
* Puis sous la liste des produits, affiche le resultat d'un `dump()` du tableau de produit que tu as envoyé à ta page Twig.
* Envoie le résultat sur un dépôt GitHub et poste le lien en solution

### Critères de validation

* Pour corriger, clone le projet et pense à lancer un `composer install`.
* Il y a un fichier Twig `products.html.twig` dans le dossier de *src/View*.
* La syntaxe de Twig est correctement utilisée (il doit y avoir au minimum une boucle).
* Dans ton navigateur, la page *product.php* affiche bien les 6 produits dans une liste. Ainsi que le résultat `dump()` du tableau de produit.