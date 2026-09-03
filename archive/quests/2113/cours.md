## Objectifs

* Comprendre ce qu'est le HTML
* Connaitre les principales balises HTML
* Découvrir des bonnes pratiques pour créer une page HTML

## Pré-requis

````stepper
# Valider la quête suivante
```quests
2114
```
````

## Introduction

Le :def[HTML]{value="HyperText Markup Language"} est un language de balisage utilisé pour créer des **pages web**.

Dans cette quête nous verrons ce qu'est le HTML et comment l'utiliser efficacement pour créer tes premières pages web.

## Sommaire

## Qu'est-ce que le HTML?

Le HTML n'est pas un langage de programmation à proprement parler mais un language de **balisage**. Il permet de définir à l'aide de balises **la structure** d'une page web.

Une page HTML se compose d'un certain nombre de **balises** qui permettent d'encadrer les éléments composant la page.

![](https://storage.googleapis.com/assets_upload_prod/qmomVqZraBGRYU28tkJJp8HAyM9aeO1a.png)

*source :* https://developer.mozilla.org/fr/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content

Lorsque le navigateur reçoit une page HTML, il va **l’interpreter** et **afficher les éléments** d'une certaine manière à l'écran.

Prenons un exemple : imaginons que nous voulions créer un titre en HTML, le titre de notre site est "Mon super site web !".

Pour cela, nous devons expliquer à notre navigateur que le texte "Notre super site web !" est un titre afin qu'il puisse s'afficher comme tel sur notre page.

HTML nous permet d'**envelopper notre texte entre deux balises** "heading" afin d'indiquer que ce contenu est un texte. La balise titre de niveau 1 (heading 1) en HTML s'écrit `<h1>`. 

Cette balise indique au navigateur que le texte est un titre de niveau 1.

Pour délimiter le début et la fin de notre titre nous utilisons d'abord **une balise "ouvrante"** `<h1>` puis pour signifier la fin nous utilisons **une balise "fermante"** `</h1>`.

Voici donc le code final qui te permettra d'afficher un titre de niveau 1 :

```html
<h1>Mon super site web!</h1>
```

```xtext arrow
**🎯 À toi de jouer !**

Ouvre ton éditeur de code favori et crée un nouvel espace de travail. Crée ensuite un fichier `index.html` et ajoute un titre pour ton site web. 

Ouvre ensuite le fichier `index.html` dans ton navigateur pour voir le résultat.
```

## Imbriquer des éléments 

Les balises HTML peuvent contenir **du texte**, comme nous l'avons vu dans l'exemple précédent, mais aussi, **d'autres balises** ! 

Par exemple, prenons la balise `<p>` qui permet de créer un paragraphe. 

Tu peux à l'intérieur d'un paragraphe donner de l'importance à une partie du texte en utilisant la balise `<strong>`.

Voyons un exemple :

```html
<p>Bienvenue sur mon incroyable <strong>site web</strong> !</p>
```

Tu peux donc mettre d'autres balises à l'intérieur d'une balise. 

```xtext arrow
**🎯 À toi de jouer !**

Ajoute une balise `<p>` dans ton `index.html` avec la description de ton site.

Ajoute du texte important à l'intérieur de ton paragraphe.
```

### Inline vs block

Il y a deux catégories d'éléments en HTML : les éléments dits **"inline" (en ligne)** et les éléments de type **"block"**.

Les balises `<h1>` et `<p>` sont des balises de type `block`, tandis que la balise `<strong>` est une balise de type `inline`.

La différence est que **les éléments de type blocks forment... un bloc sur la page**. Cela veut dire que n'importe quel élément affiché à la suite d'un élément de type `block` sera automatiquement affiché sur la ligne suivante, l'élément bloc prend donc la **totalité** de la largeur de la page.

C'est le cas de nos balises `<p>` et `<h1>` : si tu ajoutes un autre titre ou paragraphe à la suite, ce dernier sera affiché sur la ligne suivante. Cela veut dire que notre bloc titre/paragraphe prend bien la totalité de la largeur de la page.

En revanche, notre balise `<strong>` est de type inline : si ce n'était pas le cas, le texte que tu as mis entre tes balises `<strong>` serait affiché à la ligne suivante.


![Comparaison des éléments blocs et des éléments inline, les éléments blocs sont représentés comme des blocs prenants toute la largeur de l'écran tandis que les éléments inline s'affichent les uns à côté des autres](https://storage.googleapis.com/quest_editor_uploads/KPVWZsRsZnno5ixFJLUGxJpbLRjOVKdh.jpeg)

```xtext arrow
**🎯 À toi de jouer !**

En HTML, tu peux créer des titres secondaires en utilisant la balise `<h2>`, *(en fait il existe 6 niveau de titres différents allant de `<h1>` à `<h6>`)*.

Ajoute un titre `<h2>` pour ta page web après ton titre `<h1>`. 

Ajoute un texte sur lequel mettre de l'emphase dans le paragraphe que tu as crée précédemment : utilise pour ce nouveau texte la balise `<em>` ("emphase").

Tu peux constater que le titre `h2` va bien à la ligne tandis que le texte en emphase reste bien sur la même ligne que le reste du paragraphe.
```

## Les balises "auto-fermantes"

Certaines balises ne nécessitent pas d'avoir une balise fermante : ce sont des balises **auto fermantes**.

C'est le cas, par exemple de la balise `<img />`. C'est la balise que tu dois utiliser pour créer une image dans ton contenu HTML. Mais contrairement à ce que nous avons vu précédemment, tu n'inséreras rien entre deux balises. 

Tu dois donner à la balise image un attribut afin de spécifier l'url à laquelle se trouve ton image. Voyons plutôt :

```html
<img src="https://picsum.photos/id/237/300/300" />
```

Les valeurs de chaque attribut doivent être spécifiées comme **chaine de caractères** pour cela, tu dois toujours les placer entre guillemets `""`.

Comme tu peux le voir, la balise ne contient pas de balise fermante, puisque cette balise ne nécessite pas de placer du contenu entre les deux balises. À la place, nous signifions que la balise est auto fermante en plaçant le symbole `/` a la fin de la balise.

```xtext arrow
**🎯 À toi de jouer !**

Ajoute une image sur ta page web à l'aide de la balise `<img />`
```

## Les attributs

Tu peux donner **plusieurs attributs** à un élément HTML. Par exemple, dans le cas des images, tu dois toujours t'assurer que l'image contient un attribut `alt` en plus de l'attribut `src`. 

L'attribut "alt" fournit un texte alternatif dans le cas où l'image ne pourrait pas être perçue (à cause d'une déficience visuelle, ou simplement à cause d'une mauvaise connexion internet). Tu peux ainsi fournir un élément lisible plutôt que du "vide".

Voyons un exemple :

```html
<img src="https://picsum.photos/id/237/300/300" alt="A cute dog" />
```

```xtext arrow
**🎯 À toi de jouer !**

Ajoute un attribut `alt` à ton image avec une description. 

Tu peux aussi ajouter un attribut pour changer la largeur d'une image : l'attribut `width` dans lequel tu peux spécifier la largeur en pixel (px) (par exemple : "300"). Essaie de changer la largeur de l'image et regarde le résultat. 
```

### Les attributs booléens

Certains attributs peuvent avoir une valeur de type booléens (true/false). 

Par exemple, tu peux désactiver un bouton tant que l'utilisateur n'a pas rempli un formulaire en utilisant l'attribut `disabled`.

Par exemple :

```html
<button disabled="true">Click here</button>
```

Tu peux raccourcir le tout en utilisant simplement l'attribut sans aucune valeur :

```html 
<button disabled>Click here</button>
```

Si l'attribut `disabled` est présent cela veut dire que le bouton sera désactivé.

```xtext arrow
**🎯 À toi de jouer !**

Ajoute un bouton avec l'attribut "disabled" et observe le résultat dans ton navigateur. 
```

## La structure d'un document HTML

Jusqu'à maintenant, ton document HTML doit ressembler à quelque chose comme cela :

```html
<h1>Hello world!</h1>
<h2>Welcome here</h2>
<p>Bienvenue sur mon <strong>incroyable</strong> site internet!</p>
<p>Je m'appelle Bob</p>
<img src="https://picsum.photos/id/237/300/300" alt="A Cute dog" width="300" />
<button disabled>Click here</button>
```

Pour des raisons de simplicité, nous n'avons pas respecté la structure d'un document HTML. Maintenant que tu comprends les concepts de bases du HTML, nous allons **structurer** notre page. 


Le "squelette" d'une page HTML ressemble à ceci :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>My super website</title>
</head>
<body>
    <p>Hello World</p>
</body>
</html>
```

Cette structure permet de **donner des informations au navigateur** sur le type de document, la langue, les caractères utilisés, le titre de la page puis le contenu de celle-ci. 

Jusqu'à maintenant, notre document s'affichait car notre navigateur a lui même ajouté ces éléments. Lorsque tu travailles sur un nouveau projet, c'est important de **bien définir la structure avant de commencer**.

Voyons chacune des balises en détail :

* `<!DOCTYPE html>` sert à indiquer que notre document est un document HTML. Ce n'est pas une balise HTML mais une information qui sert au navigateur pour connaitre le type de document. 

* `<html lang="fr"></html>` sert à délimiter notre document HTML. Il est important de définir la langue du document pour définir la langue dans lequel le site internet est rédigé. 

* `<head></head>` est l'en-tête de la page. Notre document HTML est séparé en deux parties. La partie "Head" et le "Body". Tout ce qui se trouve dans la partie "Head" ne sera pas affiché sur notre page. 
Dans la partie head, nous mettons des métadonnées nécessaires pour le navigateur (comme l'encodage des caractères ou encore la description du site web) ou bien le titre de la page (qui sera affiché sur l'onglet ou en haut de la fenêtre du navigateur). 

* La partie `<body></body>` quant à elle contient le corps de notre page web et les éléments que l'utilisateur verra s'afficher.

* `<meta charset="UTF=8">` La balise meta contient des métadonnées à destination du navigateur. 
Elle est utilisée pour définir l'encodage des caractères (ici UTF-8).

* Enfin, à l'intérieur du `<body>`, nous avons un `<p>` (paragraphe) qui contient la chaine de caractère: "Hello World"

```alert-info
Il existe un raccourci sur Visual Studio Code pour avoir la structure d'un fichier HTML, il suffit de taper `!` ou bien `html:5` suivit de la touche "TAB".
```

```xtext arrow
**🎯 À toi de jouer !**

Ajoute une structure complète au document `index.html` que tu as créé.

Puis, pour t'exercer, crée un nouveau document que tu vas appeler `about.html`. 

Ensuite, crée la structure du document HTML et ajoute un titre ("À propos") pour cette page. Tu peux laisser libre cours à ton imagination quant au contenu de ta page "À propos".
```

### Liste ordonnée et non ordonnée

Sur notre nouvelle page "À propos", tu peux ajouter la liste de tes compétences. 

Il existe deux types de liste en HTML :

* les listes dites **ordonnées** `<ol>` pour **o**rdered **l**ist (numérotée).
* les listes dites **non ordonnées** `<ul>` pour **u**nordered **l**ist (liste à puces). 

Ensuite, chaque élément de la liste doit être mis à l'intérieur d'une balise `<li>` (**l**ist **i**tem).

Voyons cela de plus prêt :

```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>
```

```
* Item 1
* Item 2
```

```html
<ol>
    <li>Item 1</li>
    <li>Item 2</li>
</ol>
```

```
1. Item 1
2. Item 2
```


```xtext arrow
**🎯 À toi de jouer !**

Ajoute une liste non ordonnée avec tes skills, puis une liste ordonnée avec tes 3 plats favoris.
```

### Faire des liens entre les documents 

Maintenant que nous avons deux pages HTML (notre page d'accueil et la page à propos) il est temps de relier les deux pages entre elles. 

Pour cela tu peux utiliser la balise `<a>` (**a**nchor). Cette balise te permet de spécifier le lien grâce à l'attribut `href` avec une URL. 

Entre les balises `<a href="...">` et `</a>`, tu peux ajouter du texte ou d'autres balises :

```html
<a href="http://google.com">Visiter Google.com</a>
<a href="index.html"><p>Retourner à l'acceuil</p></a>
```

```xtext arrow
**🎯 À toi de jouer !**

Ajoute un lien en bas de la page `about.html` redirigeant vers la page d'accueil et un lien sur `index.html` redirigeant vers la page `À propos`.
```

## Ajouter des commentaires 

Tu peux commenter ton document HTML. Les commentaires permettent de mettre des notes sur ton code pour en expliquer les mécanismes ou faciliter la lecture. 

Les commentaires ne seront pas visibles sur la page web, mais ils seront consultables lors de la lecture du code. 

Voici comment écrire un commentaire en HTML :

```html
<!-- Je suis un commentaire ! -->
```

````xtext arrow
**🎯 À toi de jouer !**

Ajoute des commentaires sur ta page `index.html` pour délimiter la balise head et la balise body:

Par exemple :

```html
<!-- Head of the document -->
<head>
</head>
```
````

## Récapitulatif

* Le HTML5 est un langage de balisage utilisé pour créer des pages web. Il est interprété par notre navigateur pour afficher le contenu des pages.

* Une balise HTML se compose d'une ou plusieurs lettres entourées par des chevrons ouvrant et fermant (`<p>`, `<html>`, `<body>`, ...).

* Les balises HTML peuvent avoir des **attributs**. Ces attributs servent à transmettre des données aux balises et peuvent être des chaines de caractères (`<img src="..." />`) ou bien de type booléens (`<button disabled>Click Me</button>`).

* Un document HTML doit respecter un certain schéma de base.

* Un document HTML se compose toujours d'une partie `<head>` contenant des métadonnées **non affichées** sur la page web et d'une partie `<body>` contenant le corps du document. 

## Challenge

Mets en forme le travail que tu as réalisé durant cette quête et compare le résultat avec la solution qui est proposée ! 

### Critères de validation

* [ ] Les deux pages HTML respectent bien la structure des documents HTML
* [ ] Les deux pages HTML contiennent un titre (`<title>`) explicite
* [ ] Les deux pages HTML contiennent un Header (`<h1>`)
* [ ] Les deux pages HTML contiennent un lien vers l'autre page
* [ ] Au moins une des page contient un paragraphe (`<p>`), une image (`<img />`) et un bouton 
* [ ] Au moins une des page contient un commentaire


````solution

# Pour le fichier index.html:

```html
<!DOCTYPE html>
<html lang="en">
<!-- Head of the document -->
<head>
    <meta charset="UTF-8">
    <title>Bienvenue sur mon site internet | Bob Smith Webdesigner</title>
</head>
<!-- Body of the document -->
<body>
    <h1>Hello world!</h1>
    <h2>Welcome here</h2>
    <p>Bienvenue sur mon <strong>incroyable</strong> site internet!</p>
    <p>Je m'appelle Bob</p>
    <img src="https://picsum.photos/id/237/300/300" alt="A Cute dog" width="300" />
    <button disabled="true">Click here</button>
    <a href="about.html">À propos de moi</a>
</body>

</html>

```

# Pour le fichier about.html:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Découvrez-en plus sur moi | Bob Smith Webdesigner</title>
</head>

<body>
    <h1>A propos de moi:</h1>

    <h2>Mes skills :</h2>
    <ul>
        <li>HTML</li>
        <li>Webdesign</li>
        <li>Illustration</li>
        <li>Piano</li>
    </ul>

    <h2>Mes plats préférés</h2>
    <ol>
        <li>Pizza</li>
        <li>Sushi</li>
        <li>Burgers</li>
    </ol>

    <a href="index.html">Retourner à l'accueil</a>
</body>

</html>
```
````