⚠️ Avant de commencer cette quête, tu dois avoir terminé les quêtes suivantes :

```quests
140
```

```title-book
Introduction
```

Dans cette quête, tu vas découvrir ce que sont les fonctions dans PHP, comment les utiliser et comment en créer toi-même. 

Un peu plus tard, tu entendras également parler de méthodes, c'est la même chose qu'une fonction, mais dans un contexte particulier (POO).
> Garde en tête que ce que tu vas apprendre ici n'est pas propre à PHP, et se retrouve aussi dans beaucoup d'autres langages.

## 🤓 À la fin de cette quête, tu seras capable de :
* ✅ Utiliser une fonction,
- ✅ Créer tes propres fonctions,
- ✅ Gérer le passage de paramètres,
- ✅ Maîtriser ce que renvoie une fonction,
- ✅ Typer les variables.

# Utiliser une fonction.

En programmation, tu peux avoir besoin à plusieurs reprises d'une même fonctionnalité. Comme connaître la taille d'un tableau par exemple. _Tu verras que cela te sera plus souvent nécessaire que tu ne l'imagines._

Considérons ce tableau PHP comme exemple :

```php
$moviesList = [
  'Les Aventuriers de l\'arche perdue',
  'Indiana Jones et le Temple maudit',
  'Indiana Jones et la Dernière Croisade',
  'Indiana Jones et le Royaume du crâne de cristal'
];
```

On dispose ainsi du tableau contenant la liste des aventures de notre archéologue, et tu souhaites récupérer le nombre de films.
De par ta récente maîtrise des boucles, tu pourrais être tenté de coder toi-même la fonctionnalité suivante :

```php
$nbMovies = 0;

foreach($moviesList as $movie) {
  $nbMovies++; // équivalent à $nbMovies = $nbMovies + 1;
}
```

À l'aide d'un `foreach`, le tableau `$moviesList` est parcouru, et pour chaque film rencontré, on incrémente la variable `$nbMovies` (on lui ajoute +1), qui représente le compteur du film. Ce qui au final, une fois sorti du `foreach`, permet  d'attribuer la valeur 4 à `$nbMovies`, correspondant au bon nombre de films.
Si tout de suite après le code précédent, tu écris le code ci-dessous :

```php
echo 'There are ' . $nbMovies . ' movies about Indiana Jones';
```

Tu obtiens à l’écran la phrase suivante : `There are 4 movies about Indiana Jones`.

Et à chaque fois que tu veux récupérer le nombre de films, ou de manière plus générique, mesurer la longueur d'un tableau, tu dois effectuer cette petite boucle, en dupliquant le code.

Pour cet exemple, très simpliste, tu te dis que copier-coller une simple boucle, ce n'est pas méchant. Sauf qu'il existe déjà nativement quelque chose dans PHP, qui te permet d'obtenir le même résultat, beaucoup plus simplement, rapidement, et avec de meilleures performances :

```php
$nbMovies = count($moviesList);

echo 'There are ' . $nbMovies . ' movies about Indiana Jones';
```

Il suffit juste d'appeler la fonction interne `count`, suivie de 2 parenthèses `()`, à l’intérieur desquelles, tu dois préciser le tableau `$moviesList` comme _sujet à traiter_, ce qui est appelé **paramètre**.

Tu pourrais raccourcir davantage ton script en écrivant directement ceci :

```php
 echo "There are " . count($moviesList) . " movies about Indiana Jones"
```

C'est  plus efficace ainsi.

![](http://images.innoveduc.fr/trust-indy.gif)

Avoue qu'utiliser une fonction peut grandement alléger ton code en diminuant fortement le nombre de lignes. Imagine tout ce que tu peux économiser grâce à des fonctions faisant des choses plus complexes.

```alert-warning
Il se peut que tu croises parfois `sizeof()`. Les deux font exactement la même chose. `sizeof()` est ce que l'on appelle un _"alias"_ de `count()`. Lorsque tu appelles `sizeof()`, l’interpréteur PHP va simplement rappeler la fonction `count()` en lui passant le même paramètre. Tu comprends qu'il est alors plus logique d'appeler directement la fonction finale. Si ces alias existent, c'est principalement pour des questions de rétrocompatibilité.
```

PHP dispose d'un grand nombre de fonctions, dont tu peux user et abuser. On les appelle des **"fonctions internes"**. Tu entendras aussi parler de **"fonctions natives"**. Certaines sont tellement courantes et utiles que tu les maîtriseras parfaitement. Évidemment, il y en a trop pour toutes se les rentrer dans le crâne.

![](http://images.innoveduc.fr/agraphes_chapeau.gif)

Tu te dois d'en connaître certaines, et d'avoir une idée de ce qu'il est possible ou non de faire avec les fonctions internes de PHP. Pour cela, tu as la documentation officielle de PHP (cf. ressources ci-dessous).

**Attention, le nom des fonctions est sensible à la casse !** Si tu fais appel à `Count()`, PHP ne comprendra pas que tu lui demandes `count()`;

```alert-info
Tu dois savoir aussi que certaines fonctions sont dépendantes de librairies qui ne sont pas activées, voire pas du tout installées par défaut. Ce qui a pu être le cas pour `mbstring`.  Si lors d'un appel à une fonction interne, il y a une erreur du type `function xxx is not defined` , c'est que ton serveur n'est pas configuré correctement. À moins que ce ne soit une erreur de syntaxe dans le nom de la fonction.
```

```resource
http://php.net
# Documentation officielle
Voici ton nouveau meilleur ami, la documentation officielle de PHP ! C'est grâce à elle que tu peux savoir exactement comment utiliser telle ou telle fonction.
```

```resource
http://php.net/manual/fr/about.prototypes.php
# Comment lire la documentation PHP d'une fonction
Il peut parfois être délicat de décrypter la doc. Cette page t'explique comment comprendre la définition d'une fonction.
```

```resource
http://php.net/manual/fr/aliases.php
# Liste des alias
La liste des alias dans PHP.
```

### Créer ses propres fonctions

Tu l'auras compris, PHP contient déjà des centaines de fonctions intégrées que tu peux utiliser au quotidien dans ton application. Mais en tant que développeur, tu seras également très souvent amené à créer tes propres fonctions. Comme vu précédemment, une fonction effectue un ensemble prédéterminé de codes et peut être appelée quand tu le désires. Cela te permettra d’exécuter à plusieurs reprises le même algorithme sans jamais faire de copier-coller. Car tu le découvriras vite, moins tu fais de copier-coller plus cela sera synonyme de code propre, bien structuré et cohérent.

```alert-info
Le fait de se répéter le moins possible dans son code est le principe du code **DRY** ( **D**on't **R**epeat **Y**ourself).
En programmation, tu découvriras qu'il existe de nombreux "courants philosophiques", prônant différentes approches pour produire un code propre, fonctionnel et optimisé. DRY en est un.
```

Pour **définir une fonction**, tu dois en premier lieu faire appel au mot clé `function`.

Il suffit ensuite de lui donner un nom. Tu es libre de l'appeler comme tu veux ! Du moment que tu respectes les contraintes qu'impose PHP, qui sont les mêmes que pour les variables. Pour rappel :

- Un nom de fonction ne peut pas commencer par une valeur numérique,
- Ne doit pas contenir de caractères interdits : `@` ou `-`
- Chaque nom doit être unique et ne pas être un nom réservé. Comme `function()` ou `string()` par exemple.

Tu dois également penser à la propreté et à la maintenabilité du code. Comme pour nommer ses variables, il est important de bien nommer ses fonctions. Un script rempli de `toto();`, `tata();` et de `doSomething();` et  `getStuff();`,  ne sera pas très facile à comprendre.
Utilise des noms cohérents, représentatifs de ce que cela fait, et utilisant la syntaxe camelCase qui est préconisée. Comme par exemple `getTotalPrice($price, $taxeRate);` ou `filterSubscribedUsers($users);`

Ce qui te donne, pour définir une fonction appelée `myFunction`, la définition ci-dessous :

```php
function myFunction()
{
  //Some code here...
}
```

Et pour appeler la fonction, fraîchement définie, tu dois faire exactement comme pour une fonction interne à PHP :

```php
myFunction();
```

```resource
http://php.net/manual/fr/functions.variable-functions.php
# Fonctions variables
De même avec les fonctions anonymes.
```

```resource
http://php.net/manual/fr/functions.user-defined.php
# Les fonctions définies par l'utilisateur
La doc officielle explique les subtilités des fonctions définies par l'utilisateur.
```

```resource
http://www.commitstrip.com/fr/2015/10/27/one-of-the-coders-hardest-problems/
# Dilemme de développeur
*"Un grand pouvoir implique de grandes responsabilités"*, un jour toi aussi tu seras confronté à ce grave problème.
```

# Les paramètres de fonction.

Dans la première partie, pour que la fonction `count()` _"fonctionne"_ tu as dû lui "passer en paramètre", ou "argument", le tableau `$moviesList`. Le code ne peut pas deviner ce que tu as en tête, tu dois lui fournir des choses précises. Ce nombre de paramètres est différent pour chaque fonction, selon ce qu'elle fait, et des informations dont elle a besoin pour s’exécuter.

Revenons sur des fonctions que tu as déjà vues passer dans les quêtes précédentes :

- La fonction `count()` ne nécessite qu'un seul argument. Normal, il ne fait que mesurer la longueur d'un tableau. On l'appelle donc ainsi `count($array);`

- La fonction `explode()` quant à elle, nécessite 2 arguments obligatoires. Cette méthode permet de découper une chaîne de caractères selon un séparateur précis. Il est donc évident que, pour l'appeler, tu dois lui préciser la chaîne à traiter et le caractère de référence. Ce qui donne : `explode($char, $string);`. **Tu as remarqué la virgule pour séparer les paramètres entre eux ?**

- La fonction `substr()` attend de nombreux paramètres, car elle permet de récupérer un fragment d'une chaîne, d'une lettre à une position précise sur une longueur précise. Ce qui nous fait au moins 3 paramètres : la chaîne, la position de départ, et la longueur de notre sous-chaîne. Cependant, tu n'es pas obligé de tous les renseigner. Certains paramètres sont optionnels car ont des valeurs par défaut. Si on ne précise pas un paramètre, PHP va utiliser les valeurs définies dans la déclaration de la fonction. Dans le cas de cette fonction, que j'appelle `substr($string, 0, $stringLength);` avec `$stringLength` ayant pour valeur le nombre total de caractères ou que j'appelle `substr($string);`, il se passera la même chose.

__Pour les versions de PHP antérieures à 8__, lorsqu'une fonction attend plusieurs paramètres, c'est **l'ordre** qui compte et non le **nom** du paramètre ou le type.

Si par exemple une fonction est définie comme telle :

```php
function myFunction($param1, $param2)
{
  //Some code here using $param1 and $param2
}

myFunction($varA, $varB);

```

Lorsque le script sera exécuté, `$param1` prendra la valeur de `$varA`, tandis que `$param2` prendra la valeur de `$varB`.

Et si tu écris :

```php

function myFunction($param1, $param2)
{
  //Some code here using $param1 and $param2
}

myFunction($param2, $param1);

```

`$param1` prendra, dans la fonction, la valeur de `$param2`, tandis que `$param2`, toujours dans la fonction, prendra la valeur de `$param1`.




> 🆕 __À partir de PHP 8__ il est possible d'utiliser [les arguments nommés](https://www.php.net/manual/fr/functions.arguments.php#functions.named-arguments) qui permettent d'enlever la contrainte de l'ordre des paramètres. Cela consiste à utiliser le nom de l'argument sans le signe `$`, suivi de deux points `:` puis de la variable passée en paramètre. L'exemple précédent pourrait ainsi s'écrire :
>
>
>
>

```php
>myFunction(param2: $varB, param1: $varA);
>```

>
>
>Il s'agit d'une syntaxe très récente et n'est donc pas encore très répandue. Familiarise-toi avec les écritures des versions précédentes mais sache que celle-ci existe 😉.

```alert-info
Généralement, lorsqu'on appelle une fonction, on nomme les paramètres avec les mêmes noms que ceux utilisés dans la déclaration de la fonction. Ce n'est qu'un usage pour faciliter la compréhension du code, mais comme tu viens de le voir, ce n'est pas obligatoire.
```

Tout à l'heure, tu as vu que certaines fonctions ont un comportement par défaut lorsque tous les arguments normalement attendus ne sont pas fournis.
Tu vas pouvoir le gérer également avec les fonctions que tu définis. Pour ce faire, il suffit simplement, lors de la déclaration de ta fonction, d'ajouter la valeur par défaut.
À savoir que, si tu appelles une fonction en donnant à un paramètre la valeur `null`, c'est la valeur par défaut de ce paramètre qui sera alors utilisée.

```php
function myFunction($param1, $param2 = true)
{
  //Some code here using $param1 and $param2
}
```

Avec la définition ci-dessus, les trois appels suivants auront exactement le même résultat :

```php
myFunction($var, true);
myFunction($var);
myFunction($var, null);
```

Détail important : lors de la définition, tu dois mettre les paramètres avec valeur par défaut après ceux n'en possédant pas. Tu ne peux pas déclarer une fonction comme ceci :

```php
function myFunction($param1 = true, $param2)
{
  //Some code here using $param1 and $param2
}
```

```resource
http://php.net/manual/fr/functions.arguments.php
# Les arguments de fonction
Consulte la documentation pour avoir plus de détails sur le passage d'arguments.
```

# Les valeurs de retour

Une fonction ne doit que très rarement **afficher** directement un résultat. Sauf exception, tu ne dois jamais appeler `echo` directement dans une fonction. En revanche, tu devras presque toujours **retourner** une valeur, tu dois alors utiliser le mot clé `return` suivi de la donnée à renvoyer.

Par exemple, plutôt que d'écrire :

```php
function myFunction($param)
{
  //Some code, do some stuff...
  echo $result;
}

myFunction($var);
```

Tu dois écrire :

```php
function myFunction($param)
{
  //Some code, do some stuff...
  return $result;
}

echo myFunction($var);

```

N'oublie jamais que, dès l'instant où l’interpréteur rencontrera l'instruction `return`, celui-ci **s’arrêtera là** et sortira de la fonction. Si jamais tu as du code écrit après un `return`, il ne sera jamais lu. Normalement, ton IDE doit te mettre en garde contre ce genre d’incohérence. Une erreur fréquente consiste à placer un `return` au milieu d'une boucle. Forcément, dès la première itération (premier tour), l’interpréteur sort de la boucle et celle-ci n'est pas menée à son terme.

```resource
http://php.net/manual/fr/functions.returning-values.php
# Les valeurs de retour
Pour en savoir plus sur les valeurs de retour.
```

# Le typage

Même si PHP est un langage faiblement typé, comme tu as pu le comprendre dans les précédentes quêtes, le typage tend à prendre de plus en plus de place avec les dernières versions majeures.

Avec PHP 5, on a vu apparaître la possibilité de typer les paramètres d'une fonction. C'est le _type hinting_. Les types gérés dans cette version sont assez restreints :

- `array`,
- Un nom de _Classe_ ou d'_Interface_,
- `self`,
- `callable`.

À ce stade de la formation, le seul qui te parle, c'est `array`. C'est normal, tu découvriras les autres ultérieurement.

Avec PHP 7, les types de paramètres possibles sont étendus à plus de types :

- `string`,
- `int`,
- `float`,
- `bool`,
- `iterable`.

Le but est de contraindre l'utilisation d'une fonction en s'assurant que les bons types de paramètres sont envoyés. Pour cela, il suffit d’écrire le nom du type devant le nom de la variable .

```php

function myFunction(array $myList, string $myText)
{
  //Some code here...
}

```

Dans l'exemple ci-dessus, il s'agit d'une fonction qui attend 2 paramètres :

- `$myList` qui doit être un tableau (`array`),

- `$myText` qui doit forcément être une chaîne de caractères (`string`).

Si jamais les arguments passés à la fonction ne correspondent pas à ce qui est attendu, PHP renverra une erreur.

PHP 7 ajoute également le support des déclarations du type de retour. Ainsi on peut indiquer à une fonction le type de données qu'elle est censée renvoyer. Si la fonction retourne autre chose que ce qui est prévu, PHP renverra une erreur.

Si on reprend l'exemple précédent, tu peux par exemple lui préciser que tu attends un autre tableau en retour.

```php
function myFunction( array $myList, string $myText): array
{
  //Some code here...
}
```

Tu as évidemment remarqué les deux points `:` avant le type !

Ainsi, tu auras une erreur si jamais ta fonction renvoie autre chose qu'un tableau.

```resource
http://php.net/manual/fr/functions.arguments.php#functions.arguments.type-declaration
# Le typage des arguments
Le typage des arguments dans la documentation officielle.
```

```resource
http://php.net/manual/fr/functions.returning-values.php#functions.returning-values.type-declaration
# Le typage des valeurs de retour
Le typage des valeurs de retour dans la documentation officielle.
```

# Le scope

Le **scope**, ou _la portée_ en français, désigne le fait qu'une variable est connue, ou non, selon l'endroit où l'on tente de l'utiliser.

Si tu prends le code ci-dessous :

```php

$trap = true;

function toggle ()
{
  $trap = false;
}

toggle();
echo $trap; // true

```

Comme tu peux le voir, la variable `$trap` n'est pas modifiée après l'appel à la fonction `toggle`. Elle reste à `true` plutôt que de passer à `false`. Car même si elles ont le même nom, ces variables  ne sont pas les mêmes dans et hors de la fonction. 

En résumé, ce qui se passe dans une fonction, reste dans la fonction. (Enfin, encore une fois, pas toujours... on verra pourquoi et comment plus tard)

C'est pour cette raison que, lorsque tu veux récupérer le résultat d'une fonction, tu dois faire appel à `return` que tu viens de voir précédemment.

```resource
http://php.net/manual/en/language.variables.scope.php
# Portée des variables
La documentation officielle sur la portée des variables.
```

```resource
https://www.youtube.com/watch?v=sBfSLbMnId0
# Local and Global Scope in PHP
Cette très courte vidéo te présente un autre exemple de mise en pratique de la portée des variables.
```

# Pour résumer
Un récapitulatif de tout ce que tu viens de voir sur les fonctions, comment en créer et la gestion des paramètres. Tu peux la visionner avant d'attaquer le challenge pour être sûr d'avoir bien tout saisi.

```youtube
https://www.youtube.com/watch?v=HvxQww-7NGA
```

# 💪 Challenge

### Les aventuriers de la fonction perdue.

Indy a besoin de ton aide. Il est actuellement devant l'entrée d'un temple et, pour pouvoir entrer, il doit prononcer à voix haute une certaine phrase secrète. Ça parle d'un animal qui s'incline face à un élément, mais il ne sait plus quoi.

![](http://images.innoveduc.fr/indi-torch.gif)

Ton challenge dans cette quête consiste à créer une fonction PHP nommée *"writeSecretSentence"* prenant en argument **deux** paramètres de type chaîne de caractères. À l’intérieur de la fonction, tu dois recréer la phrase mystère suivante : *"ANIMAL s'incline face à ELEMENT"* en remplaçant *"ANIMAL"* et *"ELEMENT"* par le texte reçu en paramètre lors de l'appel. Une fois le résultat obtenu, tu dois faire en sorte que la fonction renvoie ce résultat afin qu’il soit affiché en dehors.

Indy pourra ainsi appeler plusieurs fois la fonction `writeSecretSentence` en essayant plusieurs animaux, face à différents éléments, par exemple : "le chat s'incline face à la terre", "le dragon s'incline face à l'eau", "le singe s'incline face à l'air"...

Pour ceci, créer un fichier *index.php* où tu dois définir ta fonction et l’exécuter.

### Critères de validation

* La fonction prend en entrée deux paramètres correctement nommés
* Les bons types sont appliqués aux paramètres et au retour,
* Le mot clé `return` est utilisé dans la fonction pour renvoyer le résultat,
* L'affichage du résultat se fait bien à l’extérieur de la fonction et non directement dedans,
* Le fichier `index.php` est disponible depuis un lien PHPSandbox.

==$==


```php
// definition of the function
function writeSecretSentence(string $animal, string $element): string
{
    return $animal . ' s\'incline face à ' . $element;
}

// some examples using the function
echo writeSecretSentence('Le hibou', 'l\'eau') . PHP_EOL;
echo writeSecretSentence('Le cheval', 'la terre') . PHP_EOL;
```