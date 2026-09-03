## Objectifs

* De comprendre en profondeur la notion de grille
* De créer une superbe mise en page CSS avec Grid

## Introduction

Le module *CSS Grid layout* est un outil puissant permettant de faire de la mise en page via une grille à deux dimensions.
Dans cette quête, tu vas découvrir comment utiliser cette technique plutôt récente dans la spécification CSS.

![Illustration grid](https://storage.googleapis.com/quest_editor_uploads/fVabUPUJvuI67IogsAiaNUMzu6OFMdWb.jpeg)

## Sommaire

## Anatomie de la grille

Une grille est constituée :

* de lignes (**Grid lines**) : elles peuvent être horizontales ou verticales et sont numérotées en commençant à l'index 1. Elles sont représentées en pointillés sur le schéma suivant ;
* de pistes (**Grid tracks**) : elles désignent les espaces entre les lignes ;
* de cellules (**Cells**) : elles sont délimitées par les intersections entre les lignes horizontales et verticales ;
* d'aires (**Grid area**) : une ou plusieurs cellules adjacentes formant un rectangle.

![Grid concept](https://storage.googleapis.com/quest_editor_uploads/o4ZT2I0AW7y4qqHaG18f5wsPmTupzSnV.svg)*Source:* [https://webkit.org/blog/7434/css-grid-layout-a-new-layout-module-for-the-web/](https://webkit.org/blog/7434/css-grid-layout-a-new-layout-module-for-the-web/)

## Le conteneur de grille

La première chose dont nous avons besoin est un **conteneur** qui contrôlera comment les éléments enfants seront disposés (c'est l'équivalent du conteneur flex avec le module Flexbox).

```css
.bloc-container {
  display: grid;
}
```

![Grid first step](https://storage.googleapis.com/quest_editor_uploads/RVIjCm1jrTTSMnZX0KyIh8vEb107dB9b.png)

Maintenant que l'on a défini le mode de mise en page avec `display: grid`, on a accès à deux propriétés : 

* **grid-template-rows** pour contrôler la façon dont les lignes s'affichent
* **grid-template-columns** pour contrôler la façon dont les colonnes s'affichent


Prenons un exemple concret. 
Imagines qu'on souhaite avoir une grille de 2 lignes et 3 colonnes.  On veut également que les éléments de la grille prennent 200px sur les colonnes et 200px sur les lignes (autrement dit, on veut des cellules carrées de 200px).

Le code ressemblera à ceci :

```css
.bloc-container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 200px 200px;
}
```

Regarde la propriété `grid-template-columns` : parce qu'on veut **3 colonnes de 200px**, on écrit simplement **3 fois 200px**.

```css
  grid-template-columns: 200px 200px 200px;
```

Ici toutes les colonnes prennent la même largeur, mais on aurait bien sûr pu choisir des tailles différentes pour chaque colonne.

La même logique s'applique pour les lignes (pistes horizontales) : On veut **deux lignes de 200px**, on écrit donc simplement **deux fois 200px** après la propriété `grid-template-rows`.

```css
  grid-template-rows: 200px 200px;
```

![Grid 2nd example](https://storage.googleapis.com/quest_editor_uploads/baDN4cAeRBMh6bIJAOzXfpFe4cP0Jmyb.png)

Mais, attends, est-ce vraiment nécéssaire de répéter 3 fois 200px ?
Non, on peut utiliser **la fonction repeat** pour définir la même taille plusieurs fois :

```css
grid-template-columns: repeat(3, 200px);
grid-template-rows: repeat(2, 200px);
```

Et maintenant, comment fait-on si on veut avoir une colonne de 200px, une autre de 100px et la dernière sur 300px ? Et si on veut une ligne de 100px et l'autre de 300px ? 
On a juste à l'écrire comme tu l'as énoncé !

```css
grid-template-columns: 200px 100px 300px;
grid-template-rows: 100px 300px;
```

![Example grid ](https://storage.googleapis.com/quest_editor_uploads/4r8yf40OPMybhmkigDJ9MseWQW6xyBRo.png)


## "Mind the gap"

On aimerait bien mettre un peu d'espace entre les éléments de la grille. Qu'a cela ne tienne, on peut utiliser la propriété `gap` !

```css
gap: 20px
```

![Grid-gap](https://storage.googleapis.com/quest_editor_uploads/VZ7YcoiI8pmKndGXiBwZKJUdU2c1Lhrr.png)

**🔬 Expérience**

**Crée une grille** avec **deux colonnes** : une première de **100px** et l'autre de **200px**. 
Il y aura aussi **3 lignes de 200px chacune**. Les éléments de la grille devront être **espacés de 10px**.

**Ta grille devrait ressembler à ceci :**

![Grid exercise example](https://storage.googleapis.com/quest_editor_uploads/VHQEYZhbA8OWYb3j1SpfyXQkUDAhqsDZ.png)

```js live
!--- index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>
      Create a grid
    </h1>
    <ul>
      <li>2 columns (100px and 200px)</li>
      <li>3 rows 200px each</li>
    </ul>
    <div class="bloc-container">
      <div class="bloc">1</div>
      <div class="bloc">2</div>
      <div class="bloc">3</div>
      <div class="bloc">4</div>
      <div class="bloc">5</div>
      <div class="bloc">6</div>
    </div>
  </body>
</html>

!--- style.css
.bloc-container {
  text-align: center;
}
.bloc {
  padding: 0.5em;
  background-color: rgb(63, 153, 205);
  border: 2px solid rgb(46, 120, 163);
}


!--- index.js
import "./style.css";
```


````solution

```css hl[2:5]
.bloc-container {
  display: grid;
  grid-template-columns: 100px 200px;
  grid-template-rows: repeat(3, 200px);
  gap: 10px;
  text-align: center;
}
```
````

## "Fractions"

Tout à l'heure, on a utilisé l'unité `px` pour définir les dimensions de notre grille, mais on peut aussi utiliser l'unité `fr`, diminutif de *"fraction"*.
Par exemple, si on veut faire en sorte que chaque colonne prennent 1/3 de la largeur disponible, on pourra écrire :

```css
grid-template-columns: 1fr 1fr 1fr;
```

![Grid example frame](https://storage.googleapis.com/quest_editor_uploads/zmlpJ7E0NMGDoPnJsEyJEFY6CFxk2Z1X.png)

On pourrait aussi faire en sorte que la deuxième colonne prenne 1/2 de l'espace et les deux autres 1/4 :

```css
grid-template-columns: 1fr 2fr 1fr;
```

![Grid example frame 2](https://storage.googleapis.com/quest_editor_uploads/9DAEEMd6xtmzE3UdCvxTho2wQou8wd2b.png)

**🔬 Expérience**

En utilisant l'unité `fr`, crée une grille qui ressemble à ça :

![image](https://storage.googleapis.com/quest_editor_uploads/gJ9Iy0Tg9OceuU8eskt1MIw7ZTlwiPnR.png)

```js live
!--- index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>
      Create a grid
    </h1>
    <div class="bloc-container">
      <div class="bloc">1</div>
      <div class="bloc">2</div>
      <div class="bloc">3</div>
      <div class="bloc">4</div>
      <div class="bloc">5</div>
      <div class="bloc">6</div>
    </div>
  </body>
</html>


!--- style.css
.bloc-container {
  text-align: center;
}
.bloc {
  padding: 0.5em;
  background-color: rgb(63, 153, 205);
  border: 2px solid rgb(46, 120, 163);
}


!--- index.js
import "./style.css";
```


````solution

```css hl[2:7]
.bloc-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 400px;
  border: 1px solid black;
  gap: 10px;
  text-align: center;
}
```
````

## Auto-filling

On peut aller un peu plus loin et utiliser la fonction `auto-fill` :

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 20px;
}
```

Ici, par exemple, **chaque élément va prendre 100px** et **une fois qu'il n'y a plus d'espace, ces derniers seront automatiquement renvoyés à la ligne.**

Essaie de réduire la taille de fenêtre pour voir les éléments aller à la ligne.

```js live
!--- index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>
      Create a grid
    </h1>
    <div class="bloc-container">
      <div class="bloc">1</div>
      <div class="bloc">2</div>
      <div class="bloc">3</div>
      <div class="bloc">4</div>
      <div class="bloc">5</div>
      <div class="bloc">6</div>
    </div>
  </body>
</html>


!--- style.css
.bloc-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  text-align: center;
}
.bloc {
  padding: 0.5em;
  background-color: rgb(63, 153, 205);
  border: 2px solid rgb(46, 120, 163);
}


!--- index.js
import "./style.css";
```

## Définir la position de chaque élément

Une autre manière de définir la disposition des éléments d'une grille est de **donner la position de départ et d'arrivée de chaque élément par rapport aux lignes**.

Par exemple :

```css
.element-1 {
  grid-column-start: 1;
  grid-column-end: 4;
}
```

Avec ce code, le premier élément commencera à la position 1 et finira à la position 4.

![Grid lines](https://storage.googleapis.com/quest_editor_uploads/OgKwRs1cB8kOd2OU9Am8znuzJcJ3hoLb.png)

C'est peut être un peu déroutant de dire "l'élément doit s'arrêter à la 4ème ligne" (on parle ici de **lignes**, voir schéma ci-dessous) et de voir qu'il "prend la place" de 3 éléments seulement. Mais rappelle-toi, la première ligne désigne le bord gauche de la grille, donc c'est bien la ligne 4 qui désigne le bord de droite sur une grille de 3 colonnes.

**Une image pour mieux comprendre**

![Grid lines](https://storage.googleapis.com/quest_editor_uploads/7rHJxHqqOwX0USt58xSSKeRGIckTyqIQ.png)

**🔬 Expérience**

Essaie de re-créer cette mise en page en utilisant ce que tu viens d'apprendre. Il suffit de changer l'élément 1 et l'élément 2 pour que ça marche ;)
![Grid exercise](https://storage.googleapis.com/quest_editor_uploads/VbzMduNSIBaafmFGsJOwpExeLVksoWZB.png)

```js live
!--- index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>
      The elements should be in column and take the full width
    </h1>
    <div class="bloc-container">
      <div class="bloc element-1">1</div>
      <div class="bloc element-2">2</div>
      <div class="bloc element-3">3</div>
      <div class="bloc element-4">4</div>
      <div class="bloc element-5">5</div>
      <div class="bloc element-6">6</div>
    </div>
  </body>
</html>


!--- style.css
.bloc-container {
  display: grid;
  text-align: center;
  height: 400px;
  border: 1px solid black;
  grid-gap: 10px;
}
.bloc {
  padding: 0.5em;
  background-color: peru;
  border: 2px solid red;
}


!--- index.js
import "./style.css";
```

````solution

```css
.element-1 {
  grid-column-start: 1;
  grid-column-end: 4;
}
.element-2 {
  grid-column-start: 1;
  grid-column-end: 3;
}
```
````

## Minimum et maximum

Pour chaque piste, on peut aussi définir la taille minimale et maximale.

```css
.bloc-container {
  display: grid;
  grid-template-rows: minmax(100px, auto);
  grid-template-columns: repeat(3, 1fr);
}
```

Dans cet exemple, les pistes horizontales auront une hauteur minimum de 100px, mais si pour une quelconque raison les éléments à l'intérieur prennent plus d'espace, la hauteur de la piste s'adaptera au contenu.

Voici un exemple.

```js live
!--- index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>
      Minmax()
    </h1>
    <div class="bloc-container">
      <div class="bloc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi iure
        molestias, iste ratione exercitationem recusandae nihil nulla dolorum
        pariatur facilis? Voluptatum perspiciatis quisquam, reiciendis eius
        deleniti labore sed nihil sit.
      </div>
      <div class="bloc">2</div>
      <div class="bloc">3</div>
      <div class="bloc">4</div>
      <div class="bloc">5</div>
      <div class="bloc">6</div>
    </div>
  </body>
</html>


!--- style.css
.bloc-container {
  display: grid;
  grid-template-rows: minmax(100px, auto);
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
}
.bloc {
  padding: 0.5em;
  background-color: rgb(63, 153, 205);
  border: 2px solid rgb(46, 120, 163);
}


!--- index.js
import "./style.css";
```

**🔬 Experience**

Essaie d'enlever du texte ou de mettre ce dernier sur la seconde ligne et tu verras que la taille de la piste s'adapte au contenu.
Tu peux aussi jouer avec la largeur de la fenêtre pour voir que la piste s'adapte.

## Ressources

Regardes cette vidéo qui présente des exemples concrets d'utilisation du module *CSS Grid* et qui te permettra de découvrir quelques propriétés supplémentaires.

```youtube
https://www.youtube.com/watch?v=705XCEruZFs
```

```ressource
https://css-tricks.com/snippets/css/complete-guide-grid/
# A Complete Guide to CSS Grid
```

```resource
https://cssgridgarden.com/#fr
# Entraîne-toi

Complète au moins 10 niveaux sur Grid Garden - un jeu pour apprendre CSS Grid
```

## Challenge

À partir de tout ce que tu as appris jusqu'ici (y compris grâce aux autres quêtes), essaie de reproduire la mise en forme ci-dessous en utilisant le **display grid** au moins une fois.

![Grid section](https://storage.googleapis.com/quest_editor_uploads/z5rGYkQWjpNhzzAuNqguQxlImx8ZhqRQ.png)


### Précisions et indices

- La page est sur fond gris. 
- Le contenu principal est sur fond blanc et centré horizontalement dans la fenêtre de ton navigateur.
- Potentiellement issue d'une page contenant d'autres contenus, nous identifions sur la capture écran une section qui contient 3 articles de largeurs identiques. 
- Chaque article est constitué d'un titre et d'un paragraphe.
- Le code pour le violet : #A306B6.

````solution

## Une solution possible.
Consulte les onglets `index.html` et `style.css` ci-dessous pour voir la solution qui t'est proposée.
Tu peux aussi ouvrir le code avec CodeSandbox pour plus de lisibilité.

```js live

!--- index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display Grid | Exercise</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <section>
            <article>
                <h2>Title 1</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </article>
            <article>
                <h2>Title 2</h2>
                <p>Nulla sint dolor non repellendus veniam nemo voluptatibus voluptas maxime nam animi</p>
            </article>
            <article>
                <h2>Title 3</h2>
                <p>Hic tempore, debitis quisquam, molestias quas vel corporis magnam fuga.</p>
            </article>
        </section>
    </main>
</body>
</html>

!--- style.css
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    line-height: 1.5;
    background-color: grey;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

main {
    max-width: 80ch;
    margin: 0 auto;
    padding: 1rem;
    background-color: white;
}

section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
}

article {
    padding: 1rem;
    background-color: #A306B6;
    color: white;
}

!--- index.js
import "./style.css";

```
````