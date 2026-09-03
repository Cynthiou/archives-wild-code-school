```title-book
 Introduction
```

Dans une page web, un des premiers moyens de capter les interactions de l'utilisateur est d'utiliser les formulaires.
Qu'il s'agisse de se connecter, enregistrer un nouvel article sur un blog ou encore effectuer une réservation, l'utilisateur devra passer par un formulaire.

Aujourd'hui, tu vas t’atteler à la tâche assez classique et récurrente : créer un formulaire de contact.

## 🤓 **À la fin de cette quête, tu seras en mesure de :**

* ✅ Connaître les composantes d'un formulaire en HTML
* ✅ Mettre en place ton premier formulaire

## Sommaire


## La balise <form>

Commençons par une petite mise en _form_ !

![echauffement](images/001-echauffement.jpg)

Un formulaire, c'est avant tout du code HTML. On pourrait définir cela par une interface qui va nous permettre de collecter des données auprès des utilisateurs.


Dans la pratique, si tu souhaites ajouter un formulaire dans ton site, il va falloir que tu utilises une nouvelle balise : `<form>`.
Cette balise va te permettre de définir le bloc de formulaire dans lequel tu ajouteras tes futurs champs. Comme les autres balises HTML, tu vas pouvoir la personnaliser grâce à des attributs.

Tu découvriras, via la ressource ci-dessous, les attributs HTML spécifiques aux formulaires. Tu peux d'ores et déjà retenir les deux attributs suivants dont nous reparlerons très prochainement pour le traitement des données : 

- `action` : Définit le fichier dans lequel on traitera le formulaire à sa soumission.
- `method` : Définit la méthode de la requête HTTP qui sera utilisée.

```ressource
https://developer.mozilla.org/fr/docs/Web/HTML/Element/form
# <form> : l'élément représentant un formulaire
```

## Les champs

Il existe une multitude de types de champs. Ils doivent être soigneusement choisis lors de l'intégration selon la saisie attendue de l'utilisateur.
Le client web pourra ainsi traiter correctement et distinctement des saisies de textes classiques (un prénom ou un nom), des saisies de textes personnalisées (téléphone, email, nombre, date, …), un choix parmi des éléments à sélectionner dans des listes (une ville, une année de naissance), etc.

Chaque champ va donc pouvoir être personnalisé grâce à sa balise mais également à ses **attributs**, eux aussi, spécifiques.

```resource
https://www.w3schools.com/htmL/html_form_elements.asp
# HTML Form Elements
Tu peux retrouver ici tous les éléments qu'un formulaire peut contenir.
```

Parmi les attributs des champs de formulaires, le plus important est le `name`. On en reparlera plus en détail dans la quête concernant la récupération des données.

### Les types de champ
N'hésite pas également à consulter cette quête si ce n'est pas déjà fait. On y aborde notamment et plus en détail les différents types possibles pour les `<input>`.
```quests
2136
```


## Les labels

Pour indiquer aux utilisateurs quelle information est attendue, il est indispensable d'ajouter une étiquette à chaque champ de formulaire.

Pour cela, on utilise une autre balise : la balise `<label>`. Celle ci s'écrit de cette manière :

```html
<label for="firstname">What's your firstname?</label>
```

Tu vois qu'on a ajouté un nouvel attribut à cette balise, le `for`

Celui-ci va nous permettre de lier notre label à notre champ. Pour cela il faut que la valeur de l'attribut `for` de notre balise `label` corresponde exactement à la valeur de l'attribut `id` de notre champ.
Si on souhaite compléter l'exemple, voici ce que ça donnerait : 

```html
<label for="firstname">Quel est ton prénom ?</label>
<input type="text" id="firstname">
```

Pour l'ergonomie de notre site et le confort d'utilisation, c'est très utile. En effet, grâce à ce qu'on vient de voir, lorsque l'utilisateur cliquera sur le label, le focus de la souris se fera automatiquement sur le champ correspondant. Pour les utilisateurs se servant d'assistant d'écran, tels que les assistants vocaux, cette technique permettra l'énoncée audio du texte contenu dans le `label` au parcours de la page.

Je te laisse tester par toi même !

Tu trouveras aussi une variante qui dispense l'utilisation de l'attribut `for` lié à l'`id`.

```html
<label>
    Quel est ton prénom ?
    <input type="text">
</label>
```

Ici le champ `<input>` a été placé à l'intérieur de la balise `<label>` produisant les mêmes avantages qu'avec l'exemple précédent.

## Le bouton de soumission

Il nous reste un dernier élément à voir ensemble afin de compléter la structure HTML de notre formulaire. 
Que serait un formulaire sans bouton de validation ?



Il y a deux manières d'intégrer un bouton de validation.

```html
<input type="submit" value="Valider">
```
ou

```html
<button>Valider</button>
```

Les différences entre ces deux manières sont les suivantes : 

- La balise `button` est une balise générique qui peut contenir du texte, d'autres balises, des images, etc.
- Celle-ci est sans doute plus polyvalente et personnalisable en terme de mise en page et de contenu.
- Enfin, la balise `input` se trouvera forcément à l'intérieur de votre balise `form`, tandis que la balise `button` peut être à l'extérieur si on y ajoute **l'attribut** `form` pour la relier au formulaire par son `id`.

### Exemple d'un formulaire fonctionnel

```html
<form id="myForm" action="treatment.php" method="post">
    <!-- Champs du formulaire -->
    <label for="firstname">Prénom</label>
    <input type="text" id="firstname" name="firstname">
    
    <label for="email">Email</label>
    <input type="email" id="email" name="email">

    <input type="submit" value="Valider">
</form>

<!-- Utilisation de la balise <button> avec l'attribut `form` 
pour la validation à l'extérieur du formulaire -->
<button form="myForm">Valider le formulaire</button>
```

On peut remarquer dans ce dernier exemple la répétition de certaines valeurs d'attributs. 
Regardons le champ **Email**. On y trouve les attributs suivants :
- `type="email"` : permet d'indiquer au navigateur que l'utilisateur doit saisir du texte au format **xxxx@xxx.xx**. Sur mobile, un clavier adapté contenant le caractère **@** sera automatiquement utilisable. Un contrôle sur la validité de la saisie sera également effectué avant la soumission.
- `id="email"` : permet de relier le champ au `<label>` associé.
- `name="email"` : permettra de récupérer côté serveur la valeur saisie. On en reparlera dans une prochaine quête.