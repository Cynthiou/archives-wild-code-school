## Objectifs

* Comprendre ce qu'est une base de données
* Écrire tes premières requêtes SQL
* Créer ta première base de données
* Importer des données

## Introduction

Bonjour, jeune sorcier. Tu vas apprendre ici de nouveaux _sortilèges_ qui te permettront de créer, gérer et manipuler des données, autant de choses qu’il est indispensable de savoir faire dans le monde magique du développement web (et dans bien d'autres domaines).

Les bases de données (BDD) vont te permettre de **stocker** des données, de manière **structurée** et organisée, et de les réutiliser facilement. Un registre d’élèves ou encore un livre de sorts sont en quelque sorte des bases de données.

## Sommaire

## Un peu de vocabulaire

Cette première vidéo va te permettre de parler *le langage* base de données. Tu y découvriras une grande partie du vocabulaire utilisé dans le milieu.

```resource
https://www.youtube.com/watch?v=e8yuiYjRPbU
# VIDEO : Une courte introduction
```

- **SGBDR** (**S**ystème de **G**estion de **B**ase de **D**onnées **R**elationnelles) : logiciel permettant de créer et administrer des bases de données. Tu peux créer dedans autant de bases de données que tu le souhaites. Il existe de nombreux SGBDR, comme MySQL, PostgreSQL, Oracle, _etc._

```alert-info
Tu entendras parfois le terme SGBD (sans le R), mais la plupart des bases de données que tu seras amené(e) à utiliser (dont MySQL) sont relationnelles.
```

- **Base de données** : conteneur permettant de stocker des informations diverses, de manière structurée, dans des tables.

- **Table** : sous-unité d’une base de données, contenant des informations de même type, que l'on peut regrouper par des propriétés communes, ce qui permet de les structurer de manière cohérente. Ainsi, on peut regrouper les informations des "sorciers" (_wizard_), "écoles" (_school_) et des "maisons" (_house_) entre elles. Tu verras par la suite qu’il est également possible de relier les tables entre elles, pour créer des _relations_.

- **Champ** : propriété qui caractérise chaque donnée d’une table. Par exemple, une table `wizard` pourra contenir des champs `firstname`, `lastname`, `birth_place`... Les champs possèdent des caractéristiques précises (type, longueur, nullable, unicité, etc.). 

- **Clé primaire** : C’est un identifiant **unique** qui permet d’identifier rapidement un enregistrement. La clé primaire est constituée par un (parfois plusieurs) champ(s).

```alert-info
Le plus souvent, le champ servant de clé primaire sera de type entier et auto-incrémenté (de 1 à N) à chaque nouvelle insertion de données dans la table (l’auto-incrémentation est une technique simple pour obtenir un identifiant unique), mais il est possible d’avoir des clés primaires sous d’autres formats.
```

* **Tuple** : valeurs d’une seule ligne d’une table. Par exemple, pour la table `wizard`, tu pourras avoir les tuples suivants :
    1. “Harry”, “Potter”, “Londres”
    2. “Hermione”, “Granger”, “Londres”

```alert-warning
 Si tu imagines une base de données comme un tableur, la table serait une feuille de tableur, le champ serait une colonne, le tuple une ligne. Par convention, le nom des tables et champs s’écrivent généralement en anglais, en snake_case (underscores séparant les mots). Les noms de tables sont toujours au singulier. Une table `wizard` va contenir beaucoup de données, mais quand tu nommes une table, il faut considérer uniquement un seul tuple (d’où le singulier).
```

```resource
https://sql.sh/1396-nom-table-colonne
# Bonnes pratiques de nommage
```

```resource
https://www.youtube.com/watch?v=uObfuZXLggk
# Introduction aux bases de données
Voici une bonne vue d'ensemble sur les bases de données. Un peu de vocabulaire ainsi qu'un exemple pratique vont te permettre d'avancer plus sereinement.
```

## Le langage SQL

Maintenant que tu as une meilleure vision de ce qu’est une base de données, tu comprends qu’il y a deux parties : 

- La structure des données (tables, champs, relations...) qui définissent comment les données vont être organisées.

```alert-info
Bien structurer ces données est une phase essentielle et complexe, qui demande une bonne compréhension des besoins métiers, et beaucoup de pratique. C’est ce qui s’appelle la _modélisation_ de base de données. Tu verras dans une prochaine quête quelques notions pour t’aider dans cette tâche importante, mais pour l’instant, nous ne nous en occuperons pas.
```

- Les données elles-mêmes. Chaque donnée d’un tuple correspond à un champ et doit donc valider les contraintes associées à ce champ. Par exemple, si tu rajoutes un champ `birthdate` dans la table `wizard`, tu peux définir que ce champ sera de type “DATE”. Tu ne pourras donc pas y entrer une donnée qui n’est pas sous un format de date compatible. Cela permet de t’assurer de la **cohérence** des données entrées dans ta BDD, ce qui est extrêmement important.

La création de la base et de ses tables, mais également la manipulation des données (lecture, ajout, modification, suppression) se font toutes deux via des requêtes envoyées au SGBDR, écrites dans un langage particulier appelé SQL (_Structured Query Language_). Le SQL est un standard implémenté dans tous les principaux SGBDR, ce qui te permet (à quelques spécificités près) d’utiliser aisément n’importe quel SGBDR une fois que tu connais SQL.

```alert-info
Le SQL permet également d’administrer la base de données, c’est-à-dire de gérer les droits des utilisateurs, effectuer des tâches d’optimisation, _etc._ Cependant, la plupart de ces notions dépassent le cadre de la formation.
```

[Sql.sh](https://sql.sh/) est un site très bien documenté, contenant de nombreux cours et tutoriels sur le langage SQL. De nombreuses ressources données dans ce parcours de quête te renverront par la suite vers ce site. Commence par regarder cette vidéo.

```youtube
https://youtu.be/WolMLUXs_mY
```

## Premières requêtes SQL

Tu verras la partie _manipulation_ de données dans de prochaines quêtes. Pour le moment, tu vas voir quelques requêtes basiques pour créer une base de données.

Le SQL se compose de différentes commandes (tu peux les écrire en majuscules pour les faire ressortir) et de différents paramètres choisis par l’utilisateur (à garder en minuscules pour les différencier des commandes). Une requête SQL se termine par un point virgule. Voici donc une liste des premiers “sortilèges” que tu vas pouvoir lancer.

- **CREATE DATABASE** : Créer une base de données.
Par exemple, pour créer une base appelée `wild`, la syntaxe est la suivante

```sql
CREATE DATABASE wild;
```

```resource
https://mariadb.com/kb/en/library/create-database
# CREATE DATABASE
```

- **USE** : Tu peux bien entendu avoir plusieurs BDD en même temps. Pour passer de l’une à l’autre, il faut utiliser la commande USE, par exemple :

```sql
USE wild;
```

- **CREATE TABLE** : commande pour créer une **table** dans une BDD (une fois que tu t’es placé via USE sur la base de ton choix). 
Lors de la création d’une table, il faut également spécifier les champs qui vont constituer la table, ainsi que les caractéristiques de ces champs (type, contraintes…). La syntaxe est donc un peu plus complexe. Par exemple :

```sql
CREATE TABLE wizard (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  birthday DATE DEFAULT NULL,
  birth_place VARCHAR(255) DEFAULT NULL,
  biography TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);
```

```resource
https://www.khanacademy.org/computing/computer-programming/sql/sql-basics/v/welcome-to-sql
# CREATE TABLE
Regarde les 2 premières vidéos (intro SQL et création de table)
```

Ici, la table `wizard` est créée. Elle contiendra :

* un champ `id` obligatoire (ne peut pas être NULL) et auto-incrémenté
* des champs `firstname` et `lastname` qui sont des chaînes de taille limitée à 100 caractères max et obligatoires car non NULL
* un champ `birthday` , en format de date mais pouvant être NULL
* un champ `birth_place` , une chaîne limitée à 255 caractères max, facultatif car peut prendre la valeur NULL
* un champ `biography` , un bloc de texte long facultatif (pouvant donc être NULL)
* la clé primaire est associée au champ `id`

```alert-info
Il existe beaucoup d’autres types pour les données. Tu trouveras plus d’informations dans les ressources. Il faut que tu apprennes à les utiliser de la manière la plus adaptée possible.
```

```resource
https://www.w3schools.com/sql/sql_datatypes.asp
# Les principaux types de champs
et quelques [contraintes utiles](https://www.w3schools.com/sql/sql_primarykey.asp), à connaître pour créer ou modifier des champs
```

- **SHOW** : la commande `SHOW` permet d’afficher de nombreux types d’informations sur ce que contient ton SGBDR. Par exemple :
`SHOW DATABASES;` permet de lister toutes les BDD`SHOW TABLES;` permet de lister toutes les tables de la base de données actuellement sélectionnée.

```resource
https://mariadb.com/kb/en/library/show/
# Plus sur SHOW
```

- **DESCRIBE** : permet d’afficher des informations détaillées sur les colonnes d’une table, par ex : `DESCRIBE wizard;`

```resource
https://mariadb.com/kb/en/library/describe/
# Plus d’infos sur DESCRIBE
```

- **ALTER** : il existe de nombreuses commandes commençant par `ALTER`, qui te permettent de modifier la structure d’une BDD/Table existante.

```resource
https://sql.sh/cours/alter-table
# Les commandes ALTER
```

![](images/001-premieres-requetes-sql.gif)

##  Challenge

````stepper
# Créer une base de donnée

Crée une base de données `wild_db_quest` et place toi dessus.

# Créer une table

Exécute le code SQL suivant :

```sql
CREATE TABLE wizard (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  birthday DATE DEFAULT NULL,
  birth_place VARCHAR(255) DEFAULT NULL,
  biography TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);
```

Cela te créera la table `wizard` comme indiqué dans l’exemple plus haut.

# Modifier une table

Modifie la table `wizard` en ajoutant un champ `is_muggle` de type booléen, obligatoire, qui permettra d’indiquer si le sorcier est ou non un *moldu*.

Si tu ne sais pas ce qu’est un [moldu](https://fr.wikipedia.org/wiki/Univers_de_Harry_Potter#Moldus), c’est que tu en es sans doute un toi-même !

# Créer une table (bis)

Crée une table `school`, contenant les champs :

* `id` (**clé primaire, entier auto-incrémenté**, ne pouvant pas être NULL)
* `name` (chaîne de caractères de longueur 100, obligatoire = ne pouvant pas être NULL)
* `capacity` (entier, non obligatoire)
* `country` (chaîne de caractères de longueur 255, obligatoire)
````

Exécute les commandes `SHOW TABLES` et fais un `DESCRIBE` sur les tables `wizard` et `school`.

Dans ta console, copie les sorties des commandes `SHOW TABLES` et `DESCRIBE` et colle le texte en solution.

À toi de jouer, jeune sorcier !

### Critères de validation

* La commande SHOW TABLES montre que la base de données `wild_db_quest` existe et contient les deux tables `wizard` et `school`.
* La table `wizard` contient un champ `is_muggle` de type BOOL ou TINYINT(1) et NOT NULL.
* La table `school` contient les champs `id`, `name`, `capacity` et `country`, respectivement de type INT, VARCHAR(100), INT et VARCHAR(255).
* Le champ `id` de la table `school` est **auto-incrémenté** et est une **clé primaire**.

## Créer la base de données

```sql
CREATE DATABASE wild_db_quest;
USE wild_db_quest;
```

## Créer la table wizard

```sql
CREATE TABLE wizard (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  birthday DATE DEFAULT NULL,
  birth_place VARCHAR(255) DEFAULT NULL,
  biography TEXT DEFAULT NULL,
  PRIMARY KEY (id)
);
```

## Modifier la table wizard

```sql
ALTER TABLE wizard
  ADD is_muggle BOOLEAN NOT NULL DEFAULT 0;
```

## Créer la table school

```sql
CREATE TABLE school (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  capacity INT,
  country VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
```

## SHOW TABLES

```
+-------------------------+
| Tables_in_wild_db_quest |
+-------------------------+
| school                  |
| wizard                  |
+-------------------------+
```

## DESCRIBE wizard

```
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int          | NO   | PRI | NULL    | auto_increment |
| firstname   | varchar(100) | NO   |     | NULL    |                |
| lastname    | varchar(100) | NO   |     | NULL    |                |
| birthday    | date         | YES  |     | NULL    |                |
| birth_place | varchar(255) | YES  |     | NULL    |                |
| biography   | text         | YES  |     | NULL    |                |
| is_muggle   | tinyint(1)   | NO   |     | 0       |                |
+-------------+--------------+------+-----+---------+----------------+
```

## DESCRIBE school

```
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| name     | varchar(100) | NO   |     | NULL    |                |
| capacity | int          | YES  |     | NULL    |                |
| country  | varchar(255) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
```