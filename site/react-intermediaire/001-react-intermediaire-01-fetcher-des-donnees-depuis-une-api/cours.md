## Objectifs

* Développer une application pour afficher des informations sur les employés d'une entreprise.
* Récupérer les données des employés via une API avec fetch.
* Afficher les données dans une application.

## Introduction

Dans cette quête, nous allons voir comment nous pouvons utiliser des informations provenant d'une API dans notre application React. Jusqu'à présent, nous avons utilisé des données "codées en dur" pour apprendre les bases de React. Avec une API, nous aurons accès à des données réelles ! 

Dans cette quête, tu verras comment injecter des données récupérées d'une API dans des composants React !

**C'est parti !** 🚀

![](images/001-introduction.avif)

## Sommaire

## Affichage d'un employé

Commence par créer une nouvelle application React, que tu peux nommer `fetch-employees`.

### Affichage des données d'un employé

Créé un composant `EmployeeCard` dans ton application. Le but de ce composant est uniquement d'afficher des choses :

```jsx
// src/components/EmployeeCard.tsx
interface EmployeeCardProps {
  employee: {
    name: {
      first: string;
      last: string;
    };
    email: string;
    picture: {
      medium: string;
    };
  };
}
 
function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <figure className='DisplayEmployee'>
      <img src={employee.picture.medium} alt={employee.name.first} />
      <figcaption>
        <strong>{employee.name.first} {employee.name.last}</strong>
        {employee.email}
      </figcaption>
    </figure>
  );
}

export default EmployeeCard;
```

Ce composant sera appelé depuis `App` comme suit : `<EmployeeCard employee={sampleEmployee} />`. Il recevra donc *une* prop : `employee`. La syntaxe `{ key1, key2, key3 }` dans les parenthèses d'une fonction peut s'appliquer lorsque tu sais :

* que le paramètre de la fonction (dans ce cas `props`) est un objet,
* et qu'il contient les clés `key1`, `key2`, `key3`.

Dans ce cas, nous savons que `props` contient une seule clé `employee`, donc nous pouvons *déstructurer* les props. `employee` a la valeur qui aurait normalement été écrite comme `props.employee`. Tu trouveras un autre exemple dans la ressource suivante, dans la section [Extracting values from a configuration object](https://simonsmith.io/destructuring-objects-as-function-parameters-in-es6#extracting-values-from-a-configuration-object). Cet exemple réduit les répétitions dans le JSX/TSX.

### Intégration du composant dans l'application

Dans le fichier `App.tsx`, commence par importer le composant `EmployeeCard` :

```javascript
import EmployeeCard from './components/EmployeeCard';
```

### Ajout de données de test

Maintenant, tu as besoin d'un employé "test" pour voir si ton premier composant s'affiche correctement ! Déclare un objet employé (insère le code sous les lignes d'importation que tu viens d'ajouter) :

```javascript
const sampleEmployee = {
  name: {
    first: "Charlie",
    last: "Thompson",
  },
  email: "charlie.thompson@example.com",
  picture: {
    medium: "https://randomuser.me/api/portraits/med/men/40.jpg",
  },
};
```

Enfin, après avoir supprimé le JSX inutile retourné par `App`, appelle `EmployeeCard` en passant l'employé fictif :

```jsx
<EmployeeCard employee={sampleEmployee} />
```

Maintenant, tu peux vérifier que l'affichage est correct dans ton navigateur.

```resource
https://simonsmith.io/destructuring-objects-as-function-parameters-in-es6#extracting-values-from-a-configuration-object
# Extraction des valeurs d'un objet de configuration
Plus d'informations sur la déstructuration
```

```resource
https://wesbos.com/destructuring-objects/
# Une introduction très simple à la déstructuration des objets JavaScript
```

## Stocker des données récupérées à partir d'une API

Nous voulons consommer une API pour obtenir les données d'un employé, au lieu des données factices de `sampleEmployee`. Le terme "consommer" signifie utiliser ou demander une API.

L'API que tu vas utiliser est [Random User](https://randomuser.me/) qui génère des profils aléatoires très pratiques à des fins de test.

Après avoir visité la page d'accueil, qui pointe vers la documentation, colle l'URL suivante dans ton navigateur : https://randomuser.me/api?nat=en. Il s'agit de l'URL que tu vas demander. Elle renvoie des données au format JSON.

Pour récupérer ces données avec du code, tu peux utiliser `fetch` fourni nativement par les navigateurs, ou une bibliothèque tierce telle que Axios.

### Où les données seront-elles stockées ?

Les données dynamiques d'une application sont stockées dans l'état d'un composant, ou réparties dans les états respectifs de plusieurs composants. Ici, nous n'avons qu'une seule variable (l'objet représentant un employé), mais deux composants : `App` et `EmployeeCard`. Dans lequel d'entre eux devons-nous stocker les données ?

La façon d'appeler `EmployeeCard` depuis `App` te donne un indice : `employee` est transmis à `EmployeeCard` via des props, depuis `App`. Ainsi, les données de l'employé seront stockées dans l'état de `App`. `EmployeeCard` doit rester un "dumb component", c'est à dire que son seul but est d'afficher les données qui lui sont fournies.

Cet exemple "simple" est représentatif de la manière dont les informations circulent dans une application React : de haut en bas. Nous parlons d'un flux de données unidirectionnel, comme l'explique [cette ressource](https://flaviocopes.com/react-unidirectional-data-flow/).

Le composant "parent" effectue les appels d'API et transmet les informations reçues au(x) composant(s) "enfant(s)".

> Essaie de le faire toi-même, ou vérifie la solution donnée à l'étape suivante si tu bloques.

### Consommation d'une API avec React

Le composant `App` dans lequel nous avons supprimé (presque) tout le JSX retourné peut maintenant initialiser l'état :

```jsx
function App() {
  const [employee, setEmployee] = useState(sampleEmployee);

  return (
    <div className='App'>
      <EmployeeCard employee={sampleEmployee} />
    </div>
  );
}
```

Nous aurions pu donner une valeur de `null` à `employee` comme valeur initiale à l'état. Cela aurait signifié qu'au début de l'application, les données n'auraient pas encore été disponibles. Ici, le fait d'avoir conservé `sampleEmployee` permet de toujours afficher un employé, même si un appel d'API n'a pas encore été effectué.

### Passer la valeur depuis le state comme props

Maintenant que nous avons initialisé le state avec une valeur `employee`, nous allons passer ce state à `EmployeeCard` au lieu de `sampleEmployee`. A ce stade, cela ne changera rien à l'affichage :

```jsx
<EmployeeCard employee={employee} />
```

### Ajout d'un bouton pour envoyer la demande d'API

Dans `App`, sous `EmployeeCard`, ajoute ce bouton, qui déclenchera une requête lorsqu'il sera cliqué :

```jsx
<button type="button" onClick={getEmployee}>Get employee</button>
```

Note que la valeur de `onClick` est une fonction (dont le nom est `getEmployee`) qui n'existe pas encore : tu vas corriger cela dès maintenant.

### Création de la fonction

Dans le composant `App`, tu dois maintenant écrire la fonction `getEmployee`, qui fera l'appel à l'API Random User. Pour effectuer cet appel, tu peux utiliser `fetch`. Dans `App`, écris la fonction avant le retour JSX :

```javascript
const getEmployee = () => {
  // Send the request
  fetch("https://randomuser.me/api?nat=en")
    .then((response) => response.json())
    .then((data) => {
      setEmployee(data.results[0]);
    });
};
```

L'application devrait alors être fonctionnelle ! L'affichage peut ne pas être mis à jour immédiatement : ceci est dû au temps de latence, entre le moment où `fetch` émet une *requête* à l'API, et le moment où il reçoit sa *réponse*.

Quelques explications :

* Les `.then` permettent de spécifier, entre parenthèses, ce qui doit être fait **après avoir reçu les données demandées**, grâce à une **fonction de rappel** (souvent sous forme de fonction fléchée" pour un code plus concis).
* La `response` est un objet contenant plusieurs méthodes pour extraire les données : parmi elles, nous utilisons `.json()`.
* Les `data` seront alors disponibles. La valeur de `employee` est alors remplacée dans l'état par `data.results[0]`.

Ce `data.results[0]` est digne d'attention : l'étape suivante montre le lien entre la *structure* des données reçues, et l'extraction des informations nécessaires dans notre code.

### Extraction des données pertinentes dans la réponse

Comprendre *comment les données circulent dans une application* est l'un des aspects les plus difficiles dans du code, surtout lorsque tu es encore en apprentissage.

Tu dois visualiser la structure des `data` qui parviennent à l'application dans le dernier `.then`. Dans un cas comme celui-ci, n'hésite pas :

* À ajouter un `console.log(data);` juste avant `setEmployee` pour inspecter la forme des données reçues.
* À utiliser l'onglet *Network* dans les outils de développement du navigateur.

L'objet reçu est très grand, et contient beaucoup de données imbriquées ! Mais il ressemble étrangement à notre faux employé `sampleEmployee`, avec des données supplémentaires !

Si tu regardes la structure globale, l'objet reçu (`data`) n'a que deux clés : `info` et `results` ; la dernière est un *tableau* qui peut contenir *plusieurs* éléments (l'API est configurable et permet de récupérer plusieurs faux utilisateurs). Comme tu l'as vu ci-dessus, l'élément est récupéré à l'index 0 de ce tableau avec `data.results[0]`.

> Inspecter la **structure** des données reçues t'aidera à écrire le code pour les traiter : ici, nous extrayons les données des employés de `data.results[0]`. **Pour d'autres API, cela peut être différent!**

![](images/002-extraction-des-donnees-pertinentes-dans-la.gif)

```resource
https://randomuser.me/
# API
#api #randomize
```

```resource
https://randomuser.me/documentation
# API Doc
#documentation
```

## Challenge

Poste l'application complète et fonctionnelle à partir des étapes de la quête :

* Utilise l'API [Random User](https://randomuser.me/documentation). Tu devras utiliser un state dans ton application avec un profil copié initialement depuis l'API.
* L'application doit comprendre un bouton pour récupérer un profil depuis l'API.
* Fais attention à la *structure* des données reçues : reçois-tu un tableau ? Un objet ? Le code `data.results[0]` que nous avons utilisé précédemment devrait t'aider (pense à la destructuration) !
* Poste le lien vers un dépôt GitHub avec ton code en solution.

### Critères de validation

* [ ] L'application affiche un profil.
* [ ] Le prénom, le nom, la photo et l'adresse mail du profil sont affichés.
* [ ] Un bouton permet de charger un profil à partir de l'API.