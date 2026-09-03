# Introduction



Si tu n'as jamais entendu parler de conflits dans **git**, ne t'inquiète pas, tu auras à les gérer assez souvent en travaillant sur certains projets d'équipe.

Les conflits sont généralement inévitables lorsque tu travailles en équipe.

Dans cette quête, nous allons aborder ce que sont les conflits et comment nous pouvons les gérer.

![Fusion - illustration](images/001-fusion-illustration.jpg)



## 🤓 **À la fin de cette quête, tu seras en mesure de:**



* ✅ Résoudre les conflits liés à la fusion
* ✅ Comprendre comment réaliser une fusion

- - -







# ⏬ **Git pull, une commande qui te veut du bien**



**Définition**

Lorsque plusieurs personnes collaborent à un même projet, elles **modifient constamment les fichiers**.

Imagine que tu travailles sur un fichier texte; pendant ce temps, un de tes collègues modifie des lignes sur le même fichier.

Dans un monde sans Git, pour harmoniser votre travail, tu dois récupérer une copie de ses fichiers et comparer les différences avec ta version, puis copier les lignes de code correspondantes de la nouvelle présentation du texte et les coller dans ton fichier.

C'est une opération longue et risquée, car tu ne seras peut-être pas en mesure de repérer tous les changements effectués par ton collègue. Et dans un cas réel, tu peux être amené à modifier beaucoup de lignes sur un grand nombre de fichiers, et qu'il y ait non pas un, mais plusieurs autres collègues travaillant simultanément dessus. Cela devient un casse tête très rapidement.

Heureusement, **Git peut faire ce travail pour toi!**
C'est ce qu'on appelle une **fusion** (merging). Elle est réalisée par la commande "git pull" (il y a d'autres façons de le faire, mais c'est suffisant pour l'instant), qui te permet de **mettre à jour tes fichiers locaux avec les fichiers distants** (par exemple, sur le repo GitHub).

Dans la plupart des cas, cette *fusion* est **automatique** : Git localise de lui-même les différences entre tes fichiers locaux et leurs homologues distants et les intègre dans tes fichiers locaux.

Pour voir les effets d'un "git pull", utilise [cet outil](https://onlywei.github.io/explain-git-with-d3/#pull) (ne fais pas attention au texte explicatif, il dépasse la portée de cette quête).



# **Conflits de fusion**



Observe un exemple de conflit et sa résolution dans cette vidéo.

```youtube
https://www.youtube.com/watch?v=xPKeNPLLss8
```

- - -

# 💪 Challenge

1. Crée un nouveau dépôt sur GitHub, en cochant "Initialize this repository with a README".
2. Toujours dans GitHub, écris quelques lignes de texte dans le fichier README.md.
3. Clone le repo.
4. Sur GitHub, écris "REMOTE" sur la première ligne du README.md et fais un commit pour ce changement.
5. Localement (sur ton ordinateur), dans ton éditeur de code préféré, modifie également la première ligne du README.md (écris "LOCAL") et commit la modification.
6. Dans ton Terminal, fais un "git pull" et Un joli petit conflit apparaîtra !
7. Réouvre ton éditeur, résous le conflit dans le README.md (choisis de garder "LOCAL") et fais un commit pour ce changement.
8. Fais une nouvelle tentative, Git te dira que tu es déjà à jour. Le conflit est réglé !
9. Envoie tes modifications au repo distant en faisant un git push origin main.
10. Dans GitHub, ouvre le README.md et assure-toi que "LOCAL" est maintenant sur la première ligne. Bien joué !
11. Copie le contenu de ton terminal du premier git pull (étape 6 de ces instructions) jusqu'à la fin et colle-le en solution.


# 🧐 Critères de validation

* [ ] Le contenu du Terminal est bien posté en solution.
* [ ] La première utilisation de git pull provoque un conflit.
* [ ] La deuxième utilisation de git pull indique "déjà à jour" (le conflit a été résolu).