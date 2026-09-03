## Objectifs

* Utiliser correctement les liens hypertextes en HTML

## Pré-requis

````stepper
# Valider la quête suivante
```quests
2113
```
# Être à l'aise avec l'utilisation des attributs HTML
```html
<img src="https://placekitten.com/200/287" alt="A cute cat" />
```
````

## Introduction

Précédemment, tu as vu les principes de bases du langage HTML.

Dans cette quête nous allons voir un peu plus en détail comment fonctionnent les liens hypertextes pour naviguer entre plusieurs pages web. 

## Sommaire

## Qu'est-ce qu'un lien hypertexte ?

Un lien hypertexte est un lien qui permet de naviguer d'une page à une autre, en cliquant dessus. 

Les liens hypertextes sont tout ce qui a fait du HTML une révolution à l'époque de sa création dans les années 1990. Le terme "hypertexte" a été introduit par Ted Nelson en 1965, et l'idée est bien plus ancienne encore. Mais le web en est la réalisation la plus aboutie. N'importe quel document du web peut être lié à un autre, quel que soit l'endroit où ces documents sont stockés. 

Un lien hypertexte peut rediriger vers un contenu externe (via une url) ou un contenu interne (via un chemin d'accès).

## La balise <a>

Les liens hypertextes sont créés avec la balise `<a>`. Tu peux spécifier ensuite la destination grâce à l'attribut "href" comme suit :

```html
<p>Retourner sur la <a href="home.html">page d'accueil</a></p>
<p>Visiter notre <a href="https://facebook.com/wildcodeschool">page facebook</a></p>
```

Lorsque le fichier est dans le même dossier que la page qui contient le lien, tu peux donner le chemin d'accès du fichier :

```html
<p>Retourner sur la <a href="home.html">page d'accueil</a></p>
```

Tu peux définir ton chemin à partir de la racine du site en commençant par le caractère `/` :

```html
<p>Découvrez <a href="/pages/about.html">plus d'infos</a></p>
```

Si le fichier est dans un dossier parent, tu dois utiliser `../` pour sortir du dossier dans lequel est la page courante suivi du nom du fichier ou du dossier :

```html
<p>Retourner sur la <a href="../home.html">page d'accueil</a></p>
<p>Consulter <a href="../assets/cv.pdf">Mon CV</a></p>
```

### Liens d'ancrage

Tu peux créer des liens qui redirigent vers une partie de la page. 

Pour cela tu dois ajouter un id sur l'élément vers lequel tu veux pointer :

```html
<h2 id="citation">Citation sur les chats</h2>
```

Et mettre un lien dans la page avec dans l'attribut `href` le symbole "#" suivi du nom de l'id :

```html
<a href="#citation">Voir notre dernière citation sur les chats</a>
```

### Envoyer un email ou rediriger vers un client d'appel téléphonique

Tu peux utiliser dans l'attribut `href` le protocole `mailto`. Ce protocole indique au navigateur que le lien pointe vers une adresse mail :

```html
<p><a href="mailto:bob.smith@gmail.com">M'envoyer un email</a></p>
```

Cliquer sur un lien "mailto" ouvrira généralement un client de messagerie.


De la même manière, tu peux pointer vers un numéro téléphonique en utilisant le protocle `tel:` dans l'attribut "href" :

```html
<p><a href="tel:+3361020304">Me contacter par Téléphone</a></p>
```

Cette fonctionnalité est particulièrement utile quand la page est affichée sur un téléphone : elle permet d'appeler le numéro pointé d'un simple clic.

### Title

Tu peux donner un titre à tes liens avec l'attribut `title`. 

Donner un titre au lien est une excellente pratique pour l'accessibilité car il permet de donner plus de contexte aux utilisateurs de lecteurs d'écrans. 

L'information sera également visible lorsque tes utilisateurs passeront leurs curseurs sur le lien.

```html
<p>Visiter notre <a href="https://facebook.com/wildcodeschool" title="Retrouvez toute l'actualité de la Wild Code School et les derners événements sur notre page Facebook">page facebook</a></p>
```

### Target

Tu peux spécifier comment ouvrir le lien grâce à l'attribut `target`. 

Par exemple, en donnant la valeur `_blank`, la page s'ouvrira dans un nouvel onglet (par défaut la page s'ouvrira dans le même onglet que la page du lien) : 

```html
<p>Visiter <a href="https://facebook.com/wildcodeschool" target="_blank">notre page facebook</a></p>
```

### Download

Lorsque ton lien contient une ressource à télécharger, tu peux donner un nom de fichier d'enregistrement par défaut avec l'attribut `download` : 

```html
<p>Télécharger<a href="../assets/cv.pdf" download="cv-bob-smith.pdf">Mon CV</a></p>
```

## Bonnes pratiques 

Le texte de tes liens doit toujours être **clair**. Le texte est utilisé par les moteurs de recherches pour détecter les liens, et les utilisateurs de lecteurs d'écran sautent souvent de lien en lien : ils entendent donc parfois le nom des liens sans le contexte de la phrase. 

Par exemple dans la phrase "Cliquez ici pour accéder à notre page facebook" il est plus judicieux de mettre le lien sur "notre page facebook" que sur "Cliquez ici".

## Résumé

* Les liens hypertextes permettent de lier des pages les unes aux autres afin de permettre aux utilisateurs de naviguer entre les différentes pages.

* Les liens sont créés avec la balise `<a>`.

* L'attribut `href` permet de donner la destination du lien.

* Un lien peut mener vers une ressource interne ou externe.

* Tu dois toujours être explicite dans le texte de tes liens.

## Challenge

Crée une nouvelle page HTML pour pratiquer les liens. Cette page devra contenir: 

* Une liste non ordonnée avec 
  * Un lien vers une page interne
  * Un lien vers une page externe 
  * Un lien de téléchargement vers un document interne 
* De nombreux paragraphes pour que la page soit longue. Tu peux utiliser du faux texte comme le lorem ipsum pour remplir la page : sur Visual Studio tu peux taper lorem suivi de shift pour écrire du lorem ipsum, si tu ajoutes *10 tu auras 10 paragraphes, *100, 100, etc.
* Un lien d'ancrage en bas de la page pour retourner au début de la page.

Les liens doivent avoir des titres et être explicites. 

### Critères de validation

* [ ] La structure de base du document HTML est respectée
* [ ] Les liens sont clairs et explicites
* [ ] Les liens contiennent des titres
* [ ] Un lien vers une page interne et un lien vers une page externe sont présents
* [ ] Un lien d'ancrage est présent et redirige vers le haut de la page


````solution
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Links practice page</title>
</head>

<body>
    <h1 id="page-title">Bienvenue sur mon site internet</h1>

    <ul>
        <li><a href="about.html" title="Découvrez en plus à propos de moi sur cette page!">À propos</a></li>
        <li> Découvrez la
            <a href="https://facebook.com/wildcodeschool"
                title="Découvrez la page Facebook de mon école, la Wild Code School">page Facebook de la Wild Code
                School</a>
        </li>
        <li>
            <a href="cv.pdf" title="Télécharger mon CV" download="cv-bob-smith.pdf">Télécharger mon CV</a>
        </li>
    </ul>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus, ipsa deleniti possimus, quaerat
        maiores, illum quis accusamus sequi ullam sunt autem. Optio impedit expedita repellendus possimus qui est odit!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio reiciendis corporis ad rerum dolorem dolore,
        voluptate laboriosam eaque sint obcaecati iure architecto officiis quasi nobis dicta repellendus hic incidunt
        quos.
        Ratione quo facere sequi odit! Alias perferendis, sapiente neque quaerat quas, voluptatem placeat ex unde nulla
        sit voluptas sequi earum rerum autem culpa ullam modi dicta quae! Doloremque, repellat quos!
        Consequatur autem minus nisi quasi sed nesciunt et omnis? Eos incidunt consequuntur molestias id quis delectus
        minima, cumque facere enim et quasi, possimus accusamus asperiores dolor dolorum eius nihil? Recusandae!
        Debitis, iusto sapiente. Nisi obcaecati culpa modi, voluptates assumenda quisquam repellat temporibus corporis
        mollitia, quaerat sed! Est necessitatibus modi iste provident asperiores. Perferendis ipsa quia iure facilis
        reprehenderit modi rerum.
        Voluptatibus, blanditiis voluptate libero odit quod ut impedit laboriosam quaerat incidunt obcaecati ab quidem
        eos, qui a similique minus! Cumque nemo, numquam perspiciatis vel repudiandae provident voluptatem sunt ipsam
        nihil!
        Ipsam, hic dignissimos aliquam itaque quam minima quos sit iusto vero quaerat asperiores deleniti cum nostrum
        tempore, autem nemo a recusandae nesciunt. Voluptatum voluptas natus, veritatis dolorum saepe error nisi?
        Beatae earum provident impedit ut quibusdam quos aliquam nobis saepe et magni aliquid voluptatum veritatis
        quidem, nihil rerum. Quas perferendis facere inventore mollitia quod minus nam dolorum praesentium, delectus
        facilis.
        Amet, voluptas inventore ipsa blanditiis quo atque a quas sed aliquam voluptatem iure cupiditate, commodi
        incidunt fugit vero temporibus. Unde mollitia velit debitis cupiditate ipsa numquam laboriosam assumenda sint
        natus.
        Quaerat amet sapiente cupiditate enim, tempora nihil asperiores porro laborum ab quod expedita nulla fugiat
        consectetur? Porro repudiandae alias aperiam mollitia eos quia? Porro tempore ab at voluptatem, commodi fugit.
        Explicabo illo modi minima quae odio veritatis optio incidunt voluptates dolorum soluta officiis eaque dolor,
        ipsa quaerat unde repellendus ducimus sed nulla numquam hic similique alias id exercitationem corrupti! Cumque!
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt doloremque eaque saepe eveniet dolor
        architecto suscipit assumenda, voluptatibus expedita, veniam quo numquam illum possimus deserunt, debitis libero
        tempora! Reprehenderit, ducimus?
        Architecto repudiandae eum quae unde ex sapiente molestias! Vel cupiditate laboriosam minus dolore minima?
        Aperiam sed possimus consectetur, explicabo nisi similique, libero saepe est, laudantium natus iusto? Ea, quidem
        iure?
        Aliquam consectetur minima natus repudiandae impedit velit dolorem et cum nemo nam! Aspernatur molestiae odit
        vero necessitatibus. Voluptatum ipsa in labore, recusandae eaque facere, sit nemo odio at illo fugit!
        Iste laboriosam officia minima doloremque veniam, maiores suscipit tempore fugiat itaque tenetur incidunt
        expedita vitae dolore praesentium, laudantium et nostrum cumque, aliquam reprehenderit. Accusamus quasi maxime
        fugiat iure magnam qui.
        Officiis adipisci, obcaecati fugit architecto vitae, modi harum perferendis porro, doloremque id nihil similique
        fugiat veritatis maiores facere temporibus. Fugit rerum veniam veritatis esse maiores modi! Recusandae assumenda
        sequi sunt?
        Excepturi, perferendis? Dolor deserunt, quis eius nulla a consectetur architecto magnam reprehenderit sunt quo
        asperiores labore minima, voluptatum saepe dolorem quod facere cum ab harum at optio! Repellat, totam tenetur?
        Quae nemo iure adipisci nostrum quod praesentium quaerat ut obcaecati, nam libero accusantium id maxime ipsum
        provident numquam, reiciendis excepturi saepe eius facilis dolore, iste recusandae magnam quisquam sapiente!
        Excepturi?
        Officia, soluta qui sapiente sint at optio quas necessitatibus eum quod! Eius expedita assumenda quas quis
        suscipit asperiores inventore illo earum pariatur ab aspernatur quibusdam quaerat, quasi fuga alias. Neque!
        Eum sapiente qui perferendis, vero repudiandae error dolores optio consequatur ut, nisi id explicabo. Voluptate
        nulla corrupti veritatis necessitatibus officia. Temporibus maxime minima inventore perspiciatis corporis eius,
        ex culpa? Mollitia.
        Numquam culpa quidem quod dolore suscipit repudiandae quis porro a architecto esse magni itaque quaerat eligendi
        placeat laudantium, hic voluptate quae cum voluptas unde asperiores dicta explicabo nostrum debitis? Quaerat?
        Tempora voluptate quos ipsum amet possimus nihil, aspernatur voluptas perferendis nulla omnis obcaecati iste
        molestiae reprehenderit! Quas sed, quos, tempore quisquam non corrupti eligendi aliquam itaque soluta rerum
        laudantium explicabo!
        Sunt, earum! Laborum magnam, cupiditate facilis aliquam libero odit corrupti obcaecati delectus ratione iste
        quibusdam cumque quo beatae laboriosam velit impedit pariatur fugiat. Eum, assumenda. Neque deserunt at
        distinctio earum?
        Laboriosam necessitatibus, labore suscipit in minus consequuntur obcaecati numquam alias ratione, consectetur
        repellendus voluptatibus enim delectus dignissimos natus. Vero ea sed dicta inventore voluptas alias. Quae quod
        aliquid aperiam omnis.
        Dicta itaque aperiam atque maiores nihil molestiae cum earum vel culpa voluptatibus, blanditiis cupiditate nobis
        aspernatur molestias. Architecto facilis itaque atque minima cumque, sit odio praesentium maiores, veritatis
        vitae cupiditate.
        Perferendis dolorum qui aliquam dolores consectetur exercitationem in, velit non laboriosam modi sunt maxime
        voluptate, doloribus porro eius. Harum, ullam incidunt magnam nisi error porro ipsa aspernatur hic quasi totam.
        Perferendis officia adipisci tenetur eius soluta inventore. Minima facere nam sapiente excepturi optio
        voluptatibus provident error, inventore consectetur aliquid laudantium mollitia molestiae esse doloremque ex
        delectus? Debitis quibusdam optio dolorem.
        Quis alias cumque iusto architecto earum consectetur ipsam officia minima error exercitationem, odio illo rerum
        ipsa reiciendis molestiae nisi quidem quasi laboriosam! Necessitatibus odit sint doloribus quaerat dignissimos
        labore et.
        Earum eligendi amet, ex cumque deleniti, debitis aut ut aperiam labore eos quaerat quasi distinctio quibusdam
        nesciunt tempora eaque. Animi nam blanditiis cum quos veritatis dolore ipsam iste dolores neque.
        Nostrum, maxime? Omnis nisi, neque officia explicabo nobis accusantium provident, corporis cumque aliquid, iusto
        nam ratione quaerat libero veniam placeat repellendus fugit consectetur dolores fugiat corrupti dicta vitae.
        Consequatur, dicta!
        Odit quasi voluptatem quo quidem fuga harum odio voluptatibus dolor praesentium dignissimos debitis, incidunt
        laborum inventore eum nisi repellat rerum eveniet! Quos nobis ea dignissimos magnam, laudantium culpa voluptatum
        hic.
        Voluptatum, soluta harum fugit minus, nostrum, aut facere dolorem quasi voluptas vel ad. Maxime repudiandae
        voluptate earum nemo quaerat suscipit quis harum, quam dolorum natus dignissimos tempore expedita sunt nostrum.
        Dolore aperiam repellendus mollitia nesciunt minima, corrupti obcaecati libero officiis. Mollitia asperiores
        exercitationem, illum qui, quisquam cumque atque voluptates velit voluptatum repellat maxime rerum iure id eaque
        alias consequatur perferendis.
        Doloribus impedit, at facilis, inventore provident porro deleniti aperiam esse quisquam optio illum ratione
        nesciunt delectus! Earum mollitia, saepe possimus a debitis facilis, est iure alias repellat nemo voluptatum
        nobis!
        Tempora repudiandae, ipsa recusandae autem voluptatem cumque repellendus quibusdam adipisci laboriosam itaque,
        aperiam suscipit molestiae alias qui neque. Minima deleniti laborum doloribus blanditiis eius unde saepe
        voluptatum enim error at.
        Maxime illo fugit doloremque rerum natus quam, eos laudantium sed minus nostrum ratione rem necessitatibus
        facere nihil officia quasi, veritatis similique perspiciatis reprehenderit enim temporibus culpa harum cum!
        Quam, ipsa.
        Dolorem facere nesciunt, blanditiis dolor expedita eum unde non obcaecati iste dolores doloremque error
        laudantium voluptatum itaque voluptatibus. Molestias ratione totam adipisci at soluta vel eveniet animi delectus
        harum error!
        Numquam rem impedit illum sequi eveniet voluptatibus libero consectetur aperiam ea, labore autem nulla esse
        explicabo voluptates necessitatibus. Dolores, omnis asperiores. Ducimus quo dolorum iusto sapiente illo vitae
        quis culpa.
        Sed possimus nulla quam, voluptates quibusdam distinctio ipsum illum placeat facilis nam suscipit cum eligendi.
        Doloremque porro, error eveniet iusto veritatis dicta illo, hic dolores culpa quidem numquam, odit nostrum.
        Repudiandae ipsum praesentium ipsam aliquam, adipisci exercitationem at rem dolores accusantium odio, incidunt
        cumque possimus, sit provident? Aspernatur, quos vel soluta doloribus fugiat, sit itaque eligendi odit explicabo
        aliquid culpa.
        Exercitationem impedit incidunt rem in praesentium eos, magni, omnis nisi odio mollitia ad, dicta possimus nemo
        accusamus ipsam illum. Corrupti at temporibus officia sunt. Optio ullam impedit officiis iusto qui.
        Sunt cupiditate magnam sed! A in blanditiis eos. Odio, vel! Assumenda nostrum aspernatur ratione velit sint
        tempora expedita. Ducimus eveniet sequi cupiditate consectetur impedit, atque voluptates nobis tenetur
        consequuntur fugiat.
        Magni, voluptatem. Suscipit iste perferendis, ad voluptatum accusantium ut voluptas perspiciatis maiores, porro
        fugiat odio laborum. Nulla, recusandae asperiores quasi eligendi similique eum facilis perferendis? Voluptate
        modi asperiores quas accusamus?
        Itaque harum aperiam consequatur repudiandae autem soluta vel commodi reprehenderit nihil! Repellat eum rem
        vitae suscipit sapiente in doloremque, libero sequi laborum, iste praesentium, at tenetur nisi. Saepe, alias
        natus.

    <p><a href="#page-title">Retourner en haut de la page</a></p>
</body>

</html>
```
````