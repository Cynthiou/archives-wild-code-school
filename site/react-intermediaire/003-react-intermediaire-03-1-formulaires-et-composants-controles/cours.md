#### Introduction

Un site Web ou une application Web contient presque toujours des formulaires.

Dans cette quête, Tu vas d'abord avoir un aperçu du fonctionnement des formulaires dans une page HTML classique. Puis tu découvriras deux façons de gérer les champs de formulaire, en tant que "composants contrôlés" ou "composants non contrôlés".

Allons-y ! 🚀

#### 🤓 À la fin de cette quête, tu pourras :

✅ Observer le comportement d'un champ de saisie HTML et de son équivalent React.
✅ Comprendre les concepts de *composants non contrôlés* et *composants contrôlés*.

### 📋 Rappels sur les formulaires HTML

Dans un formulaire HTML classique, il est fréquent de spécifier certains *attributs* dans les champs `<input>`,`<select>`, `<textarea>`. Tu te souviens sans doute de l'attribut `id` qui permettait de lier le champ à un `<label>`.

En plus des attributs comme `type` et `placeholder`, *etc.*, il y a deux attributs qui ont une fonction spéciale : `name` et `value`.

Ces deux attributs sont utilisés ensemble lors de la soumission d'un formulaire. Nous approfondirons un peu plus ce sujet dans une quête ultérieure, mais en attendant, rappelle-toi que les données transmises à un serveur, lors de la soumission d'un formulaire, sont constituées de *paires clé-valeur*.

* L'attribut `name` permet de spécifier la clé. Cette clé permettra au serveur traitant le formulaire de faire la distinction entre les différents champs.
* L'attribut `value` correspond à la valeur associée.

Regarde l'exemple suivant : il affiche un formulaire très simple en HTML. Une valeur initiale est fournie via l'attribut `value` mais tu peux modifier cette valeur : c'est un comportement normal en HTML. Garde cela à l'esprit pour la section suivante !

```js render
!---index.html
<form>
  <label for="character">Character:</label>
  <input id="character" name="character" value="Homer" />
</form>
!--- index.js
console.log("go to index.html");
```

### ✍️ Champs de formulaire dans React

Avant de plonger dans les détails des champs contrôlés et non contrôlés, regarde le code suivant, qui montre un exemple de chacun.

```jsx render
export default function App() {
  return (
    <form>
      <input name="uncontrolled" placeholder="I can be changed" />
      <input name="controlled" value="I CANT'T be changed" />
    </form>
  );
}
```

Regarde ce qui se passe lorsque tu essaies de les modifier :

* l'entrée dont le `name` est `non contrôlé` n'a pas d'attribut `value` et peut être modifiée librement
* l'entrée dont le `name` est `contrôlé` a un attribut `value` et ne peut pas être modifié

Il existe donc une différence fondamentale entre la manière dont les champs sont traités en HTML ou avec React :

* En HTML, l'utilisateur peut modifier le champ, que l'attribut `value` soit défini ou non.
* Avec React, le champ ne peut être modifié que si aucun attribut `value` ne lui est donné.

Tu comprendras pourquoi dans les étapes suivantes !

### Champ non contrôlé

Le code ci-dessous montre l'équivalent React du formulaire HTML de la première étape. Nous avons ajouté un code de gestion d'événement.

Note qu'aucun attribut `value` n'a été défini dans le champ `<input>`. Dans la terminologie de React, nous appelons cela un champ ou un composant *non contrôlé*.

```jsx console
function App() {
  return (
    <form className="QuoteForm">
      <label htmlFor="character">Character:</label>
      <input
        id="character"
        name="character"
        type="text"
        onChange={(event) => {
          const input = event.target;
          console.log("NAME:", input.name, "VALUE:", input.value);
        }}
      />
    </form>
  );
}

export default App;
```

Saisis des caractères dans le champ `<input>`, en gardant la console ouverte pour voir ce qui se passe.

**💡Quelques points notables**

* Pour la même raison que nous utilisons `className` à la place de `class`, nous utilisons `htmlFor` au lieu de `for` sur le `<label>` `for` est un mot-clé réservé en JavaScript.
* **L'utilisation de** `onChange` qui permet de détecter la saisie de l'utilisateur (événement `change` sur l'input). C'est l'écouteur d'événement associé à `onChange` qui est responsable de l'affichage que tu voies dans la console.
* `event.target` dans l'écouteur d'événement de `onChange` est l'élément de la page sur laquelle l'événement s'est produit : le champ `<input>`.
* La console affiche les attributs du champ <input> : `name` (qui ne change pas) et `value` (qui varie au fur et à mesure de la saisie).
* **Parce qu'il n'y a pas d'attribut `value`** défini sur le champ `character`, la valeur affichée dans le champ est celle saisie par l'utilisateur.

> Dans les composants non contrôlés, les données sont gérées par le DOM lui-même

En d'autres termes, les *champs non contrôlés* gèrent leur propre valeur, sans que React n'interfère. De ce point de vue, ils sont très similaires aux champs de formulaire HTML classiques.

#### Limitations des composants non contrôlés

L'un des points importants mentionnés dans la quête précédente est que **React rafraîchit l'affichage d'un composant lorsque son `state` change**.

Le composant non contrôlé ci-dessus pose ce problème : la valeur n'est pas stockée au niveau du state. Il n'est donc pas possible pour React de mettre à jour l'interface, ce qui serait utile en termes d'UX.

Il est utile que les problèmes soient signalés au fur et à mesure qu'ils surviennent, plutôt que d'attendre que le formulaire ait été soumis ! Afin d'obtenir la même chose avec React, nous utiliserions le "rendu conditionnel", pour afficher des marqueurs visuels, selon que l'entrée est correcte ou non.

Cela ne peut être fait "proprement" qu'en stockant les valeurs saisies dans l'`état` du composant. Alors qu'il serait possible d'accéder aux champs de saisie d'un formulaire directement via le DOM, via `document.getElementById` ou `getElementsByTagName`, puis leur attribut `value`, ce faisant, nous nous éloignerions de la façon "normale" et idiomatique de faire les choses dans React.

Alors, pourquoi les utiliser ? Une réponse est donnée dans la ressource :

> Ce n'est pas la bonne façon de manipuler les formulaires. C'est surtout utile pour les formulaires simples ou lorsque tu viens d'apprendre React.

En effet, de nombreux tutoriels (écrits ou vidéo) destinés aux débutants font la démonstration de composants non contrôlés. **Même pour apprendre** nous déconseillons leur utilisation : il nous semble plus important de pratiquer la manipulation de state *dès le tout début* de ton apprentissage de React.

Si on te les montre quand même, c'est pour faciliter la compréhension des composants *contrôlés*, en comparant les deux approches !

### Champ contrôlé

> Un champ `input` est dit *contrôlé* lorsque la valeur de son attribut `value` est fournie par le composant qui l'affiche : généralement, cette valeur provient du `state` du composant.

### Injecter une valeur dans le champ `input`

Prenons l'exemple ci-dessus ; ajoute un attribut `value="Homer"` dans le champ `input` puis observe ce qui se passe, à la fois sur l'écran et dans la console.

Deux remarques :

* La valeur affichée ne change pas dans le champ `input`.
* Quel que soit le nombre de saisies effectuées, la console affiche toujours *au plus* un caractère de différence par rapport à la valeur d'origine.

Ici, la valeur du champ de saisie est "forcée" par l'attribut `value`. C'est le comportement spécifique à React qui a été mentionné ci-dessus et qui le distingue du HTML : React **contrôle** la valeur du champ via l'attribut `value`.

Dans la quête suivante, tu commenceras à voir comment définir l'attribut `value` sur une valeur dynamique.

```quiz
true|||true|||false
# Dans une application React, quel attribut contrôle ton entrée ?
[x] value
[] key
[] type
[] id
# Dans un champ de saisie HTML, l'utilisateur a toujours la possibilité de modifier le champ, avec ou sans l'attribut value :
[x] vrai
[] faux
# Dans un champ non contrôlé, la valeur ajoutée par l'utilisateur est stockée dans l'état du composant :
[] vrai
[x] faux
# Lorsque l'entrée de l'utilisateur est stockée dans le state, ceci va :
[x] déclencher un nouveau rendu du composant
[] passer les props au composant parent
[] effacer toutes les valeurs du state
[] en faire un champ non contrôlé
# Dans un champ contrôlé, l'attribut value doit être présent :
[x] vrai
[] faux
```