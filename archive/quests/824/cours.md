## Objectifs

- Comprendre comment exécuter une requête SQL SELECT en JavaScript.
- Structurer ton code sous la forme d'un **Repository** pour communiquer avec la base de données.


## Pré-requis

````stepper
# Valider les quêtes suivantes
```quests
592, 1320
```
# Être à l'aise avec la syntaxe SQL
```sql
CREATE DATABASE hogwarts;
USE hogwarts;

CREATE TABLE wizard(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL
);

SELECT * FROM wizard;
```
# Avoir compris le concept de classe en JavaScript
```javascript
class Character {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
}

class Enemy extends Character {
  constructor(name, level, emoji, attackName) {
    super(name, level);

    this.emoji = emoji;
    this.attackName =  attackName;  
    this.enemy = true;
  }

  attack() {
    return `${this.name} ${this.attackName} you!`;
  }
}

const spider = new Enemy("Spider", 1, "🕷", "bites");
console.log(spider.attack());
```
````

## Sommaire

## Introduction

Dans les épisodes précédents, tu as créé des premières routes dans ton application serveur, et mis en place ta base de données. Dans cette quête, nous construirons un objet Repository pour interagir avec la base de données.

Nous commencerons par voir comment exécuter une requête SQL SELECT en JavaScript dans un bac à sable.

Tu verras ensuite comment organiser ton code sous la forme d'un **modèle** orienté objet : le **Repository**.

## Exécuter une requête SQL SELECT en JavaScript

Pour exécuter une requête SQL SELECT en JavaScript, tu vas utiliser le package `mysql2` pour communiquer avec ta base de données MySQL. Tu peux réutiliser le "bac à sable" que tu as créé dans la quête précédente, ou en créer un nouveau.

Ton objectif dans ce bac à sable est d'envoyer la requête `SELECT * FROM category` à ton serveur MySQL, pour ta base de données `wildseries`.

```xtext callout
Pour rappel, tu peux trouver toutes les informations sur le package `mysql2` et notamment des exemples de requêtes SELECT dans la [documentation officielle](https://sidorares.github.io/node-mysql2/docs/examples/queries/simple-queries/select). Si tu préfères continuer avec la quête, tu peux ignorer cette suggestion et passer à la suite.
```

### Créer un nouveau bac à sable

Si tu veux créer un nouveau bac à sable, ouvre un terminal et crée un nouveau dossier. Ensuite, initialise un nouveau projet Node en utilisant la commande `npm init` :

```bash
mkdir mysql-sandbox
cd mysql-sandbox
npm init -y
```

```alert-warning
Pense à préciser `"type": "module"` dans ton fichier `package.json`.
```

Installe la dépendance `mysql2` pour communiquer avec ton serveur de base de données MySQL :

```bash
npm install mysql2
```

Crée maintenant un fichier `index.js` pour contenir ton code : nous allons le compléter ensemble dans la partie suivante.

### Accéder aux données

Voici le code que j'ai utilisé dans mon fichier `index.js` (avec les bonnes variables d'environnement que je vais te détailler ensuite) :

```javascript
import "dotenv/config";

import mysql from "mysql2/promise";

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const accessData = async () => {
  try {
    // Create a connection pool to the database
    const databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    // Access data
    const results = await databaseClient.query("SELECT * FROM category");

    // Close the connection pool
    databaseClient.end();

    console.info(results);
  } catch (err) {
    console.error("Error accessing the database:", err.message, err.stack);
  }
};

// Run the accessData function
accessData();
```

Prends le temps de comprendre chaque étape de ce code.

Avant de pouvoir exécuter des requêtes SQL, tu dois établir une connexion avec la base de données à l'aide de `mysql2` :

```javascript hl[1,6,11:17]
import "dotenv/config";

import mysql from "mysql2/promise";

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const accessData = async () => {
  try {
    // Create a connection pool to the database
    const databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    // Access data
    const results = await databaseClient.query("SELECT * FROM category");

    // Close the connection pool
    databaseClient.end();

    console.info(results);
  } catch (err) {
    console.error("Error accessing the database:", err.message, err.stack);
  }
};

// Run the accessData function
accessData();
```

```xtext callout
Pourquoi `mysql.createPool` au lieu de `mysql.createConnection` ?

Une connexion créée avec `mysql.createConnection` ne reste pas ouverte indéfiniment : elle se ferme automatiquement au bout d'un certain temps. Sur un projet réel déployé, tu ne peux pas perdre l'accès à ta base de données quelques heures après avoir démarré ton serveur !

La méthode `mysql.createPool` crée un _pool_ de connexions : ce pool gère la création de nouvelles connexions si les précédentes sont périmées. Ce système permet également de recycler les connexions encore ouvertes pour des questions de performance. En dehors de la ligne de création, cela ne change absolument rien au code que tu as déjà vu pour faire des requêtes SQL.

Tu peux regarder [cet article (en anglais)](https://www.prisma.io/dataguide/database-tools/connection-pooling) si tu veux en savoir plus sur le "connection pooling".
```

Dans cet exemple, tu peux voir que l'hôte, le port et le nom de la base de données sont également gérés avec des variables d'environnement pour plus de flexibilité. Cela implique que tu crées un fichier `.env` à côté de ton fichier `index.js` sur ce modèle :

```ini
DB_HOST=localhost
DB_PORT=3306
DB_USER=YOUR_DATABASE_USERNAME # Ton nom d'utilisateur MySQL
DB_PASSWORD=YOUR_DATABASE_PASSWORD # Ton mot de passe MySQL 
DB_NAME=wildseries # Le nom de la base de données que tu va utiliser
```

````alert-warning
Si ce n'est pas déjà fait, installe `dotenv` dans les dépendances de ton sandbox avec la commande :

```bash
npm install dotenv
```
````

La suite correspond à ce que tu as déjà vu : utiliser la méthode `query` pour envoyer une requête SQL au serveur de base de données. Ici, nous récupérons le contenu de la table `category` avec la requête `SELECT * FROM category` :

```javascript hl[20,25]
import "dotenv/config";

import mysql from "mysql2/promise";

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const accessData = async () => {
  try {
    // Create a connection pool to the database
    const databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    // Access data
    const results = await databaseClient.query("SELECT * FROM category");

    // Close the connection pool
    databaseClient.end();

    console.info(results);
  } catch (err) {
    console.error("Error accessing the database:", err.message, err.stack);
  }
};

// Run the accessData function
accessData();
```

Si tu exécutes ce script avec la commande :

```bash
node index.js
```

Tu devrais voir dans ton terminal quelque chose qui ressemble à ça :

```bash
[
  [ { id: 1, name: 'Comédie' }, { id: 2, name: 'Science-Fiction' } ],
  [
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE_KEY
  ]
]
```

Regardons ça ensemble :

```bash hl[1,7]
[
  [ { id: 1, name: 'Comédie' }, { id: 2, name: 'Science-Fiction' } ],
  [
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE_KEY
  ]
]
```

Les crochets t'indiquent que ton `console.info(results)` affiche un tableau. Ce tableau contient 2 éléments séparés par une virgule. Le premier est un tableau avec des données :

```bash hl[2]
[
  [ { id: 1, name: 'Comédie' }, { id: 2, name: 'Science-Fiction' } ],
  [
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE_KEY
  ]
]
```

En fait, seul ce tableau en deuxième ligne t'intéresse : il représente les lignes de la table `category` récupérées avec ta requête `SELECT`. Le reste du résultat sont des métadonnées liées à l'exécution de la requête SQL. Modifie `index.js` pour extraire ce tableau de lignes :

```javascript hl[20,25]
import "dotenv/config";

import mysql from "mysql2/promise";

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const accessData = async () => {
  try {
    // Create a connection pool to the database
    const databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    // Access data
    const [rows] = await databaseClient.query("SELECT * FROM category");

    // Close the connection pool
    databaseClient.end();

    console.info(rows);
  } catch (err) {
    console.error("Error accessing the database:", err.message, err.stack);
  }
};

// Run the accessData function
accessData();
```

```xtext callout
Tu vois maintenant les outils dont tu as besoin pour accéder à tes données en JavaScript : **un client** connecté à ta base de données et **ta requête SQL**.

Teste toujours tes outils avec des affichages dans la console pour **voir et comprendre** les données que tu récupères.
```

## Ton premier Repository

Maintenant que nous avons vu comment exécuter une requête SQL SELECT en JavaScript, nous allons aborder la structuration du code sous la forme d'un Repository.

```xtext callout
Le _Repository_ est une forme spéciale d'un **patron de conception (design patterns**) : la _façade_.

Une façade est une structure qui fournit une interface simplifiée d'un outil, en "masquant" la complexité de son utilisation.

Si tu veux approfondir tes connaissances sur les "design patterns", le site [refactoring.guru](https://refactoring.guru/design-patterns) est une excellente ressource. Plus particulièrement, un [catalogue complet](https://refactoring.guru/design-patterns/catalog) détaille chaque patron en utilisant une analogie du monde réel.
```

```xtext story
Lorsque tu appelles un magasin pour passer une commande téléphonique, l'opérateur est ta façade vers tous les services et départements du magasin. L'opérateur te fournit une interface vocale simple avec le système de commande, les passerelles de paiement et divers services de livraison.

[Facade, Real-World Analogy](https://refactoring.guru/design-patterns/facade#analogy)
```

### Construction pas à pas

Dans une architecture MVC (Modèle-Vue-Contrôleur), les repositories sont responsables de l'accès aux données, que ce soit avec une base de données, une API... Ils encapsulent la logique d'accès aux données et fournissent une interface propre pour interagir avec elles.

Pour construire cette "capsule", commence par identifier les actions clés de ton code. Pour accéder à ta base de données, tu as réalisé 3 actions principales : te connecter, envoyer une requête et fermer ta connexion. Tu peux voir ces actions dans les 3 blocs mis en surbrillance ici :

```javascript hl[10:17,21:22,28:29]
import "dotenv/config";

import mysql from "mysql2/promise";

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class CategoryRepository {
  constructor() {
    // Create a connection pool to the database
    this.databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }

  async readAll() {
    // Access data
    const [rows] = await this.databaseClient.query("SELECT * FROM category");

    return rows;
  }

  close() {
    // Close the connection pool
    this.databaseClient.end();
  }
}
```

```xtext story
Pourquoi 3 et pas une seule action "accéder aux données" ? Comment décider du découpage de ton code ?

Il n'y a malheureusement pas de réponse universelle à cette question. Mais le "bon" découpage vient avec la "mauvaise" pratique : c'est en faisant que tu feras mal, et en faisant mal que tu construiras ton expertise de ce qui est bien (et qu'il n'y a jamais qu'une seule bonne solution).

Pour cette fois, tu peux me faire confiance : c'est un bon découpage 🙂
```

Pour encapsuler ces actions, tu dois stocker ce code : stocker du code est le rôle des fonctions.  Commençons donc par encapsuler ces 3 blocs de code dans des fonctions :

```javascript hl[9:18,20:25,27:30]
import "dotenv/config";

import mysql from "mysql2/promise";

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class CategoryRepository {
  constructor() {
    // Create a connection pool to the database
    this.databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }

  async readAll() {
    // Access data
    const [rows] = await this.databaseClient.query("SELECT * FROM category");

    return rows;
  }

  close() {
    // Close the connection pool
    this.databaseClient.end();
  }
}
```

J'ai choisi les noms `readAll` et `close` arbitrairement en suivant mon inspiration. Avec tout de même une intention forte : que le nom de chaque fonction représente ce qu'elle fait dans le contexte de l'accès aux données des catégories.

Tu dois maintenant représenter ce contexte en encapsulant ces fonctions dans une classe :

```javascript hl[8,31]
import "dotenv/config";

import mysql from "mysql2/promise";

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class CategoryRepository {
  constructor() {
    // Create a connection pool to the database
    this.databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }

  async readAll() {
    // Access data
    const [rows] = await this.databaseClient.query("SELECT * FROM category");

    return rows;
  }

  close() {
    // Close the connection pool
    this.databaseClient.end();
  }
}
```

Voici le code complet dans toute sa lumière, que tu peux intègrer dans ton fichier `index.js` :

```javascript
import "dotenv/config";

import mysql from "mysql2/promise";

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class CategoryRepository {
  constructor() {
    // Create a connection pool to the database
    this.databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }

  async readAll() {
    // Access data
    const [rows] = await this.databaseClient.query("SELECT * FROM category");

    return rows;
  }

  close() {
    // Close the connection pool
    this.databaseClient.end();
  }
}
```

```xtext callout
Pour parler d'une fonction dans une classe, tu peux parler d'une _méthode_. Le mot-clé `this` représente l'instance d'un objet créé avec la classe `CategoryRepository` : dit autrement, `this` permet à des méthodes de "partager" des variables. C'est le cas de `this.databaseClient` par exemple, qui est partagé entre les méthodes `constructor`, `readAll` et `close`.
```

Ton premier _repository_ est prêt à être utilisé. Mets à jour la fonction `accessData` dans ton fichier `index.js` :

* Instancie un objet `CategoryRepository` avec le mot-clé `new`.
* Appelle la méthode `readAll` sur ton objet et affiche le résultat.
* Ferme ton repository. 

Tu obtiendras ce genre de code :

```javascript
import "dotenv/config";

import mysql from "mysql2/promise";

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class CategoryRepository {
  /* ... */
}

const accessData = async () => {
  try {
    const categoryRepository = new CategoryRepository();

    const categories = await categoryRepository.readAll();

    categoryRepository.close();

    console.info(categories);
  } catch (err) {
    console.error("Error accessing the database:", err.message, err.stack);
  }
};

// Run the accessData function
accessData();
```

```xtext callout
Tu peux voir que dans le code de la fonction `accessData`, plus rien n'indique que les catégories sont récupérées depuis une base de données : elles pourraient venir d'une API externe, être importées depuis un fichier... Seul ton repository sait _comment_ il accède aux données. Depuis l'extérieur de la "capsule", nous ne voyons plus les détails internes : ces détails sont contenus dans la classe et notre code exprime ce qu'il fait, le _quoi_ plutôt que le comment.
```

### Et dans le Monorepo ?

Tu peux construire des repositories efficacement dans les modules. Regarde l'exemple dans le fichier `itemRepository.ts` du dossier `server/src/modules/item`. Avec un éclairage bien choisi, tu retrouveras une classe et surtout une méthode `readAll` proche de ton premier Repository :

```typescript hl[11,38:44]
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Item = {
  id: number;
  title: string;
  user_id: number;
};

class ItemRepository {
  // The C of CRUD - Create operation

  async create(item: Omit<Item, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into item (title, user_id) values (?, ?)",
      [item.title, item.user_id],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from item where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Item;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from item");

    // Return the array of items
    return rows as Item[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new ItemRepository();
```

Les seules vraies différences sont le `<Rows>` derrière le mot `query` et le `as Item[]` derrière le `return rows` : ce sont des indications de typage pour TypeScript. Les types sont visibles au début du fichier :

```typescript hl[3:9,16,19]
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Item = {
  id: number;
  title: string;
  user_id: number;
};

class ItemRepository {
  // ...

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from item");

    // Return the array of items
    return rows as Item[];
  }

  // ...
}

export default new ItemRepository();
```

```xtext arrow
La méthode `query` de `mysql2` (et oui, c'est bien elle sous le capot) te permet d'envoyer à ton serveur de base de données des requêtes de type `select` : ces requêtes te permettent de sélectionner des _lignes_ d'une table (des `Rows` en anglais).

Tu utiliseras la même méthode `query` avec les autres types de requêtes SQL : `insert`, `update` et `delete`. Ces requêtes ne sélectionneront pas des lignes dans tes tables, mais appliqueront des actions pour les modifier : pour ces requêtes, `query` te retournera un genre de "compte-rendu" de ces actions. C'est le type `Result` que tu vois importé ici à côté de `Rows`.

TypeScript ne peut pas deviner le type de ta requête à partir de la chaine de caractères en paramètre : `select` ou pas, ce sera toujours une chaine de caractères. La syntaxe `query<Rows>` te permet de préciser à TypeScript que tu veux envoyer une requête pour obtenir des lignes (bref, faire un `select`).
```

Dans le même genre, le package `mysql2` ne connait pas la structure de tes tables. Il sait qu'il te retourne un tableau d'objet, mais sans plus de détails. Pour aider TypeScript, l'assertion de type `as Item[]` nous permet de lui donner les détails manquants.

Une fois défini le `type Item`, tu peux l'utiliser pour expliciter le type des données récupérées avec `query` avant de les envoyer vers l'extérieur avec l'instruction `return`. Pour la méthode `readAll`, tu retournes un tableau d'items : `Item[]`.

```xtext story
Ok 😀

Mais... la classe `ItemRepository` n'a pas de constructeur ni de "close" de la connexion à la base de données ?

Le constructeur de ton premier Repository créait le pool de connexions : dans le Monorepo, cette partie est centralisée dans son propre "module". Tu peux suivre le fil du fichier `server/database/client.ts` : il créé effectivement le pool de connexions utilisé dans tout ton projet. Ce fichier exporte aussi les types `Result` et `Rows` du package `mysql2`.
```

Tu as la classe ItemRepository, mais tu dois encore créer un objet avec le mot-clé `new` avant de pouvoir profiter de son `readAll`. Dans nos choix de conception, cette étape est intégrée à l'export du fichier :

```typescript hl[25]
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Item = {
  id: number;
  title: string;
  user_id: number;
};

class ItemRepository {
  // ...

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from item");

    // Return the array of items
    return rows as Item[];
  }

  // ...
}

export default new ItemRepository();
```

De cette façon, tu peux importer une instance utilisable immédiatement pour tes actions. Par exemple, dans `server/src/modules/item/itemActions.ts` :

```typescript
// Import access to data
import itemRepository from "./itemRepository";
```

---

```alert-warning
Tu vas faire une série de modifications à travers plusieurs fichiers dans ton projet Wild Series. Prends une pause si tu en as besoin pour récupérer toute ta concentration.

Les étapes qui vont suivre vont te permettre de **lier ton code Express à ta base de données**.
```

Crée un fichier `categoryRepository.ts` dans ton dossier `server/src/modules/category` avec un code similaire à `itemRepository.ts`, mais pour la table `category` :

```typescript
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    const [rows] = await databaseClient.query<Rows>("select * from category");

    // Return the array of categories
    return rows as Category[];
  }
}

export default new CategoryRepository();
```

Tu peux maintenant utiliser ton Repository dans tes actions. Modifie ton fichier `categoryActions.ts` dans `server/src/modules/category` comme suit :

```diff
+// Import access to data
+import categoryRepository from "./categoryRepository";

// Some data to make the trick

const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

// Declare the actions

import type { RequestHandler } from "express";

-const browse: RequestHandler = (req, res) => {
-  res.json(categories);
-};
+const browse: RequestHandler = async (req, res) => {
+  const categoriesFromDB = await categoryRepository.readAll();
+
+  res.json(categoriesFromDB);
+};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);

  const category = categories.find((p) => p.id === parsedId);

  if (category != null) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};

// Export them to import them somewhere else

export default { browse, read };
```

```alert-info
Si ton serveur n'est pas déjà lancé, ouvre ton terminal, et lance la commande `npm run dev`.
```

Ouvre la page http://localhost:3310/api/categories : les catégories que tu voies sont celles contenues dans ta base de données.

## Récapitulatif

Pour fournir un accès à tes données dans ton projet, tu dois créer un repository :

* Déclare tes classes `Repository` dans tes modules.
* Exporte directement une instance de ta classe.

### La cathédrale complète

Avec cette étape, tu as parcouru l'ensemble de l'achitecture du dossier `server`, depuis le point d'entrée `main` jusqu'aux requêtes SQL envoyées par le `database/client` :

![](https://storage.googleapis.com/quest_editor_uploads/4W3QLnm7IZkivRmZeqmi3KnxUKt4jfCy.png)

## Challenge

Crée un repository pour accéder aux données de tes séries.

Voici les étapes que tu dois suivre pour créer ton repository :

* Sur le modèle de `CategoryRepository`, crée la classe `ProgramRepository` dans `server/src/modules/program` avec une méthode `readAll`.
* Utilise ton repository pour accéder aux séries de ta base de données dans l'action `browse` du fichier `server/src/modules/program/programActions.ts` :

  ```typescript
  const browse: RequestHandler = async (req, res) => {
    const programsFromDB = await programRepository.readAll();

    res.json(programsFromDB);
  };
  ```

Pousse ton projet sur GitHub, et partage le lien de ton dépôt pour valider ta quête.

### Critères de validation

- [ ] Le projet est disponible sur GitHub.
- [ ] L'action `browse` dans `server/src/modules/program/programActions.ts` accède aux données via un Repository.
- [ ] Quand tu clones et installe le projet, crées un fichier `server/.env` avec tes identifiants et lances la commande `npm run dev:server` : la page http://localhost:3310/api/programs affiche les séries de ta base de données.

````tabs files
!--- server/src/modules/program/programRepository.ts
```typescript
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

class ProgramRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all programs from the "program" table
    const [rows] = await databaseClient.query<Rows>("select * from program");

    // Return the array of programs
    return rows as Program[];
  }
}

export default new ProgramRepository();
```
!--- server/src/modules/program/programActions.ts
```typescript
// Import access to data
import programRepository from "./programRepository";

// Some data to make the trick

const programs = [
  {
    id: 1,
    title: "The Good Place",
    synopsis:
      "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    poster:
      "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    country: "USA",
    year: 2016,
  },
  {
    id: 2,
    title: "Dark",
    synopsis:
      "Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
    poster:
      "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
    country: "Allemagne",
    year: 2017,
  },
];

// Declare the actions

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();

  res.json(programsFromDB);
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);

  const program = programs.find((p) => p.id === parsedId);

  if (program != null) {
    res.json(program);
  } else {
    res.sendStatus(404);
  }
};

// Export them to import them somewhere else

export default { browse, read };
```
!--- server/src/modules/category/categoryRepository.ts
```typescript
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    const [rows] = await databaseClient.query<Rows>("select * from category");

    // Return the array of categories
    return rows as Category[];
  }
}

export default new CategoryRepository();
```
!--- server/src/modules/category/categoryActions.ts
```typescript
// Import access to data
import categoryRepository from "./categoryRepository";

// Some data to make the trick

const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

// Declare the actions

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res) => {
  const categoriesFromDB = await categoryRepository.readAll();

  res.json(categoriesFromDB);
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);

  const category = categories.find((p) => p.id === parsedId);

  if (category != null) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};

// Export them to import them somewhere else

export default { browse, read };
```
````