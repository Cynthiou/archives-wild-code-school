# Prérequis
```quests
2239
```

```title-book
Introduction
```
Dans la précédente quête, tu as pu comprendre à quoi servait la programmation orientée objet, puis tu as vu la syntaxe d'une classe et ses propriétés, avant d'instancier tes premiers objets. Dans cette quête, nous allons nous attarder sur les propriétés et comment manipuler leurs valeurs.

🖥️ Le projet Wildzoo distant contient 10 branches (une par quête de cette série sur la POO). A chaque nouvelle quête tu dois basculer vers une nouvelle branche correspondant au numéro de la quête. Pour rappel, tu peux trouver le [dépôt Wildzoo ici](https://github.com/WildCodeSchool/php-wildzoo)

Si ce n'est pas fait, effectue bien un `git add` et `git commit` sur ta branche en cours (POO1) pour valider les changement (sinon tu ne pourras pas changer de branche).
Ensuite, tu vas basculer sur la branche **poo2**. Pour cela, commence par lancer la commande `git fetch origin` qui va récupérer les branches distantes (tu les vois en faisant un `git branch -a`). Ensuite déplace toi vers la branche poo2 via un `git switch poo2` et le tour est joué.

## 🤓 À la fin de cette quête, tu seras capable de :
- ✅ Créer une propriété,
- ✅ Lire une propriété,
- ✅ Modifier une propriété.

# Syntaxe

Dans le monde réel, un objet/un concept se définit par des caractéristiques. Pour un animal, nous avons décidé d'utiliser un nom, une taille, un régime alimentaire et un nombre de pattes. Dans la classe, cela se traduit par des *variables* définies à l'intérieur des accolades de la classe, et qu'on appelle des **propriétés**, auxquelles il va être possible d'affecter des **valeurs**. 

🖥️ Positionne-toi sur le fichier *src/Animal.php*, tu retrouves la classe Animal et ses 4 propriétés définies pour le moment. 
```php
class Animal
{
    public string $name;
    public float $size;
    public bool $carnivorous;
    public int $pawNumber;
}
```

Côté syntaxe, une propriété s'écrit comme une variable (on l'appelle aussi variable de classe ;-)). Tu noteras qu'il est possible (et même très vivement recommandé) de typer cette propriété, n'oublie pas de le faire. Enfin, en tout début de ligne, il y a le mot clé `public`, ce dernier concerne la *visibilité* de la propriété, nous reparlerons de ce concept un peu plus tard.

# Affecter une valeur à une propriété

Il y a plusieurs manières de faire. Si tu fais un `var_dump($animal1)` dans ton fichier *public/index.php*, tu constates que toutes les valeurs sont `uninitialized`.

```alert-warning
Petite subtilité de PHP, si tu ne types pas les propriétés, la valeur par défaut devient `null` et non plus `uninitialized`. Si tu essaies par la suite d'afficher une propriété `uninitialized` tu auras une erreur, tandis qu'une propriété non typé (donc à null) afficherait par défaut une chaîne vide. Mais cela ne devrait pas t'arriver puisque nous allons toujours typer nos propriétés.
```

🖥️ Si tu regardes l'interface web, tu vois que les valeurs sous le nom sont *undefined*.

## Affecter une valeur par défaut

La première manière d'affecter une valeur à une propriété est de le faire dès sa définition. C'est intéressant pour donner une valeur "par défaut" mais ce n'est pas toujours pertinent. Donner un `$name` par défaut n'a pas grand intérêt, mais nous pouvons partir du principe que les animaux sont végétariens par défaut. On leur donnera une taille arbitraire de 100 par défaut pour le moment. 

```php
class Animal
{
    public string $name;
    public float $size = 100;
    public bool $carnivorous = false;
    public int $pawNumber;
}
```
🖥️ Si tu regardes l'interface web, tu vois que les valeurs par défaut s'affichent bien pour la taille et le régime alimentaire.

## Affecter une valeur depuis l'extérieur de la classe

Nous allons maintenant créer nos premiers animaux ! Une araignée est différent d'un dauphin ou d'un éléphant. Nous allons nous placer dans le fichier *index.php* et créer pour le moment un lion et un perroquet. Commence par renommer les variables `$animal1` en `$lion` et `$animal2` en `$parrot`, pour plus de lisibilité. Tu dois les modifier dans le tableau `$animals` également. 

Maintenant, tu vas pouvoir modifier une valeur depuis l'objet en suivant cette syntaxe :
```php
$lion->name = 'lion';
$lion->pawNumber = 4;
$lion->carnivorous = true;
```

Sois bien attentif à la manière d’accéder à la propriété d'un objet.
Pour un tableau, tu as l'habitude d'utiliser la syntaxe suivante `$array['key'];`, avec des crochets `[]`.
Pour un objet, il s'agit d'une petite flèche `->`, composée d'un moins `-` et d'un chevron _"supérieur à"_ `>`.
Et fais très attention, si dans la classe,  les propriétés sont préfixées d'un `$`, ce n'est pas le cas ici quand tu utilise la flèche.

Pour récupérer la valeur d'une propriété, tu utilises la même syntaxe. Par exemple, pour afficher une petite description de l'animal, tu feras :

```php
echo 'Bonjour je suis un ' . $lion->name . ' et j\'ai ' . $lion->pawNumber . ' patte(s)';
```

Retourne dans ton navigateur. Comme tu peux le voir, ton lion s'affiche avec les données que tu lui as mis. En bonus, une image de lion s'affiche également. Cette image se base simplement sur le nom 'lion' pour aller chercher l'image 'lion.png' dans le dossier public/assets/images/animals. Tu peux voir que de nombreuses images sont fournies par défaut :-)

Tu as, dans cet exemple, affecté une valeur aux propriétés `$name` et `$pawNumber`. De plus, tu as aussi modifié la valeur de `$carnivorous`, cette syntaxe permet donc d'initialiser *ou* d'affecter une nouvelle valeur à une propriété déjà initialisée.

🖥️ Essaie maintenant de modifier la `size` du lion à 50 depuis *index.php*. Sur l'interface, tu dois constater que la taille de l'image s'adapte en conséquence.

🖥️ Fais maintenant la même chose pour le perroquet (parrot), et au moins un troisième animal de ton choix (en fonction des images disponibles). Pense à bien mettre à jour le tableau `$animals` en fonction.

# 💪 Challenge
## Créer une propriété

Tu peux être amené à ajouter de nouvelles propriétés à ta classe, si ton projet se complexifie. Un zoo sert notamment à accueillir des espèces en danger. Nous voulons donc ajouter le niveau de menace de l'animal. Pour cela, si tu veux des données réalistes, tu peux te baser sur le [site de l'IUCN](https://www.iucnredlist.org) qui recense justement les espèces en danger, en se basant sur différents niveaux de menace, de non concerné (Least Concern ou LC) à éteinds (Extinct ou EX).

[UICN list](https://nc.iucnredlist.org/redlist/content/images/content_categories_chart_global_v3.jpg)

🖥️ À toi de créer la propriété (threatenedLevel) qui sera un `string` et attendra l'une des valeurs de la liste en abrégé (EX, EW, CR, EN, VU, NT, LC, DD ou NE). Par défaut, la valeur sera 'NE' (Not Evaluated).

Modifie ensuite le niveau de menace pour les animaux que tu as créés dans *index.php*, puis vérifie que l'icône correspondante apparaît bien sur l'interface web. Par exemple, le lion est [vulnérable](https://www.iucnredlist.org/species/15951/115130419).

Poste une capture d'écran de la page web, montrant tes animaux. 

### Critères de validation
- Les animaux créés apparaissent bien tous, avec leur image, au nombre de trois minimum, dont le lion et le perroquet.
- Les différentes informations sur ces animaux sont affichées (pour les 5 propriétés, y compris le niveau de menace). Il n'y a plus d'information "undefined".