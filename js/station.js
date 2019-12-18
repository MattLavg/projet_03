// objet STATION
var Station = {
   
    // Initialise la station
    // Lance l'affichage du marqueur
    init: function(nom, adresse, coordonnee, etat, totalEmplacements, velosDisponibles, emplacementsDisponibles, map, index) {
        this.nom = nom;
        this.adresse = adresse;
        this.coordonnee = coordonnee;
        this.etat = etat;
        this.totalEmplacements = totalEmplacements;
        this.velosDisponibles = velosDisponibles;
        this.emplacementsDisponibles = emplacementsDisponibles;
        
        this.map = map;
        this.index = index;
        this.afficherMarqueur();
    },

    // Positionne les marqueurs sur la carte
    afficherMarqueur: function() {
        
        var iconeVelosDisponibles = 'images/available-bikes.png';
        var iconeAucunVelo = 'images/no-bikes.png';
        var iconBikes;
        
        /* Permet de vérifier si une réservation est déjà en cours
        et si la station concernée a un nombre de vélos à 0 */
        var nbVelosApresReservation = Number(sessionStorage.getItem("nbVelosApresReservation"));
        var stationReservee = sessionStorage.getItem("stationReservee");
        
        if ((this.nom === stationReservee) && (nbVelosApresReservation < 1)) {

            iconBikes = iconeAucunVelo;

        } else if ((this.velosDisponibles > 0) && (this.etat === "OPEN")) {
            
            iconBikes = iconeVelosDisponibles;
            
        } else {
            
            iconBikes = iconeAucunVelo;
            
        }

        var latLng = new google.maps.LatLng(this.coordonnee.lat, this.coordonnee.lng);
        
        var marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          icon: iconBikes
        });
        
        this.marker = marker;  

        var _this = this;

        // A chaque clic sur un marqueur on crée et on affiche les données de la station cliquée
        marker.addListener("click", function() {

            /* On enregistre le nom, le Nb de vélos, 
            le Nb d'emplacements disponibles et l'index de la station cliquée */
            sessionStorage.setItem("currentStation", _this.nom);
            sessionStorage.setItem("velosDisponibles", _this.velosDisponibles);
            sessionStorage.setItem("emplacementsDisponibles", _this.emplacementsDisponibles);
            sessionStorage.setItem("indexStation", _this.index);

            // Permet de vérifier si la station cliquée est celle présente dans le storage
            var stationReservee = sessionStorage.getItem("stationReservee");

            if (_this.nom === stationReservee) {

                _this.afficherInformationsStation();

                // Si une station est déjà présente dans le storage
                // on affiche un vélo en moins et un emplacement en plus
                document.getElementById("emplacementsDisponibles").textContent = _this.emplacementsDisponibles + 1;
                document.getElementById("velosDisponibles").textContent = _this.velosDisponibles - 1;
                
                /* Gère le cas où une autre réservation extérieure se fait 
                en plus de notre réservation et que le compteur affiche -1 */
                if (document.getElementById("velosDisponibles").textContent === "-1") {

                    document.getElementById("velosDisponibles").textContent = "0";

                }

            } else {

                _this.afficherInformationsStation();

            }

            document.getElementById("affichageStations").style.display = "block";

        });

    },

    // On affiche les informations de la station dans les balises "span" prévues à cet effet
    // On affiche le bouton de réservation si des vélos sont disponibles
    afficherInformationsStation: function() {
        document.getElementById("nomStation").textContent = this.nom;
        document.getElementById("adresseStation").textContent = this.adresse;
        document.getElementById("etatStation").textContent = this.etat;
        document.getElementById("totalEmplacements").textContent = this.totalEmplacements;
        document.getElementById("emplacementsDisponibles").textContent = this.emplacementsDisponibles;
        document.getElementById("velosDisponibles").textContent = this.velosDisponibles;
        
        /* Gère l'affichage des messages indiquant l'état 
        de la station et la disponibilité des vélos */
        if ((this.velosDisponibles > 0) && (this.etat === "OPEN")) {

            document.getElementById("boutonReservation").style.display = "block";
            document.getElementById("aucunVeloDisponible").style.display = "none";
            document.getElementById("stationFermee").style.display = "none";
        
        } else if (this.etat === "CLOSED") {
            
            document.getElementById("boutonReservation").style.display = "none";
            document.getElementById("aucunVeloDisponible").style.display = "none";
            document.getElementById("stationFermee").style.display = "block";
            
        } else {

            document.getElementById("boutonReservation").style.display = "none";
            document.getElementById("stationFermee").style.display = "none";
            document.getElementById("aucunVeloDisponible").style.display = "block";

        }
    }

};