## Objectifs

- Comprendre les jointures
- Utiliser différents types de jointures

## Introduction

Jeune sorcier, bienvenue dans le cours traitant des jointures ! Prépare-toi, tu vas bientôt être en mesure de **récupérer les informations de plusieurs tables en une requête** !

## Sommaire

## Les jointures

Dans la quête sur la modélisation, tu as appris comment relier des tables entres elles, via des _clés étrangères_. Maintenant que tes tables sont reliées, cela va te permettre de récupérer les informations de plusieurs tables en **une seule** requête SQL. Pour cela, tu vas utiliser un nouveau concept très important, **les jointures**.

En fonction des données que tu veux récupérer, tu pourras réaliser différents types de jointures. Voici la syntaxe de la plus basique d’entre elles.

```sql
SELECT <column1>, <column2>… 
FROM <table1>
INNER JOIN <table2> ON <condition>
```

Tu vois ici que la `table1` est reliée à la `table 2` via le mot-clé `INNER JOIN`, et une condition, préfixée par le mot-clé `ON`. Dans cette condition, tu indiqueras quels champs des tables 1 et 2 devront être comparés (le plus souvent, une clé étrangère avec la clé primaire de sa table cible). Si les valeurs des deux champs sont identiques, les champs des deux tables sont “fusionnés” et sortiront sur une même ligne dans le tableau de résultats.

```alert-info
Tu trouveras parfois juste `JOIN`. C'est un raccourci pour une jointure `INNER JOIN`.
```

Voici un exemple un peu plus concret, qui reprend les tables `wizard` et `school`, reliées par la clé étrangère `school_id` dans la table `wizard`.

![](https://storage.googleapis.com/quest_editor_uploads/EyY5MJDDDdp3U3FbnV7fEc5aJDlLsgfG.png)

Dans l’image ci-dessous, des données d’exemple ont été enregistrées dans ces deux tables. Tu remarqueras les couleurs qui mettent en avant quelles données de la table `wizard` à gauche sont reliées (via `school_id`) avec les données de la table `school` à droite.

![](https://storage.googleapis.com/quest_editor_uploads/3iaIh6cYjILOvrmmcXVUaHL8rUXSm3xy.png)

Note bien qu’il y a également dans cet exemple des tuples de la table `school` (id 2, 5, 6 et 7) qui n’ont aucun élève inscrit. Cela servira par la suite à illustrer d’autres types de jointures.

````alert-warning
Commence par exécuter ces requêtes pour (re)créer une nouvelle base de données "bac à sable" :

```sql
DROP DATABASE IF EXISTS wild_db_quests_advanced;
CREATE DATABASE wild_db_quests_advanced;
```
````

Pour créer les deux tables et insèrer les données, exécute les requêtes suivantes :

```sql
USE wild_db_quests_advanced;

CREATE TABLE school(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  capacity INT,
  PRIMARY KEY (id)
);

CREATE TABLE wizard(
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  school_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_wizard_school FOREIGN KEY (school_id) REFERENCES school(id)
);

INSERT INTO school
  (id, name, capacity)
  VALUES
  (1, 'Beauxbatons Academy of Magic', 550),
  (2, 'Castelobruxo', 380),
  (3, 'Durmstrang Institute', 570),
  (4, 'Hogwarts School of Witchcraft and Wizardry', 450),
  (5, 'Ilvermorny School of Witchcraft and Wizar', 300),
  (6, 'Koldovstoretz', 125),
  (7, 'Mahoutokoro School of Magic', 800),
  (8, 'Uagadou School of Magic', 350);

INSERT INTO wizard
  (firstname, lastname, school_id)
  VALUES
  ('fleur', 'delacour', 1),
  ('gabrielle', 'delacour', 1),
  ('viktor', 'krum', 3),
  ('gellert', 'grindelwald', 3),
  ('harry', 'potter', 4),
  ('hermione', 'granger', 4),
  ('lily', 'potter', 4),
  ('ron', 'weasley', 4),
  ('ginny', 'weasley', 4),
  ('fred', 'weasley', 4),
  ('george', 'weasley', 4),
  ('arthur', 'weasley', 4),
  ('molly', 'weasley', 4),
  ('drago', 'malefoy', 4),
  ('albus', 'dumbledore', 4),
  ('severus', 'rogue', 4),
  ('tom', 'jédusor', 4),
  ('babajide', 'akingbade', 8),
  ('dudley', 'dursley', NULL);
```

````xtext arrow
Sauf dans des cas très particuliers, une clé étrangère est toujours configurée en `NOT NULL` pour garantir l'intégrité, la cohérence des données :

```sql hl[5]
CREATE TABLE wizard(
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  school_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_wizard_school FOREIGN KEY (school_id) REFERENCES school(id)
);
```

Pour les besoins de l'exercice, tu peux voir que nous avons laissé le champ `school_id` "nullable" :

```sql hl[5]
CREATE TABLE wizard(
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  school_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_wizard_school FOREIGN KEY (school_id) REFERENCES school(id)
);
```

C'est volontaire pour nous permettre de tester des `LEFT JOIN` (voir plus bas).
````

Tu peux maintenant tester une première requête avec jointure :

```sql
SELECT firstname, lastname, name
FROM wizard
INNER JOIN school ON school.id=wizard.school_id;
```

Voici les résultats obtenus :

```sql
+-----------+-------------+--------------------------------------------+
| firstname | lastname    | name                                       |
+-----------+-------------+--------------------------------------------+
| fleur     | delacour    | Beauxbatons Academy of Magic               |
| gabrielle | delacour    | Beauxbatons Academy of Magic               |
| viktor    | krum        | Durmstrang Institute                       |
| gellert   | grindelwald | Durmstrang Institute                       |
| harry     | potter      | Hogwarts School of Witchcraft and Wizardry |
| hermione  | granger     | Hogwarts School of Witchcraft and Wizardry |
| lily      | potter      | Hogwarts School of Witchcraft and Wizardry |
| ron       | weasley     | Hogwarts School of Witchcraft and Wizardry |
| ginny     | weasley     | Hogwarts School of Witchcraft and Wizardry |
| fred      | weasley     | Hogwarts School of Witchcraft and Wizardry |
| george    | weasley     | Hogwarts School of Witchcraft and Wizardry |
| arthur    | weasley     | Hogwarts School of Witchcraft and Wizardry |
| molly     | weasley     | Hogwarts School of Witchcraft and Wizardry |
| drago     | malefoy     | Hogwarts School of Witchcraft and Wizardry |
| albus     | dumbledore  | Hogwarts School of Witchcraft and Wizardry |
| severus   | rogue       | Hogwarts School of Witchcraft and Wizardry |
| tom       | jédusor     | Hogwarts School of Witchcraft and Wizardry |
| babajide  | akingbade   | Uagadou School of Magic                    |
+-----------+-------------+--------------------------------------------+
18 rows in set (0.00 sec)
```

Ici, tu as spécifié que seuls les champs `firstname` et `lastname` de la table `wizard`, et `name` de la table `school` sont récupérés. Pas de confusion possible puisque seule la table `wizard` possède des champs appelés `firstname` et `lastname`, et seule la table `school` possède un champ appelé `name`.

La jointure (`INNER JOIN`) est effectuée entre les tables `wizard` et `school` sous la condition (`ON`) que l’`id` de la table `school` ait la même valeur que le champ `school_id` de `wizard`. Dans cette condition, tu dois écrire `school.id` et non juste `id` car la table `wizard` possède également un champ appelé `id` : `id` tout court serait ambigu sur le champ à utiliser (et le code déclencherait une erreur).

Au niveau du tableau de résultats, tu observes que les données des deux tables sont bien fusionnées sur une seule et même ligne. De fait, tu retrouves plusieurs fois les mêmes noms d’école car il y a plusieurs élèves inscrits dans un même établissement.

Une requête de type `INNER JOIN` ne renvoie **que** les données communes entre les deux tables. Cela veut dire que les tuples qui ne répondent pas à la condition de jointure n’apparaissent pas dans les résultats. Par exemple l'école Castelobruxo qui n'a pas d'élèves enregistrés. Les élèves sans école connue ne sont pas non plus affichés (nous testerons ça dans la partie "Jointures avancées").

### Utilisation des alias

Dans une quête précédente, tu as découvert les _alias_, qui permettent de donner un nom alternatif (raccourci ou plus explicite) à une table ou un champ. Pour cela, il suffit de rajouter l’alias juste après le nom du champ ou de la table, accompagné (optionnellement) du mot-clé `AS`, par exemple :

```sql
SELECT name AS school_name FROM school AS s;
```

Comme tu l’as vu plus haut, les jointures nécessitent de faire appel à de nombreux champs et tables, ce qui entraîne des risques d'ambiguïté lorsque des champs de deux tables différentes portent le même nom (ce qui est très fréquent, notamment pour les `id`). 

Les alias vont donc t’aider à lever ces ambiguïtés, clarifier les noms des champs appelés et raccourcir la taille des requêtes, comme tu peux le voir dans l’exemple ci-dessous. Tu remarqueras que, si un champ est renommé via un alias (ici s.name en school_name), cela se répercute dans le tableau des résultats, tandis que les préfixages par les alias de tables sont, quant à eux, ignorés.

```sql
SELECT w.firstname, w.lastname, s.name as school_name
FROM wizard AS w
JOIN school AS s ON s.id=w.school_id;
```

```sql
+-----------+-------------+--------------------------------------------+
| firstname | lastname    | school_name                                |
+-----------+-------------+--------------------------------------------+
| fleur     | delacour    | Beauxbatons Academy of Magic               |
| gabrielle | delacour    | Beauxbatons Academy of Magic               |
| viktor    | krum        | Durmstrang Institute                       |
| gellert   | grindelwald | Durmstrang Institute                       |
| harry     | potter      | Hogwarts School of Witchcraft and Wizardry |
| hermione  | granger     | Hogwarts School of Witchcraft and Wizardry |
| lily      | potter      | Hogwarts School of Witchcraft and Wizardry |
| ron       | weasley     | Hogwarts School of Witchcraft and Wizardry |
| ginny     | weasley     | Hogwarts School of Witchcraft and Wizardry |
| fred      | weasley     | Hogwarts School of Witchcraft and Wizardry |
| george    | weasley     | Hogwarts School of Witchcraft and Wizardry |
| arthur    | weasley     | Hogwarts School of Witchcraft and Wizardry |
| molly     | weasley     | Hogwarts School of Witchcraft and Wizardry |
| drago     | malefoy     | Hogwarts School of Witchcraft and Wizardry |
| albus     | dumbledore  | Hogwarts School of Witchcraft and Wizardry |
| severus   | rogue       | Hogwarts School of Witchcraft and Wizardry |
| tom       | jédusor     | Hogwarts School of Witchcraft and Wizardry |
| babajide  | akingbade   | Uagadou School of Magic                    |
+-----------+-------------+--------------------------------------------+
18 rows in set (0.00 sec)
```

## Jointures avancées

Il existe plusieurs autres types de jointures. Tu vas t’intéresser ici aux jointures `RIGHT` et `LEFT`. Elles sont assez simples à comprendre. Reprends l’exemple : la table `wizard` possède deux tuples non reliés à une école. Cependant, comment faire si tu souhaites ressortir les informations sur _tous_ les élèves, même ceux non inscrits dans une école ? 

Dans ce cas, c’est la requête `LEFT JOIN` qui va t’être utile. Elle permet, comme son nom l’indique, de ressortir toutes les informations de la table de **gauche** (à gauche du `JOIN`), même si celles-ci ne sont reliées à aucune information de la table de droite (en plus des données renvoyées par un `JOIN` classique).

Comme le montre l’exemple ci-dessous, pour ces lignes, la colonne `school_name` prend la valeur `NULL` :

```sql
SELECT w.firstname, w.lastname, s.name as school_name
FROM wizard AS w
LEFT JOIN school AS s ON s.id=w.school_id;
```

```sql hl[22]
+-----------+-------------+--------------------------------------------+
| firstname | lastname    | school_name                                |
+-----------+-------------+--------------------------------------------+
| fleur     | delacour    | Beauxbatons Academy of Magic               |
| gabrielle | delacour    | Beauxbatons Academy of Magic               |
| viktor    | krum        | Durmstrang Institute                       |
| gellert   | grindelwald | Durmstrang Institute                       |
| harry     | potter      | Hogwarts School of Witchcraft and Wizardry |
| hermione  | granger     | Hogwarts School of Witchcraft and Wizardry |
| lily      | potter      | Hogwarts School of Witchcraft and Wizardry |
| ron       | weasley     | Hogwarts School of Witchcraft and Wizardry |
| ginny     | weasley     | Hogwarts School of Witchcraft and Wizardry |
| fred      | weasley     | Hogwarts School of Witchcraft and Wizardry |
| george    | weasley     | Hogwarts School of Witchcraft and Wizardry |
| arthur    | weasley     | Hogwarts School of Witchcraft and Wizardry |
| molly     | weasley     | Hogwarts School of Witchcraft and Wizardry |
| drago     | malefoy     | Hogwarts School of Witchcraft and Wizardry |
| albus     | dumbledore  | Hogwarts School of Witchcraft and Wizardry |
| severus   | rogue       | Hogwarts School of Witchcraft and Wizardry |
| tom       | jédusor     | Hogwarts School of Witchcraft and Wizardry |
| babajide  | akingbade   | Uagadou School of Magic                    |
| dudley    | dursley     | NULL                                       |
+-----------+-------------+--------------------------------------------+
19 rows in set (0.00 sec)
```

De la même manière, si tu veux récupérer toutes les écoles, même celles sans étudiants, tu peux utiliser `RIGHT JOIN`. Cette fois, pour les écoles sans étudiant, les champs `firstname` et `lastname` seront `NULL` :

```sql
SELECT w.firstname, w.lastname, s.name  
FROM wizard AS w
RIGHT JOIN school AS s ON s.id=w.school_id;
```

```sql
+-----------+-------------+--------------------------------------------+
| firstname | lastname    | name                                       |
+-----------+-------------+--------------------------------------------+
| fleur     | delacour    | Beauxbatons Academy of Magic               |
| gabrielle | delacour    | Beauxbatons Academy of Magic               |
| NULL      | NULL        | Castelobruxo                               |
| viktor    | krum        | Durmstrang Institute                       |
| gellert   | grindelwald | Durmstrang Institute                       |
| harry     | potter      | Hogwarts School of Witchcraft and Wizardry |
| hermione  | granger     | Hogwarts School of Witchcraft and Wizardry |
| lily      | potter      | Hogwarts School of Witchcraft and Wizardry |
| ron       | weasley     | Hogwarts School of Witchcraft and Wizardry |
| ginny     | weasley     | Hogwarts School of Witchcraft and Wizardry |
| fred      | weasley     | Hogwarts School of Witchcraft and Wizardry |
| george    | weasley     | Hogwarts School of Witchcraft and Wizardry |
| arthur    | weasley     | Hogwarts School of Witchcraft and Wizardry |
| molly     | weasley     | Hogwarts School of Witchcraft and Wizardry |
| drago     | malefoy     | Hogwarts School of Witchcraft and Wizardry |
| albus     | dumbledore  | Hogwarts School of Witchcraft and Wizardry |
| severus   | rogue       | Hogwarts School of Witchcraft and Wizardry |
| tom       | jédusor     | Hogwarts School of Witchcraft and Wizardry |
| NULL      | NULL        | Ilvermorny School of Witchcraft and Wizar  |
| NULL      | NULL        | Koldovstoretz                              |
| NULL      | NULL        | Mahoutokoro School of Magic                |
| babajide  | akingbade   | Uagadou School of Magic                    |
+-----------+-------------+--------------------------------------------+
22 rows in set (0.00 sec)
```

```resource
https://www.khanacademy.org/computing/computer-programming/sql/relational-queries-in-sql/a/splitting-data-into-related-tables
# Entraînement sur les jointures
Regarde les vidéos d’explication sur les jointures **et** effectue les exercices jusqu’au *Challenge Friendbook*.
```

```resource
https://www.youtube.com/watch?v=1vi9mimP19s
# Une vidéo Grafikart
La vidéo date un peu (heureusement le SQL aussi et il ne change guère), mais elle reste tout à fait pertinente sur le fond.
```

```resource
https://sql.sh/cours/jointures
# Tout sur les jointures
N’hésite pas notamment à regarder les schémas très explicites qui t’aideront à mieux comprendre le fonctionnement. Attention également, certains types de jointures présentés dans cette documentation (notamment les `FULL JOIN`) ne sont pas supportés par MySQL. Cependant, pas de panique ! Ce type de jointure est plus rarement utile et il y a d’autres manières de faire pour obtenir les mêmes résultats.
```

## Challenge

**Tournoi de quidditch**

Tout d’abord, si tu n’as jamais eu l’occasion de voir des joueurs voler après un vif d’or sur leur balai Nimbus 2001 flambant neuf, regarde par [ici](https://www.youtube.com/watch?v=ZNDV1dYs1c8).

* Prépare ta base de données avec une nouvelle table `wizard` :

```sql
DROP DATABASE IF EXISTS wild_db_quests_advanced;
CREATE DATABASE wild_db_quests_advanced;

USE wild_db_quests_advanced;

CREATE TABLE wizard(
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);
```

* Crée les tables `player` et `team` comme indiquées sur la modélisation ci-dessous (noms et types des champs), en prenant soin de déclarer correctement les clés étrangères.

![](https://storage.googleapis.com/quest_editor_uploads/Hp5BqDAcYve7mQWCMNfQvty5fHExud3E.png)

```alert-warning
L'ordre de création des tables a une importance : tu dois créer les tables sans clés étrangères en premier, pour pouvoir créer des références dessus dans les autres tables ensuite.
```

````solution
```sql
CREATE TABLE team(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE player(
  id INT NOT NULL AUTO_INCREMENT,
  wizard_id INT NOT NULL,
  team_id INT NULL,
  role VARCHAR(100) NOT NULL,
  enrollment_date DATE NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_player_wizard FOREIGN KEY (wizard_id) REFERENCES wizard(id),
  CONSTRAINT fk_player_team FOREIGN KEY (team_id) REFERENCES team(id)
);
```
````

* Insère ensuite ces données dans ta BDD :

```sql
INSERT INTO team
  (id, name)
  VALUES
  (1, 'Gryffindor'), (2, 'Ravenclaw'), (3, 'Slytherin'), (4, 'Hufflepuff');

INSERT INTO wizard
  (id, firstname, lastname)
  VALUES
  (1, 'Hannah', 'Abbott'), (2, 'Katie', 'Bell'), (3, 'Cuthbert', 'Binns'), (4, 'Phineas', 'Nigellus'), (5, 'Regulus', 'Black'), (6, 'Sirius', 'Black'), (7, 'Amelia', 'Bones'), (8, 'Susan', 'Bones'), (9, 'Terry', 'Boot'), (10, 'Lavender', 'Brown'), (11, 'Millicent', 'Bulstrode'), (12, 'Cho', 'Chang'), (13, 'Penelope', 'Clearwater'), (14, 'Michael', 'Corner'), (15, 'Crabbe', ''), (16, 'Vincent', 'Crabbe'), (17, 'Colin', 'Creevey'), (18, 'Dennis', 'Creevey'), (19, 'Cedric', 'Diggory'), (20, 'Aberforth', 'Dumbledore'), (21, 'Albus', 'Dumbledore'), (22, 'Marietta', 'Edgecombe'), (23, 'Justin', 'Finch-Fletchley'), (24, 'Seamus', 'Finnigan'), (25, 'Marcus', 'Flint'), (26, 'Filius', 'Flitwick'), (27, 'Anthony', 'Goldstein'), (28, 'Gregory', 'Goyle'), (29, 'Hermione', 'Granger'), (30, 'Godric', 'Gryffindor'), (31, 'Rubeus', 'Hagrid'), (32, 'Helga', 'Hufflepuff'), (33, 'Angelina', 'Johnson'), (34, 'Lee', 'Jordan'), (35, 'Bellatrix', 'Lestrange'), (36, 'Rabastan', 'Lestrange'), (37, 'Rodolphus', 'Lestrange'), (38, 'Gilderoy', 'Lockhart'), (39, 'Alice', 'Longbottom'), (40, 'Frank', 'Longbottom'), (41, 'Augusta', 'Longbottom'), (42, 'Neville', 'Longbottom'), (43, 'Luna', 'Lovegood'), (44, 'Xenophilius', 'Lovegood'), (45, 'Remus', 'Lupin'), (46, 'Draco', 'Malfoy'), (47, 'Lucius', 'Malfoy'), (48, 'Narcissa', 'Malfoy'), (49, 'Minerva', 'McGonagall'), (50, 'Theodore', 'Nott'), (51, 'Garrick', 'Ollivander'), (52, 'Pansy', 'Parkinson'), (53, 'Padma', 'Patil'), (54, 'Parvati', 'Patil'), (55, 'Peter', 'Pettigrew'), (56, 'Harry', 'Potter'), (57, 'James', 'Potter'), (58, 'Lily', 'J.'), (59, 'Quirinus', 'Quirrell'), (60, 'Helena', 'Ravenclaw'), (61, 'Rowena', 'Ravenclaw'), (62, 'Tom', 'Riddle'), (63, 'Demelza', 'Robins'), (64, 'Newton', 'Scamander'), (65, 'Horace', 'Slughorn'), (66, 'Salazar', 'Slytherin'), (67, 'Hepzibah', 'Smith'), (68, 'Zacharias', 'Smith'), (69, 'Severus', 'Snape'), (70, 'Alicia', 'Spinnet'), (71, 'Pomona', 'Sprout'), (72, 'Dean', 'Thomas'), (73, 'Andromeda', 'Tonks'), (74, 'Nymphadora', 'Tonks'), (75, 'Sybill', 'Trelawney'), (76, 'Dolores', 'Umbridge'), (77, 'Romilda', 'Vane'), (78, 'Arthur', 'Weasley'), (79, 'William', 'Weasley'), (80, 'Charles', 'Weasley'), (81, 'Fred', 'Weasley'), (82, 'George', 'Weasley'), (83, 'Ginevra', 'Weasley'), (84, 'Molly', 'Weasley'), (85, 'Percy', 'Weasley'), (86, 'Ronald', 'Weasley'), (87, 'Oliver', 'Wood'), (88, 'Blaise', 'Zabini'), (89, 'Bloody', 'Baron'), (90, 'Cadogan', ''), (91, 'Fat', 'Friar'), (92, 'Myrtle', 'Warren');

INSERT INTO player
  (id, wizard_id, team_id, role, enrollment_date)
  VALUES
  (1, 1, 4, 'beater', '1995-10-09'), (2, 2, 1, 'chaser', '1995-08-17'), (3, 3, 1, 'seeker', '1994-12-03'), (4, 4, 3, 'chaser', '1995-03-24'), (5, 5, 3, 'keeper', '1997-07-16'), (6, 6, 1, 'beater', '1994-01-10'), (7, 7, 4, 'chaser', '1999-01-21'), (8, 8, 4, 'keeper', '1991-10-20'), (10, 10, 1, 'beater', '1991-08-03'), (11, 11, 3, 'beater', '1996-10-04'), (12, 12, 2, 'chaser', '1992-01-27'), (13, 13, 2, 'beater', '1991-01-11'), (14, 14, 2, 'seeker', '1995-08-17'), (16, 16, 3, 'beater', '1992-11-27'), (17, 17, 1, 'seeker', '1993-07-07'), (18, 18, 1, 'keeper', '1991-05-01'), (19, 19, 4, 'keeper', '1997-11-02'), (20, 20, 1, 'keeper', '1995-04-24'), (21, 21, 1, 'chaser', '1991-03-12'), (22, 22, 2, 'chaser', '1990-07-05'), (23, 23, 4, 'beater', '1995-01-06'), (24, 24, 1, 'beater', '1997-02-08'), (25, 25, 3, 'beater', '1996-12-16'), (26, 26, 2, 'chaser', '1997-02-07'), (27, 27, 2, 'chaser', '1999-07-31'), (28, 28, 3, 'seeker', '1994-05-13'), (29, 29, 1, 'chaser', '1997-08-14'), (30, 30, 1, 'seeker', '1993-08-30'), (31, 31, 1, 'beater', '1994-11-16'), (32, 32, 4, 'seeker', '1992-08-14'), (33, 33, 1, 'keeper', '1995-12-02'), (34, 34, 1, 'chaser', '1996-01-31'), (35, 35, 3, 'chaser', '1992-03-21'), (36, 36, 3, 'seeker', '1997-10-30'), (37, 37, 3, 'chaser', '1991-04-27'), (38, 38, 2, 'chaser', '1998-04-05'), (39, 39, 1, 'beater', '1992-02-17'), (40, 40, 1, 'chaser', '1995-10-15'), (41, 41, 1, 'chaser', '1999-10-25'), (42, 42, 1, 'chaser', '1998-05-06'), (43, 43, 2, 'chaser', '1998-03-01'), (44, 44, 2, 'chaser', '1991-03-11'), (46, 46, 3, 'chaser', '1993-11-02'), (47, 47, 3, 'chaser', '1992-03-12'), (48, 48, 3, 'seeker', '1993-03-17'), (49, 49, 1, 'beater', '1992-07-14'), (50, 50, 3, 'chaser', '1996-12-02'), (51, 51, 2, 'chaser', '1995-06-25'), (52, 52, 3, 'beater', '1991-12-14'), (55, 55, 1, 'chaser', '1991-05-14'), (56, 56, 1, 'beater', '1997-03-05'), (57, 57, 1, 'beater', '1996-12-07'), (58, 58, 1, 'chaser', '1999-02-23'), (59, 59, 2, 'beater', '1995-09-23'), (60, 60, 2, 'beater', '1992-04-12'), (61, 61, 2, 'seeker', '1992-10-09'), (62, 62, 3, 'chaser', '1990-02-27'), (64, 64, 4, 'chaser', '1999-01-12'), (66, 66, 3, 'seeker', '1991-02-23'), (67, 67, 4, 'beater', '1996-07-18'), (68, 68, 4, 'keeper', '1993-10-01'), (69, 69, 3, 'beater', '1997-03-06'), (70, 70, 1, 'chaser', '1995-11-08'), (71, 71, 4, 'beater', '1998-06-12'), (72, 72, 1, 'beater', '1997-11-23'), (73, 73, 3, 'chaser', '1994-01-28'), (74, 74, 4, 'beater', '1999-11-25'), (75, 75, 2, 'seeker', '1991-12-28'), (76, 76, 3, 'seeker', '1993-10-23'), (77, 77, 1, 'seeker', '1990-07-31'), (78, 78, 1, 'beater', '1992-01-01'), (79, 79, 1, 'seeker', '1991-04-27'), (81, 81, 1, 'seeker', '1998-03-29'), (82, 82, 1, 'chaser', '1991-08-26'), (83, 83, 1, 'keeper', '1992-04-17'), (85, 85, 1, 'beater', '1990-09-05'), (86, 86, 1, 'seeker', '1997-06-22'), (87, 87, 1, 'chaser', '1999-04-08'), (88, 88, 3, 'beater', '1991-07-08'), (89, 89, 3, 'chaser', '1996-09-25'), (90, 90, 1, 'keeper', '1993-01-04'), (91, 91, 4, 'beater', '1993-11-04'), (92, 92, 2, 'beater', '1997-12-14');
```

Vérifie que tout s’est bien passé. Nous n'avons pas forcément respecté les vrais rôles des joueurs dans les livres, vérifie juste que tes requêtes renvoient bien les informations stockées en base de données.

Une fois ces données correctement chargées, écris les requêtes suivantes, et poste-les avec tes résultats en guise de solution :

1. Retourne les noms, prénoms, rôle et équipe de tous les joueurs, classés dans l’ordre alphabétique par équipe, puis par rôle dans l’équipe, puis par nom de famille, puis par prénom.
2. Retourne uniquement les prénoms et noms des joueurs ayant le rôle de *seeker* (attrapeur), classés par ordre alphabétique de nom puis prénom
3. Retourne la liste de tous les sorciers qui ne pratiquent pas le quidditch.

### Critères de validation

* La solution contient bien les 3 requêtes.
* Lorsque tu testes les requêtes (sur le jeu de données fourni), les résultats de chaque requête sont corrects (fais attention aux champs retournés et au tri des résultats pour qu’ils correspondent précisément aux critères demandés).

1. Les noms, prénoms, rôle et équipe de tous les joueurs, classés dans l’ordre alphabétique par équipe, puis par rôle dans l’équipe, puis par nom de famille, puis par prénom :

```sql
select
  w.firstname, w.lastname, p.role, t.name
from
  wizard as w
join
  player as p on w.id = p.wizard_id
join
  team as t on p.team_id = t.id
order by
  t.name,
  p.role,
  w.lastname,
  w.firstname;

+-------------+-----------------+--------+------------+
| firstname   | lastname        | role   | name       |
+-------------+-----------------+--------+------------+
| Sirius      | Black           | beater | Gryffindor |
| Lavender    | Brown           | beater | Gryffindor |
| Seamus      | Finnigan        | beater | Gryffindor |
| Rubeus      | Hagrid          | beater | Gryffindor |
| Alice       | Longbottom      | beater | Gryffindor |
| Minerva     | McGonagall      | beater | Gryffindor |
| Harry       | Potter          | beater | Gryffindor |
| James       | Potter          | beater | Gryffindor |
| Dean        | Thomas          | beater | Gryffindor |
| Arthur      | Weasley         | beater | Gryffindor |
| Percy       | Weasley         | beater | Gryffindor |
| Katie       | Bell            | chaser | Gryffindor |
| Albus       | Dumbledore      | chaser | Gryffindor |
| Hermione    | Granger         | chaser | Gryffindor |
| Lily        | J.              | chaser | Gryffindor |
| Lee         | Jordan          | chaser | Gryffindor |
| Augusta     | Longbottom      | chaser | Gryffindor |
| Frank       | Longbottom      | chaser | Gryffindor |
| Neville     | Longbottom      | chaser | Gryffindor |
| Peter       | Pettigrew       | chaser | Gryffindor |
| Alicia      | Spinnet         | chaser | Gryffindor |
| George      | Weasley         | chaser | Gryffindor |
| Oliver      | Wood            | chaser | Gryffindor |
| Cadogan     |                 | keeper | Gryffindor |
| Dennis      | Creevey         | keeper | Gryffindor |
| Aberforth   | Dumbledore      | keeper | Gryffindor |
| Angelina    | Johnson         | keeper | Gryffindor |
| Ginevra     | Weasley         | keeper | Gryffindor |
| Cuthbert    | Binns           | seeker | Gryffindor |
| Colin       | Creevey         | seeker | Gryffindor |
| Godric      | Gryffindor      | seeker | Gryffindor |
| Romilda     | Vane            | seeker | Gryffindor |
| Fred        | Weasley         | seeker | Gryffindor |
| Ronald      | Weasley         | seeker | Gryffindor |
| William     | Weasley         | seeker | Gryffindor |
| Hannah      | Abbott          | beater | Hufflepuff |
| Justin      | Finch-Fletchley | beater | Hufflepuff |
| Fat         | Friar           | beater | Hufflepuff |
| Hepzibah    | Smith           | beater | Hufflepuff |
| Pomona      | Sprout          | beater | Hufflepuff |
| Nymphadora  | Tonks           | beater | Hufflepuff |
| Amelia      | Bones           | chaser | Hufflepuff |
| Newton      | Scamander       | chaser | Hufflepuff |
| Susan       | Bones           | keeper | Hufflepuff |
| Cedric      | Diggory         | keeper | Hufflepuff |
| Zacharias   | Smith           | keeper | Hufflepuff |
| Helga       | Hufflepuff      | seeker | Hufflepuff |
| Penelope    | Clearwater      | beater | Ravenclaw  |
| Quirinus    | Quirrell        | beater | Ravenclaw  |
| Helena      | Ravenclaw       | beater | Ravenclaw  |
| Myrtle      | Warren          | beater | Ravenclaw  |
| Cho         | Chang           | chaser | Ravenclaw  |
| Marietta    | Edgecombe       | chaser | Ravenclaw  |
| Filius      | Flitwick        | chaser | Ravenclaw  |
| Anthony     | Goldstein       | chaser | Ravenclaw  |
| Gilderoy    | Lockhart        | chaser | Ravenclaw  |
| Luna        | Lovegood        | chaser | Ravenclaw  |
| Xenophilius | Lovegood        | chaser | Ravenclaw  |
| Garrick     | Ollivander      | chaser | Ravenclaw  |
| Michael     | Corner          | seeker | Ravenclaw  |
| Rowena      | Ravenclaw       | seeker | Ravenclaw  |
| Sybill      | Trelawney       | seeker | Ravenclaw  |
| Millicent   | Bulstrode       | beater | Slytherin  |
| Vincent     | Crabbe          | beater | Slytherin  |
| Marcus      | Flint           | beater | Slytherin  |
| Pansy       | Parkinson       | beater | Slytherin  |
| Severus     | Snape           | beater | Slytherin  |
| Blaise      | Zabini          | beater | Slytherin  |
| Bloody      | Baron           | chaser | Slytherin  |
| Bellatrix   | Lestrange       | chaser | Slytherin  |
| Rodolphus   | Lestrange       | chaser | Slytherin  |
| Draco       | Malfoy          | chaser | Slytherin  |
| Lucius      | Malfoy          | chaser | Slytherin  |
| Phineas     | Nigellus        | chaser | Slytherin  |
| Theodore    | Nott            | chaser | Slytherin  |
| Tom         | Riddle          | chaser | Slytherin  |
| Andromeda   | Tonks           | chaser | Slytherin  |
| Regulus     | Black           | keeper | Slytherin  |
| Gregory     | Goyle           | seeker | Slytherin  |
| Rabastan    | Lestrange       | seeker | Slytherin  |
| Narcissa    | Malfoy          | seeker | Slytherin  |
| Salazar     | Slytherin       | seeker | Slytherin  |
| Dolores     | Umbridge        | seeker | Slytherin  |
+-------------+-----------------+--------+------------+
83 rows
```

2. Uniquement les prénoms et noms des joueurs ayant le rôle de seeker (attrapeur), classés par ordre alphabétique de nom puis prénom :

```sql
select
  w.firstname, w.lastname
from
  wizard as w
join
  player as p on w.id = p.wizard_id
where
  p.role = 'seeker'
order by
  w.lastname,
  w.firstname;

+-----------+------------+
| firstname | lastname   |
+-----------+------------+
| Cuthbert  | Binns      |
| Michael   | Corner     |
| Colin     | Creevey    |
| Gregory   | Goyle      |
| Godric    | Gryffindor |
| Helga     | Hufflepuff |
| Rabastan  | Lestrange  |
| Narcissa  | Malfoy     |
| Rowena    | Ravenclaw  |
| Salazar   | Slytherin  |
| Sybill    | Trelawney  |
| Dolores   | Umbridge   |
| Romilda   | Vane       |
| Fred      | Weasley    |
| Ronald    | Weasley    |
| William   | Weasley    |
+-----------+------------+
16 rows
```

3. La liste de tous les sorciers qui ne pratiquent pas le quidditch :

```sql
select
  w.*
from
  wizard as w
left join
  player as p on w.id = p.wizard_id
where
  p.id IS NULL;

+----+-----------+----------+
| id | firstname | lastname |
+----+-----------+----------+
|  9 | Terry     | Boot     |
| 15 | Crabbe    |          |
| 45 | Remus     | Lupin    |
| 53 | Padma     | Patil    |
| 54 | Parvati   | Patil    |
| 63 | Demelza   | Robins   |
| 65 | Horace    | Slughorn |
| 80 | Charles   | Weasley  |
| 84 | Molly     | Weasley  |
+----+-----------+----------+
9 rows
```