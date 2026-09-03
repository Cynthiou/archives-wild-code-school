## Objectifs

- Insérer du contenu dans une table
- Modifier du contenu
- Supprimer du contenu

## Introduction

Avoir des données dans une base de données, c'est bien. Savoir comment ajouter, modifier et supprimer ces données, c'est encore mieux ! Tu vas découvrir comment manipuler tout cela grâce à de nouveaux _sortilèges_ SQL.


## Sommaire

## Comment ajouter des données ?

Tu vas ajouter plusieurs données dans la table `school`. Pour cela, connecte-toi à MySQL dans ton terminal, toujours sur la base de données `wild_db_quest`.

```alert-info
Cette table  `school`, créée dans la première quête du parcours, contient les champs `name`, `capacity` et `country`, ainsi qu’un champ `id` auto-incrémenté comme clé primaire.
```

Le mot-clé qui va nous intéresser pour pouvoir insérer des données dans une table est **INSERT**.

Sa syntaxe est la suivante

```sql
INSERT INTO table
  (col1, col2, ...)
VALUES
  ('valeur1', 'valeur2', ...);
```

Il est possible de ne renseigner les valeurs que pour un certain nombre de colonnes. Cela fonctionne uniquement si une valeur par défaut est définie pour les colonnes non renseignées dans la requête. Typiquement, tu n’as pas à renseigner un `id` si celui-ci est auto-incrémenté, cela se fera tout seul.

Afin d'ajouter du contenu à la table `school`, essaie les requêtes suivantes :

```sql
INSERT INTO school
  (name, country, capacity)
VALUES
  ('Hogwarts School of Witchcraft and Wizardry', 'United Kingdom', 400);
```

L’ordre dans lequel les champs sont appelés n’a pas d’importance. Il faut juste que la position des valeurs corresponde à l’ordre de l’énumération des colonnes dans la requête. Fais attention également à l’utilisation des _quotes_. Tu dois en mettre autour des chaînes de caractères pour les **valeurs** à insérer, mais tu ne dois **pas** en mettre autour des noms de champs. 

Tu peux également ajouter plusieurs lignes avec des valeurs différentes, dans une même requête SQL. Pour cela, il suffit de séparer chaque groupe de valeurs par des "," :

```sql
INSERT INTO school
  (name, country, capacity) 
VALUES
  ('Beauxbatons Academy of Magic', 'France', 550), 
  ('Castelobruxo', 'Brazil', 380), 
  ('Durmstrang Institute', 'Norway', 570);
```

```resource
https://harrypotter.fandom.com/wiki/Wizarding_school
# Plus d’informations sur les écoles de magie
```

```resource
https://www.w3schools.com/sql/sql_insert.asp
# INSERT - SQL
Tout savoir sur la commande **INSERT**
```

## Comment modifier des données ?

Maintenant que tu sais insérer des données, tu vas apprendre comment les modifier.

Cette fois-ci, le mot-clé qui va nous intéresser est **UPDATE**.

Voici la syntaxe que prend une requête SQL de mise à jour :

```sql
UPDATE <table>
SET colonne1 = valeur1, colonne2 = valeur2, etc...
WHERE <conditions>;
```

```alert-warning
Sois bien vigilant lorsque tu effectues une modification dans une table. La clause `WHERE` permet de cibler quelles lignes doivent être mises à jour. Si tu oublies ce `WHERE`, **toutes** les données de la table seront modifiées. Dans la très grande majorité des cas, un `UPDATE` se fait donc accompagner d’un `WHERE` (qui fonctionne par ailleurs de la même façon que pour une requête `SELECT`). 
```

Effectue un `SELECT * FROM school` afin de lister toutes les écoles dans ta table. Tu dois normalement avoir quatre enregistrements. Si tout s’est bien passé, l’école Hogwarts (Poudlard en français) doit avoir l’id numéro 1. **Cependant**, si tu as effectué certaines commandes dans le désordre, il est tout à fait possible que la valeur de cet id soit différente. Ce n’est absolument pas grave. La “valeur” de l’id n’a aucune importance en soi. Ce qui compte, c’est que ce champ soit unique, afin de pouvoir être utilisé en tant que clé primaire. Dans les exemples qui suivent, c’est l’id “1” qui va donc être utilisé pour identifier Hogwarts, mais **pense à changer** la valeur si elle est différente dans ton cas.

![](https://storage.googleapis.com/quest_editor_uploads/N1ssf8UzwE1Yruy16j0DeKBLVeeyfrYD.jpg)

Il y a plus d’élèves cette année. La capacité de l’école doit passer à 450. Exécute la requête suivante :

```sql
UPDATE school
SET capacity = 450
WHERE id = 1;
```

Si tu récupères à nouveau (`SELECT`) les données de ta table `school`, la capacité de _Hogwarts School of Witchcraft and Wizardry_ doit être maintenant de 450 !

```alert-warning
N'oublie pas la clause `WHERE` dans ton `UPDATE`, sous peine de changer **TOUS** les tuples de ta table ! La plupart du temps, une mise à jour ne touche qu’un seul tuple. Tu utiliseras dans ce cas la clé primaire dans le `WHERE` pour t’assurer d’identifier uniquement cette ligne.
```

```resource
https://www.w3schools.com/sql/sql_update.asp
# UPDATE - SQL
Tout savoir sur la commande **UPDATE**
```

## Comment supprimer des données ?

Le mot-clé qui va t’intéresser cette fois est **DELETE**.

Voici la syntaxe que prend une requête SQL de suppression :

```sql
DELETE FROM <table>
WHERE <conditions>;
```

```alert-warning
Comme pour l’_update_, sois bien vigilant lorsque tu effectues une suppression dans une table. Le mot-clé `WHERE` spécifie quels tuples doivent être supprimés. Si tu oublies ce `WHERE`, **toutes les données** de la table seront supprimées.
```

Tu vas maintenant supprimer l’école de “Castelobruxo”, avec l’id 3. Là encore, si dans ton cas l’id est différent, modifie juste sa valeur dans la requête afin d’effacer la bonne école.

Exécute la requête suivante :

```sql
DELETE FROM school
WHERE id = 3;
```

Si tu regardes à nouveau ta table `school`, l’école a disparu !

Tu peux également spécifier d'autres conditions de suppression. Si par exemple, tu veux supprimer toutes les écoles dont la capacité est supérieure à 500, tu peux exécuter la requête suivante :

```sql
DELETE FROM school
WHERE capacity > 500;
```

_Beauxbatons_ et _Drumstrang_ ont normalement été supprimées, tu ne devrais plus avoir que _Hogwarts_ dans ta table.

```alert-warning
# Rappel (encore)
N'oublie jamais la clause `WHERE` dans un `DELETE`, sous peine de supprimer **TOUTES** les lignes de ta table !!
```

```resource
https://sql.sh/cours/delete
# DELETE - SQL
Cours détaillé sur le `DELETE`
```

La commande `DELETE` te permet donc de supprimer une ou plusieurs lignes, selon certaines conditions. Si tu souhaites cependant vider une table de **toutes** ses données (sans supprimer la structure de la table elle-même), tu peux alors utiliser la commande `TRUNCATE <table>`. Cette commande sera alors plus performante qu’un `DELETE FROM <table>`. Autre différence notable, `TRUNCATE` **réinitialise l’auto-incrémentation**, ce qui n’est pas le cas pour `DELETE`.

Effectue la commande :

```sql
TRUNCATE school;
```

puis vérifie que la table school est maintenant bien vide de toutes données, avant de passer au challenge.

```resource
https://sql.sh/cours/truncate-table
# TRUNCATE - SQL
plus d’informations sur cette commande et ses différences avec `DELETE`
```

## Challenge

Effectue les requêtes suivantes :

* Insère dans la table `school` les données suivantes :

| name | country | capacity |
| ---- | ------- | -------- |
| Beauxbatons Academy of Magic | France | 550 |
| Castelobruxo | Brazil | 380 |
| Durmstrang Institute | Norway | 570 |
| Hogwarts School of Witchcraft and Wizardry | United Kingdom | 450 |
| Ilvermorny School of Witchcraft and Wizardry | USA | 300 |
| Koldovstoretz | Russia | 125 |
| Mahoutokoro School of Magic | Japan | 800 |
| Uagadou School of Magic | Uganda | 350 |

* “Durmstrang Institute” est en réalité en Suède (*Sweden*), modifie son pays.
* “Koldovstoretz” passe à une capacité de 150.
* Supprime en une seule requête toutes les écoles comportant “Magic” dans leur nom (il y en a 3). Tu peux t’aider du mot clé `LIKE`.
* Affiche via une requête `SELECT` toutes les données de la table `school`.

Poste tes requêtes et leurs résultats en solution.

### Critères de validation

* La solution contient toutes les requêtes SQL : 1 requête d’insertion, 2 requêtes de modification, 1 requête de suppression et 1 sélection.
* Elle contient également le tableau des données finales de la table `school` (5 écoles restantes, avec les capacités et pays modifiés selon les consignes).

1. Insère les données dans la table `school` :

```sql
insert into school
  (name, country, capacity)
  values
  ('Beauxbatons Academy of Magic', 'France', 550),
  ('Castelobruxo', 'Brazil', 380),
  ('Durmstrang Institute', 'Norway', 570),
  ('Hogwarts School of Witchcraft and Wizardry', 'United Kingdom', 450),
  ('Ilvermorny School of Witchcraft and Wizardry', 'USA', 300),
  ('Koldovstoretz', 'Russia', 125),
  ('Mahoutokoro School of Magic', 'Japan', 800),
  ('Uagadou School of Magic', 'Uganda', 350);

Query OK, 8 rows affected
Records: 8  Duplicates: 0  Warnings: 0
```

2. “Durmstrang Institute” est en réalité en Suède :

```sql
update
  school
set
  country = 'Sweden'
where
  name = 'Durmstrang Institute';

Query OK, 1 row affected
Rows matched: 1  Changed: 1  Warnings: 0
```

3. “Koldovstoretz” passe à une capacité de 150 :

```sql
update
  school
set
  capacity = 150
where
  name = 'Koldovstoretz';

Query OK, 1 row affected
Rows matched: 1  Changed: 1  Warnings: 0
```

4. Supprime en une seule requête toutes les écoles comportant “Magic” dans leur nom :

```sql
delete from
  school
where
  name like '%Magic%';

Query OK, 3 rows affected
```

5. Affiche via une requête SELECT toutes les données de la table school :

```sql
select * from school;

+----+----------------------------------------------+----------+----------------+
| id | name                                         | capacity | country        |
+----+----------------------------------------------+----------+----------------+
|  2 | Castelobruxo                                 |      380 | Brazil         |
|  3 | Durmstrang Institute                         |      570 | Sweden         |
|  4 | Hogwarts School of Witchcraft and Wizardry   |      450 | United Kingdom |
|  5 | Ilvermorny School of Witchcraft and Wizardry |      300 | USA            |
|  6 | Koldovstoretz                                |      150 | Russia         |
+----+----------------------------------------------+----------+----------------+
5 rows in set
```