## Objectifs

* Définir des variables CSS
* Les utiliser en suivant les bonnes pratiques actuelles

## Introduction

DRY (Don't Repeat Yourself) est un concept clé en programmation. Le CSS n'échappe pas à la règle. Pour éviter ces répétitions, un mécanisme de variable a été mis en place récemment en CSS.

## Sommaire

## Définition des variables CSS

Les variables CSS (tu rencontreras également le terme de propriétés personnalisées ou *custom properties*) sont relativement proches des variables que tu pourras trouver dans n'importe quel autre langage. Tu vas pouvoir choisir un nom pour ta variable et lui attribuer une valeur.


Pour commencer, regarde cette vidéo de seulement 100 secondes qui te donnera les bases pour comprendre ce que sont les variables CSS.

```youtube
https://www.youtube.com/watch?v=NtRmIp4eMjs
```

Comme tu viens de le voir, les variables CSS sont des propriétés CSS *presque* comme les autres, à ce titre, elles sont définies au même endroit que toutes autres propriétés, et sont sujets de la même manière aux cascades. Il faut donc forcément les **définir** dans un bloc, associé à un sélecteur.

```css
.parent {
    --color: blue;
}
```

L'**utilisation** d'une variable se fait avec la syntaxe suivante :

```css
.child {
    background-color: var(--color);
}
```

Puisque la variable suit les **règles de cascades** propres à CSS, la variable `--color` sera disponible dans la classe `.parent`, mais également dans tous ses enfants. Par contre elle sera inaccessible en dehors.

Si tu souhaites qu'une variable soit "accessible" sur l'ensemble de la cascade, il faut alors la relier à l'élément parent de plus haut niveau. Pour une page web c'est la balise `<html>`. Cependant, le CSS pouvant être utilisé sur d'autres langages balisés, la convention est plutôt d'utiliser le sélecteur `:root` qui correspond toujours à la balise de plus haut niveau du document (qui sera donc bien `<html>` dans notre cas).

```css
:root {
    --primary-color: blue;
    --secondary-color: orange
}
```

Il est possible de définir une variable avec la valeur d'une autre variable, ou le résultat d'un calcul (via la [fonction CSS  `calc()`](https://developer.mozilla.org/fr/docs/Web/CSS/calc))

```css
:root {
    --spacing: 8px;
    --spacing-xl: calc(var(--spacing) * 2);
}
```

Par contre il n'est pas possible d'utiliser une variable pour se définir elle même. Le code suivant **ne fonctionnera donc pas**.

```css
:root {
    --increment: calc(var(--increment) + 1);
}
```

## Intérêt des variables CSS

L'utilisation des variables n'a rien d'obligatoire, mais elles vont grandement te faciliter la maintenance de ton site.
Imagine un site où la charte graphique est le rose et le vert (il en faut pour tous les goûts) et qu'un jour ton client retrouve la raison et te demande une charte différente, avec par exemple du bleu et du violet. Si tu as codé ton site sans variable, il faudra que tu changes les couleurs (et toutes leurs variantes) dans tous tes fichiers CSS, ce qui va être long, complexe et source d'erreur.
Si tu as pris le temps de définir des variables CSS, il te suffira de modifier les quelques valeurs dans ton sélecteur `:root` et le nouveau style sera directement appliqué.
D'autre part, la lisibilité du site sera grandement améliorée. Voici un exemple sans variable :

```css
div {
    background-color: #ffeeee;
    border: 1px solid #44a582;
    color: #112211;
    box-shadow: 1px 1px 2px #226655;
}
```

et exactement le même mais cette fois-ci avec des variables

```css
:root {
    --primary-color:#a487f2;
    --light:#ffeeee;
    --dark: #112211;
    --shadow-color:#226655
}

div {
    background-color: var(--light);
    border: 1px solid var(--primary-color);
    color: var(--dark);
    box-shadow: 1px 1px 2px var(--shadow-color);
}
```

dans le second cas, le code est beaucoup plus lisible et maintenable sur le long terme, notamment lorsque tu travailles avec d'autres développeurs.


## Quand utiliser les variables CSS ?

Utilises-en le plus possible ! Commence par gérer toutes tes couleurs via des variables. Cela te permet de mieux t'y retrouver et de faciliter les changements de charte graphique.

Mais une charte ne se limite pas aux simples couleurs. Tu peux également utiliser les variables dans bien d'autres situations, quelques exemples :

* les polices (principale, titre...)
* les tailles de police (principale, titre de niveau1, titre de niveau2...)
* les espacements (afin d'avoir un système d'espacement cohérent, une base de multiples de 8px est souvent utilisé en graphisme web).
* la taille de tes principaux éléments (largeur du conteneur principale, hauteur de la navbar...)
* les valeurs pour tes transitions et animations, *etc.*

```resource
https://css-irl.info/7-uses-for-css-custom-properties/
# Exemples d'utilisation des variables CSS
Dans cette ressources, tu trouveras 7 cas plus ou moins avancés d'utilisation des variables. Tu peux voir que leur rôle est très loin de se limiter uniquement à nommer quelques couleurs.
```


## Nommage des variables

Comme dans n'importe quel langage, le bon nommage des variables est très important. Tu dois respecter quelques règles :
- en anglais
- pas d'abbreviation
- un nom ayant du sens

Essaie également de nommer une variable le plus indépendamment possible de la valeur qu'elle va accueillir, puisque par définition, une variable pourra être redéfinie.

Par exemple, si tu sais que la couleur principale de ton site sera le vert et la secondaire le jaune, que tu auras un fond blanc et une police noire, ne fais pas

```css
:root {
    --green: green;
    --yellow: yellow;
    --black: black;
    --white: white;
}
```

mais plutôt

```css
:root {
    --primary-color: green;
    --secondary-color: yellow;
    --dark: #001500;;
    --light: #f8fdf0;
}
```

Ainsi, si la charte graphique change, pas de risque  de se retrouver avec une variable nommée `--green` qui contiendrait finalement la valeur `blue` !

De même pour les polices, `--text-font` et `--title-font` seront mieux que `--roboto-font` et `--opensans-font`.

```alert-info
# Remarque
En graphisme web, il est recommandé de ne pas utiliser directement le blanc et le noir, mais plutôt des variantes très claires (presque blanc) et très foncées (presque noir) de ta couleur principale.
```

## Expérimentation

Regarde la *sandbox* ci-dessous. Une page simple est réalisée (navbar, titre, paragraphe, lien), mais sans aucune utilisation de variables CSS. 
- Tout en conservant exactement la même mise en page, modifie le code afin d'ajouter des variables pour toutes les propriétés où cela pourrait être nécessaire (et pas seulement les couleurs).
- Une fois les modifications réalisées, ton client souhaite passer à un design bleu (couleur principale) et orange (couleur secondaire). Pour la police de titre, il veut utiliser la police "Impact". Modifie les variables en conséquence pour te rendre compte de la facilité de modifier ton site une fois celles-ci correctement mises en place.

```js live
!--- index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Static Template</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <nav class="navbar">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </nav>
    <main class="container">
      <h1>CSS variables experimentations</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus expedita, 
        tempora ex illo praesentium velit rem maiores dolor, eius libero vel? Quod non,
         ducimus assumenda fuga ut incidunt iste perferendis?
      </p>
      <a class="btn">Call to action</a>

      </main>
  </body>
</html>

!--- style.css
body {
  margin: 0;
  font-family: arial;
}

.navbar {
  display: flex;
  background-color: #f7289a;
  color: white;
  padding: 16px;
}

.container {
  width: calc(100% - 32px);
  max-width: 800px;
  margin: auto;
}

h1 {
  color: #f7289a;
  font-size: 24pt;
  font-family: "Times New Roman", Times, serif;
}

p {
  font-size: 16pt;
  color: black;
}

a:any-link {
  color: white;
  margin-left: 8px;
  text-decoration: none;
}

.btn {
  background-color: #26f784;
  color: black;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16pt;
  cursor: pointer;
}


!--- index.js
import "./style.css";
```


```hidden
Voir la solution|||css|||Tu trouveras ci-dessous une solution possible|||0|||Cacher
:root {
  --main-color: #3537b9;
  --secondary-color: #f79d26;
  --light: rgba(250, 245, 242, 0.938);
  --dark: #14030d;

  --spacing: 8px;
  --spacing-2: calc(var(--spacing) * 2);
  --spacing-4: calc(var(--spacing) * 4);

  --main-font: arial;
  --title-font: impact;

  --text-font-size: 16pt;
  --title-font-size: 24pt;
}

body {
  margin: 0;
  font-family: var(--main-font);
}

.navbar {
  display:flex;
  background-color:var(--main-color);
  color: var(--light);
  padding: var(--spacing-2);
}

.container {
  width: calc(100% - var(--spacing-4));
  max-width:800px;
  margin:auto;
}

h1 {
  color: var(--main-color);
  font-size: var(--title-font-size);
  font-family: var(--title-font);
}

p {
  font-size:var(--text-font-size);
  color: var(--dark);
}

a:any-link {
  color: var(--light);
  margin-left: var(--spacing-2);
  text-decoration: none;
}

.btn {
  background-color: var(--secondary-color);
  color: var(--dark);
  padding:var(--spacing) var(--spacing-2);
  border-radius:4px;
  font-size: var(--text-font-size);
  cursor:pointer;
}
```


Voilà, tu connais maintenant les bases de l'utilisation des variables CSS, fais-en bon usage sur tes différents projets !