## Objectifs

* Créer des tableaux en HTML

## Pré-requis

````stepper
# Valider la quête suivante
```quests
2113
```
# Être à l'aise avec l'imbrication de balises HTML
```html
<p>Bienvenue sur mon incroyable <strong>site web</strong> !</p>
```
````

## Introduction

Précédemment, tu as vu les principes de bases du langage HTML.

Dans cette quête, nous allons apprendre à faire des tableaux afin de présenter des données. 


## Sommaire

## Qu'est ce qu'un tableau ?

Un tableau est un ensemble de données représentées avec des lignes et des colonnes. 

Il permet de facilement lire et comprendre des données. 

### La balise <table>

Pour créer un tableau en HTML, tu dois utiliser la balise `<table>` :

```html
<table></table>
```

Tu peux définir la largeur et la hauteur d'un tableau en utilisant les attributs `height` et `width` : 

```html
<table width="100%"></table>
```

À l'intérieur de la balise `<table>`, tu peux créer des lignes à l'aide de la balise `<tr>` et des cellules à l'aide de la balise `<td>` :


```html
<table width="100%">
    <tr>
        <td>Cellule 1 - ligne 1</td>
        <td>Cellule 2 - ligne 1</td>
        <td>Cellule 3 - ligne 1</td>
        <td>Cellule 4 - ligne 1</td>
    </tr>
    <tr>
        <td>Cellule 1 - ligne 2</td>
        <td>Cellule 2 - ligne 2</td>
        <td>Cellule 3 - ligne 2</td>
        <td>Cellule 4 - ligne 2</td>
    </tr>
</table>
```

Tu peux créer des en-têtes à l'aide de la balise `<th>` :

```html
<h1>Animaux à adopter</h1>
<table width="100%">
    <tr>
        <!-- En-tête des colonnes -->
        <th>Espèce</th>
        <th>Prénom</th>
        <th>Sexe</th>
        <th>Disponible</th>
        <th>Photo</th>
    </tr>
    <tr>
        <!-- animal #1 -->
        <td>Chat</td>
        <td>Lucky</td>
        <td>Mâle</td>
        <td><img src="/photos/lucky.jpeg" alt="Chat Noir avec une tache blanche alongé sur un panier gris"></td>
    </tr>
    <tr>
        <!-- animal #1 -->
        <td>Chat</td>
        <td>Symba</td>
        <td>Mâle</td>
        <td>Disponible</td>
        <td><img src="/photos/symba.jpeg" alt="Chat Roux jouant avec une ficelle"></td>
    </tr>
</table>
```

````xtext arrow
Pour des exemples concrets avec du code, tu peux consulter cette page du site du W3C :

```resource
https://www.w3.org/WAI/tutorials/tables/
Plusieurs designs de tableaux
```
````

## Récapitulatif

* Tu peux créer des tableaux en HTML en utilisant la balise `<table>`

* Chaque ligne d'un tableau est représentée par la balise `<tr>`

* Une cellule de ligne s'écrit avec la balise `<td>`, ou `<th>` s'il s'agit d'en-tête de colonne

* Chaque ligne doit comporter le même nombre de cellules

## Challenge

Crée une nouvelle page html dans ton projet et crée un tableau comparant le poids et la vitesse des animaux sauvages les plus rapides :


Nom       | Vitesse
---       | ---
Guépard      | 120km/h   
Lion      | 80km/h   
Antilope      | 95km/h   
Autruche      | 70km/h   
Lièvre      | 60km/h              


### Critères de validation

* [ ] La page contient un tableau avec un en-tête ainsi que des cellules.


````solution
```html
<h1>Animaux les plus rapides:</h1>
<table width="100%">
    <tr>
        <!-- En-tête des colonnes -->
        <th>Nom</th>
        <th>Vitesse</th>
    </tr>
    <tr>
        <!-- animal #1 -->
        <td>Guépard</td>
        <td>120km/h</td>
    </tr>
    <tr>
        <!-- animal #2 -->
        <td>Lion</td>
        <td>80km/h</td>
    </tr>
    <tr>
        <!-- animal #3 -->
        <td>Antilope</td>
        <td>95km/h</td>
    </tr>
    <tr>
        <!-- animal #4 -->
        <td>Autruche</td>
        <td>70km/h</td>
    </tr>
    <tr>
        <!-- animal #5 -->
        <td>Lièvre</td>
        <td>60km/h</td>
    </tr>
</table>
```
````