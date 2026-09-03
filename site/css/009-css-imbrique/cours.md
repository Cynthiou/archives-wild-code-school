## Objectifs

- Utiliser le CSS imbriqué pour structurer tes feuilles de style de manière organisée.
- Réduire la répétition de sélecteurs


## Pré-requis

````stepper
# Avoir validé la quête suivante

```quests
1924
```
# Être à l'aise avec la syntaxe du CSS
Comprendre les règles CSS, les sélecteurs combinés, les relations parent/enfant et l’utilisation des classes et des ID pour cibler les éléments avec précision :
```css
/* Les éléments <li> qui sont des descendants */
/* d'un <ul class="mon-truc"> */
ul.mon-truc li {
  margin: 2em;
}
```
````

## Introduction

Dans les quêtes précédentes, tu as découvert les bases du CSS et comment structurer des styles pour tes éléments et composants.

Dans cette quête, tu vas explorer l'imbrication CSS (ou "nesting"), une approche qui permet de regrouper les styles liés sous un même sélecteur pour rendre le code plus lisible et organisé.

## Sommaire


## Mais c'est quoi le CSS imbriqué ?

L'imbrication CSS (ou nesting) est la possibilité de définir les règles de style d’un élément à l’intérieur d’un autre. Au lieu de répéter plusieurs fois le même sélecteur pour styliser des éléments enfants spécifiques ou des pseudo-sélecteurs, tu peux les imbriquer sous un seul sélecteur.

L’imbrication permet de regrouper les styles associés et d’écrire le CSS sous une hiérarchie imbriquée, rendant le code plus organisé et lisible.

```alert info
Le CSS imbriqué est disponible nativement depuis 2023, avec l'introduction de cette fonctionnalité dans les spécifications CSS officielles. 

Cette évolution marque une étape importante pour le développement du CSS moderne. Jusqu'ici, l’imbrication de styles était uniquement possible avec des préprocesseurs comme [Sass](https://sass-lang.com/) ou [Less](https://lesscss.org/).
```

**Exemple**

Nous allons prendre ce code HTML en référence pour notre exemple :

```cshtml
<body>
  <header>
    <h1>Css Nesting</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti nihil, officiis aut vel.<br>
      <a href="#">This is a Link</a>
    </p>
  </header>
</body>
```

Comme tu le sais, le HTML est un langage composé de balises, où chaque balise peut en contenir d'autres à l'intérieur. Un peu comme des poupées russes. Le CSS imbriqué fonctionne exactement comme ton HTML !

````alert-warning
 Ici, nous utilisons une balise HTML (header) directement comme sélecteur dans le CSS à titre d'exemple. 

Cependant, c'est une bonne pratique d'utiliser des classes ou des ID pour garder un code plus flexible et éviter des conflits avec des éléments HTML identiques ailleurs sur la page.
````

 **Historiquement, le CSS s'écrit comme ceci :**

```css
header {
  width: 80%;
  color: #22232e;
}
header:hover {
  color: #636363;
}
header h1 {
  font-size: 2rem;
}
header p {
  font-size: 1rem;
  margin: 25px 0px 25px;
}
header p a {
  color: #00c2cb;
}
header p a:hover {
  color: #008a92;
}
```

 **Voici comment nous pouvons l'écrire avec du CSS imbriqué :**

```css
header {
  width: 80%;
  color: #22232e;

  &:hover {
    color: #636363;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
    margin: 25px 0px 25px;

    a {
      color: #00c2cb;

      &:hover {
        color: #008a92;
      }
    }
  }
}
```

Pas mal, non ?   

C’est la magie du CSS imbriqué : tous les styles que tu mets à l'intérieur d'un sélecteur (de balise, de classe ou d'ID : dans notre exemple, le sélecteur `header`) resteront limités à cet élément et à ses sous-éléments.
Cela permet de garder les styles bien organisés et de ne pas les répéter inutilement.

Tu remarqueras la subtilité pour l'appel d'un pseudo-élément ou pseudo-classe (ici, `:hover`) : tu dois mettre un `&` devant.   
Ce caractère `&` fait référence à l'élément parent le plus proche dans lequel il est imbriqué. Ainsi, le premier `:hover` s'appliquera uniquement sur la balise `header` et le second uniquement sur la balise `a`.


````alert-warning
Attention à ne pas abuser de l'imbrication. Tu ne dois pas reproduire toute la structure de ton HTML avec un seul gros bloc : cela rendrait finalement ton code illisible. Tu dois rélfléchir et découper ton code en _composants_.

Les composants sont des sections spécifiques de ton HTML représentant une partie de l'interface, comme un bouton, un formulaire ou une carte de produit (ici le header).
````

Amuse-toi à tester l'imbrication : 

```js live
!--- index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Sandbox</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header>
      <h1>Css Nesting</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti nihil, officiis aut vel.<br>
        <a href="#">This is a Link</a>
      </p>
    </header>
  </body>
</html>
!--- styles.css
header {
  width: 80%;
  color: #22232e;

  &:hover {
    color: #636363;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
    margin: 25px 0px 25px;

    a {
      color: #00c2cb;

      &:hover {
        color: #008a92;
      }
    }
  }
}
!--- index.js hide
import "./styles.css";
```

## Avantages de l'imbrication du CSS

- **Organisation et lisibilité** : Les styles sont regroupés sous des sélecteurs parents, ce qui rend le code plus clair et facile à suivre.
- **Réduction de la répétition** : Moins de répétitions de classes et sélecteurs, ce qui allège le code.
- **Isolation des styles** : Chaque composant est isolé dans son bloc, ce qui minimise les risques de conflits de style entre les membres d’une équipe.
- **Simplification de la maintenance** : Avec des styles bien hiérarchisés, il est plus simple d’apporter des modifications sans impacter d'autres éléments.

```resource
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting
# La doc Mdn sur le nesting
```

## Challenge

```js live
!--- index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>CSS Nesting</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <nav>
      <p>Wild</p>
      <ul>
        <li>Home</li>
        <li>Contact</li>
        <li>About</li>
      </ul>
    </nav>
  </body>
</html>


!--- styles.css

nav {}

!--- index.js hide
import "./styles.css";
```

Fork ce sandbox et ajoute un peu de style à cette `nav` grâce à la magie du CSS imbriqué et avec un hover sur les balises `<li>`. 
Partage le lien de ton fork en solution.

### Critères de validation

- Le CSS imbriqué est utilisé pour l'ensemble du composant `<nav>`.
- Le hover est présent et fonctionnel.