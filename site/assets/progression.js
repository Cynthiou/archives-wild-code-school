// Suivi de progression (quêtes terminées) et favoris, stockés dans le navigateur.
(function () {
  var CLE_FAITS = 'wcs:faits';
  var CLE_FAVORIS = 'wcs:favoris';
  var CLE_TITRES = 'wcs:titres';

  // ---------- Stockage ----------
  function lireListe(cle) {
    try { return JSON.parse(localStorage.getItem(cle)) || []; } catch (e) { return []; }
  }
  function lireMap(cle) {
    try { return JSON.parse(localStorage.getItem(cle)) || {}; } catch (e) { return {}; }
  }
  function ecrire(cle, v) {
    try { localStorage.setItem(cle, JSON.stringify(v)); } catch (e) {}
  }
  function basculer(cle, id) {
    var l = lireListe(cle);
    var i = l.indexOf(id);
    if (i === -1) l.push(id); else l.splice(i, 1);
    ecrire(cle, l);
    return i === -1; // true = désormais actif
  }
  function contient(cle, id) { return lireListe(cle).indexOf(id) !== -1; }

  function memoriserTitre(id, titre) {
    if (!id || !titre) return;
    var m = lireMap(CLE_TITRES);
    if (m[id] !== titre) { m[id] = titre; ecrire(CLE_TITRES, m); }
  }

  // ---------- Identifiant d'une quête : "theme/quete" ----------
  function nettoie(seg) {
    return seg.filter(function (s) { return s && s !== '.' && s !== '..' && s !== 'index.html'; });
  }
  function idDepuisChemin(chemin) {
    var seg = nettoie(chemin.split('/'));
    if (seg.length < 2) return null;
    return seg.slice(-2).join('/');
  }

  // Préfixe pour atteindre la racine du site (déduit du lien vers style.css).
  function prefixeRacine() {
    var lien = document.querySelector('link[href*="assets/style.css"]');
    if (!lien) return './';
    return lien.getAttribute('href').replace(/assets\/style\.css.*$/, '');
  }

  // Construit une barre de boutons-filtres ; appelle onChange(cle) au clic.
  function creerFiltres(defs, onChange) {
    var bar = document.createElement('div');
    bar.className = 'filtres';
    bar.setAttribute('role', 'group');
    defs.forEach(function (d, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'filtre' + (i === 0 ? ' est-actif' : '');
      b.dataset.filtre = d.cle;
      b.textContent = d.label;
      bar.appendChild(b);
    });
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.filtre');
      if (!b) return;
      bar.querySelectorAll('.filtre').forEach(function (x) { x.classList.remove('est-actif'); });
      b.classList.add('est-actif');
      onChange(b.dataset.filtre);
    });
    return bar;
  }

  // ================================================================
  //  PAGE DE QUÊTE
  // ================================================================
  var article = document.querySelector('.quete');
  var entete = article && article.querySelector('.quete__entete');
  if (article && entete) {
    var id = idDepuisChemin(location.pathname);
    var titreEl = entete.querySelector('h1');
    if (id && titreEl) memoriserTitre(id, titreEl.textContent.trim());

    var barre = document.createElement('div');
    barre.className = 'quete__actions';

    var bFait = document.createElement('button');
    bFait.type = 'button';
    bFait.className = 'q-btn q-fait';

    var bFav = document.createElement('button');
    bFav.type = 'button';
    bFav.className = 'q-btn q-fav';

    function rafraichirQuete() {
      var fait = contient(CLE_FAITS, id);
      var fav = contient(CLE_FAVORIS, id);
      bFait.classList.toggle('est-actif', fait);
      bFait.textContent = fait ? '✓ Terminé' : 'Marquer comme terminé';
      bFav.classList.toggle('est-actif', fav);
      bFav.textContent = fav ? '★ Favori' : '☆ Ajouter aux favoris';
      article.classList.toggle('est-fait', fait);
    }

    bFait.addEventListener('click', function () { basculer(CLE_FAITS, id); rafraichirQuete(); });
    bFav.addEventListener('click', function () { basculer(CLE_FAVORIS, id); rafraichirQuete(); });

    barre.appendChild(bFait);
    barre.appendChild(bFav);
    entete.appendChild(barre);
    rafraichirQuete();
  }

  // ================================================================
  //  Boutons d'état (✓ et ★) posés sur une carte de quête
  // ================================================================
  function equiperCarte(carte, id) {
    var etat = document.createElement('div');
    etat.className = 'carte-quete__etat';

    var bFav = document.createElement('button');
    bFav.type = 'button';
    bFav.className = 'etat-btn etat-fav';
    bFav.title = 'Favori';

    var bFait = document.createElement('button');
    bFait.type = 'button';
    bFait.className = 'etat-btn etat-fait';
    bFait.title = 'Marquer comme terminé';

    function rafraichir() {
      var fait = contient(CLE_FAITS, id);
      var fav = contient(CLE_FAVORIS, id);
      carte.classList.toggle('est-fait', fait);
      carte.classList.toggle('est-favori', fav);
      bFait.textContent = fait ? '✓' : '';
      bFait.classList.toggle('est-actif', fait);
      bFav.textContent = fav ? '★' : '☆';
      bFav.classList.toggle('est-actif', fav);
    }

    bFait.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      basculer(CLE_FAITS, id); rafraichir();
      document.dispatchEvent(new CustomEvent('wcs:maj'));
    });
    bFav.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      basculer(CLE_FAVORIS, id); rafraichir();
      document.dispatchEvent(new CustomEvent('wcs:maj'));
    });

    etat.appendChild(bFav);
    etat.appendChild(bFait);
    carte.appendChild(etat);
    rafraichir();
    return rafraichir;
  }

  // ================================================================
  //  PAGE DE THÈME (liste des quêtes)
  // ================================================================
  var grilleQuetes = document.querySelector('.grille-quetes');
  if (grilleQuetes && !article) {
    var cartes = [].slice.call(grilleQuetes.querySelectorAll('.carte-quete'));
    var rafraichisseurs = [];
    cartes.forEach(function (carte) {
      var lien = carte.querySelector('a');
      if (!lien) return;
      var qid = idDepuisChemin(lien.getAttribute('href'));
      if (!qid) return;
      var titreEl = carte.querySelector('.carte-quete__titre');
      if (titreEl) memoriserTitre(qid, titreEl.textContent.trim());
      rafraichisseurs.push(equiperCarte(carte, qid));
    });

    // Compteur + barre de progression dans l'en-tête du thème.
    var nb = document.querySelector('.titre-section__nb');
    var prog = document.createElement('div');
    prog.className = 'prog-theme';
    prog.innerHTML = '<div class="prog-theme__barre"><span></span></div><span class="prog-theme__texte"></span>';
    if (nb) nb.parentNode.insertBefore(prog, nb.nextSibling);
    var progSpan = prog.querySelector('.prog-theme__barre span');
    var progTexte = prog.querySelector('.prog-theme__texte');

    function majTheme() {
      var total = cartes.length;
      var faits = cartes.filter(function (c) { return c.classList.contains('est-fait'); }).length;
      var pct = total ? Math.round(faits / total * 100) : 0;
      progSpan.style.width = pct + '%';
      progTexte.textContent = faits + ' / ' + total + ' terminée' + (faits > 1 ? 's' : '') + ' (' + pct + '%)';
    }
    document.addEventListener('wcs:maj', majTheme);
    majTheme();

    // Filtre des quêtes
    var filtreQuete = 'tout';
    function appliquerFiltreQuete() {
      cartes.forEach(function (c) {
        var fait = c.classList.contains('est-fait');
        var fav = c.classList.contains('est-favori');
        var ok = filtreQuete === 'tout' ||
                 (filtreQuete === 'afaire' && !fait) ||
                 (filtreQuete === 'termine' && fait) ||
                 (filtreQuete === 'favoris' && fav);
        c.hidden = !ok;
      });
    }
    var barreQ = creerFiltres([
      { cle: 'tout', label: 'Toutes' },
      { cle: 'afaire', label: 'À faire' },
      { cle: 'termine', label: 'Terminées' },
      { cle: 'favoris', label: '⭐ Favoris' }
    ], function (cle) { filtreQuete = cle; appliquerFiltreQuete(); });
    grilleQuetes.parentNode.insertBefore(barreQ, grilleQuetes);
    document.addEventListener('wcs:maj', appliquerFiltreQuete);
  }

  // ================================================================
  //  PAGE D'ACCUEIL : progression par thème + section Favoris
  // ================================================================
  var grilleThemes = document.getElementById('grille-themes');
  if (grilleThemes) {
    var prefixe = prefixeRacine();
    var titres = lireMap(CLE_TITRES);

    // -- Progression sur chaque carte de thème --
    var infosCat = [];
    var cartesCat = [].slice.call(grilleThemes.querySelectorAll('.carte-cat'));
    cartesCat.forEach(function (carte) {
      var lien = carte.querySelector('a');
      if (!lien) return;
      var href = lien.getAttribute('href') || '';
      var theme = nettoie(href.split('/'))[0]; // ex: "git"
      if (!theme) return;
      var nbEl = carte.querySelector('.carte-cat__nb');
      var m = nbEl && nbEl.textContent.match(/\d+/);
      var total = m ? parseInt(m[0], 10) : 0;
      infosCat.push({ carte: carte, theme: theme, total: total });

      var prog = document.createElement('span');
      prog.className = 'prog-cat';
      prog.innerHTML = '<span class="prog-cat__barre"><span></span></span><span class="prog-cat__texte"></span>';
      var corps = carte.querySelector('.carte-cat__corps') || lien;
      corps.appendChild(prog);
      var span = prog.querySelector('.prog-cat__barre span');
      var texte = prog.querySelector('.prog-cat__texte');

      function majCat() {
        var faits = lireListe(CLE_FAITS).filter(function (i) { return i.indexOf(theme + '/') === 0; }).length;
        if (total && faits > total) faits = total;
        var pct = total ? Math.round(faits / total * 100) : 0;
        span.style.width = pct + '%';
        texte.textContent = faits + ' / ' + (total || '?') + ' fait' + (faits > 1 ? 's' : '');
        carte.classList.toggle('cat-complete', total > 0 && faits >= total);
      }
      document.addEventListener('wcs:maj', majCat);
      majCat();
    });

    // -- Barre d'outils de filtrage --
    var familles = [].slice.call(grilleThemes.querySelectorAll('.famille'));

    function normaliser(s) {
      return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    }

    // Complète infosCat avec le nom et l'icône lus sur chaque carte.
    infosCat.forEach(function (info) {
      var t = info.carte.querySelector('.carte-cat__titre');
      info.nom = t ? t.textContent.trim() : info.theme;
      var img = info.carte.querySelector('img');
      info.icone = img ? img.getAttribute('src') : '';
    });

    function etatTheme(info) {
      var faits = lireListe(CLE_FAITS).filter(function (i) { return i.indexOf(info.theme + '/') === 0; }).length;
      var fav = lireListe(CLE_FAVORIS).some(function (i) { return i.indexOf(info.theme + '/') === 0; });
      var complet = info.total > 0 && faits >= info.total;
      var etat = complet ? 'termine' : (faits > 0 ? 'encours' : 'nouveau');
      return { fav: fav, etat: etat };
    }

    var recherche = '', catsSel = [], compSel = [], favSeul = false;

    function appliquerFiltreCat() {
      var q = normaliser(recherche.trim());
      infosCat.forEach(function (info) {
        var e = etatTheme(info);
        var okRech = !q || normaliser(info.nom).indexOf(q) !== -1;
        var okCat = !catsSel.length || catsSel.indexOf(info.theme) !== -1;
        var okComp = !compSel.length || compSel.indexOf(e.etat) !== -1;
        var okFav = !favSeul || e.fav;
        info.carte.hidden = !(okRech && okCat && okComp && okFav);
      });
      familles.forEach(function (fam) {
        fam.hidden = fam.querySelectorAll('.carte-cat:not([hidden])').length === 0;
      });
      majBoutons();
    }

    // ---- Construction du toolbar ----
    var svgLoupe = '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="2"/><line x1="13.5" y1="13.5" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    var svgEntonnoir = '<svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path d="M2.5 4.5h15l-5.7 6.5v4.5l-3.6 2v-6.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';

    var panneau = document.createElement('div');
    panneau.className = 'barre-outils';
    panneau.innerHTML =
      '<div class="bo-recherche">' +
        '<input type="search" class="bo-recherche__champ" placeholder="Rechercher par titre..." autocomplete="off" spellcheck="false">' +
        '<button type="button" class="bo-recherche__btn" aria-label="Rechercher">' + svgLoupe + '</button>' +
      '</div>' +
      '<div class="bo-menu" data-menu="cat">' +
        '<button type="button" class="bo-btn">' + svgEntonnoir + '<span>Catégories</span><span class="bo-btn__compte"></span></button>' +
        '<div class="bo-pop" hidden>' +
          '<input type="search" class="bo-pop__recherche" placeholder="Rechercher un élément..." autocomplete="off" spellcheck="false">' +
          '<ul class="bo-pop__liste"></ul>' +
        '</div>' +
      '</div>' +
      '<div class="bo-menu" data-menu="comp">' +
        '<button type="button" class="bo-btn">' + svgEntonnoir + '<span>Complétion</span><span class="bo-btn__compte"></span></button>' +
        '<div class="bo-pop bo-pop--court" hidden><ul class="bo-pop__liste"></ul></div>' +
      '</div>' +
      '<label class="bo-toggle"><input type="checkbox" class="bo-toggle__case"><span class="bo-toggle__piste"></span><span class="bo-toggle__txt">Dans mes favoris</span></label>';

    // Liste des catégories (triée alphabétiquement, avec icône)
    var listeCat = panneau.querySelector('[data-menu="cat"] .bo-pop__liste');
    infosCat.slice().sort(function (a, b) { return a.nom.localeCompare(b.nom, 'fr'); }).forEach(function (info) {
      var li = document.createElement('li');
      var lab = document.createElement('label');
      lab.className = 'bo-item';
      var cb = document.createElement('input'); cb.type = 'checkbox';
      var sp = document.createElement('span'); sp.className = 'bo-item__txt'; sp.textContent = info.nom;
      lab.appendChild(cb);
      if (info.icone) {
        var img = document.createElement('img'); img.className = 'bo-item__ic';
        img.src = info.icone; img.alt = ''; img.width = 20; img.height = 20;
        lab.appendChild(img);
      }
      lab.appendChild(sp);
      li.appendChild(lab);
      listeCat.appendChild(li);
      cb.addEventListener('change', function () {
        if (cb.checked) { if (catsSel.indexOf(info.theme) === -1) catsSel.push(info.theme); }
        else { catsSel = catsSel.filter(function (x) { return x !== info.theme; }); }
        appliquerFiltreCat();
      });
    });

    // Recherche interne dans la liste des catégories
    var rechCat = panneau.querySelector('[data-menu="cat"] .bo-pop__recherche');
    rechCat.addEventListener('input', function () {
      var q = normaliser(rechCat.value.trim());
      listeCat.querySelectorAll('li').forEach(function (li) {
        li.hidden = q && normaliser(li.textContent).indexOf(q) === -1;
      });
    });

    // Liste complétion
    var listeComp = panneau.querySelector('[data-menu="comp"] .bo-pop__liste');
    [{ v: 'termine', l: 'Terminés' }, { v: 'encours', l: 'En cours' }, { v: 'nouveau', l: 'Pas commencés' }].forEach(function (d) {
      var li = document.createElement('li');
      var lab = document.createElement('label'); lab.className = 'bo-item';
      var cb = document.createElement('input'); cb.type = 'checkbox';
      var sp = document.createElement('span'); sp.className = 'bo-item__txt'; sp.textContent = d.l;
      lab.appendChild(cb); lab.appendChild(sp); li.appendChild(lab); listeComp.appendChild(li);
      cb.addEventListener('change', function () {
        if (cb.checked) { if (compSel.indexOf(d.v) === -1) compSel.push(d.v); }
        else { compSel = compSel.filter(function (x) { return x !== d.v; }); }
        appliquerFiltreCat();
      });
    });

    // Champ de recherche par titre
    var champ = panneau.querySelector('.bo-recherche__champ');
    champ.addEventListener('input', function () { recherche = champ.value; appliquerFiltreCat(); });
    panneau.querySelector('.bo-recherche__btn').addEventListener('click', function () { champ.focus(); });

    // Interrupteur favoris
    panneau.querySelector('.bo-toggle__case').addEventListener('change', function () {
      favSeul = this.checked; appliquerFiltreCat();
    });

    // Ouverture / fermeture des menus déroulants
    panneau.querySelectorAll('.bo-menu > .bo-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var pop = btn.nextElementSibling;
        var ouvert = !pop.hidden;
        fermerMenus();
        if (!ouvert) { pop.hidden = false; btn.parentNode.classList.add('est-ouvert'); }
      });
    });
    function fermerMenus() {
      panneau.querySelectorAll('.bo-pop').forEach(function (p) { p.hidden = true; });
      panneau.querySelectorAll('.bo-menu').forEach(function (m) { m.classList.remove('est-ouvert'); });
    }
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.bo-menu')) fermerMenus();
    });

    function majBoutons() {
      var nCat = catsSel.length, nComp = compSel.length;
      panneau.querySelector('[data-menu="cat"] .bo-btn__compte').textContent = nCat ? nCat : '';
      panneau.querySelector('[data-menu="comp"] .bo-btn__compte').textContent = nComp ? nComp : '';
      panneau.querySelector('[data-menu="cat"]').classList.toggle('a-selection', nCat > 0);
      panneau.querySelector('[data-menu="comp"]').classList.toggle('a-selection', nComp > 0);
    }

    grilleThemes.parentNode.insertBefore(panneau, grilleThemes);
    document.addEventListener('wcs:maj', appliquerFiltreCat);
    appliquerFiltreCat();

    // -- Section « Mes favoris » --
    var section = document.createElement('section');
    section.className = 'famille famille--favoris';
    section.id = 'section-favoris';
    section.innerHTML =
      '<h2 class="famille__titre"><span class="famille__nom">⭐ Mes favoris</span>' +
      '<span class="famille__compte" id="favoris-compte"></span></h2>' +
      '<ul class="grille-quetes" id="favoris-liste"></ul>';
    grilleThemes.parentNode.insertBefore(section, grilleThemes);
    var favListe = section.querySelector('#favoris-liste');
    var favCompte = section.querySelector('#favoris-compte');

    function majFavoris() {
      var favs = lireListe(CLE_FAVORIS);
      var t = lireMap(CLE_TITRES);
      favListe.innerHTML = '';
      if (!favs.length) {
        section.hidden = true;
        return;
      }
      section.hidden = false;
      favCompte.textContent = favs.length + (favs.length > 1 ? ' quêtes' : ' quête');
      favs.forEach(function (qid) {
        var li = document.createElement('li');
        li.className = 'carte-quete';
        var titre = t[qid] || qid.split('/')[1] || qid;
        var a = document.createElement('a');
        a.href = prefixe + qid + '/index.html';
        a.innerHTML = '<span class="carte-quete__haut"><span class="carte-quete__titre"></span></span>' +
                      '<span class="carte-quete__pied">' + qid.split('/')[0] + '</span>';
        a.querySelector('.carte-quete__titre').textContent = titre;
        li.appendChild(a);
        favListe.appendChild(li);
        equiperCarte(li, qid);
      });
    }
    document.addEventListener('wcs:maj', majFavoris);
    majFavoris();
  }
})();
