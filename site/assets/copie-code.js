// Ajoute un bouton « Copier » sur chaque bloc de code.
(function () {
  var blocs = document.querySelectorAll('.bloc-code');
  if (!blocs.length || !document.execCommand && !(navigator.clipboard)) {
    // On continue quand même : execCommand sert de repli.
  }

  blocs.forEach(function (bloc) {
    var code = bloc.querySelector('pre code') || bloc.querySelector('pre');
    var barre = bloc.querySelector('.bloc-code__langue');
    if (!code || !barre) return;

    var bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'bloc-code__copier';
    bouton.textContent = 'Copier';
    bouton.setAttribute('aria-label', 'Copier le code');
    barre.appendChild(bouton);

    var minuteur;
    bouton.addEventListener('click', function () {
      var texte = code.innerText;

      function reussi() {
        bouton.textContent = 'Copié !';
        bouton.classList.add('est-copie');
        clearTimeout(minuteur);
        minuteur = setTimeout(function () {
          bouton.textContent = 'Copier';
          bouton.classList.remove('est-copie');
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texte).then(reussi, replierExecCommand);
      } else {
        replierExecCommand();
      }

      // Repli pour les contextes non sécurisés (file://, vieux navigateurs).
      function replierExecCommand() {
        var zone = document.createElement('textarea');
        zone.value = texte;
        zone.style.position = 'fixed';
        zone.style.opacity = '0';
        document.body.appendChild(zone);
        zone.select();
        try { document.execCommand('copy'); reussi(); } catch (e) {}
        document.body.removeChild(zone);
      }
    });
  });
})();
