## Objectifs

- Approfondir la méthode Merise
- Comprendre la construction d'un MPD

## Introduction

Pour pouvoir créer une base de données, tu as découvert la construction d'un MCD et sa conversion en MLD. La dernière étape est de réaliser un MPD.

## Sommaire

## La méthode Merise (rappels)

Modéliser une base de données est une étape cruciale mais complexe. Elle dépend avant tout de la compréhension des règles métiers, c'est-à-dire des **besoins du client**. Parfois, plusieurs façons de modéliser une base peuvent répondre à ces besoins.

Bref, cela demande avant tout de la **rigueur** et de **l’expérience**. La méthodologie Merise (datant des années 70) apporte des règles précises pour t’aider à modéliser convenablement tes données.

```alert-warning
La méthode Merise est très vaste. Nous ne la couvrirons pas de manière exhaustive. Nous allons l'aborder de manière _pragmatique_.

Avec le contenu de cette quête, tu pourras réaliser rapidement des modélisations simples. N’hésite pas à t’intéresser davantage à Merise par la suite, afin d’acquérir un certain vocabulaire et des solutions pour résoudre des cas plus complexes.
```

Dans le cadre de la formation, tu ne vas utiliser "que" 3 modèles de la méthode Merise. Dans l'ordre :

* MCD : Modèle Conceptuel de Données
* MLD : Modèle Logique de Données
* MPD : Modèle Physique de Données

Cette quête décrit l'étape 3 : le **Modèle Physique de Données (MPD)**.

## MPD : spécifique à ton SGBD

La partie MPD (Modèle Physique de données) est censée prendre en compte les spécificités du SGBDR utilisé. Pour faire simple, tu dois choisir les types de tes champs : certains types particuliers peuvent être spécifiques à des SGBDR et ne pas exister sur d'autres. Le choix de ton système de base de données et la connaissance de ses types spécifiques sera donc important pour cette partie.

Rassure-toi. Pour les types les plus courants (texte, nombre, date...), la plupart des systèmes basés sur SQL te proposeront les mêmes outils. Pour faire ton MPD, tu peux même directement écrire le script SQL de création de ta base de données :

```sql
CREATE TABLE wizard (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    school_id INT NOT NULL
);
```

Un point important sur `school_id`. Si le sorcier avec l’id **1** (par exemple Harry Potter) est inscrit à Hogwarts (avec l’id **2** dans la table `school`), le champ `school_id` de la table `wizard` prendra la valeur **2** pour le sorcier **1**. Les tables sont donc reliées par ces champs `school_id` de la table `wizard` et `id` de la table school.

```columns

School :

id | name | capacity
--- | --- | ---
2 | Hogwarts | 999

!---

Wizard :

id | firstname | lastname | school_id
--- | --- | --- | ---
1 | Harry | Potter | 2

```

Et le tour est joué !

Enfin presque... Imagine (via un INSERT ou un UPDATE) que la valeur **8** soit insérée dans le `school_id` d’un élève, alors que cette école n’existerait pas dans la table `school`.

```columns

School :

id | name | capacity
--- | --- | ---
2 | Hogwarts | 999

!---

Wizard :

id | firstname | lastname | school_id
--- | --- | --- | ---
1 | Harry | Potter | 2
2 | Hocus | Pocus | 8 ❌

```

De même, si le tuple **2** est effacé de la table `school`, Harry se retrouverait alors relié à une école qui n’existe plus. Tu te retrouves avec une incohérence dans l’intégrité de tes données, ce qui entraînera à coup sûr divers bugs dans ton application !

Pour pallier ce problème, tu peux définir une **contrainte de clé étrangère**. Elle permet d’empêcher une insertion dans la table `wizard` si la valeur du `school_id` associée n’existe pas dans la table `school` (idem, elle empêche la suppression d’un tuple qui serait relié à des données dans une autre table). Ainsi, cela te protège de nombreuses erreurs. C’est donc **indispensable** pour conserver des données saines et cohérentes.

Pour définir une contrainte de clé étrangère, une fois le champ `school_id` créé, tu peux utiliser la commande SQL suivante :

```sql
ALTER TABLE wizard
  ADD CONSTRAINT fk_wizard_school
  FOREIGN KEY (school_id)
  REFERENCES school(id);
```

Tu peux également définir une contrainte de clé étrangère directement à la création d’une table :

```sql
CREATE TABLE wizard (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    school_id INT NOT NULL,
    CONSTRAINT fk_wizard_school
        FOREIGN KEY (school_id)
        REFERENCES school(id)
);
```

Dans les deux cas, les mots-clés à retenir sont :

- CONSTRAINT  : tu indiques ici le nom que tu souhaites, qui te permet d’identifier ta contrainte.
- FOREIGN KEY() : indique que tu souhaites créer une contrainte de type “clé étrangère” sur le champ indiqué entre les parenthèses, ici `school_id`, de la table `wizard`.
- REFERENCES () : et ce dernier mot-clé indique que la clé étrangère fait référence ici au champ id de la table `school`. 

```resource
https://www.w3schools.com/sql/sql_foreignkey.asp

Plus d’information sur la syntaxe de la contrainte de clé étrangère
```

## Challenge

Bienvenue au cours de potions magiques (étape 3) !

Chaque potion que tu vas créer a un nom. Les potions utilisent des ingrédients, et chaque ingrédient est défini par son nom.

Ça fait beaucoup d’informations à retenir... Pour ne rien oublier, tu aimerais stocker en base de données quels ingrédients sont nécessaires pour chaque potion. J'ai travaillé ce MCD et ce MLD pour t'aider :

![](https://storage.googleapis.com/quest_editor_uploads/IzYoEEdYoOYmVDX0jkYlDCs7KAaCtMcH.png)

```alert-info
[Tu trouveras ici](https://harrypotter.fandom.com/fr/wiki/Potions) quelques potions et ingrédients, afin de mieux comprendre la problématique métier et d'évaluer la bonne taille pour tes noms.
```

Propose **un MPD** qui correspond au MLD.

Astuce : pour la table `ingredient_potion`, tu auras besoin de créer [une clé primaire composite](https://www.geeksforgeeks.org/composite-key-in-sql/).

### Critères de validation
- Le code SQL de la modélisation est posté
- La modélisation permet de stocker les informations sur les ingrédients utilisés dans chaque potion.

Une solution possible :

```sql
CREATE TABLE potion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL
);

CREATE TABLE ingredient (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL
);

CREATE TABLE ingredient_potion (
    ingredient_id INT NOT NULL,
    potion_id INT NOT NULL,
    CONSTRAINT pk_ingredient_potion
        PRIMARY KEY (ingredient_id, potion_id),
    CONSTRAINT fk_ingredient_potion_ingredient
        FOREIGN KEY (ingredient_id)
        REFERENCES ingredient(id),
    CONSTRAINT fk_ingredient_potion_potion
        FOREIGN KEY (potion_id)
        REFERENCES potion(id)
);
```