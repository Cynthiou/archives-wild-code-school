# Prérequis

```quests
2295
```

```title-book
Introduction
```

```story
Il est temps de passer à la branche **poo7** de ton Wild zoo. Dans cette quête, tu vas découvrir le concept d'héritage, très important en programmation orientée objet pour limiter la duplication du code et simplifier son évolution. Nous allons l'appliquer ici à la classification des animaux de ton zoo.

![image](https://storage.googleapis.com/quest_editor_uploads/l2lSGVCW3OM4wBZsE84W1ZFntF2qMBSG.png)
```


## 🤓 À la fin de cette quête, tu seras capable de :
- ✅ Comprendre le concept d'héritage
- ✅ Créer et utiliser des classes filles


# Définition de l'héritage
Pour le moment, tu crées divers animaux depuis ton unique classe **Animal**. Cependant, plus ton zoo va se développer, plus tu rencontras des cas particuliers pour les animaux. Leur condition de vie idéale (température, humidité, luminosité...), leur régime alimentaire (viande, graines, végétaux, un peu de tout...), leur moyen de se déplacer (sur le sol, en volant, en nageant...), leur façon de se reproduire (temps de gestation, ovipare ou vivipare...). Tu l'as compris, chaque animal à ses propres contraintes, ce qui est tout à fait normal ! 

Si tu essaies de prendre en compte tout cela, ta classe **Animal** va très vite devenir énorme et difficile à maintenir. Par exemple pour un poisson, tu sais que le nombre de pattes sera toujours zéro, cette information ne sera donc pas très pertinente, par contre tu seras davantage intéressé par le nombre de nageoires (*fin* en anglais). Pour un céphalopode, c'est plus le nombre de tentacules qui va t'intéresser, *etc.* Tu risques de te retrouver avec :

```php
class Animal
{
    private string $name;
    private int $pawNumber;
    private int $finNumber; 
    private int $tentacleNumber;   
    // ...
}
```

Et on pourrait continuer longtemps avec plein d'autres cas plus ou moins particuliers. Pour le moment, `$pawNumber` est dans le `__construct()`, faut-il ajouter `$finNumber` et `$tentacleNumber` également dans le constructeur ? 
Notre lion va donc finir par avoir plein de propriétés qui lui sont inutiles (et les éventuelles *getters* et *setters* correspondant). Est-ce une utilisation logique de pouvoir faire `$lion->getTentacleNumber()` ? Ceci n'est qu'un exemple très limité, tu peux facilement imaginer les dizaines d'autres propriétés/méthodes que la classe **Animal** pourrait avoir, avec pour chaque animal, une majorité qui ne le concerne même pas !

🛑 STOP. C'est justement ce type de problème que cherche à corriger l'héritage ! Si les objets deviennent trop différents les uns des autres, il est sans doute temps de les regrouper ensemble ceux qui ont des caractéristiques communes et créer une nouvelle classe pour eux. 

Pour les animaux, ce n'est pas trop compliqué, nous avons déjà l'habitude de les classer. Sans être trop regardant sur la rigueur scientifique, nous pouvons facilement dégager de grands groupes qui parlent à tout le monde : les mammifères, les oiseaux, les poissons, les reptiles, les mollusques...

On voit que (sauf exception), tous les mamifères ont 4 pattes, les oiseaux 2 et les poissons aucune. Les poissons ont par contre des nageoires.

Ne modifie rien dans ton code pour le moment, mais imaginons que l'on souhaite séparer **Mammal**, **Bird**, **Fish** dans différentes classes, la propriété `$finNumber` pourra être définie uniquement dans **Fish**, tandis que `$pawNumber` pourra prendre une valeur par défaut à 0, 2 et 4 en fonction du type d'animal.

```php hl[9]
// Mammal.php
namespace App;

class Mammal
{
    private string $name;
    private float $size = 100;
    private bool $carnivorous = false;
    private int $pawNumber = 4;
    private string $threatenedLevel = 'NE';
    //...
}
```

```php hl[9]
// Bird.php
namespace App;

class Bird
{
    private string $name;
    private float $size = 100;
    private bool $carnivorous = false;
    private int $pawNumber = 2;
    private string $threatenedLevel = 'NE';
    //...
}
```

```php hl[9,10]
// Fish.php
namespace App;

class Fish
{
    private string $name;
    private float $size = 100;
    private bool $carnivorous = false;
    private int $pawNumber = 0;
    private int $finNumber = 2;
    private string $threatenedLevel = 'NE';
    //...
}
```

Une partie du problème est ainsi résolu, **cependant une énorme partie du code est répétée** entre chaque classe. Effectivement, bien que différents, les mammifères, poissons et oiseaux ont tout de même beaucoup de caractéristiques communes, par exemple un nom, une taille, un niveau de vulnérabilité, *etc.*

# Créer des classes filles

Chaque groupe d'animal hérite donc d'un certain nombre de caractéristiques communes à tous les animaux, mais possède des caractéristiques propres. Nous allons donc conserver la classe **Animal** qui contient ce socle commun, et les classes **Mammal**, **Bird** et **Fish** vont hériter d'elle, et donc de toutes ses propriétés, méthodes et constantes. **Animal** sera la classe *mère* et les trois autres, les classes *filles*.
Nous allons les laisser vide pour le moment, puis spécifier de nouvelles caractéristiques propres à chaque fille.

🖥️ À toi de jouer pour créer les classes de cette manière :

```php
namespace App;

class Animal
{
    private string $name;
    private float $size = 100;
    private bool $carnivorous = false;
    private int $pawNumber;
    private string $threatenedLevel = 'NE';
    //...
}
```

```php
namespace App;

class Mammal extends Animal
{
}
```

```php
namespace App;

class Bird extends Animal
{
}
```

```php
namespace App;

class Fish extends Animal
{
}
```

Niveau syntaxe, le nouveau mot-clé `extends` apparaît après le nom de la classe, pour indiquer de quelle classe nous souhaitons hériter.
Ici les 3 nouvelles étendent la classe **Animal**. Il faut bien comprendre que le fait d'hériter récupère **toutes les constantes, propriétés et méthodes** de la classe mère, sans avoir besoin de les réécrire. 
Quelques règles à savoir :
- une classe ne peut hériter que d'une seule mère (mais une classe mère peut avoir plusieurs filles)
- une classe fille peut elle même être mère d'une autre classe (il peut y avoir autant de niveau d'héritage que l'on veut). Ainsi une classe "petite-fille" hérite des caractéristiques de sa "grand-mère".

🖥️ Dans ton fichier *index.php*, modifie juste l'instanciation du lion pour utiliser **Mammal** à la place d'**Animal**.

```php
$lion = new Mammal('lion', 4);
```

Sur l'interface web, tu verras qu'une nouvelle indication apparaît en haut à droite de chaque animal. Elle t'indique les relations d'héritage de ton animal. Au niveau du lion, tu dois avoir **Animal** et **Mammal**, avec une flèche entre les deux symbolisant l'héritage.

## Constructeur
Il est intéressant d'utiliser l'héritage si la classe fille possède une ou plusieurs caractéristiques plus spécifiques que la classe mère (qui doit être plus généraliste). Ici cela se traduit par exemple par le nombre de pattes qui est différent pour chaque classe fille. Pour modifier une propriété, tu es obligé de la réécrire dans la fille (par exemple `$pawNumber`). Les autres propriétés que tu ne réécris pas sont héritées automatiquement avec la même valeur que dans la classe mère. Tu peux en profiter pour changer la valeur par défaut des propriétés, ce qui nous arrange ici car nous partons du principe que tous les mammifères ont 4 pattes, tous les oiseaux 2 pattes, les poissons zéro, *etc.*
 
```php hl[5:8]
class Mammal extends Animal
{
    private $pawNumber = 4;
    
    public function __construct(string $name)
    {
        parent::__construct($name, $this->pawNumber);
    }
}
```
Pour les mammifères, le nombre de pattes sera 4 par défaut. L'information du nombre de pattes n'est donc plus nécessaire au moment de l'instanciation d'un mammifère, car on connaît ce nombre. 
Une classe fille hérite de toutes les méthodes de sa mère, **constructeur inclus**. Nous devons donc réécrire le constructeur pour qu'il ne prenne plus que le `$name` en paramètre, et non plus le nombre de pattes ! Cependant le constructeur de la classe mère exécute du code que l'on souhaiterait peut-être conserver. Dans ce cas, tu peux explicitement appelé la méthode de la classe parente depuis la classe fille, à l'aide du mot-clé `parent::`) et lui passer cette fois les 2 paramètres nécessaire dans **Animal** (le nom ET les pattes).

🖥️ Au final, ce bout de code te permet maintenant d'écrire dans *index.php*

```php
$lion = new Mammal('lion');
```

Dans l'interface, tu vois que le nombre de patte du lion est toujours de 4 !

## Protected
Dans une fille, tu peux ajouter de nouvelles propriétés et méthodes, mais également **modifier le comportement** par rapport à la mère.
Pour les mammifères, tu veux que le texte de la méthode `speak()` soit un peu plus personnalisé, et change en "Bienvenue humain, moi aussi je suis un mammifère et mon nom est <nom>".

🖥️ Cela semble facile, il suffit de reprendre le code dans la classe **Mammal** pour le modifier.
Dans l'interface, tu vois que le nombre de pattes du lion est toujours de 4 !
```php
public function speak(string $lang = 'fr'): string
{
    if ($lang === 'fr') {
        $message = 'Bienvenue humain, moi aussi je suis un mammifère et mon nom est ';
    } else {
        $message = 'Welcome human, I\'am a mammal too and my name is  ';
    }

    return $message . $this->name;
}
```

Ouvre ton *index.php* et **passe ta souris** sur le lion, tu obtiens une vilaine erreur 

```alert-error
Warning: Undefined property: App\Mammal::$name in ...
```

Essayons de comprendre. **Mammal** hérite d'**Animal**, donc récupère automatiquement la propriété `$name` et la méthode `speak()`. En réécrivant `speak()` dans **Mammal**, tu spécifies l'utilisation de `$this->name` directement depuis la classe fille. Or, cette propriété `$name` est **private**, ce qui signifie que tu n'as **pas le droit de l'utiliser en dehors de sa classe Animal**. Mais c'est ce que tu fais car, même si Mammal hérite d'Animal, c'est une classe différente, tu n'as donc pas le droit d'y utiliser une propriété privée, même héritée ! 
Ce n'est pas très pratique d'hériter de choses qu'on ne pourrait pas manipuler... C'est là qu'arrive une nouvelle visibilité, *protected*, qui vient compléter *public* et *private*. Une propriété (ou une méthode) *protected* ne pourra toujours pas être utilisée dans un script externe **MAIS** pourra être utilisé dans une classe descendante. 

🖥️ Dans **Animal** passe la propriété `$name` en *protected* au lieu de *private*. Réactualise. Le message d'erreur a disparu, la classe **Mammal** a le droit d'accès à `$name`.

```alert-warning
Tu peux modifier une visiblité de propriété/méthode/constante dans une classe fille, mais jamais vers un niveau plus restrictif. C'est-à-dire qu'un propriété *protected* pourrait passer *public* chez une fille, mais jamais *private*.
```

Comme cela a été évoqué plus haut, l'héritage n'est pas limité à une génération. Cela signifie que tu peux créer une classe fille de **Mammal**, **Felid** *etc.* et chaque fille hérite des caractéristiques de tous ces ancêtres, de manière cumulative. Si un comportement a été entre temps modifié dans la hiérarchie, c'est ce dernier (plus précis, plus proche) qui est hérité. 

🖥️ Créer la classe **Felid**, héritant de **Mammal**.
- Dans **Felid**, mets la propriété `$carnivorous` à `true` par défaut car les félins sont carnivores.
- Modifie ton *index.php* afin que le lion soit une instance de **Felid**. Pense à bien ajouter tes `require` dans le bon ordre d'utilisation (*Mammal.php* avant *Felid.php*) et enlève la ligne `$lion->setCarnivorous(true)` dans *index.php*

Regarde ton interface... Étrange, le lion est devenu végétarien (et du coup "non dangereux" au passage.
Pourquoi, alors que tu as bien spécifié que `$carnivorous` valait "true" pour les félins ? C'est encore une fois un problème de visibilité. Lorsque tu écris `private bool $carnivorous = true`, tu "écrases" la propriété du parent. Cependant, quand tu affiches le régime alimentaire, c'est le *getter* `isCarnivorous()` d'**Animal** qui est utilisé. Quand il est exécuté, c'est la propriété d'**Animal** (à *false* par défaut) qui est utilisée, car celle de **Felid** est considérée comme une nouvelle propriété, sa valeur ne "remonte" pas à **Animal**. Pour que la nouvelle valeur de la fille soit bien prise en compte, il faut passer la propriété en *protected* dans **Animal** ainsi que dans **Felid** !

🖥️ Modifie et réactualise, c'est normalement corrigé.

- Fais en sorte que l'éléphant soit une instance de **Mammal** et le parrot une instance de **Bird**.
- L'éléphant et le lion utilisent tout deux la nouvelle phrase propre aux mammifères uniquement, contrairement au perroquet.
Sur l'interface, tu dois voir le petit schéma des relations se mettre à jour.

## Final

![image](https://storage.googleapis.com/quest_editor_uploads/zeZL4OWPSX1C4Zoz63VlA3MPvPtcrPXn.png)

Sur ce schéma issue de [Wikipédia](https://en.wikipedia.org/wiki/Mammal) tu vois que la classification pour les mammifères est très complexe, et il y a une quinzaines d'embranchements avant d'arriver jusqu'aux félins. Il n'y a pas vraiment d'utilité de créer 15 classes entre **Mammal** et **Felid**, pour lesquelles les différences ne sont pas forcément pertinentes du point de vue d'un zoo. Il faut donc choisir le niveau de détail pertinent au problème. De même, il faut choisir jusqu'à quel niveau de précision l'on souhaite aller. Faut-il s’arrêter au **Felid**, où faut-il créer des classes filles pour les sous-types de félins ? Faut-il créer une classe pour chaque espèces ? Tous ces choix peuvent être pertinents, encore une fois c'est une question de logique métier. Le but pour le zoo est-il d'avoir une fiche d'identité pour chaque type animal (dans ce cas s'arrêter au **Felid**) et instancier un objet par espèce (lion, tigre, panthère...) est suffisant. Si l'objectif est par contre de recenser chaque animal du zoo, pousser jusqu'à l'espèce devient pertinent. En effet, il y aura plusieurs lions avec chacun un age, un genre, une taille différente...
Nous allons faire le choix de rester au point du vue de la description d'une espèce dans sa globalité, donc nous allons nous arrêter au **Felid** qui semble un niveau de détail suffisant.

Mais comment faire pour être sûr que, par la suite, personne ne créé une classe **Lion** depuis **Felid** ? La POO apporte ici une solution très simple, avec un nouveau mot-clé, `final`.

```php
final class Felid 
{
    // ....
}
```

Ce mot clé **interdit** de créer une classe qui va hériter de **Felid**.

🖥️ Ajoute le mot clé final sur **Felid**, créé une classe **Lion** héritant de **Felid**, puis modifie le **index.php** pour ajouter le require de *Lion.php*. Tu obtiens une erreur car **Felid** est une classe finale, tu ne peux pas en hériter ! 

```alert-error
Fatal error: Class App\Lion cannot extend final class App\Felid in ...
```
Supprime la classe **Lion** et enlève le require. 
Actualise, le message d'erreur disparaît. Sur le schéma d'héritage du Lion, un 🚫 est apparue à côté de **Felid** pour spécifier que la classe n'est plus héritable.

## Typage
Si on se place sur la classe **Area** cette fois, la méthode `addAmimal()` prend en paramètre un objet de type **Animal**. Or, ton lion dans la savane est de type Mammal maintenant ? Pourtant il n'y a pas d'erreur... C'est dû au fait qu'une classe fille hérite également de tous les types de ses ancêtres, ce qui te permet de typer dans une méthode avec un type générique (ici l'Animal) sans te soucier si l'objet passé sera de type **Animal** où l'un de ses descendant **Mammal**, **Bird**, **Feline**, etc. C'est le concept de **polymorphisme** en programmation orientée objet.

# Challenge
- Fait en sorte de créer cette architecture des **classes** pour organiser ton zoo. 
- Les animaux à créer depuis ces classes sont spécifiés entre [crochets], il y en a 10.
- Mets à jours les constructeurs pour ne plus avoir à spécifier le nombre de pattes dans les classes où cela est nécessaire.
- N'oublie pas de mettre à jour le tableau `$animals` dans ton fichier *index.php*
>- Animal
>    - Mammal (4 pattes) [Elephant]
>        - final Feline (carnivore) [Lion][Tiger]
>        - final Equid (non carnivore) [Zebra]
>    - Bird (2 pattes) [Parrot]
>    - Reptile 
>        - final Crocodilian (4 pattes, carnivore) [Alligator]
>        - final Snake (0 patte, carnivore) [Python]
>    - Arthropode
>        - Arachnide (8 pattes) [Scorpio]
>            - final Spider (carnivore) [Tarantula]
>        - Insect (6 pattes) [Bee]

Poste une capture d'écran de ton interface une fois les 10 animaux instanciés, l'encadré sur les classes parentes pour chaque animal, doit refléter les instructions ci-dessus.

✨ **Remarque :** pour gagner du temps, tu n'es pas obligé de mettre les animaux dans les bonnes zones et de spécifier les tailles et niveaux de menace.

## Validation

- La capture contient bien les 10 animaux (éléphant, lion, tigre, zèbre, perroquet, alligator, python, scorpion, tarentule, abeille)
- Chacun hérite d'au moins une classe (pour l'éléphant et le perroquet), au plus de 3 autres classes (pour la tarentule)
- Les classes finales sont bien signalées par l'icône 🚫.

==$==

```php
require __DIR__ . '/../src/Animal.php';
require __DIR__ . '/../src/Area.php';
require __DIR__ . '/../src/Mammal.php';
require __DIR__ . '/../src/Equid.php';
require __DIR__ . '/../src/Arthropode.php';
require __DIR__ . '/../src/Arachnide.php';
require __DIR__ . '/../src/Insect.php';
require __DIR__ . '/../src/Spider.php';
require __DIR__ . '/../src/Bird.php';
require __DIR__ . '/../src/Reptile.php';
require __DIR__ . '/../src/Crocodilian.php';
require __DIR__ . '/../src/Snake.php';
require __DIR__ . '/../src/Felid.php';

use App\Area;
use App\Animal;
use App\Arachnide;
use App\Bird;
use App\Crocodilian;
use App\Equid;
use App\Felid;
use App\Insect;
use App\Mammal;
use App\Snake;
use App\Spider;

$elephant = new Mammal('elephant');
$elephant->setThreatenedLevel('LC');
$elephant->setSize(400);

$lion = new Felid('lion');
$lion->setSize(100);
$lion->setThreatenedLevel('VU');

$tiger = new Felid('tiger');
$tiger->setSize(150);
$tiger->setThreatenedLevel('EN');

$zebra = new Equid('zebra');
$zebra->setSize(120);
$zebra->setThreatenedLevel('EN');

$parrot = new Bird('parrot');
$parrot->setSize(30);

$alligator = new Crocodilian('alligator');
$alligator->setSize(180);

$python = new Snake('python');
$python->setSize(300);

$tarantula = new Spider('tarantula');
$tarantula->setSize(10);

$scorpio = new Arachnide('scorpio');
$scorpio->setSize(15);
$scorpio->setCarnivorous(true);

$bee = new Insect('bee');
$bee->setSize(2);

$animals = [$elephant, $lion, $tiger, $zebra, $parrot, $alligator, $python, $scorpio, $tarantula, $bee];
```