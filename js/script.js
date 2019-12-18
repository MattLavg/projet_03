
// Tableau des stations
var stations = [];

// Tableau pour les markers
var markers = [];

Diaporama.init();
Reservation.init(Signature, Compteur);
Signature.init();



// Creation de la carte Google Map
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.764043, lng: 4.835659},
      zoom: 12
    });
    
    // On récupère les données de l'API de JcDecaux
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=xxx", function (reponse) {
        
        // On gère l'affichage en cas d'erreur de retour de JCDecaux
        if (reponse === false) {
            
            document.getElementById("erreurJcDecaux").style.display = "block";
            
        } else {
            
            // On exécute le code
            try {
                
                /* On transforme les données JC Decaux en objet Javascript 
                et on affecte ces données à une variable */
                var reponseElts = JSON.parse(reponse);
        
                // Crée chaque station avec les informations souhaitées
                reponseElts.forEach(function(reponse, index) {

                    var station = Object.create(Station);

                    station.init(reponse.name, reponse.address, reponse.position, reponse.status, reponse.bike_stands, reponse.available_bikes, reponse.available_bike_stands, map, index);
                    
                    stations.push(station);
                    
                    // On "push" les markers dans un tableau qui servira au markerCluster
                    markers.push(station.marker);
                    
                });
                
                var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'images/m'});
                
            // Affiche une erreur si l'exécution ne se fait pas
            } catch (e) {
                
                document.getElementById("erreur").style.display = "block";
                
            }
            
        }     

    }); 
    
}

