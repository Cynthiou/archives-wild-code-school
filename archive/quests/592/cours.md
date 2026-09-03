## Objectifs

- Mettre en place ta base de données
- Automatiser des requêtes SQL avec un script JS

## Pré-requis

````stepper
# Valider les quêtes suivantes
```quests
484, 1024
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
# Avoir compris l'utilisation du module dotenv
```js
require("dotenv").config();


console.log(
  `I am ${process.env.MY_NAME}, wilder in ${process.env.MY_CITY}, and I love ${process.env.MY_LANGUAGE}`
);
```
````

## Sommaire

## Introduction

Dans les épisodes précédents, tu as exploré le système de routing du Monorepo, et isolé les actions associées à chaque route. Dans cette quête, nous allons explorer la mise en place de la base de données.

Nous allons commencer par revoir l'utilisation d'un client MySQL pour interagir avec une base de données.

Une fois ces rappels passés, tu verras comment automatiser la création et la reproduction de ta base de données en JavaScript. Cette automatisation est essentielle pour garantir l'efficacité et la cohérence du processus, surtout lorsque tu travailles en équipe.

Prêts à relever le défi ? Passons à la première partie : l'utilisation du client MySQL en ligne de commande.

## Le client de base de données

Dans cette première partie, nous revisiterons l'utilisation du client MySQL en ligne de commande (CLI) pour interagir avec un serveur de base de données MySQL. Avant de plonger dans les détails, tu dois bien comprendre la distinction entre un client de base de données et un serveur de base de données.

### Encore une architecture client-serveur

Le **serveur de base de données** est un logiciel qui **gère l'accès aux données et effectue les opérations** de stockage, de récupération et de gestion des données. Il est responsable de stocker et de gérer les bases de données, ainsi que **d'exécuter les requêtes SQL envoyées par les clients**. Par abus de langage, c'est lui que nous appelons couramment "la base de données".

Le **client de base de données** est une **interface logicielle** permettant aux utilisateurs d'interagir avec le serveur de base de données. Il permet **d'envoyer des requêtes SQL au serveur**, de récupérer les résultats et par l'intermédiaire du serveur de gérer les données. Les clients de base de données peuvent prendre différentes formes, notamment des interfaces en ligne de commande (comme MySQL CLI), des applications de bureau ou des applications web.

```xtext callout
Les **données** sont stockées **sur le serveur** de base de données. Un **client** de base de données comme MySQL CLI te permet d'**envoyer une requête SQL** à ton serveur de base de données pour qu'il te renvoie des données (par exemple des requêtes `SELECT`), ou qu'il les modifie (par exemple des requêtes `INSERT`, `UPDATE` ou `DELETE`).
```

### MySQL CLI

Ouvre un terminal, puis lance la commande `mysql` en remplaçant `NOMDETONUTILISATEUR` par le nom de ton utilisateur MySQL :

```sql hl[1:2]
❯ mysql -u NOMDETONUTILISATEUR -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 13
Server version: 8.1.0 Homebrew

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> CREATE DATABASE wildseries;
mysql> USE wildseries;
Database Changed
```

Pour rappel:

- `-u` permet de définir l'utilisateur de la base de données.
- `-p` permet d'afficher le champ invitant à saisir un mot de passe.

Tu viens de démarrer un client de base de données, connecté au serveur MySQL installé sur ta machine : le prompt attend maintenant une requête SQL à envoyer au serveur de base de données. Tape la requête suivante pour créer une nouvelle base de données `wildseries` :

```sql hl[15:15]
❯ mysql -u NOMDETONUTILISATEUR -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 13
Server version: 8.1.0 Homebrew

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> CREATE DATABASE wildseries;
Query OK, 1 row affected (0.00 sec)
mysql> USE wildseries;
Database Changed
```

````alert-info
Si l'opération s'est bien déroulée tu devrais voir un message similaire à celui-ci: 

```
Query OK, 1 row affected (0.00 sec)
```

**Dans le cas contraire**, vérifie que l'utilisateur avec lequel tu es connecté dispose des droits suffisants pour créer une base de données. **Demande également de l'aide** à ton formateur ou à ta formatrice.
````

Maintenant que ta base de données existe, tu dois prévenir ton client MySQL d'appliquer les commandes SQL suivantes sur ta base de données `wildseries`. C'est le rôle de la requête `USE` :

```sql hl[17:18]
❯ mysql -u NOMDETONUTILISATEUR -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 13
Server version: 8.1.0 Homebrew

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> CREATE DATABASE wildseries;
Query OK, 1 row affected (0.00 sec)
mysql> USE wildseries;
Database Changed
```

Tu peux maintenant taper une requête de création des tables :

```sql
mysql> CREATE TABLE program(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL
);
```

```alert-info
En phase de développement, tu peux **créer les tables sans déclarer la totalité des champs** : dans une démarche agile, tu devrais mettre en place le minimum de données nécessaire pour un MVP. Tu pourras compléter les tables à chaque incrément de ton projet.
```

À ce stade, tu pourrais taper des requêtes SQL sur ta table `program` (<spoiler>la table est vide, et la requête `SELECT` renverra 0 ligne</spoiler>) :

```sql
mysql> SELECT * FROM program;
Empty set (0,00 sec)
```

Tu en as fait assez pour atteindre un point critique : les commandes pour créer ta base de données n'existent que dans ton terminal, et ne sont pas efficacement transférables vers une autre machine.

```xtext story
Non, faire un copier/coller pour envoyer tes commandes à ton voisin par messagerie n'est pas une méthode efficace. Des générations d'élèves l'ont prouvé avant toi 😉
```

La bonne pratique est de **sauvegarder ces commandes dans un script** que tu pourras exécuter facilement sur n'importe quelle machine. Cela garantit la reproductibilité et la cohérence de ta base de données, peu importe où tu te trouves ou qui d'autre travaille sur le projet.

```alert-info
Dans la prochaine partie, nous aborderons précisément cette automatisation à l'aide de JavaScript. Mais avant cela, assure-toi de bien comprendre les concepts présentés jusqu'à présent. Si nécessaire, n'hésite pas à relire attentivement les exemples et à expérimenter avec le client MySQL CLI.
```

## Un client MySQL en JavaScript

Dans cette partie, nous aborderons l'automatisation du processus de création et de reproduction de notre base de données à l'aide de scripts Node.js. Cette approche nous permettra de rendre le processus plus efficace et reproductible, ce qui est particulièrement important lors du développement en équipe.

Pour faire tes tests dans un "bac à sable", initialise un nouveau projet Node. Ouvre un terminal et crée un nouveau dossier `mysql-sandbox`. Ensuite, initialise un nouveau projet Node en utilisant la commande `npm init` :

```bash
mkdir mysql-sandbox
cd mysql-sandbox
npm init -y
```

```alert-warning
Pense à préciser `"type": "module"` dans ton fichier `package.json`.
```

Maintenant que ton "sandbox" est initialisé, tu dois installer les dépendances nécessaires. Dans notre cas, nous aurons besoin du package `mysql2` pour communiquer avec notre serveur de base de données MySQL avec du code JavaScript. Installe ce package en utilisant la commande suivante :

```bash
npm install mysql2
```

Cela installera le package `mysql2` et l'ajoutera à la liste des dépendances de ton projet dans le fichier `package.json`.

```xtext callout
Pour plus d'informations sur le package mysql2 et ses fonctionnalités avancées, consulte la [documentation officielle](https://sidorares.github.io/node-mysql2/docs). Si tu préfères continuer avec la quête, tu peux ignorer cette suggestion et passer à la suite. 
```

Crée maintenant un fichier `index.js` pour automatiser la création de notre base de données et de nos tables. Voici un exemple de script que tu peux utiliser :

```javascript
import mysql from "mysql2/promise";

const createDB = async () => {
  try {
    // Create a specific connection to the database
    const database = await mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "NOMDETONUTILISATEUR", // Change this
      password: "MOTDEPASSEDETONUTILISATEUR", // Change this
    });

    // Create a new database with the specified name
    await database.query("CREATE DATABASE wildseries");

    // Switch to the newly created database
    await database.query("USE wildseries");

    // Execute the SQL statements to update the database schema
    await database.query(`CREATE TABLE program(
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      title VARCHAR(100) NOT NULL
    )`);

    // Close the database connection
    database.end();

    console.info("wildseries updated 🆙");
  } catch (err) {
    console.error("Error updating the database:", err.message, err.stack);
  }
};

// Run the createDB function
createDB();
```

Tu retrouves ici tout ce que tu as fait précédemment dans ton terminal :

* Te connecter au serveur avec `mysql.createConnection`.
* Les requêtes SQL `CREATE DATABASE`, `USE` et `CREATE TABLE` envoyées au serveur de base de données avec `databaseClient.query`.

Remplace bien `NOMDETONUTILISATEUR` et `MOTDEPASSEDETONUTILISATEUR` par tes noms et mot de passe. Une fois le script écrit, enregistre-le. Ensuite, tu peux exécuter le script en utilisant la commande suivante dans ton terminal :

```bash
node index.js
```

Et là, ça ne marche pas 😅

La base de données `wildseries` existe déjà. Tu as plusieurs options comme utiliser un `CREATE DATABASE IF NOT EXISTS`, mais de manière un peu barbare je te conseille d'effacer la base de données à chaque exécution du script en ajoutant un `DROP DATABASE` avant la création :

```javascript hl[13:14]
import mysql from "mysql2/promise";

const createDB = async () => {
  try {
    // Create a specific connection to the database
    const database = await mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "NOMDETONUTILISATEUR", // Change this
      password: "MOTDEPASSEDETONUTILISATEUR", // Change this
    });

    // Drop the existing database if it exists
    await database.query("DROP DATABASE IF EXISTS wildseries");

    // Create a new database with the specified name
    await database.query("CREATE DATABASE wildseries");

    // Switch to the newly created database
    await database.query("USE wildseries");

    // Execute the SQL statements to update the database schema
    await database.query(`CREATE TABLE program(
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      title VARCHAR(100) NOT NULL
    )`);

    // Close the database connection
    database.end();

    console.info("wildseries updated 🆙");
  } catch (err) {
    console.error("Error updating the database:", err.message, err.stack);
  }
};

// Run the createDB function
createDB();
```

Relance le script avec :

```bash
node index.js
```

Cette fois, le script devrait fonctionner (si ce n'est pas le cas, **demande de l'aide**). Et ce qui nous intéresse dans notre démarche : c'est un fichier que tu peux versionner avec Git, et partager efficacement avec d'autres personnes.

```alert-error
À un détail près : il contient **ton nom d'utilisateur** et **ton mot de passe**.
```

Dans un projet réel, stocker des informations d'identification (telles que le nom d'utilisateur et le mot de passe de la base de données) directement dans le code source est une pratique risquée. Ces informations peuvent être exposées accidentellement si le code est partagé publiquement, ce qui pourrait compromettre la sécurité de la base de données.

Pour éviter cela, tu dois utiliser des **variables d'environnement** pour stocker les informations sensibles et les charger dans le script au moment de son exécution. Cela permet de séparer les configurations sensibles du code source et de les protéger contre toute exposition accidentelle.

Node.js offre un moyen pratique de gérer les variables d'environnement à l'aide du module `dotenv`. Tu peux définir des variables d'environnement dans un fichier `.env` à la racine de ton projet et les charger dans ton script.

Installe le package dotenv en utilisant la commande suivante dans ton terminal :

```bash
npm install dotenv
```

Crée un fichier `.env` à la racine de ton projet et définis les variables d'environnement nécessaires :

```ini
DB_USER=NOMDETONUTILISATEUR
DB_PASSWORD=MOTDEPASSEDETONUTILISATEUR
```

Modifie ton script `index.js` pour charger les variables d'environnement à partir du fichier `.env` :

```javascript hl[1,11:12]
import "dotenv/config";

import mysql from "mysql2/promise";

const createDB = async () => {
  try {
    // Create a specific connection to the database
    const database = await mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    // Drop the existing database if it exists
    await database.query("DROP DATABASE IF EXISTS wildseries");

    // Create a new database with the specified name
    await database.query("CREATE DATABASE wildseries");

    // Switch to the newly created database
    await database.query("USE wildseries");

    // Execute the SQL statements to update the database schema
    await database.query(`CREATE TABLE program(
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      title VARCHAR(100) NOT NULL
    )`);

    // Close the database connection
    database.end();

    console.info("wildseries updated 🆙");
  } catch (err) {
    console.error("Error updating the database:", err.message, err.stack);
  }
};

// Run the createDB function
createDB();
```

Relance `node index.js` pour constater que le script fonctionne bien, mais cette fois sans contenir les informations les plus sensibles.

```xtext callout
Si tu reprends toutes les étapes pour mettre en place une base de données :

* Tu dois démarrer un client de base de données (MySQL ou autres).
* Tu dois lancer des requêtes SQL avec ton client comme `CREATE DATABASE`, `CREATE TABLE`...
* Tu peux sauvegarder toutes tes commandes dans un script JavaScript, en prenant soin de gérer tes informations sensibles (nom d'utilisateur, mot de passe...) avec des variables d'environnement.
```

### Et dans le Monorepo ?

Le Monorepo est un framework, un "cadre" dans lequel chaque chose est rangée à une place bien précise. Mais le cadre ne change pas ce que tu dois ranger : le code que tu as produit à l'étape précédente doit toujours exister quelque part sous une forme ou une autre.

Reprends ton projet Wild Series, et ouvre le fichier `server/bin/migrate.ts` :

```typescript hl[2,11,22:28,31,34,37,40]
// Load environment variables from .env file
import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

// Build the path to the schema SQL file
const schema = path.join(__dirname, "../../server/database/schema.sql");

// Get database connection details from .env file
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Update the database schema
import mysql from "mysql2/promise";

const migrate = async () => {
  try {
    // Read the SQL statements from the schema file
    const sql = fs.readFileSync(schema, "utf8");

    // Create a specific connection to the database
    const database = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT as number | undefined,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true, // Allow multiple SQL statements
    });

    // Drop the existing database if it exists
    await database.query(`drop database if exists ${DB_NAME}`);

    // Create a new database with the specified name
    await database.query(`create database ${DB_NAME}`);

    // Switch to the newly created database
    await database.query(`use ${DB_NAME}`);

    // Execute the SQL statements to update the database schema
    await database.query(sql);

    // Close the database connection
    database.end();

    console.info(`${DB_NAME} updated from '${path.normalize(schema)}' 🆙`);
  } catch (err) {
    const { message, stack } = err as Error;
    console.error("Error updating the database:", message, stack);
  }
};

// Run the migration function
migrate();
```

```xtext arrow
Les éléments clés sont bien là :

* Chargement depuis le fichier `.env`.
* Connection au serveur de base de données.
* Envoi des requêtes SQL.
```

Les noms de variables peuvent changer, les mots-clés SQL peuvent être en majuscules ou non, des figures de style comme la destructuration `const { ... } = process.env` peuvent être présentes ou pas... Mais les instructions aboutissent au même résultat : **mettre en place une base de données toute neuve**.

Pour que ces instructions puissent fonctionner, tu dois mettre en place tes variables d'environnement dans `server/.env` : si le fichier n'existe pas déjà, créé le en copiant le fichier d'exemple `server/.env.sample`.

```alert-warning
Tu dois faire une copie de `.env.sample` : le fichier d'origine ne doit être ni renommé, ni modifié, ni supprimé.
```

Ouvre ton fichier `server/.env` et remplace `YOUR_DATABASE_USERNAME` et `YOUR_DATABASE_PASSWORD` avec tes identifiants MySQL. Change également la valeur de `DB_NAME` pour le nom de ta base de données `wildseries` :

```bash hl[8:10]
# Application Configuration
APP_PORT=3310
APP_SECRET=YOUR_APP_SECRET_KEY

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=YOUR_DATABASE_USERNAME # Ton nom d'utilisateur MySQL
DB_PASSWORD=YOUR_DATABASE_PASSWORD # Ton mot de passe MySQL 
DB_NAME=wildseries # Le nom de la base de données que tu va utiliser

# Client URL (for CORS configuration)
CLIENT_URL=http://localhost:3000

# About specific needs, please ask your trainer about the deploiement project name and follow the pattern
# You can add as much variable as needed. Don't forget to tell your trainer about it. Otherwise, it could break on deploiement
PROJECT_NAME_SPECIFIC_NAME=YOUR_SPECIFIC_VALUE
```

```alert-warning
Si tu es **sur macOS**, `DB_HOST=localhost` peut ne pas marcher. Si tu constates un problème, remplace cette ligne par `DB_HOST=127.0.0.1`.
```

Exécute cette commande dans ton terminal :

```bash
npm run db:migrate
```

Le script `db:migrate` est défini dans `server/package.json` : il exécute le script `server/bin/migrate.ts` avec la commande `node`. C'est ce qui va déclencher l'exécution de ton script pour mettre en place la base de données. Tu devrais voir dans le terminal quelque chose comme :

```
> db:migrate
> tsx ./bin/migrate

wildseries updated from '/home/my/wild-series/server/database/schema.sql' 🆙
```

Regardons le fichier `server/bin/migrate.ts` avec un autre éclairage :

```typescript hl[4:5,8,19,40]
// Load environment variables from .env file
import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

// Build the path to the schema SQL file
const schema = path.join(__dirname, "../../server/database/schema.sql");

// Get database connection details from .env file
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Update the database schema
import mysql from "mysql2/promise";

const migrate = async () => {
  try {
    // Read the SQL statements from the schema file
    const sql = fs.readFileSync(schema, "utf8");

    // Create a specific connection to the database
    const database = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT as number | undefined,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true, // Allow multiple SQL statements
    });

    // Drop the existing database if it exists
    await database.query(`drop database if exists ${DB_NAME}`);

    // Create a new database with the specified name
    await database.query(`create database ${DB_NAME}`);

    // Switch to the newly created database
    await database.query(`use ${DB_NAME}`);

    // Execute the SQL statements to update the database schema
    await database.query(sql);

    // Close the database connection
    database.end();

    console.info(`${DB_NAME} updated from '${path.normalize(schema)}' 🆙`);
  } catch (err) {
    const { message, stack } = err as Error;
    console.error("Error updating the database:", message, stack);
  }
};

// Run the migration function
migrate();
```

La ligne `await database.query(sql);` est celle qui précédemment envoyait un `CREATE TABLE` au serveur de base de données. Le code SQL pour créer les tables est ici lue depuis un fichier grâce à `fs.readFileSync`. Ce fichier est ta prochaine étape. Ouvre `server/database/schema.sql` :

```sql
create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

insert into user(id, email, password)
values
  (1, "jdoe@mail.com", "123456");

insert into item(id, title, user_id)
values
  (1, "Stuff", 1),
  (2, "Doodads", 1);
```

Ce script a un double rôle :

* Centraliser le schéma des tables de ta base de données à travers les requêtes SQL `CREATE TABLE`.
* Insérer des lignes dans les tables à travers les requêtes SQL `INSERT INTO`.

Tu peux ajouter de nouvelles tables au schéma SQL : ce sera ton challenge pour cette quête.

```xtext callout
Si tu veux en savoir plus sur le module `node:fs` et la lecture de fichier, tu peux consulter le [site officiel](https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs).
```

## Récapitulatif

Pour mettre en place ta base de données :

* La bonne pratique est d'automatiser le processus à l'aide de scripts, ce qui garantit la reproductibilité et la cohérence.
* Tu dois protéger les informations sensibles telles que les noms d'utilisateur et les mots de passe en utilisant des variables d'environnement dans des fichiers `.env`.
* Tu peux gérer le schéma de ta base de données depuis le fichier `server/database/schema.sql`.
* Tu peux mettre ta base de données à partir de ton schéma avec la commande `npm run db:migrate`.

## Challenge

Complète ton fichier `server/database/schema.sql` en ajoutant la création des tables `category` et `program`.

```alert-warning
Ne supprime pas les tables existantes `user` et `item`, elles te seront utiles pour la suite.
```

Pour rappel, voici la modélisation complète de la base de données Wild Series (mais ne réalise bien que les tables `category` et `program`) :

![](https://storage.googleapis.com/quest_editor_uploads/rNDw6WL6VRBXxKhuUYMzSjanYFbvosi3.png)

````alert-info
La taille maximum du texte pour le `synopsis` de la table `program` est difficile à estimer à l'avance : utilise le type `TEXT` plutôt qu'un `VARCHAR`. En suivant cette syntaxe :

```sql wrap
synopsis text not null,
```
````

Ajoute ces lignes d'insertion :

```sql
insert into category(id, name)
values
  (1, "Comédie"),
  (2, "Science-Fiction");

insert into program
  (
    id,
    title,
    synopsis,
    poster,
    country,
    year,
    category_id
  )
values
  (
    1,
    "The Good Place",
    "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    "USA",
    2016,
    1
  ),
  (
    2,
    "Dark",
    "Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
    "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
    "Allemagne",
    2017,
    2
  );
```

Lance la commande `npm run db:migrate` pour tester ton schéma.

Pousse ton projet sur GitHub, et partage le lien de ton dépôt pour valider ta quête.

### Critères de validation

- [ ] Le projet est disponible sur GitHub.
- [ ] Le fichier `server/.env.sample` est toujours présent.
- [ ] Le fichier `server/database/schema.sql` contient la déclaration des tables `user`, `item`, `category` et `program`.
- [ ] Quand tu clones et installes le projet, crées un fichier `server/.env` avec tes identifiants et lances la commande `npm run db:migrate` : la base de données est mise à jour.

Une solution possible :

````tabs files
!--- server/database/schema.sql
```sql
create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

insert into user(id, email, password)
values
  (1, "jdoe@mail.com", "123456");

insert into item(id, title, user_id)
values
  (1, "Stuff", 1),
  (2, "Doodads", 1);

create table category (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null unique
);

create table program (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  synopsis text not null,
  poster varchar(255) not null,
  country varchar(100) not null,
  year int not null,
  category_id int unsigned not null,
  foreign key(category_id) references category(id)
);

insert into category(id, name)
values
  (1, "Comédie"),
  (2, "Science-Fiction");

insert into program
  (
    id,
    title,
    synopsis,
    poster,
    country,
    year,
    category_id
  )
values
  (
    1,
    "The Good Place",
    "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    "USA",
    2016,
    1
  ),
  (
    2,
    "Dark",
    "Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
    "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
    "Allemagne",
    2017,
    2
  );
```
````