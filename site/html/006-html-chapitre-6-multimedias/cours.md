## Objectifs

* Ajouter des images en HTML
* Les bonnes pratiques liées à l'utilisation d'images
* Ajouter des éléments multimédias tels que des audios et des vidéos en HTML
* Intégrer des documents tels que d'autres sites web 


## Pré-requis

````stepper
# Valider la quête suivante
```quests
2113
```
# Être à l'aise avec l'utilisation des attributs HTML
```html
<img src="https://placekitten.com/200/287" alt="A cute cat" />
```
````

## Introduction

Précédemment, tu as vu les principes de bases du langage HTML.

Dans cette quête, nous allons nous concentrer sur les éléments multimédias tels que les images, les vidéos, les fichiers audio et les documents intégrés.

## Sommaire

## Ajouter des images en HTML

### La balise <img /> 

Comme tu l'as vu dans les quêtes précédentes, tu peux créer des images en HTML grâce à la balise `<img />`. Tu peux spécifier l'URL de l'image en utilisant l'attribut `src`. L'URL peut être :

* Absolue : URL complète comme `"https://placekitten.com/408/287"`,
* Relative :
  * URL commençant par `/`, relative à la racine du domaine comme `"/images/my-favorite-cat.jpeg"`,
  * URL relative à la page en cours comme `"./pictures/my-avatar.png"`.

```html
<img src="/images/my-favorite-cat.jpeg" />
<img src="https://placekitten.com/408/287" />
```

#### Texte alternatif

Tu dois toujours préciser un **texte alternatif** sur tes images : cela permet non seulement d'améliorer le référencement mais aussi l'accessibilité de ton contenu.

Quelques bonnes pratiques pour le texte alternatif de tes images:

* Sois spécifique et clair

Reste simple, mais sois spécifique. Décris ce qui est présent sur la photo, par exemple:

![Le Machu Picchu au Pérou au lever du soleil](images/001-le-machu-picchu-au-perou-au-lever-du-soleil.jpg)

```html 
<img src="images/001-le-machu-picchu-au-perou-au-lever-du-soleil.jpg" alt="Le Machu Picchu au Pérou au lever du soleil" />
```

* Évite les textes commençants par "photo" ou "image"

Les logiciels qui liront ta balise savent déjà que c'est une image. Tu peux enlever les mots "image" et "photo" dans ton texte alternatif. 

Tu dois plutôt mettre en texte l'information représenté par l'image.

* N'abuse pas des mots clefs

L'attribut `alt` améliore le SEO, mais ce n'est pas une raison pour abuser des mots clefs au détriment de l'accessibilité. Rappelle-toi toujours qu'améliorer l'accessibilité améliore le SEO.

* As-tu vraiment besoin d'une image ?

Si l'image est décorative mais n'apporte pas d'information, tu peux utiliser un texte alternatif vide `alt=""` ou évite tout simplement la balise `<img />`.

Les balises HTML existent pour représenter un contenu à lire sur une page. Si un élément n'est que décoratif, le CSS doit être privilégié (une image de fond sur un élément par exemple). 

#### Largeur et hauteur

Tu peux donner une hauteur et une largeur à ton image avec les attributs `height` et `width`. Attention : si tu ne respectes pas le ratio d'origine de ton image, elle sera déformée. 


```html
<img src="/images/john.jpeg" height="400" width="300" />
```

````xtext arrow
Dans le cas où tu ne précises qu'un seul des attributs, le second sera calculé automatiquement en respectant le ratio : 

```html
<img src="/images/john.jpeg" width="300" />
```
````

Garde en tête que le navigateur chargera l'image entière avant de la redimensionner : une image 4000 * 3000 pixels est beaucoup trop lourde pour afficher sur un téléphone portable de 360 pixels de large !


#### Comment redimensionner une image?

Voici des ressources qui peuvent t'aider si tu as besoin de redimensionner une image :

**Mac:**

```resource
https://support.apple.com/guide/preview/resize-rotate-or-flip-an-image-prvw2015/mac
Resize, rotate, or flip an image in Preview on Mac
```

**Windows:**

```resource
https://www.tenforums.com/tutorials/115131-resize-image-windows-10-photos-app.html
Resize, rotate, or flip an image in Preview on Windows
```

**Linux:**

```resource
https://itsfoss.com/resize-images-with-right-click
Resize Images with Right Click on Ubuntu and Other Linux Distributions
```

### Illustrer un article avec une légende

Pour ajouter une illustration à un article avec une légende, tu peux utiliser les balises `<figure>` et `<figcaption>`.

La balise `<figure>` représente un contenu annexe qui peut aider à la compréhension d'un article ou d'un site (du code, un graphique, une image, une illustration, un plan, etc..). Un peu comme dans certains livres ("voir la figure 1").

La balise `<figcaption>` permet d'ajouter une légende à ce contenu:


```html
<figure id="figure1">
  <img src="img_graphique_cat_speed.jpg" alt="Rapidité des chats comparée à celle d'autres animaux">
  <figcaption>Représentation de la rapidité des chats comparée à celle d'autres animaux.</figcaption>
</figure>
```

Cette construction est aussi une bonne base pour créer une "card" en HTML :

![Carte de John Doe](images/002-carte-de-john-doe.png)

###Les images vectorielles

Tu peux intégrer des images vectorielles dans tes pages HTML. 

Le format vectoriel permet d'afficher une illustration sous forme de vecteurs, plutôt que sous forme de pixels.

L'avantage des images vectorielles, en plus de leur poids qui est généralement plus léger, est d'offrir une qualité d'image parfaite quelle que soit la résolution de l'écran : l'image vectorielle est agrandissable à l'infini sans perte de qualité.

Les images vectorielles sont la plupart du temps utilisé pour les illustrations (icones, pictos, dessin vectoriel, etc...) ou les logos.

Le format d'image vectoriel de référence pour le web est le `.svg`. Tu peux utiliser un fichier svg directement dans la balise `<img />` :

```html
<img
    src="loo.svg"
    alt="Logo Cat's world"
    width="100px" />
```

Tu peux aussi directement intégrer du code svg avec une balise `<svg>` :

```html
<svg width="300" height="200">
    <rect width="100%" height="100%" fill="blue" />
</svg>
```


## Ajouter un fichier vidéo

Pour ajouter un fichier vidéo sur une page web, utilise l'élément `<video>`. Tu peux utiliser l'attribut `src` pour spécifier la source de la vidéo et l'attribut `controls` (booléen) pour afficher (ou pas) le panneau de contrôle du lecteur vidéo. 

Pour des raisons d'accessibilité, tu dois **toujours** laisser la possibilité à tes utilisateurs de démarrer/arrêter la vidéo et d'augmenter ou baisser le volume. 

Tu peux spécifier un texte à l'intérieur de la balise `<video>`. Ce dernier sera visible si le navigateur ne supporte pas l'élément `<video>` :

```html
<video src="cats.mp4" controls>
    <p>Impossible de jouer la vidéo. Vous pouvez <a href="cats.mp4">télécharger la vidéo</a> afin de la visionner.
    </p>
</video>
``` 

Encore une fois, comme avec les images, **attention au poids** de tes vidéos : elles ne doivent pas être trop lourdes pour éviter de ralentir le chargement.

D'autres attributs pour la balise vidéo :

* autoplay (booléen) jouera automatiquement la vidéo (déconseillé pour ne pas déranger les utilisateurs)

* loop (booléen) permet de lancer la vidéo en boucle : lorsque la vidéo est terminée, la lecture reprendra depuis le début

* muted (booléen) permet de couper le son par défaut

* poster (lien vers une image) permet de définir une image affichée avant la lecture de la vidéo

* width et height (nombre de pixels) permettent de définir la taille de la vidéo


```html
<video src="cats.mp4" controls autoplay loop muted poster="cats_video_poster.png" width="300">
    <p>Impossible de jouer la vidéo. Vous pouvez <a href="cats.mp4">télécharger la vidéo</a> afin de la visionner.
    </p>
</video>
```

```xtext arrow
**🎯 Á toi de jouer !**

Dans le fichier index.html créé précédemment, ajoute une vidéo sur un des articles de blog, tu peux trouver pleins de vidéo gratuite et libre de droits sur le site de [pexels](https://www.pexels.com/search/videos/cat)
```

### Ajouter du texte dans les vidéos

L'accessibilité est très importante dans le web. Pour rendre tes vidéos plus accessibles, tu peux ajouter du texte à tes vidéos avec la balise `<track>`. 

L'ajout du texte peut servir pour les personnes ayant des déficiences visuelles ou bien les personnes qui ne peuvent pas écouter le son de la vidéo à un instant T. Pour ça, tu peux ajouter des sous-titres avec l'attribut `kind="subtitles"`.

Tu peux ajouter également des légendes avec l'attribut `kind="captions"` ainsi que des descriptions avec l'attribut `kind="descriptions"`).

Ce texte peut-être ajouté à l'aide d'un fichier WebVTT : c'est un fichier avec l'extension .vtt qui contient les textes associés à un minutage :

```vtt
00:11.000 --> 00:13.000
<v Roger Bingham>We are in New York City

00:13.000 --> 00:16.000
<v Roger Bingham>We’re actually at the Lucern Hotel, just down the street

00:16.000 --> 00:18.000
<v Roger Bingham>from the American Museum of Natural History

00:18.000 --> 00:20.000
<v Roger Bingham>And with me is Neil deGrasse Tyson

00:20.000 --> 00:22.000
<v Roger Bingham>Astrophysicist, Director of the Hayden Planetarium
```

Il existe des programmes qui permettent de créer facilement des fichier VTT, comme [vtt-creator](https://www.vtt-creator.com/editor) par exemple.

Une fois tes fichiers .vtt crées, tu peux ajouter des `<track>` à ta `<vidéo>` :

```html
<video controls width="300">
    <source src="cats.mp4" type="video/mp4">
    <track kind="captions" src="sampleCaptions.vtt" srclang="fr">
    <track kind="descriptions" src="sampleDescriptions.vtt" srclang="fr">
    <track kind="subtitles" src="sampleSubtitles_fr.vtt" srclang="fr">
    <p>Impossible de jouer la vidéo. Vous pouvez <a href="cats.mp4">télécharger la vidéo</a> afin de la visionner.
    </p>
</video>
```

```xtext arrow
**🎯 Á toi de jouer !**

À l'aide de l'outil [vtt-creator](https://www.vtt-creator.com/editor), ajoute des sous-titres sur ta vidéo. Si tu as une vidéo avec du son, c'est parfait. Sinon imagine quelque chose de sympa afin de pouvoir pratiquer. 
```

## Ajouter un fichier audio

Pour ajouter un fichier audio en HTML, tu peux utiliser la balise `<audio>` :

```html
<audio src="meow.mp3" controls>
 <p>Votre navigateur ne prend pas en charge l'audio. Vous pouvez <a href="meow.mp3">télécharger l'audio</a> afin d'écouter l'extrait.</p>
</audio>  
```

Comme pour la vidéo, tu peux utiliser les attributs `autoplay`, `loop` et `controls`.

## Les iframes

Les iframes sont des éléments qui permettent d'intégrer des pages web à l'intérieur de ces pages web. 

Cela peut s'avérer particulièrement pratique si tu veux, par exemple, intégrer une vidéo youtube à ta page web, ou bien un bloc de code fait sur Codesandbox par exemple. 

Par exemple, pour partager une vidéo youtube, tu peux utiliser le code suivant :

```html
<iframe width="640" height="360"
  src="http://www.youtube.com/embed/gYeG-TLImlw?autoplay=1"
  frameborder="0">
   <p>Votre navigateur ne prend pas en charge les iframes. Vous pouvez visiter la page pour <a href="http://www.youtube.com/embed/gYeG-TLImlw?autoplay=1">visualiser la vidéo</a>.</p>
</iframe>
```
Comme avec les vidéos, tu peux passer en attribut la largeur et la hauteur de l'iframe et donner un texte dans le cas ou le navigateur ne peut afficher l'iframe.

La plupart des sites internet peuvent être affichés dans un iframe, par exemple le site wikipedia : 

```html
<iframe width="640" height="360"
  src="https://en.wikipedia.org/wiki/Cat"
  frameborder="0" sandbox>
      <p>Votre navigateur ne prend pas en charge les iframes. Vous pouvez visiter la pagee pour <a href="https://en.wikipedia.org/wiki/Cat">visualiser l'article</a>.</p>
</iframe>
```

```xtext arrow
**🎯 À toi de jouer !**

Crée un second article sur ta page `index.html` (ou si tu as déjà plusieurs articles utilise le second) et ajoute une vidéo youtube comme vidéo de l'article.

Pour afficher une vidéo youtube dans une iframe, utilise l'adresse `http://www.youtube.com/embed/VIDEO_ID` en remplaçant `VIDEO_ID` par l'id de ta vidéo. 

Tu peux trouver l'id de ta vidéo dans l'URL sur youtube après le `watch?v=`. 

Par exemple: *youtube.com/watch?v=* => **gYeG-TLImlw**

```

```alert-warning
Les iframes peuvent représenter un risque pour la sécurité de ton site internet. 

N'intègre des iframes que de sites de confiances. 

L'attribut `sandbox` permet également d'améliorer la sécurité en  interdisant à l'iframe d’exécuter des scripts JS ou de soumettre des formulaires. Utilise le lorsque c'est possible.
```

## Récapitulatif

* Tu peux ajouter des images en HTML en utilisant la balise <img /> 

* Lors de l'utilisation de la balise image, tu dois toujours spécifier l'attribut `alt` afin d'améliorer l'accessibilté ainsi que le SEO. Si l'image est décorative, tu préféreras l'utilisation du CSS.

* Tu dois toujours redimensionner les images de ton site pour en réduire le temps de chargement

* Lorsque c'est possible, utilise des images vectorielles : elles sont plus légères et assurent une meilleure qualité d'affichage.


* Tu peux intégrer un lecteur vidéo en utilisant la balise `<video>`. Assure-toi de toujours laisser accès aux contrôles de la vidéo et pense à mettre des sous-titres au format `.vtt`.

* Tu peux intégrer un lecteur audio en utilisant la balise `<audio>`.

* La balise `<iframe>` permet d'intégrer des pages web à l'intérieur de sa page web. Ici, attention à l'aspect sécurité en t'assurant que le site proposé en iframe est sécurisé.


## Challenge

Mets en forme le travail que tu as réalisé durant cette quête et compare le résultat avec la solution qui est proposée ! 

### Critères de validation

* [ ] Le site contient une vidéo avec des sous-titres
* [ ] Le site contient une vidéo youtube grâce à l'utilisation de la balise `<iframe>`


````solution
```html
<!DOCTYPE html>
<html lang="fr">
<!-- Head of the document -->

<head>
    <title>Bienvenue sur mon site internet | Bob Smith Webdesigner</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <meta name="author" content="Bob Smith">
    <meta name="description"
        content="Webdesigner, graphiste et developpeur frontend freelance, je designe et developpe des applications web innovantes et créatives !">
</head>

<!-- Body of the document -->

<body>

    <header>
        <nav>
            <ul>
                <li><a href="informations.html">Accueil</a></li>
                <li><a href="about.html">À propos</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <hr>
    <main>
        <h1>Welcome to my <span style="color:red">website!</span></h1>
        <p>Bienvenue sur mon <strong>incroyable</strong> site internet!</p>
        <hr>
        <section>
            <!-- Section blog -->
            <h2>Blog</h2>


            <article>
                <!-- Article #1 -->
                <header>
                    <!-- Header de l'article #1 -->
                    <h2>Lorem</h2>
                </header>
                <video controls width="300">
                    <source src="cats.mp4" type="video/mp4">
                    <track kind="captions" src="cats_captions.vtt" srclang="fr">
                    <p>Impossible de jouer la vidéo. Vous pouvez <a href="cats.mp4">télécharger la vidéo</a> afin de la
                        visionner.
                    </p>
                </video>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br> Illo ipsa doloribus voluptas odio
                    voluptatibus soluta nihil aut vel assumenda at! Ipsa rerum laborum, quam quae cumque maxime eos
                    ullam recusandae.</p>

                <aside>
                    <!-- Commentaires de l'article-->
                    <header>
                        <h2>Commentaires</h2>
                    </header>
                    <article>
                        <!-- Commentaire #1 de l'article-->
                        <header>
                            <!-- Header du commentaire -->
                            <h3>Laurent</h3>
                        </header>
                        <p>Lorem ipsum!</p>
                    </article>
                </aside>
            </article>

            <article>
                <!-- Article #2 -->
                <header>
                    <!-- Header de l'article #2 -->
                    <h2>Lorem</h2>
                </header>
                <iframe width="640" height="360" src="http://www.youtube.com/embed/gYeG-TLImlw?autoplay=1"
                    frameborder="0">
                    <p>Votre navigateur ne prend pas en charge les iframes. Vous pouvez visiter la page pour <a
                            href="http://www.youtube.com/embed/gYeG-TLImlw?autoplay=1">visualiser la vidéo</a>.</p>
                </iframe>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br> Illo ipsa doloribus voluptas odio
                    voluptatibus soluta nihil aut vel assumenda at! Ipsa rerum laborum, quam quae cumque maxime eos
                    ullam recusandae.</p>

                <aside>
                    <!-- Commentaires de l'article-->
                    <header>
                        <h2>Commentaires</h2>
                    </header>
                    <article>
                        <!-- Commentaire #1 de l'article-->
                        <header>
                            <!-- Header du commentaire -->
                            <h3>Laurent</h3>
                        </header>
                        <p>Lorem ipsum!</p>
                    </article>
                </aside>
            </article>
        </section>
    </main>
    <hr>
    <footer>
        <nav>
            <ul>
                <li><a href="informations.html">Accueil</a></li>
                <li><a href="about.html">À propos</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
        <p>Contact : <a href="mailto:bob.smith@gmail.com">bob.smith@gmail.com</a></p>
        <p>@Copyright 2022</p>
    </footer>
</body>

</html>
```
````