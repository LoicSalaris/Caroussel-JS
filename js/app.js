var app = {
  currentPicture: null,
  init: function() {

    // On affiche la première image
    // La version la plus performante :
    app.currentPicture = $('.picture:first-child').show();

    // On gère les évènements sur les flèches
    $('.arrow.left').on('click', app.prevPicture);
    $('.arrow.right').on('click', app.nextPicture);

    // Une version où on récupère un noeud
    // du DOM (la méthode "get" retourne un
    // objet vanilla) qu'on retransforme en
    // objet jQuery
    // $( $('.picture').get(0) ).show();

    // On récupère les images pour ensuite
    // récupérer uniquement la première avec
    // la méthode "eq" qui nous retourne
    // directement un objet jQuery
    // $('.picture').eq(0).show();

    // Dans X secondes, on change l'image affichée
    app.timer = setTimeout(app.nextPicture, 5000);

    // On lance la création des miniatures
    app.createMini();
  },
  // -----------------------------------
  // Crée et affiche les miniatures des images
  // -----------------------------------
  createMini: function() {

    // On récupère la liste des images
    $('.picture').each(function (index, picture) {

      // Pour chacune d'entre elles, on
      // va créer une miniature
      // On souhaite créer une miniature :
      // 1. on crée une <div>
      // 2. dans la <div>, on ajoute l'image en fond
      // 3. Sur chaque miniature, on crée un évènement
      // pour surveiller le clic afin d'afficher
      // l'image en grand
      app.createDiv( picture );
    });
  },

  // -----------------------------------
  // Crée une miniature
  // -----------------------------------
  createDiv: function( bigPicture ) {

    // On crée la <div>
    var mini = $('<div>');

    // On ajoute l'image en fond
    var src = bigPicture.src;
    mini.css('backgroundImage', 'url(' + src + ')');

    // On ajoute la <div> dans le DOM
    $('#miniContainer').append( mini );
    // mini.appendTo('#miniContainer');

    // On écoute le clic sur la <div>
    mini.on('click', app.showPicture);
  },

  // -----------------------------------
  // Affiche une image en particulier lorqu'on
  // clic sur la miniature
  // -----------------------------------
  showPicture: function() {

    // On récupère la position de la miniature
    // sur laquelle on vient de cliquer
    var pos = $(this).index();

    var picture = $('.picture').eq( pos );
    app.displayPicture( picture );
  },

  // -----------------------------------
  // Affiche l'image dans le carousel
  // -----------------------------------
  displayPicture: function( picture ) {

    // on masque l'image actuellement affichée
    app.currentPicture.fadeOut(800);

    // On affiche l'image suivante
    picture.fadeIn(800);

    // On sauvegarde la nouvelle image affichée
    app.currentPicture = picture;

    // On redémarre le timer
    app.resetTimer();
  },

  // -----------------------------------
  // Relance le timer
  // -----------------------------------
  resetTimer: function() {

    // On supprime le timer
    clearTimeout( app.timer );
    // On relance le timer
    app.timer = setTimeout(app.nextPicture, 5000);
  },

  // -----------------------------------
  // Affiche l'image précédente
  // -----------------------------------
  prevPicture: function() {

    // On récupère l'image précédente
    var prevImage = app.currentPicture.prev();

    // On crée une variable temporaire qui
    // va contenir la prochaine image affichée
    var picture = null;

    if ( prevImage.length > 0) {

      // On a bien trouvé une image précédente
      picture = prevImage;
    }
    else {

      // Il n'y a pas d'image précédente,
      // on doit revenir à la fin
      picture = $('.picture:last-child');
    }

    app.displayPicture( picture );
  },
  
  // -----------------------------------
  // Affiche l'image suivante
  // -----------------------------------
  nextPicture: function() {

    // On récupère l'image qui suit
    var nextImage = app.currentPicture.next();

    // On crée une variable temporaire qui
    // va contenir la prochaine image affichée
    var picture = null;

    if ( nextImage.length > 0) {

      // On a bien trouvé une image suivante
      picture = nextImage;
    }
    else {

      // Il n'y a pas d'image suivante,
      // on doit revenir au début
      picture = $('.picture:first-child');
    }

    app.displayPicture( picture );
  },
};

$(app.init);
