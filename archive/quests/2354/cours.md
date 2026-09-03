# Prérequis
```quests
1144, 2309
```

```title-book
Introduction
```

```story
Il est temps de passer à la branche **[poo8](https://github.com/WildCodeSchool/php-wildzoo/tree/poo8)** de ton Wild zoo. Dans cette quête, tu vas apprendre comment gérer efficacement les erreurs via les exceptions.

Avant toute chose, une fois ta nouvelle branche récupérée, tu **constateras un léger changement**. Tu n'as maintenant plus les multiples `require` dans le fichier *index.php* mais un unique fichier chargeant l'autoload de composer. Eh oui, à partir de cette quête, nous allons utiliser composer, le gestionnaire de paquet de PHP, **pour gérer le chargement automatique de nos classes**, comme tu as pu le voir sur la quête dédiée (en **pré-requis** de cette quête par ailleurs).

Pour démarrer ton projet, tu dois seulement faire un 

    composer install

Un dossier *vendor* (non versionné) va apparaître. Tu n'as normalement rien d'autre à faire, à partir de maintenant, si tu respectes bien la nomenclature pour les noms de tes *namespaces*, tu n'auras plus à t'occuper de faire des `require` :D    

```

## 🤓 À la fin de cette quête, tu seras capable de :
- ✅ Comprendre le concept d'exception
- ✅ Lancer une exception
- ✅ Attraper une exception

# Définition des exceptions

La programmation objet a pour but de refléter au mieux la réalité et d'éviter les comportements inappropriés des objets créés. Mais justement, que faire lorsqu'un comportement inaproprié est détecté ? 

Prenons un exemple simple, la méthode `setSize()` d'**Animal**. Dans son comportement actuel, si l'utilisateur entre une taille impossible (inférieure à zéro), la taille est fixée à zéro.

```php
public function setSize(float $size): void
{
	if ($size < 0) {
	    $size = 0;
	}

	$this->size = $size;
}
```

Une autre solution pourrait-être de stopper le code, mais c'est parfois un peu violent car une erreur n'est pas toujours "bloquante". Une autre possibilité est de renvoyer un message d'erreur, mais cela imposerait de retourner un type `void` OU `string`, ce qui n'est pas forcément très logique.
De plus, si une string est retournée, cela impose à l'utilisateur de gérer l'erreur en l'affichant, or une erreur peut très bien être gérée via un message dans un fichier de log, un envoi d'email à l'administrateur du site, ou un peu de tout cela à la fois. 

Les exceptions sont un moyen élégant d'envoyer à l'utilisateur de la classe, **une information indiquant que quelque chose s'est mal déroulée**, sans parti pris sur la manière de réagir face à cette information. C'est justement à l'utilisateur de la classe de choisir de ce qu'il veut faire de cette information (affichage ou non de l'erreur, enregistrement de l'erreur, sortie ou non du programme, *etc.*). 
Les exceptions sont elles-mêmes des classes, spécialisées pour la gestion des erreurs, donc très appropriées dans un contexte objet.

  
```resource
https://eilgin.github.io/php-the-right-way/#errors_and_exceptions
# Les erreurs et exceptions
Une gestion des exceptions avancées
```

```resource
https://www.php.net/manual/fr/language.exceptions.php
# Explication de l'exception sur PHP
Comprendre le fonctionnement des exceptions
```

L'exception se passe donc en 2 phases. 
1. On "lance" une exception à l'endroit où le problème est détecté, s'il y a lieu.
2. On exécute le code et on "attrape" la ou les exceptions lancées, puis on décide de comment gérer ce type de problème. 

# Lancer une exception
La première étape consiste à lancer un exception, reprenons notre exemple : 
```php
use Exception

class Animal 
{
    //...
    
    public function setSize(float $size): void
    {
	    if ($size < 0) {
	        throw new Exception('The size should be a positive number');
	    }

	    $this->size = $size;
    }
    
    //...
}
```

Pour *lancer* l'exception, il faut tout d'abord utiliser le mot clé `throw`. Ensuite, il faut lui passer une **Exception**. Et les exceptions sont elles-mêmes des classes (intégrées à PHP, note le `use Exception` en début de fichier). Tu dois donc lancer un object exception. En paramètre, l’exception prendra un message décrivant le problème.

De plus, le lancement d'une exception n'est pas considéré comme quelque chose "retourné" pour la fonction, cela n'a donc **pas d'impact sur le typage de sortie** (qui reste `:void` ici)

🖥️ Pour le moment, l'exception est lancée mais pas "attrapée". Que se passe t-il si tu essaies de passer une *size* négative au lion par exemple ?
Actualise ton interface web, tu dois voir le message suivant à l'écran : 
```alert-error
Fatal error: Uncaught Exception: The size should be a positive number
```
Première constation, lancer une exception sans l'attraper va **stopper l'éxecution du code**, comme si tu avais mis un `exit()`. Le message indique d'ailleurs bien que l'exception est "Uncaught", c'est-à-dire non attrapée. Idéalement, toute exception lancée devrait être attrapée, nous allons voir dans la partie suivante comment gérer cela.

# Attraper une exception
L'exception est lancée au moment ou l'on fait le `setSize()` dans *index.php* et uniqument si on passe un argument négatif.
🖥️ Retourne dans *index.php* et mets à jour le code de cette manière :
```php
$lion = new Felid('lion');
try {
    $lion->setSize(100);
} catch(Exception $exception) {
    var_dump($exception->getMessage());
}
```
Nous utilisons ici une nouvelle structure en deux parties, le bloc try/catch.
Dans un 1er bloc de type `try`, tu vas mettre entre accolade tout le code "à tester" (ici juste le `setSize()` mais il pourrait y avoir plusieurs lignes) . Si aucune exception n'est lancée durant son exécution (pour une size > 0), le code continue alors sans entrer dans le block `catch`.
Par contre si une erreur est levée, le block `catch` prend alors la relève. Teste en mettant -100 en size cette fois, tu vois que le `var_dump` s'affiche. Au niveau du `catch`, le paramètre attendu est le type d'Exception (on va voir par la suite qu'il en existe plusieurs) et un nom de variable. Les classes d'exceptions possèdent différentes méthodes, dont `getMessage()` qui permet d'afficher le message d'erreur indiqué au moment du `throw`.

Un `var_dump()` pour gérer une erreur, ce n'est pas très joli. Tu vas plutôt enregistrer un message dans une variable `$errors`, comme ceci :
```php
$lion = new Felid('lion');
try {
    $lion->setSize(100);
} catch(Exception $exception) {
    $errors[] = $exception->getMessage();
}
$lion->setThreatenedLevel('VU');
```
🖥️ La variable, si elle est définie, est gérée ensuite par l'interface pour s'afficher de la manière et à l'endroit souhaité par l'utilisateur de la classe. Actualise, tu vois le nouveau message s'afficher d'une toute autre manière.

## Les différents types d'exception
Nous avons vu la classe principale **Exception**. Mais qui dit classe, dit possibilité d'en hériter. PHP vient donc avec tout une hiérarchie de classe, étendant toutes **Exception** mais chacune appropriée à un type d'erreur spécifique. Il est également possible de définir ses propres classes d'exception si besoin.

Voici un schéma reprenant les pricipales classes d'exception en PHP 
![](https://i.stack.imgur.com/qlTsJ.png)

Le but n'est pas de détailler chacune ici (réfère-toi à la documentation pour cela) mais nous allons plutôt voir comment utiliser ensemble plusieurs exception et ce que cela implique.

🖥️ Nous allons tout d'abord gérer un nouveau cas d'exception dans `setSize()`, lançons une exception si la taille est irréaliste, par exemple supérieure à 10000 cm.

```php hl[6:8]
public function setSize(float $size): void
{
    if ($size < 0) {
        throw new Exception('The size should be a positive number');
    }
    if($size > 10000) {
        throw new RangeException('The ' . $this->getName() . ' is too large');  
    }

    $this->size = $size;
}
```
Ici, à la différence de l'exemple précédent, c'est la classe **[RangeException](https://www.php.net/manual/fr/class.rangeexception.php)** qui est utilisée (pense à bien ajouter le use en haut de fichier), elle-même héritant de **RuntimeException**, qui hérite à son tour d'**Exception**. 

```alert-info
Les classes filles d'Exception n'ont pas réellement de comportement différent, mais le fait d'avoir différentes clases permet de classifier et différencier plus efficacement les types d'erreurs.
```
 
🖥️ Retour sur *index.php*, nous aimerions attraper cette exception si elle est lancée. Modifie `$lion->setSize('XX')` afin de créer un cas où l'exception va être lancée, c'est à dire une taille supérieure à 10000. En l'état le bloc `try` qui entoure que le `setSize()` attrape bien cette **RangeException** puisqu'elle hérite d'**Exception**

Par contre, nous considérons cette erreur comme moins "grave", et nous souhaiterions afficher un message d'erreur moins envahissant. L'idée est de différencier le traitement de l'exception en fonction de son type. Pour cela, c'est simple, il suffit de mettre plusieurs `catch` associé au même `try`

```php hl[3:4]
try {
    $lion->setSize(20000);
} catch (RangeException $exception) {
    $smallErrors[]  = $exception->getMessage();
} catch (Exception $exception) {
    $errors[]  = $exception->getMessage();
}
```

Ici la **RangeException** va être affichée en tant que "small error", ce qui donne visuellement un autre affichage plus discret. Le `setSize()` quant à lui ne s'est pas réalisé, et la taille de ton lion n'est pas de 20 mètres, ouf !

```alert-warning
Attention, cette fois ci, PHP ne rentre plus dans le second catch, car il rentre déjà dans le premier, même si RangeException hérite d'Exception. Il faut donc toujours placer tes blocs catch de l'exception la plus précise, à la plus générique, PHP s'arrêtant au premier catch correspondant trouvé.
```

```ressource
https://www.php.net/manual/fr/language.exceptions.php#language.exceptions.finally
# Pour aller plus loin : le block Finally
Pour information, il existe également un block `finally` que tu peux mettre **après** les blocs `catch`. Le code dans ce bloc sera exécuter systématiquement, qu'il y ait eu ou non une exception, et quelque soit le bloc catch exécuté.
```
 
## Challenge
Tu vas mettre en application les exceptions sur les niveaux de menace.
- Dans `setThreatenedLevel()` ajoute une **UnexpectedValueException** , qui sera lancée si le paramètre `$threatenedLevel` ne fait pas partie du tableau `THREATENED_LEVELS`.
- Ajoute le try/catch correspondant pour afficher une `$errors` dans *index.php*, pour l'**éléphant**.
- Lance une **RuntimeException** toujours dans `setThreatenedLevel()`, si le paramètre `$threatenedLevel` vaut 'EX'. Le message sera 'Attention le ' . $this->getName() . ' ne devrait pas être là si l\'espèce est éteinte !"
- Catch cette nouvelle exception pour l'afficher en tant que `$smallErrors` dans *index.php*
- Poste le code de `setThreatenedLevel()` et de ton try/catch dans *index.php* pour l'elephant

## Validation
- Les deux exceptions sont lancées et attrapées, les messages d'erreurs s'affichent correctement en fonction de la situation (grosse erreur dans le premier cas, petite erreur si l'espèce est éteinte).

==$==
```php
/** Animal.php
public function setThreatenedLevel(string $threatenedLevel = 'NE'): void
{
    if (!in_array($threatenedLevel, self::THREATENED_LEVELS)) {
        throw new UnexpectedValueException('La menace est incorrecte');
    }

    if($threatenedLevel == 'EX') {
        throw new RuntimeException('Le ' . $this->getName() . ' ne peut être là, cette espèce est éteinte');
    }

    $this->threatenedLevel = $threatenedLevel;
}
```

```php
/** index.php
$elephant = new Mammal('elephant');
try{
    $elephant->setThreatenedLevel('EX');
} catch(UnexpectedValueException $exception) {
    $errors[]  = $exception->getMessage();
} catch (RuntimeException $exception) {
    $smallErrors[]  = $exception->getMessage();
}
```
![solution](http://solution.com)