**⚠️ Avant de commencer cette quête, tu dois avoir terminé les quêtes suivantes :**

```quests
142
```

```title-book
Introduction
```

Pendant la phase de développement, tu te retrouveras sans doute bloqué un grand nombre de fois sans trop savoir comment t’en sortir.

![](images/001-image.gif)

Dans cette quête, tu vas apprendre les fonctions et les outils qui te permettront de débugger ton code pour te débloquer le plus facilement possible.

## 🤓 **À la fin de cette quête, tu seras capable de :**
- ✅ Utiliser les différentes fonctions natives PHP pour te débugger
- ✅ Installer et utiliser Xdebug
- ✅ Lire une erreur PHP - Xdebug


# Les fonctions PHP d'aide au débug

Dans ce chapitre, tu vas apprendre à utiliser les différentes fonctions natives PHP qui vont te permettre de débugger ton code. Tu vas aussi découvrir comment arrêter ton code et/ou afficher la valeur de variables que tu as définies.

![](images/002-les-fonctions-php-d-aide-au-debug.gif)

Tout d'abord, crée un fichier `index.php` qui contient le code suivant :

```php
$characters = [
    "Negan" => [
        "city" => "The Sanctuary",
        "weapon" => "Lucille"
    ],
    "Daryl" => [
        "city" => "Alexandria",
        "weapon" => "crossbow"
    ],
    "Ezekiel" => [
        "city" => "The Kingdom",
        "weapon" => "Shiva"
    ]
];

// We write code here
```

Dans le dossier contenant le fichier `index.php`, avec le terminal, lance la commande :

```bash
php -S localhost:8000
```

Pour vérifier que tout fonctionne, remplace le commentaire par

```php
echo "Hello World";
```

et rends-toi à l’adresse [http://localhost:8000](http://localhost:8000) . Tu devrais alors voir ceci :

![](http://images.innoveduc.fr/helloworld_debug.png)

Durant cette quête, tu devras remplacer le commentaire par ce qui t'est demandé.

### echo()

La fonction `echo()` permet d'afficher une chaîne de caractères.

Le tableau précédemment créé contient des chaînes de caractères et ces deux fonctions vont permettre de les afficher.

Par exemple, si tu veux afficher l'arme de Daryl, tu vas pouvoir remplacer le commentaire par :

```php
echo $characters["Daryl"]["weapon"];

```

```alert-info
Il existe également une fonction `print()` en PHP, cependant bien moins utilisée, ou pour afficher la ville de Negan tu ferais : `print $characters["Negan"]["city"];`

```

Cette fonction est capable d'afficher **une chaîne de caractères uniquement**.

Si tu veux vérifier la ville et l'arme de Negan en même temps, tu peux essayer de faire

```php
echo $characters["Negan"];
```

PHP retourne alors une erreur du type :

> **NOTICE** Array to string conversion

car `echo()` n'est pas capables de transformer un tableau en chaîne de caractères.

```resource
https://www.php.net/manual/function.echo.php
# function echo 
```

### var_dump()

Si tu veux afficher d'autres types de variables comme des tableaux ou des objets (tu ne les connais pas encore, mais ça va venir), tu peux utiliser la fonction `var_dump()`.

`var_dump()` va afficher les informations d'une variable :

- son type
- sa longueur
- son contenu

Essaye sur ton tableau :

```php
var_dump($characters["Ezekiel"]["weapon"]);
```

retourne les informations de l'élément du tableau, soit une chaîne de 5 caractères.

```
string(5) "Shiva"
```

Et si tu veux afficher un tableau comme précédemment :

```php
var_dump($characters["Negan"]);
```

`var_dump()` va retourner :

```
array(2) { ["city"]=> string(13) "The Sanctuary" ["weapon"]=> string(7) "Lucille" }

```

il nous indique que c'est un tableau de **2** éléments :

-   la clé **city** a pour valeur une chaîne de 13 caractères égale à **The Sanctuary**

-   la clé **weapon** a pour valeur une chaîne de 7 caractères égale à **Lucille**.

Il est possible d'améliorer le rendu de ton `var_dump()` grâce aux balises html `<pre></pre>`.

Ajoute, avant et après ta fonction, les balises `<pre></pre>` :

```php
echo "<pre>";
var_dump($characters["Negan"]);
echo "</pre>";

```

Maintenant, lorsque tu retournes sur la page, le rendu du `var_dump()` est bien plus lisible. 

![](http://images.innoveduc.fr/phpdebug_pre.png)

```alert-info
Dans le prochain chapitre, tu découvriras une manière encore plus lisible de mettre en avant ton `var_dump()`. Car, il faut le reconnaître, ajouter ces 2 lignes à chaque `var_dump()` s’avère un peu fastidieux.
```

```resource
https://www.php.net/manual/function.var-dump.php
# function var_dump 
```

### exit() / die()

Tu vas ajouter une redirection vers une autre page dans ton code.

```php
var_dump($characters["Daryl"]);
header("location: https://www.google.fr");
```

Maintenant, quand tu accèdes à la page, tu es directement redirigé vers [google.fr](https://www.google.fr) et tu n'as pas le temps de voir ce que tu as fait dans ton code (`echo()`, `print()`, `var_dump()`...).

PHP possède deux fonctions qui arrêtent le code lors de son exécution. Leur rôle est d'afficher un message et de terminer le script.

Ces deux fonctions sont :

- `exit()`
- `die()` qui est un alias de la fonction `exit()`

ajoute avant la redirection :

```php
var_dump($characters["Daryl"]);
exit();
header("location: https://www.google.fr");

```

Le code est stoppé avant de rediriger avec la fonction `header()` et tu peux donc voir le `var_dump()` que tu as fait juste avant.

Il arrivera très souvent que ton code se poursuive dans plusieurs fichiers et que tu aies besoin de l'arrêter pour savoir ce qu'il s'est précisément passé à un endroit. C'est là que ces fonctions te seront très utiles.

> Attention, si tu mets un `exit()` ou un `die()` dans une boucle, comme pour le return, celle-ci sera stoppée dès le premier tour.
Astuce : utilise `var_dump()` dans la boucle et `exit()` à la fin si tu veux afficher tous les résultats de ta boucle.

```resource
https://www.php.net/manual/function.exit.php
# function exit 
```

```resource
https://www.youtube.com/watch?v=zcKt7Lj1kjo
# Beginner PHP Tutorial - 29 - die and exit Functions
```

# Xdebug

### Introduction

Xdebug est une extension PHP qui **facilite le développement et le débuggage en PHP** en fournissant une multitude d'informations lors de leur exécution.

**Xdebug** permet, entre autres :

- De débugger le code pas à pas en affichant l'état complet du code.
C’est une pratique assez complexe et avancée. Elle n’est pas demandée dans la quête, mais si tu as envie d’en savoir plus => [Step by Step Xdebug config](https://deliciousbrains.com/xdebug-advanced-php-debugging/)

- D'afficher plus proprement et de manière détaillée des erreurs et de mettre en forme la fonction `var_dump()`

- et bien d'autres fonctionnalités que tu ne verras pas ici.

### Installation

Pour installer Xdebug sur Ubuntu et l'activer :
[Install Xdebug on Ubuntu](https://www.lucidar.me/fr/aws-cloud9/how-to-install-and-configure-xdebug-on-ubuntu/)

Pour les autres plateformes :
[Install Xdebug Documentation](https://xdebug.org/docs/install)

### Utilisation

Maintenant que **Xdebug** est installé et fonctionnel, tu peux ajouter à ton code :

```php
var_dump($characters);

```

et l'affichage du tableau sera beaucoup plus lisible et esthétique qu'avant :

![](http://images.innoveduc.fr/phpdebug_xdebug.png)

```resource
https://xdebug.org
# Xdebug Documentation
```

# Lecture d'une erreur PHP

### Apprends à lire une erreur PHP

Tu vas souvent avoir des erreurs PHP au moment de l’exécution de ton code et il va falloir apprendre à les lire pour comprendre d’où vient le problème.

Voici par exemple une erreur au format Xdebug qui est survenue (l'exemple est basé sur l’architecture MVC avec un peu de programmation orientée objet que tu n'as pas encore vue, mais ne t'inquiète pas, c'est pour te préparer aux futurs bugs que tu vas affronter 💪) :

![](http://images.innoveduc.fr/php_error_xdebug.png)

Cette erreur nous indique :

- Le type de l'erreur : **Undefined variable** => la variable n'est pas définie.
- Le fichier où se trouve l'erreur : `HomeController.php` et la ligne : **24**
- La **Call Stack** détaille le parcours de PHP pendant l’exécution du code, ici :
  - *index.php*
  - *routing.php*
  - *HomeController.php* méthode `index()`

Dans le code, ligne 24, tu peux voir que la variable `$rick` n'est pas définie :

```php
public function index()
{
    $value = $rick + 1;

    return $this->twig->render('Home/index.html.twig', [
        "value" => $value,
    ]);
}

```

# 💪 Challenge

### Montre-nous ton plus beau débug

1. A partir du tableau disponible au début de la quête, ajoute une clé contenant ton nom complet.

Cette clé devra contenir un tableau associatif avec les informations suivantes :

* Ta ville
* L’arme que tu aurais toujours sur toi en cas d’invasion zombie 🧟

1. Tu devras faire un `var_dump()` du tableau, et celui-ci devra être mis en forme avec Xdebug.
2. Poste en solution le screenshot de ton `var_dump()`.

### Critères de validation

* Le screenshot du `var_dump()` correspond bien au tableau et est correctement formaté avec Xdebug.