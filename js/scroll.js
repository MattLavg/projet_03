// Gère le scroll de la page
$('.js-scrollTo').on('click', function() { // Au clic sur un élément
    var page = $(this).attr('href'); // Page cible
    var speed = 750; // Durée de l'animation (en ms)
    // Offset renvoie les coordonnées de l'élément
    // On modifie la position de la scrollBar
    $('html, body').animate( { scrollTop: $(page).offset().top -89 }, speed ); // Go
    return false; // Annule l'action du clic
});