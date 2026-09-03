**⚠️ Avant de commencer cette quête, tu dois avoir terminé les quêtes suivantes :**

```quests
1348
```

```title-book
Introduction
```

Cette quête va t'apprendre l'une des structures de contrôle les plus utilisées dans les langages de programmation, à savoir : la condition.

## 🤓 **À la fin de cette quête, tu seras capable de:**
* ✅ Comprendre l'utilité d'une condition dans un programme
- ✅ Maîtriser les structures de contrôle `if`, `elseif`, `else`, `switch`

# Mais pourquoi faire des conditions ?

Un programme informatique (web ou non) est une suite d'instructions à éxécuter par l'ordinateur. S'il n'y avait pas de condition, le programme ferait donc strictement la même chose à chaque exécution.

En PHP (et dans la plupart des langages), une condition s'écrit ainsi :

```php
if (expression) {
    // bloc d'instructions
}

// ou avec des elseif / else
if (expression) {
   // bloc d'instructions
} elseif (expression) {
   // bloc d'instructions
} else {
   // bloc d'instructions
}

```

# Comment fonctionne une condition ?

À chaque fois que tu utilises une condition, PHP va interpréter l'expression que tu lui as fournie (ce qu'il y a entre les parenthèses) et l'évaluer à true ou false. 

- Si c'est _true_, il va "entrer" dans la condition et exécuter le bloc d'instructions.

- Si c'est _false_, il va entrer dans le `else` / `elseif` (si existant) et/ou continuer d'exécuter le reste du programme.

### Un exemple

```php
if ($idol == $bag) {
    echo 'Lance la boule !!!';
}
```

![](http://images.innoveduc.fr/php_proc_conditions_indy.gif)

Au niveau du formatage, il existe des "bonnes pratiques", respectées par la plupart des développeurs PHP et par tous les plus gros frameworks : **les PSR (PHP Standards Recommandations)**

```alert-warning
Tu vas devoir apprendre à respecter les PSR. Dans un premier temps, essaies au moins d'assimiler les **PSR-1** et **PSR-12**. Celles-ci sont assez simples, il suffit juste de les apprendre par cœur pour que cela devienne un réflexe. Par la suite, certains outils te permettront de vérifier si tu les as bien respectées.

```

```php
// Exemples de règles de PSR
// PSR OK
function hello(int $i)
{
    if ($i > 10) {
        echo $i . 'est supérieur à 10';
    }
}

// PSR KO
// L'accolade de la fonction n'est pas à la ligne : KO
// L'accolade du if est à la ligne : KO
// Pas d'espace entre le if et la parenthèse : KO
function hello() {
    if($i>10)
    {
        echo $i . 'est supérieur à 10';
    }
}

```

```resource
https://www.php-fig.org/psr/psr-1/
# PSR-1
Basic Coding Standard
```

```resource
https://www.php-fig.org/psr/psr-12/
# PSR-12
Coding Style Guide
```

# Les opérateurs

Un opérateur est quelque chose qui prend une ou plusieurs valeurs (ou expressions) et qui retourne une autre valeur.

Je suis sûr que tu connais déjà certains opérateurs, par exemple tous les opérateurs mathématiques (+, -, /, *) mais il en existe plein d'autres. Tu pourras trouver la liste complète dans les ressources.

Voici quelques exemples d'opérateurs simples :

```php
$a = 1      // assignation / affectation   => $a vaut 1
$a == 1     // égalité (valeur uniquement)  => $a est-il égal à 1 ?
$a === 1    // égalité (valeur ET type)     => $a est-il égal à 1 et est-il un integer ?

$a + $b // addition
$a % $b // modulo (reste de la division)    => 2%1 = 0 car il reste 0. 3%2 reste 1.
$a++    // incrémentation                   => ici $a est incrémenté de 1 par rapport à sa valeur précédente.

$a || $b    // ou
$a && $b    // et

$a != $b    // différent
$a . $b     // concaténation
```

et quelques-uns plus compliqués :

```php
!$a         // Not (inversion)
$a & $b     // et (comparaison de bits, à ne pas confondre avec &&)
```

**Tous ces exemples retournent une valeur**. Il faut donc bien penser :

- Soit à l'enregistrer dans une variable
- Soit à l'utiliser directement comme expression de condition

**Attention !!!** PHP étant un langage faiblement typé, les opérateurs peuvent avoir un fonctionnement différent en
fonction du contexte, ex. :

```php
$tab1 = $tab2 = [];
$tab1 + $tab2     // union
```

Ici \$tab1 et \$tab2 sont des tableaux, le + signifie que PHP va fusionner (selon ses règles) les 2 tableaux (et non additionner).

```resource
http://php.net/manual/fr/language.operators.php
# Les opérateurs en PHP
La doc officielle de PHP sur les opérateurs.
```

### Yoda Condition

![](http://images.innoveduc.fr/php_proc_conditions_yodajones.jpg)

```php
if (5 == $count)
```

La yoda condition est un style de programmation où les deux parties d'une expression d'égalité sont inversées dans une condition.

Cela ne vient pas du fait que certains développeurs sont fans de Star Wars (quoique...) mais a un vrai intérêt technique.

Lorsque tu effectues une assignation (vu dans la quête sur les variables), PHP retourne toujours _true_, pour signifier qu'il a bien affecté la valeur à la variable.

À partir de cette info, à ton avis, que se passe-t-il si tu fais une petite erreur dans ton code et que tu écris ceci :

```php
$count = 1;
if ($count = 5) {
    echo 'Condition remplie';
} else {
    echo 'Condition non remplie';
}
```

Ton programme va afficher "Condition remplie" (et `$count` sera égal à 5), bien que `$count` soit égal à 1 et non à 5.

L'erreur ici est que tu as écrit un seul = au lieu de 2 (ce qui peut arriver par inadvertance), mais cela n'est pas une erreur pour PHP car l'opérateur = existe, c'est l'assignation. Cette erreur est difficile à trouver car silencieuse.

```php
$count = 1;
if (5 = $count) {
    echo 'Condition remplie';
} else {
    echo 'Condition non remplie';
}
```

En Yoda condition, nous n'aurions ni l'une, ni l'autre des sorties, mais une erreur de parsing car PHP ne peut pas affecter 
une valeur à une constante.

```resource
https://fr.wikipedia.org/wiki/Condition_Yoda
# Yoda condition
Définition de la Yoda condition.
```

### Le cas du switch ou match depuis PHP 8

Dans certains cas, il peut être pratique de tester plusieurs valeurs sur la même variable. Plutôt que de faire
plusieurs `elseif`, tu peux utiliser le `switch`, qui s'écrit ainsi :

```php
switch (expression) {
    case 0:
        instructions
        break; // optionnel
    case 1:
        instructions
        break; // optionnel
    case x:
        instructions
        break; // optionnel
    default:
        instructions
        break; // optionnel
}
```

Depuis PHP 8, la structure `match` a été introduite plus simple à écrire et plus lisible (attention elle se termine par un point virgule) :

```php
match(expression) {
    0 => expression,
    1 => expression,
    x => expression,
    default => expression,
};
```

Le `switch` va avoir un comportement différent selon que tu places des `break` ou non dans chaque `case`.

- Si tu places des `break`, le comportement sera le même que si tu avais mis des `elseif`.

- Si par contre, tu n'en mets pas, PHP va tenter tous les cas séquentiellement et dès qu'un cas correspond (est évalué à _true_), toutes les instructions associées ainsi que celles des cas suivants seront exécutées jusqu'à la fin ou jusqu'à ce qu'il tombe sur un `break`.

- Enfin tu as pu remarquer le cas `default` qui sera exécuté si aucun autre cas ne correspond.

```php
$i = 1;
switch ($i) {
    case 0:
        // ne rentre pas ici
    case 1:
        // rentre ici
        echo $i; // Affiche 1
        // il n'y a pas de break donc les cas vont continuer à être testés
    case 5:
        // je rentre aussi ici
        echo $i; // Affiche 1
    default:
        // ne rentre pas là car d'autres cas ont "matché" 
}
echo $i; // 1
```

Avec la version `match` depuis PHP 8 :

Un grand avantage de l’utilisation de la nouvelle expression match est que, alors que switch compare les valeurs de façon "lâche" (==), ce qui peut conduire à des résultats inattendus, avec match, la comparaison est un contrôle d’identité (===). L’expression de match peut également contenir plusieurs expressions séparées par des virgules, ce qui permet une syntaxe plus concise

```php
$result = match ($x) {
	// This match arm:
	$a, $b, $c => 5,
	// Is equivalent to these three match arms:
	$a => 5,
	$b => 5,
	$c => 5,
};
```

```resource
https://stitcher.io/blog/php-8-match-or-switch
# PHP 8 : match ou switch ?
```

```resource
https://www.php.net/manual/en/control-structures.match.php
# Fonction match
```

# Aller plus loin

Pour aller plus loin, et surtout lorsque tu maîtriseras la POO (Programmation Orientée Objet), tu pourras essayer de réduire le nombre de conditions dans tes programmes, ou alors de les structurer différemment. En effet, trop d'imbrications rendent la relecture du code difficile. Voici un exemple simple pour illustrer ce propos.

Imaginons que l'on nous demande d'écrire un programme qui nous indique si un "Indiana Jones" est sorti au cinéma une année donnée.

```php

$year = {saisie utilisateur}

if (1981 == $year) {
    echo 'Oui';
} elseif (1984 == $year) {
    echo 'Oui';
} elseif (1989 == $year) {
    echo 'Ouii';    // <-- Erreur de copier / coller possible
} elseif (2008 == $year) {
    echo 'Oui';
} else {
    echo 'Non';
}

```

Ce programme est parfaitement fonctionnel mais pas très lisible et, dans le cas où l'on ferait plus qu'un simple echo, sa relecture pourrait être complexe et multipliée par autant de dates de sortie. De plus, on constate qu'à chaque date existante, on répète la même instruction avec le risque d'une erreur de copier / coller (ex. 1989).

Il pourrait être écrit ainsi :

```php
$year = {saisie utilisateur}
$results = [1981, 1984, 1989, 2008];
$message = 'Non';

if (in_array($year, $results)) { // la fonction in_array vérifie l'existence d'une valeur dans un tableau.
    $message = 'Oui';
}

echo $message;
```

De cette manière, on diminue le nombre de conditions et, par la même occasion, on simplifie la relecture. 
Dans le cas où un nouveau Indiana Jones sort, il suffit d'ajouter une entrée au tableau `$results` et le reste ne change pas. 
Pas de nouvelle condition, pas de copier / coller des instructions de chaque condition.


# 💪 Challenge
### Poings, fouet, pistolet

Indiana Jones a beaucoup d'adversaires. Pour les combattre il utilise souvent ses poings, son fouet ou son pistolet.

Afin de choisir la meilleure défense, tu dois écrire un petit script PHP qui va se baser sur celui-ci :

```php
$weapons = ['fists', 'whip', 'gun'];
$opponentWeapon = $weapons[rand(0,2)]; // Cela permet de choisir une arme de manière aléatoire.

// TODO

$indyWeapon = '???';
```

Les règles du jeu sont les suivantes :
- le pistolet bat le poing mais perd contre le fouet
- le poing bat le fouet mais perd contre le pistolet
- le fouet bat le pistolet mais perd contre le poing

Le programme doit donc assigner une arme à la variable `$indyWeapon`. Cette arme doit être meilleure que celle de l'adversaire.

![](http://images.innoveduc.fr/php_proc_conditions_indy_gun.gif)

### Critères de validation

- Le code est disponible sur un PHPsandbox
- Ton code est bien indenté et respecte les PSR
- Ton programme utilise des if / elseif / else ou switch
- Les règles du jeux sont respectées
- La valeur de l'arme est bien assignée dans la variable $indyWeapon

==$==

```php
$weapons = ['fists', 'whip', 'gun'];
$opponentWeapon = $weapons[rand(0, 2)];
```

```php
// Version If/Elseif
if ($opponentWeapon === 'gun') {
    $indyWeapon = 'whip';
} elseif ($opponentWeapon === 'fists') {
    $indyWeapon = 'gun';
} elseif ($opponentWeapon === 'whip') {
    $indyWeapon = 'fists';
}
```

```php
// Version Switch
switch ($opponentWeapon) {
    case 'gun':
        $indyWeapon = 'whip';
        break;
    case 'fists':
        $indyWeapon = 'gun';
        break;
    case 'whip':
        $indyWeapon = 'fists';
        break;
}
```


```php
// Version Match
$indyWeapon = match ($opponentWeapon) {
    'gun' => 'whip',
    'fists' => 'gun',
    'whip' => 'fists'
};
```