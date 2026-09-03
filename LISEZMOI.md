# Archive de mes quêtes Wild Code School

Cet outil sauvegarde sur ton ordinateur les cours (« quêtes ») auxquels ton compte
étudiant Odyssey a normalement accès, et fabrique un petit site pour les consulter
hors ligne — même après la fermeture de la plateforme.

---

## Ce dont tu as besoin

- **Node.js** (tu as la version 24, c'est parfait — il en faut au moins 20)
- **Chrome** ou **Edge** installé (l'outil réutilise celui que tu as déjà, il ne
  télécharge aucun navigateur)
- Ton compte étudiant Wild Code School

---

## Démarrer, la première fois

Ouvre **Git Bash** dans ce dossier (clic droit dans le dossier → *Open Git Bash here*),
puis tape ces deux commandes, l'une après l'autre :

```bash
npm install
```

```bash
npm start
```

Une fenêtre de navigateur s'ouvre. **Connecte-toi à Odyssey comme d'habitude.**
Le programme repart tout seul dès que tu es connectée.

C'est tout. Il n'y a rien d'autre à faire : l'extraction se déroule, puis le site
se construit.

> Ton mot de passe n'est jamais demandé, ni lu, ni enregistré par ce programme.
> C'est toi qui te connectes, dans un vrai navigateur. L'outil se contente ensuite
> de réutiliser la session ouverte, exactement comme le fait le site lui-même.

---

## Consulter ton archive

Ouvre le fichier :

```
site\index.html
```

Tu arrives sur l'accueil avec tous les thèmes. Tu cliques sur un thème, tu vois ses
quêtes, tu cliques sur une quête, tu lis le cours. En bas de chaque quête, des liens
« Précédent » et « Suivant ».

Le site fonctionne **sans connexion Internet** et ne dépend plus du tout de la Wild.
Tu peux le copier sur une clé USB, sur ton disque dur externe, ou le déposer plus
tard chez un hébergeur : il marchera sans rien changer.

---

## Les autres commandes

| Commande | À quoi ça sert |
|---|---|
| `npm start` | Extrait ce qui manque, puis reconstruit le site |
| `npm start -- --limite=5` | N'extrait que 5 quêtes — pratique pour un essai rapide |
| `npm start -- --site-seulement` | Reconstruit le site sans rien retélécharger |
| `npm start -- --forcer` | Réextrait tout, même ce qui est déjà archivé |
| `npm test` | Vérifie que la chaîne de traitement des images fonctionne |

---

## Si tu arrêtes en cours de route

Aucun problème. Ferme la fenêtre, éteins le PC, ce que tu veux.

À la prochaine exécution de `npm start`, le programme **reprend où il s'était
arrêté** : les quêtes déjà archivées sont sautées, il ne refait que ce qui manque.
C'est le fichier `archive/manifest.json` qui garde la mémoire de tout ça.

---

## Où sont rangées les choses

```
Wild Code School - Archive Quetes/
│
├── site/                     ← TON ARCHIVE À CONSULTER
│   ├── index.html               l'accueil : ouvre celui-ci
│   ├── base-de-donnees/
│   │   ├── index.html           la liste des quêtes du thème
│   │   └── 001-00-installer-mysql/
│   │       ├── index.html       le cours mis en page
│   │       ├── cours.md         le même cours en Markdown (Obsidian, VS Code...)
│   │       └── images/          les images du cours, renommées lisiblement
│   └── assets/style.css
│
├── archive/                  ← LES DONNÉES BRUTES (la sauvegarde de fond)
│   ├── manifest.json            ce qui a été archivé, et quand
│   ├── themes.json              les thèmes de la plateforme
│   ├── replays.json             l'inventaire des vidéos (voir plus bas)
│   └── quests/2472/
│       ├── cours.md             le Markdown d'origine, intact
│       └── quest.json           titre, thème, date, ressources partagées
│
├── logs/archive.log          ← le journal détaillé
│
├── src/                      ← le code du programme
└── LISEZMOI.md               ← ce fichier
```

Les deux dossiers ont chacun leur rôle : **`site/`** est ce que tu consultes,
**`archive/`** est la sauvegarde brute qui permettrait de tout regénérer, même si
tu changeais complètement l'apparence du site plus tard.

---

## En cas de souci

**Le programme s'arrête en disant que la session a expiré.**
Relance simplement `npm start` et reconnecte-toi. Rien n'est perdu.

**Une quête est en échec.**
Relance `npm start` : seules les quêtes manquantes seront retentées. Une erreur sur
une quête n'interrompt jamais les autres.

**Une image n'a pas pu être récupérée.**
C'est écrit dans `logs/archive.log` avec son adresse. Certaines images des cours
sont hébergées sur des sites extérieurs qui ont fermé depuis : celles-là ne sont
plus récupérables par personne. Dans ce cas, le cours garde l'adresse d'origine.

**Le navigateur ne s'ouvre pas.**
Vérifie que Chrome ou Edge est bien installé. L'outil essaie Chrome d'abord, puis Edge.

---

## Les vidéos (replays)

Les replays ont leur propre commande, séparée de l'archivage des cours parce
qu'ils pèsent infiniment plus lourd.

### 1. D'abord mesurer, sans rien télécharger

```bash
npm run videos
```

Cette commande interroge chaque vidéo pour connaître son poids réel et t'affiche
le total, la moyenne, et le détail par catégorie. **Elle ne télécharge rien.**
C'est elle qui permet de décider où stocker et combien prendre. Le détail est
aussi écrit dans `archive\replays-mesures.json`.

### 2. Ensuite télécharger

```bash
npm run videos -- --telecharger
```

Les vidéos arrivent dans `videos\`, classées par catégorie et renommées avec
leur date en premier, pour que le tri du dossier soit chronologique :

```
videos/
├── Masterclass/
│   └── 2026-06-12 - Comment devenir indépendant freelance.mp4
├── Live coding/
│   └── 2026-08-31 - TuneLab - On reprend les bases.mp4
├── Cours/
├── Carriere/
└── Atelier/
```

### Choisir où et combien

| Commande | Effet |
|---|---|
| `npm run videos -- --telecharger --dossier="D:\Replays"` | Écrit sur ton disque externe (ou un dossier Google Drive synchronisé) |
| `npm run videos -- --telecharger --categorie=Masterclass` | Une seule catégorie |
| `npm run videos -- --telecharger --max-go=15` | S'arrête une fois 15 Go téléchargés |

Tu peux interrompre à tout moment : une vidéo déjà téléchargée et complète est
sautée au lancement suivant. Un fichier incomplet est repris depuis le début
(il porte l'extension `.part` tant qu'il n'est pas terminé).

### Deux détails techniques qui comptent

Les adresses de téléchargement fournies par la plateforme **expirent au bout
d'une heure**. Le programme les redemande automatiquement quand la session
dépasse 40 minutes : un téléchargement long ne s'interrompt donc pas.

Les vidéos hébergées sur **YouTube** ne sont pas téléchargées : elles ne
dépendent pas de la Wild, et les conditions de YouTube l'interdisent. Elles
restent listées avec leur lien.

## Ce que fait exactement le programme

1. Ouvre un navigateur, attend que tu te connectes, lit le jeton de session.
2. Demande la liste de tes quêtes et des thèmes.
3. Pour chaque quête : récupère le Markdown d'origine et les ressources partagées,
   télécharge les images, leur donne des noms compréhensibles, réécrit le cours pour
   qu'il pointe vers les fichiers locaux, et inscrit le tout au manifeste.
4. Inventorie les replays.
5. Fabrique le site : accueil, pages de thèmes, pages de quêtes, navigation.

Il reste poli avec le serveur : quatre téléchargements en parallèle au maximum, une
pause entre chaque quête, trois tentatives maximum, et un délai d'attente sur chaque
requête. Le but est d'archiver tes cours, pas de peser sur la plateforme.

---

*Archive personnelle, à usage strictement privé.*
