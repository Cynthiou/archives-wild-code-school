⚠️ Avant de commencer cette quête, tu dois avoir terminé les quêtes suivantes :

```quests
1356, 1348, 140
```

```title-book
Introduction
```

Dans cette quête, tu vas découvrir comment PHP, un langage de script côté serveur, peut être utilisé pour générer du contenu HTML dynamique. Cette compétence est essentielle dans le développement web pour créer des sites interactifs et personnalisés.

## 🤓 À la fin de cette quête, tu seras capable de :
* ✅ Lancer un serveur de développement PHP,
- ✅ Afficher du contenu HTML dynamique dans le navigateur,
- ✅ Utiliser les boucles pour générer du contenu HTML répété,
- ✅ Afficher des éléments HTML selon une condition.

# Lancer un serveur de développement PHP
Comme tu l'as appris lors d'une précédente quête, pour démarrer le serveur interne de PHP, il suffit d'ouvrir un terminal, de se placer dans le dossier dans lequel tu veux exécuter ton code PHP et de taper la commande :

```shell copy
php -S localhost:8000
```

Ensuite, accède à http://localhost:8000/nomDuFichier.php dans ton navigateur pour voir le résultat.

Imaginons une application concrète : la création d'une page web pour le journal __Wild News__, qui nécessite l'affichage d'articles. Dans un nouveau répertoire, crée un fichier `index.php` avec cette structure HTML :

```php
<!DOCTYPE html>
<html>
<head>
    <title>Wild News | Le site de news des Wilders</title>
</head>
<body>
   <header>
       <h1>Wild News</h1>
   </header>

   <section class="cards-container">
       <article class="card">
           <h2>Titre 1</h2>
           <p>Contenu 1</p>
           <a href="#">Lire la suite...</a>
       </article>

       <article class="card">
           <h2>Titre 2</h2>
           <p>Contenu 2</p>
           <a href="#">Lire la suite...</a>
       </article>

       <article class="card">
           <h2>Titre 3</h2>
           <p>Contenu 3.</p>
           <a href="#">Lire la suite...</a>
       </article>
   </section>

   <footer>
       <p>&copy; 2024 - Wild News</p>
   </footer>
</body>
</html>
```

Lance ton serveur de développement et regarde ce qu'il se passe sur ton navigateur : le contenu HTML apparaît bien.

>En effet, lorsque le serveur exécute un fichier PHP, il envoie le résultat au navigateur pour un affichage approprié (du code HTML dans notre exemple).

Super ! Tu vas pouvoir maintenant optimiser ton code pour le rendre dynamique.


# Afficher du contenu HTML dynamique dans le navigateur

## Afficher la valeur d'une variable
Si tu regardes bien ton code, tu peux remarquer que le nom du journal est répété plusieurs fois sur la page, au niveau des balises `title`, `h1` et `footer` : pas très DRY tout ça :disappointed_relieved:. Imagine que le nom du journal change : il te faudrait modifier à la main chaque balise, une opération qui peut être longue et risquée.

Pour faciliter la maintenance de ton code, nous allons afficher le nom du journal à l'aide d'une variable.

Pour cela, tu vas insérer du PHP en utilisant les balises `<?php` et `?>`.

Tout d'abord, crée une variable `$name` qui aura pour valeur `'Wild News'` dans un bloc `php` situé au dessus du code `HTML` : ce sera dans ce bloc où seront déclarées les variables et fonctions nécessaires à l'affichage de ta page.

Affiche ensuite cette variable dans le code HTML :

```php hl[1:5,10,14,42]
<?php

    $name = 'Wild News';

?>

<!DOCTYPE html>
<html>
<head>
    <title><?php echo $name; ?> | Le site de news des Wilders</title>
</head>
<body>
   <header>
       <h1><?php echo $name; ?></h1>
   </header>


   <section class="card-container">
       <article class="card">
           <h2>Titre 1</h2>
           <p>Contenu 1</p>
           <a href="#">Lire la suite...</a>
       </article>


       <article class="card">
           <h2>Titre 2</h2>
           <p>Contenu 2</p>
           <a href="#">Lire la suite...</a>
       </article>


       <article class="card">
           <h2>Titre 3</h2>
           <p>Contenu 3.</p>
           <a href="#">Lire la suite...</a>
       </article>
   </section>


   <footer>
       <p>&copy; 2024 - <?php echo $name; ?></p>
   </footer>

</body>
</html>
```
Recharge ton navigateur : le nom du journal reste affiché au niveau du `title`, du `h1` et du `footer`. Si tu modifies la variable `$name`, la modification s'applique sur l'ensemble des balises.
>Dans un fichier PHP contenant du HTML, il est recommandé de placer un bloc PHP en haut pour définir les variables et les fonctions avant le HTML. De cette manière, on sépare la logique de traitement des données de la structure de présentation : d'abord on prépare les données, ensuite on les affiche.

>Les balises `<?php` et `?>` servent à délimiter le code PHP à l'intérieur du fichier.
La fonction `echo` sert à afficher du texte comme contenu d'une balise, ce qui le rend visible dans le navigateur.


````alert info
# Syntaxe courte

Tu peux remplacer `<?php echo` par `<?=` :
```php
<title><?= $name; ?> | Le site de news des Wilders</title>
```
````
## Afficher la valeur retournée par une fonction
Dans le code présenté, tu constates aussi que l'année est écrite en dur :
```php
   <footer>
       <p>&copy; 2024 - <?= $name; ?></p>
   </footer>
```

Grâce à PHP, tu peux rendre l'affichage de l'année en cours automatique :wink:

Pour cela, on peut utiliser la fonction `date()` qui formate une date/heure locale. Pour afficher l'année en cours, on peut lui ajouter le paramètre `'Y'` pour lui indiquer de retourner l'année sur quatre chiffres :

```php
   <footer>
       <p>&copy; <?= date('Y'); ?> - <?= $name; ?></p>
   </footer>
```

Recharge ton navigateur : l'année en cours est bien affichée et sera automatiquement mise à jour chaque 1er janvier :confetti_ball:

```resource
https://www.php.net/manual/fr/function.date.php
# Documentation
Fonction `date()` en PHP
```

# Utiliser les boucles pour générer du contenu HTML répété

Tu vas le voir, PHP va nous permettre de rendre notre code plus clair et efficace, grâce aux boucles !
Dans le code actuel, on constate qu'il y a autant de balises `article` que de publications du journal. Au fur et à mesure des publications, le code HTML deviendra vite illisible et l'application sera de plus en plus difficile à maintenir.

Dans un premier temps, ce que je te propose c'est de gérer le titre et le contenu de chaque article dans un tableau. Pour cela, dans le bloc PHP où tu as précédemment créé la variable `$name`, crée un tableau `$articles`.

```hidden
Voir le code|||php|||Tu peux te servir de cet exemple si tu es en manque d'inspiration|||0|||Hide
$articles = [
    [
      'title' => 'Top 3 des livres indispensables pour développeurs',
      'content' => 'Avant de commencer, il faut qu\'on discute du pourquoi tu devrais acheter un livre quand tu as les internets mondiales à ta disposition. La réponse simple. Il n\'y a aucune comparaison de qualité.',
    ],
    [
      'title' => '8 habitudes de développeurs qui font progresser',
      'content' => 'Avec le temps, j\'ai fini par comprendre que ce qui comptait le plus dans ce métier, c\'était les habitudes. Toutes ces petites décisions, ces façons de faire et de voir les choses. Ça a l\'air de rien au jour le jour, mais mis bout à bout, c\'est une locomotive pour ta progression. OK vas-y on en parle.',
    ],
    [
      'title' => 'Faut-il être passionné pour être développeur ?',
      'content' => 'La passion chez les développeurs est un concept qui met une pression folle à beaucoup de gens. Tu en entends parler en permanence. Tu le vois dans toutes les offres d\'emplois, comme une obligation absolue.',
    ],
    [
      'title' => 'Compétences clefs pour développeurs',
      'content' => 'Résoudre des problèmes c\'est ton activité principale et donc ta principale compétence clef. Si tu deviens bon là-dedans, tu vas commencer à léviter dans l\'open space et rien ne pourra t\'arrêter.',
    ],
    [
      'title' => 'Conseils pour développeur junior',
      'content' => 'Je reçois énormément de mails de développeur(euse)s juniors concernant ce sujet. Du coup, pourquoi ne pas répondre à tous le monde en même temps ? Assieds-toi bien confort j\'ai plein de trucs à te raconter.',
    ],
    [
      'title' => 'Comment bien donner et recevoir une code review',
      'content' => 'Il y a bien longtemps, dans une galaxie lointaine, très lointaine je bossais dans une équipe d\'une dizaine de développeurs. Lorsque du nouveau code devait être intégré dans le système, il passait d\'abord par la grande instance de la code review.',
    ],
    [
      'title' => 'Design patterns : l\'indispensable à savoir',
      'content' => 'Les design patterns sont inévitables pour tous les développeurs. Si tu ne les connais pas, sache que tu les utilises déjà sans le savoir. Il y a des choses indispensables à savoir pour ne pas être complètement perdu au milieu du champ des design patterns. Ça te servira toute ta carrière, peu importe ton poste.',
    ],
    [
      'title' => '20 outils webs indispensables pour développeurs',
      'content' => 'Avoir les bons outils en tant que développeur va te faire gagner un temps fou sur tout. Que ce soit pour produire du code, vérifier de la donnée ou valider des commandes et des configurations, ça devient vite indispensable. Je te dévoile mon dossier favoris, j\'ai mis plusieurs années à construire cette liste !',
    ],
  ];
```

Avec PHP, tu vas avoir la possibilité d'utiliser des boucles pour éviter de répéter du code inutilement. Tu vas avoir le choix entre les boucles `foreach`, `for`, `while` et `do while`. Dans notre cas, je te propose d'utiliser la boucle `foreach`.

Dans la balise `section`, conserve une seule occurrence de la balise `article`: c'est cet élément que nous allons vouloir répéter.

Entoure la balise `article` d'une boucle `foreach` en utilisant les balises `php` comme ceci :

  
```php
<section class="cards-container">
   <?php foreach ($articles as $article) { ?>
      <article class="card">
         <h2><?= $article['title'] ?></h2>
         <p><?= $article['content'] ?></p>
         <a href="#">Lire la suite...</a>
      </article>
   <?php } ?>
</section>
```

>On utilise ici la syntaxe classique d'une boucle `foreach` en PHP, en plaçant le contenu à itérer entre les accolades.

````alert info
# Syntaxe alternative

Il existe une autre syntaxe pour permettre une lecture plus claire du code, en remplaçant l'accolade ouvrante par des `:` et l'accolade fermante par `endforeach`. 
```php hl[2,8]
<section class="cards-container">
   <?php foreach ($articles as $article) : ?>
      <article class="card">
         <h2><?= $article['title'] ?></h2>
         <p><?= $article['content'] ?></p>
         <a href="#">Lire la suite...</a>
      </article>
   <?php endforeach ?>
</section>
```
````

```resource
https://www.php.net/manual/fr/control-structures.alternative-syntax.php
# Syntaxe alternative des structures de contrôles
Retrouve d'autres exemples de syntaxe alternative dans la documentation php
```

Rafraichis une nouvelle fois ton navigateur : tous les articles du tableau s'affichent avec une seule balise `article` dans le bloc HTML.

# Afficher des éléments HTML selon une condition

Souvent, tu vas avoir besoin d'afficher des éléments HTML selon une condition, par exemple :
- Afficher un message de bienvenue selon l'heure de la journée,
- Afficher des messages d'erreurs en cas d'anomalie constatée,
- Afficher des éléments selon un état, etc...

Pour afficher un contenu différent selon une condition, tu peux utiliser les structures `if`, `elseif` et `else`.

Reprenons l'exemple de notre journal Wild News. Jusqu'à maintenant, tous les articles sont listés sur la page du site. Il serait pratique de permettre la rédaction d'articles en mode brouillon, qui ne seraient publiés qu'après finalisation. Pour mettre en place cette fonctionnalité, ajoute la clé `published` à chaque article de ton tableau de données et attribue une valeur `true` pour les articles prêts à être publiés, ou `false` pour les brouillons.

```hidden
Voir le code|||php|||Tu peux retrouver ici le tableau contenant les articles modifiés|||0|||Hide
$articles = [
    [
      'title' => 'Top 3 des livres indispensables pour développeurs',
      'content' => 'Avant de commencer, il faut qu\'on discute du pourquoi tu devrais acheter un livre quand tu as les internets mondiales à ta disposition. La réponse simple. Il n\'y a aucune comparaison de qualité.',
      'published' => false,
    ],
    [
      'title' => '8 habitudes de développeurs qui font progresser',
      'content' => 'Avec le temps, j\'ai fini par comprendre que ce qui comptait le plus dans ce métier, c\'était les habitudes. Toutes ces petites décisions, ces façons de faire et de voir les choses. Ça a l\'air de rien au jour le jour, mais mis bout à bout, c\'est une locomotive pour ta progression. OK vas-y on en parle.',
      'published' => true,
    ],
    [
      'title' => 'Faut-il être passionné pour être développeur ?',
      'content' => 'La passion chez les développeurs est un concept qui met une pression folle à beaucoup de gens. Tu en entends parler en permanence. Tu le vois dans toutes les offres d\'emplois, comme une obligation absolue.',
      'published' => false,
    ],
    [
      'title' => 'Compétences clefs pour développeurs',
      'content' => 'Résoudre des problèmes c\'est ton activité principale et donc ta principale compétence clef. Si tu deviens bon là-dedans, tu vas commencer à léviter dans l\'open space et rien ne pourra t\'arrêter.',
      'published' => true,
    ],
    [
      'title' => 'Conseils pour développeur junior',
      'content' => 'Je reçois énormément de mails de développeur(euse)s juniors concernant ce sujet. Du coup, pourquoi ne pas répondre à tous le monde en même temps ? Assieds-toi bien confort j\'ai plein de trucs à te raconter.',
      'published' => false,
    ],
    [
      'title' => 'Comment bien donner et recevoir une code review',
      'content' => 'Il y a bien longtemps, dans une galaxie lointaine, très lointaine je bossais dans une équipe d\'une dizaine de développeurs. Lorsque du nouveau code devait être intégré dans le système, il passait d\'abord par la grande instance de la code review.',
      'published' => false,
    ],
    [
      'title' => 'Design patterns : l\'indispensable à savoir',
      'content' => 'Les design patterns sont inévitables pour tous les développeurs. Si tu ne les connais pas, sache que tu les utilises déjà sans le savoir. Il y a des choses indispensables à savoir pour ne pas être complètement perdu au milieu du champ des design patterns. Ça te servira toute ta carrière, peu importe ton poste.',
      'published' => true,
    ],
    [
      'title' => '20 outils webs indispensables pour développeurs',
      'content' => 'Avoir les bons outils en tant que développeur va te faire gagner un temps fou sur tout. Que ce soit pour produire du code, vérifier de la donnée ou valider des commandes et des configurations, ça devient vite indispensable. Je te dévoile mon dossier favoris, j\'ai mis plusieurs années à construire cette liste !',
      'published' => false,
    ],
  ];
```
Dans le bloc HTML, entoure chaque élément `article` avec une condition vérifiant si l'article doit être affiché :
```php hl[3,9]
<section class="cards-container">
      <?php foreach ($articles as $article): ?>
        <?php if($article['published']): ?>
          <article class="card">
              <h2><?= $article['title'] ?></h2>
              <p><?= $article['content'] ?></p>
              <a href="#">Lire la suite...</a>
          </article>
        <?php endif ?>
      <?php endforeach ?>
    </section>
```
>La condition ajoutée va vérifier si la valeur de `$article['published']` est égale à `true` pour afficher les détails de l'article.

Bravo ! Tu maîtrises maintenant l'art de dynamiser et d'animer une page HTML en utilisant PHP