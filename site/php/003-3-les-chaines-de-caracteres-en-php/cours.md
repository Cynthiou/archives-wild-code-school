###### ⚠️ Avant de commencer cette quête, tu dois avoir terminé les quêtes suivantes :

```quests
141
```

# Introduction

Une chaîne de caractères (ou _string_ en anglais) est, comme son nom l'indique, une suite de caractères (lettres, chiffres, ponctuation...), placés dans un ordre défini.
Pour faire plus simple, un mot ou une phrase sont des chaînes de caractères. Au même titre que les _integer_ ou les _array_, les _string_ sont un **type de données** en PHP (mais également dans la plupart des langages informatiques).

## 🤓 **À la fin de cette quête, tu seras capable de:**

- ✅ Définir et concaténer des chaînes de caractères.
- ✅ Effectuer des manipulations simples dessus.

### Définir une chaîne de caractères

En PHP, c'est simple, une chaîne de caractères se définit en l'encadrant par des guillemets simples ou doubles (il y a une petite différence entre les deux, que tu verras juste après).
On parle plus généralement de _simple quote_ `'` ou _double quote_ `"`.

Il y a plusieurs moyens d'afficher une chaîne de caractères en PHP, mais dans l'immense majorité des cas, tu feras appel à `echo`

```php
echo 'Je suis professeur'; // affiche : Je suis professeur

```

Si la chaîne comporte elle-même le caractère `'` (apostrophe par exemple), il est possible de forcer son affichage en mettant un antislash devant. C'est ce qu'on appelle _échapper_ un caractère. 
Il ne sera alors pas interprété comme une fin de chaîne.

```php
echo 'J\'aime porter un chapeau'; // affiche : J'aime porter un chapeau
echo "J'aime porter un chapeau"; // affiche la même chose, pas besoin d'échapper une simple quote dans des doubles quotes et vice versa

```

Une chaîne est une donnée, elle peut donc être enregistrée dans une variable. Pour afficher une simple variable, il ne faut pas mettre de quote.

```php
$firstname = 'Indiana';
$presentation = 'Indiana Jones est un célèbre archéologue';

echo $firstname; // affiche : Indiana

```

![](http://images.innoveduc.fr/string_indie_tableau.jpeg)

Si tu mets une simple quote autour d'une variable, celle-ci ne sera pas interprétée comme telle.

```php
echo '$firstname'; // affiche : $firstname

```

Par contre (et c'est là la grosse différence), si tu utilises des **doubles** quotes autour d'une variable, celle-ci est bien interprétée.

```php
echo "$firstname"; // affiche : Indiana

```

Du coup, tu peux te demander quand utiliser les simples ou les doubles quotes. Il n'y a pas de règle absolue. 
Généralement, pour de simples chaînes, les simples quotes sont utilisées.  Tu les utiliseras donc la plupart du temps.
Par contre, dans certains cas, tu seras amené à manipuler des chaînes complexes, c'est-à-dire dans lesquelles tu souhaites afficher le contenu de plusieurs variables. Dans ce cas, les doubles quotes peuvent s'avérer plus adaptées.

Tu viens de voir comment créer et afficher une chaîne, mais il est également possible de fusionner deux chaînes. C'est ce qui s'appelle, la **concaténation**.

Pour cela, rien de plus simple, il suffit d'utiliser l'opérateur de concaténation. En PHP, c'est le point `.` qui sert à cela.

```php
$firstname = 'Indiana';
$lastname = 'Jones';

echo $firstname . $lastname;  // affiche : IndianaJones

```

Comme tu peux le voir, le `.` a permis de _coller_ les deux chaînes, de les concaténer.
S'il est d'usage de mettre un espace de part et d'autre du point pour faciliter la lisibilité, ceux-ci ne sont pas considérés comme faisant partie de la chaîne.
De ce fait, il n'y a pas d'espace entre "Indiana" et "Jones" dans l'exemple. Embêtant, non ?

Tu vas donc ajouter la chaîne de caractères ' ' entre les deux autres chaînes.

```php
$fullname = $firstname . ' ' . $lastname; // le résultat d'une concaténation peut aussi être enregistré dans une variable.  
echo $fullname; // affiche : Indiana Jones

```

Cette fois, `$fullname` contient bien `$firstname`, suivi d'un espace, suivi de `$lastname`, super !

Tu peux aussi dans ce cas utiliser la syntaxe des doubles quotes, ce qui donnera :

```php
$presentation = "$firstname $lastname est un célèbre archéologue"; // les variables sont interprétées 
echo $presentation; // affiche : Indiana Jones est un célèbre archéologue

```

```alert-warning
Tu pourrais être tenté d'utiliser les doubles quotes partout. Ce n'est pas forcément une bonne idée , car une variable perdue dans une longue chaîne peut parfois être difficilement lisible.
De plus, même si dans la grande majorité des cas tu ne verras aucune différence, note que l'interprétation des variables entre doubles quotes est moins performante qu'utiliser la concaténation.
```

L'opérateur de concaténation peut être utilisé pour ajouter du texte, avant ou après une chaîne.

```php
$film = $fullname . ' et le temple maudit';
echo $film; // affiche : Indiana Jones et le temple maudit;

$avis = 'J\'aime bien regarder ' . $film;
echo $avis;  // affiche : J'aime bien regarder Indiana Jones et le temple maudit;
```

Si tu souhaites ajouter un texte en fin d'une chaîne, et affecter cette nouvelle chaîne à la même variable (donc écraser la valeur en cours), tu peux utiliser la syntaxe simplifiée `.=` (qui mixe l'opérateur de concaténation `.` et l'opérateur d'affectation `=`).

```php
$name = 'Indiana';
$name .= ' Jones'; // équivalent à $name = $name . ' Jones';
echo $name; // affiche : Indiana Jones

```

```resource
https://secure.php.net/manual/fr/function.echo.php
# Manuel de echo
C'est relativement simple à comprendre. Par contre, commence à t'intéresser à la syntaxe courte `<?= ?>` qui est notamment très utile quand on mixe affichage PHP et HTML.
```

```resource
https://secure.php.net/manual/fr/language.types.string.php#language.types.string.syntax.single
# Petit tour de la documentation sur les strings
Concentre-toi sur le début de la documentation qui évoque les simples et doubles quotes. Nous n'aborderons pas la syntaxe Heredoc et Nowdoc.
```

### Manipulations simples

Tu as vu comment créer, afficher et concaténer des chaînes. C'est déjà bien, mais tu vas vite avoir besoin d'aller un peu plus loin que ça.
Tout d'abord, ta chaîne est constituée de caractères. Parfois, tu veux avoir accès à tel ou tel caractère de cette chaîne. 
Pour cela c'est très simple, la chaîne est manipulable un peu à la manière d'un tableau. Il suffit donc d'indiquer l'index du caractère que tu souhaites récupérer, en commençant bien entendu par zéro pour le premier caractère de la chaîne, et en appelant uniquement des index existants.

```phpsandbox
https://phpsandbox.io/n/q3-string-manipulation-1-xnxyq?&layout=Editor
```

```alert-info
La constante `PHP_EOL` que tu vois dans l'exemple ci-dessus sert à effectuer des retours à la ligne qui seront visibles **dans ton terminal**. EOL signifie ici End Of Line. La valeur associée à cette constante est la chaîne de caractères "\n" et puisque c'est une *string*, elle s'utilise avec l'opérateur de concaténation.
```

Il est possible d'indiquer un index négatif. Cela a le même effet, mais parcours la chaîne depuis la fin, le dernier caractère correspondant à l'index -1.

```phpsandbox
https://phpsandbox.io/n/q3-string-manipulation-2-pfz4r?&layout=Editor
```

![](http://images.innoveduc.fr/string_sean_harry.gif)

Tout ça est bien pratique, mais un peu limité tout de même pour des manipulations plus complexes.
Heureusement, PHP possède un très grand nombre de fonctions natives qui vont te permettre de gagner beaucoup de temps.
Il en existe vraiment beaucoup, mais certaines sont plus utilisées que d'autres... Tu vas vite connaître par coeur certaines des plus communes.
Pour les autres, pas de panique, tu n'es pas obligé de tout connaître, il faut juste que tu puisses facilement les retrouver dans la documentation.

Voici donc une liste non exhaustive de quelques fonctions parmi les plus couramment utilisées.

- [strlen](https://secure.php.net/manual/en/function.strlen.php) : permet de connaître la taille d'une chaîne, c'est-à-dire le nombre de caractères qui la composent.

```php
$weapon = 'fouet';
$length = strlen($weapon); // vaut 5, car fouet contient 5 caractères;

```

- [trim](https://secure.php.net/manual/fr/function.trim.php) : permet de tronquer les caractères blancs (espaces, tabulation...) en début et fin d'une chaîne. Il existe les variantes `ltrim` (_left_) et `rtrim` (_right_) qui font la même chose, mais seulement à gauche et à droite de la chaîne. 
Note également qu'il est possible (optionnellement) d'indiquer à trim un autre type de caractère à tronquer à la place des blancs.

```php
$temple = ' maudit  ';
echo $temple; // affiche " maudit  "
echo trim($temple); //  affiche "maudit"
echo ltrim($temple); // affiche "maudit  ";
echo rtrim($temple); // affiche " maudit";

```

- Manipulation de la casse : PHP est sensible à la casse. C'est-à-dire qu'un caractère minuscule est différent du même caractère en majuscule.
Autrement dit, `'a' != 'A'`. Il existe cependant plusieurs fonctions pour modifier la casse.
Ainsi, [strtoupper](https://secure.php.net/manual/fr/function.strtoupper.php), renvoie une chaîne en majuscule, tandis que [strtolower](https://secure.php.net/manual/fr/function.strtolower.php) renvoie une chaîne en minuscule.
Des variantes existent, comme [ucfirst](https://secure.php.net/manual/fr/function.ucfirst.php) qui convertit le premier caractère d'une chaîne en majuscule, ou encore [ucwords](https://secure.php.net/manual/fr/function.ucwords.php) qui convertit chaque première lettre des mots d'une phrase en majuscule.

- [str_replace](https://secure.php.net/manual/fr/function.str-replace.php) : cette fonction permet de remplacer tout ou partie d'une chaîne par une autre chaîne.

```phpsandbox
https://phpsandbox.io/n/q3-string-manipulation-3-zus4n?&layout=Editor
```

Bien entendu, cela fonctionne uniquement si le motif recherché est trouvé dans la chaîne, sinon la chaîne d'origine non modifiée est renvoyée. Par défaut, `str_replace` est sensible à la casse, mais il existe `str_ireplace` qui lui, y est insensible.

- Conversion : il existe également des fonctions qui vont aider à échapper certains caractères automatiquement. Par exemple, [htmlentities](https://secure.php.net/manual/fr/function.htmlentities.php) convertit automatiquement les balises HTML contenues dans la chaîne, pour qu'elles ne soient pas interprétées à l'affichage.
Cela évite des problèmes d'affichage ou d'injection de code malveillant dans une page. Il existe d'autres fonctions utiles comme [addslashes](https://secure.php.net/manual/fr/function.addslashes.php), [url_encode](https://secure.php.net/manual/fr/function.urlencode.php), [nl2br](https://secure.php.net/manual/fr/function.nl2br.php)...

- [explode](https://secure.php.net/manual/fr/function.explode.php) et [implode](https://secure.php.net/manual/fr/function.implode.php) : Ces deux fonctions, souvent indissociables l'une de l'autre, sont très utilisées. 
Elles permettent pour `explode` de convertir une chaîne de caractères en un tableau (en fonction d'un délimiteur) et pour `implode`, de faire l'opération inverse.

```php
$team = 'Harrison Steven George';
$persons = explode(' ', $team); 
// la chaîne $team a été explosée en fonction du délimiteur 'espace', en un tableau contenant ['Harrison', 'Steven', 'George']. 
// le caractère délimiteur 'espace' n'est plus présent dans le tableau obtenu.
// Pour utiliser explode(), le délimiteur est un paramètre obligatoire.

echo implode (',', $persons); 
// implode prend en paramètres un délimiteur et un tableau. 
// affiche "Harrison,Steven,George". Une chaîne est créée à partir des chaînes contenues dans le tableau, et le délimiteur (ici la virgule) est placé entre chaque élément du tableau.
// pour utiliser implode(), le délimiteur est un paramètre optionnel
echo implode($persons); // affiche "HarrisonStevenGeorge".

```

![](http://images.innoveduc.fr/strings_harry_steven_georges.png)

```alert-info
Certains caractères, notamment les caractères accentués ou de langues étrangères, sont codés sur plusieurs octets (car un seul ne suffisait pas).
Dans ce cas, l'utilisation des fonctions de manipulation de chaînes classiques peut poser des problèmes (obtentions de résultats tronqués, erronés, de chaînes corrompues...).
Par exemple, `strlen('é')` donne 2 et non 1, car le caractère 'é' est codé sur 2 octets ! 
Pour résoudre cette problématique, il a été ajouté à PHP un module appelé mbstring,  qui fournit des équivalences multi-octets aux fonctions de chaînes de caractères classiques.
Elles sont alors préfixées par mb_, par exemple mb_strlen, mb_strtoupper... Si ce module n'est pas installé, tu peux le faire dans ton terminal via la commande
`sudo apt install php-mbstring`. Tu devras ensuite relancer ton serveur HTTP.
```

```resource
https://secure.php.net/manual/fr/book.mbstring.php
# Les mêmes dans leur version multi-octets
Pense à ces fonctions si tu es amené à travailler, par exemple, avec des caractères accentués ou étrangers.
```

```resource
https://secure.php.net/manual/fr/ref.strings.php
# Principales fonctions pour manipuler les strings
Cette liste est à peu près exhaustive, ça fait beaucoup ! Tu n'as pas à toutes les apprendre, mais il faut savoir les retrouver facilement dans la doc.
```

# 💪 Challenge

### Un message codé pour Indy

Indiana Jones, le célèbre professeur/archéologue/aventurier, vient de récupérer trois papyrus antiques contenant chacun un message codé !
Heureusement, il a également découvert la manière de le déchiffrer, mais c'est un peu compliqué de le faire à la main.
Il te donne alors les instructions pour que tu développes un petit script permettant d'automatiser le processus.
Cela pourra être d'autant plus utile s'il rencontre à nouveau ce système de chiffrement plus tard.

Voici comment procéder :

* Calculer la longueur de la chaîne et la diviser par 2, tu obtiendras ainsi le "chiffre-clé".
* Récupère ensuite la [sous-chaîne](https://secure.php.net/manual/fr/function.substr.php) de la longueur du chiffre-clé en commençant à partir du 6ème caractère.
* Remplace les chaînes '@#?' par un espace.
* Pour finir, [inverse](https://secure.php.net/manual/fr/function.strrev.php) la chaîne de caractères.

Lance ton code sur chacun des messages suivants, et poste ensuite le code PHP que tu as écrit, ainsi que les textes déchiffrés en commentaires.

* message 1 : 0@sn9sirppa@#?ia'jgtvryko1
* message 2 : q8e?wsellecif@#?sel@#?setuotpazdsy0\*b9+mw@x1vj
* message 3 : aopi?sgnirts@#?sedhtg+p9l!

### Critères de validation

* Le message secret est bien déchiffré. Il faudra lancer le script trois fois, une fois pour chaque message, pour confirmer que tout fonctionne correctement.

==$==


# Solution 1

```php
<?php

$message1 = "0@sn9sirppa@#?ia'jgtvryko1";
$keyFigure = mb_strlen($message1) / 2;
$message1 = substr($message1, 5, $keyFigure);
$message1 = str_replace('@#?', ' ', $message1);
echo strrev($message1) . PHP_EOL;

$message2 = "q8e?wsellecif@#?sel@#?setuotpazdsy0*b9+mw@x1vj";
$keyFigure = mb_strlen($message2) / 2;
$message2 = substr($message2, 5, $keyFigure);
$message2 = str_replace('@#?', ' ', $message2);
echo strrev($message2) . PHP_EOL;

$message3 = "aopi?sgnirts@#?sedhtg+p9l!";
$keyFigure = mb_strlen($message3) / 2;
$message3 = substr($message3, 5, $keyFigure);
$message3 = str_replace('@#?', ' ', $message3);
echo strrev($message3) . PHP_EOL;
```

# Solution 2  

Identique à la solution 1 mais en utilisant une fonction pour éviter de répéter le code commun.

```php
<?php

function decryptMessage($message) {
    $keyFigure = mb_strlen($message) / 2;
    $message = substr($message, 5, $keyFigure);
    $message = str_replace('@#?', ' ', $message);
    return strrev($message);
}

$message1 = "0@sn9sirppa@#?ia'jgtvryko1";
echo decryptMessage($message1) . PHP_EOL;
$message2 = "q8e?wsellecif@#?sel@#?setuotpazdsy0*b9+mw@x1vj";
echo decryptMessage($message2) . PHP_EOL;
$message3 = "aopi?sgnirts@#?sedhtg+p9l!";
echo decryptMessage($message3) . PHP_EOL;
```