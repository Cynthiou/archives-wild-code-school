# Introduction

![image](https://www.mashbox.org/wp-content/uploads/2017/03/panda7.jpg)

###### ⚠️ Before starting this quest, you must have finished the following quests:

```quests
140
```

# 💪 Challenge

### Exercice 1 : the cutest one

Choose the cutest animal between these 3 possibilities : 🐼🐱🕷️

```php
$cutestAnimal = ''; // copy your choice here
```

Create condition to display the corresponding sentence, depending of your choice
- 🐼 : "You are right, pandas are so cuuute (and they can do kung fu !)"
- 🐱 : "Little kittens are cute too (just before scratching you slyly 🩹...)"
- 🕷️ : "Erk, you're a creepy one"
- Empty or any other choice : "Please choose the cutest animal in this list 🐼🐱🕷️"


### Exercice 2 : Biodiversity protection

Biodiversity is in danger.  
- 🐱 : 1000000000 individuals
- 🐼 : 1000 individuals
- 🐘 : 150 individuals
- 🦖 : 0 individual

Create a condition to display the correct threat status according to a species population.

```php 
$animalPopulation = 0; // choose one of the value above
```

- if the animal population is zero, animal is extinct
- if the animal population is < 200, animal is critically endangered
- if the animal population is < 3000, animal is threatened
- more >= 3000, population is not threatened.                     

## Exercice 3 : Dangerous animals

Please find some data about various animals dangerosity
- 🐻 600kg,  carnivorous     => dangerous
- 🐑 60kg,   not carnivorous => not dangerous
- 🐘 1200kg, not carnivorous => dangerous
- 🦔 1kg,    carnivorous     => not dangerous
- 🐇 3kg,    not carnivorous => not dangerous
- 🦖 8000kg,  carnivorous    => dangerous

```php
$isCarnivorous = true; // if you choose 🐻
$weight = 600; 
```

Create a condition to determine if an animal is dangerous or not. The rules are :
- dangerous if the animal is carnivorous AND weights more than 50kg, OR if it weights more than 1000kg. Display 'Ouch, you should run !'
- In all other case, display 'It is gentle as a lamb 🐑'


# 🧐 Acceptance criteria

* [ ] Conditions works fine with different values
* [ ] You master the condition syntax
* [ ] You know the difference between if / elseif / else