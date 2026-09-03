**⚠️ Avant de commencer cette quête, tu dois avoir terminé les quêtes suivantes :**

```quests
8
```

# Introduction

Tous les langages informatiques utilisent des variables.
Cela permet d'enregistrer de manière temporaire (c'est-à-dire le temps de l'exécution du programme) des informations dans la mémoire de l'ordinateur.

Les noms des variables sont choisis par le développeur (en suivant certaines normes pouvant varier d'un langage à l'autre) qui peut y enregistrer des valeurs de différents types (nombres, texte, ...).
Ainsi stockées dans des variables, les données sont faciles à retrouver et à manipuler.
Il existe aussi des variables prédéfinies, accessibles dès le départ sans que l'on ait besoin de les créer.

Pour te donner un exemple parlant, les variables sont un peu comme des boîtes, dans lesquelles tu peux mettre différentes choses, et qui ont une étiquette dessus avec un nom, suffisamment parlant pour que tu saches ce que tu y as mis.

![](http://images.innoveduc.fr/variables_boxes.jpeg)

## 🤓 **À la fin de cette quête, tu seras capable de:**
- ✅ Manipuler des variables en PHP,
- ✅ Bien nommer les variables
- ✅ Connaître les différents types de variables


# Les règles associées au nom des variables

- Une variable commence toujours par le caractère '$' (dollar).
- Ne doit pas commencer par un chiffre.
- Ne peut contenir que des chiffres, des lettres et le caractère '_' (souligné).

#### ✅ Exemples de noms de variables valides :

```php
$str
$my_value
$_old
$theBestValue

```

Attention, les noms des variables sont sensibles à la casse. \$Black et $black sont deux variables différentes.

#### ❌ Exemples de noms de variables invalides :

```php
$4days            // commence par un chiffre
day4              // pas de symbole $
$my-bad           // contient un caractère interdit (-)
$                 // pas de nom
$name@domain      // caractère interdit (@)
$first name       // caractère interdit ( )

```

#### Les bonnes pratiques :

- Un nom de variable doit toujours t'aider à identifier ce qu'elle contient. Cela permet de simplifier et d'accélérer
la lecture et la compréhension du code. N'oublie jamais que le code que tu écris sera relu et réutilisé par d'autres
développeurs qui ne sont pas dans ta tête. Il faut toujours avoir à l'esprit la nécessité d'être clair, simple et concis.

- Toujours en anglais. Cela permettra à ton code d'être international et plus facilement accessible aux développeurs 
non francophones. 

- N'hésite pas à utiliser plusieurs mots dans le nom de ta variable, afin de mieux décrire son contenu.

- Il est recommandé, en PHP, de nommer ses variables en _camelCase_. Ce n'est pas une obligation technique du langage mais une convention, une bonne pratique utilisée notamment dans la plupart des gros projets écrits en PHP.
L'écriture camelCase consiste à écrire en minuscule et si le nom contient plusieurs mots, chaque mot (sauf le premier) commence par une majuscule. Cela forme donc des 'bosses', d'où le nom de camelCase.

![](http://images.innoveduc.fr/variables_camel.gif)

> **Remarque** Il existe d'autres conventions de nommage que le camelCase. On notera par exemple l'UpperCamelCase ou encore le snake_case.

#### ✅ Exemples de variables bien nommées :

- une variable contenant le nom d'une voiture : $carName ($car_name ou $CarName sont techniquement valides mais déconseillés)

- une variable contenant le résultat d'une addition : $total ou $result ($value, $number, $resultat sont techniquement valides mais peu précis ou non en anglais, ce qui est également déconseillé)

> Choisir un bon nom de variable est quelque chose d'**extrêmement important**. Ne néglige surtout pas cela. Il vaut souvent mieux prendre quelques secondes pour trouver un nom de variable cohérent plutôt que de se retrouver au final avec un code contenant $var1, $var2, $toto, $maVariable, $duTexte... qui deviendront vite incompréhensibles.

```resource
https://sulfureetcontreculture.blogspot.fr/2008/07/programmation-quest-ce-quune-variable.html
# C'est dans la boîte
Une petite explication courte et claire du concept de variable informatique.
```

```resource
http://php.net/manual/fr/language.variables.basics.php
# Les bases des variables
Quelques principes de base sur la documentation officielle.
```

# Les types

Que met-on dans une variable ? Eh bien, des valeurs, des données, ce que l'on veut ! 
Le PHP est un langage dit à _typage faible_. Cela signifie que l'on ne va pas définir le type d'une variable de manière explicite, 
mais que c'est le contenu de la variable qui va définir son type ainsi que son contexte.
Retiens seulement que PHP est assez souple sur les types de variables, ce qui n'est pas le cas d'autres langages comme le C ou le Java.

Il existe deux grandes familles de types de données : 

- scalaire

- composé

Les variables scalaires sont des variables ne contenant qu'une seule valeur à la fois. Elles sont composées des types suivants : 

- Entier (nombre sans virgule) : c'est le type _integer_.

- Réel (nombre à virgule. En php, le séparateur décimal est en fait un point) : c'est le type _float_.

- Booléen (2 valeurs, vrai ou faux) : c'est le type _boolean_.

- Chaîne de caractères (valeurs encadrées par des simples quotes ou des doubles quotes) : c'est le type _string_

Les variables composées sont des variables comportant plusieurs éléments.

- Tableaux : c'est le type _array_

- Objets : c'est le type _object_

Il existe également 2 types spéciaux : 

- Les ressources : variable spéciale faisant référence à une ressource externe (fichier, connexion à une base de données...). On ne va pas s'étendre sur le sujet pour le moment.

- NULL : représente une variable qui n'a pas de valeur.

La gestion et le fonctionnement des tableaux et objets seront vus dans d'autres quêtes.

Lorsque l'on souhaite créer une variable, on parle de **déclaration**.
Lorsque l'on souhaite lui attribuer (ou modifier) une valeur, il faut utiliser l'**opérateur d'affectation** `=`. On parle donc d'**affectation**.
À la première déclaration de la variable, on parle d'**initialisation** et on affecte  une valeur à cette variable.
Dans certains langages, il est possible de déclarer une variable sans l'initialiser tout de suite, mais en PHP l'initialisation et la déclaration se font en même temps.
Le nom de la variable est toujours écrit en premier, suivi de l'opérateur d'affectation, suivi de la valeur.

```php
$i = 1; // on affecte la valeur 1 à la variable $i;

1 = $i; // renvoie une erreur car 1 n'est pas une variable, on ne peut donc pas lui affecter de valeur.

```

#### Exemples de déclaration de variables :

- Entiers : `$size = 200;` `$start = 0;`

- Réels `$pi = 3.141592654;` `$half = 0.5;`

- Booléens `$isSaved = true;` `$hasField = false;`

- Chaînes `$firstName = "Indiana";` `$lastName = 'Jones';`

Tu noteras qu'il est également possible d'affecter une même valeur à plusieurs variables d'un coup :

```php
    $a = $b = $c = 2; // les trois variables $a, $b et $c sont initialisées en même temps à 2

```

#### Les bonnes pratiques :

Pour des raisons de lisibilité du code, dès l'instant que l'on va "typer" une variable en assignant une valeur, on fera 
en sorte de toujours utiliser le même type pour cette variable.

```resource
http://php.net/manual/fr/language.types.intro.php
# Les types des variables
```

```resource
https://secure.php.net/manual/fr/language.operators.assignment.php
# L'affectation
```

# La portée (ou scope) des variables

La zone dans le code où est déclarée une variable est importante. Une variable peut ne pas être visible par l'ensemble
de ton code.

Dans la plupart des cas, quand tu déclares une variable, celle-ci est dans tout le script **en- dessous** de l'endroit où tu l'affectes. On parle de **variable à portée globale**.

```php
<?php

echo﻿ $movie; // erreur car $movie n'existe pas;

$movie = 'Indiana Jones et le Royaume du crâne de cristal';
echo $movie ; // affiche bien le contenu de $movie car la variable a été définie au-dessus.

```

Si au contraire, tu déclares une variable à l'intérieur d'une fonction (tu verras en détail les fonctions dans une future quête), cette variable ne sera _visible_ et donc accessible **que dans ce bloc**. On parle cette fois de **variable à portée locale**. De plus, les variables à portée globale ne sont pas non plus accessibles à l'intérieur de la fonction.
En d'autres termes : ce qui se passe dans une fonction, reste dans la fonction !

#### Exemple :

```phpsandbox
https://phpsandbox.io/n/q2-wrong-variable-axlls?&layout=Editor
```


```resource
http://php.net/manual/fr/language.variables.scope.php
# La portée des variables
```

# 💪 Challenge
### Déclarer et afficher des variables

Ecris un petit programme qui va déclarer 4 variables de 4 types différents (à toi de choisir le bon type selon les cas)
Pour réaliser ce programme, utilise les valeurs que tu trouveras sur le site IMDB, sur la fiche de [la dernière croisade](http://www.imdb.com/title/tt0097576/?ref_=nv_sr_1)
- La première variable doit contenir le nom de ce film d'Indiana Jones, en VO
- La seconde variable te permettra d'indiquer si tu as vu, ou non, le film en question
- La troisième sera l'année de sortie en salle.
- La quatrième la note du film sur le site IMDB.

Affiche ces valeurs les unes sous les autres (tu peux utiliser `echo` pour afficher une variable.)

![](http://images.innoveduc.fr/variables_last_cruisade.jpeg)

### Critères de validation
- 4 types différents de variables sont représentés et utilisés à bon escient (integer, string, boolean et float)
- les noms des variables sont bien nommés (respect des bonnes pratiques et noms cohérents avec la valeur associée)
- ça fonctionne : le contenu des variables est affiché quand on lance le code.

==$==
```php
<?php

$movieName = 'Indiana Jones and the Last Crusade';
$movieSeen = true;
$movieReleaseYear = 1989;
$movieScore = 8.3;

echo $movieName;
echo $movieSeen;
echo $movieReleaseYear;
echo $movieScore;

```