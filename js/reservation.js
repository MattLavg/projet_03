// Objet RESERVATION
var Reservation = {
    
    // Initialise la réservation
    // Initialise les événements
    init: function(signature, compteur) {
      
        this.signature = signature;
        this.compteur = compteur;
        
        var _this = this;
        
        document.getElementById("boutonReservation").addEventListener("click", function(){
            
            _this.affichageSignature();
            
        });
        
        document.getElementById("boutonValidation").addEventListener("click", function(){
            
            _this.reservation();
            
        });
        
        document.getElementById("boutonAnnulation").addEventListener("click", function() {
            
            _this.annulation();
            
        });
        
        
        // Au chargement de la page on vérifie si un vélo a été réservé
        var stationReservee = sessionStorage.getItem("stationReservee");

        // Gère l'affichage du bandeau de réservation au rechargement
        if (stationReservee === null) {

            document.getElementById("unVeloReserve").style.display = "none";
            document.getElementById("aucunVeloReserve").style.display = "block";

        } else {

            document.getElementById("aucunVeloReserve").style.display = "none";
            document.getElementById("unVeloReserve").style.display = "block";
            document.getElementById("stationVeloReserve").textContent = stationReservee;
            document.getElementById("boutonAnnulation").style.display = "block";

            this.compteur.init();
        }
        
    },
    
    // Affiche la signature si aucun vélo n'est déjà réservé dans la station
    affichageSignature: function() {
        
        /* On récupère le nom de la station en cours 
        et le nom de la station où la réservation est faite */
        var currentStation = sessionStorage.getItem("currentStation");
        var stationReservee = sessionStorage.getItem("stationReservee");
        
        // Permet d'indiquer si un vélo est déjà réservé dans cette station
        if (currentStation === stationReservee) {

            document.getElementById("dejaReserve").style.display = "block";

            setTimeout(function() {

                $("#dejaReserve").fadeOut("slow");

            }, 3000);

        } else {

            this.signature.affichageSignature();

        }
        
    },
    
    reservation: function() {
        
        // On récupère les Nb de vélos et d'emplacements disponibles enregistrés dans le storage
        var velosDisponibles = Number(sessionStorage.getItem("velosDisponibles"));
        var emplacementsDisponibles = Number(sessionStorage.getItem("emplacementsDisponibles"));
        
        // On récupère le nom de la station enregistrée dans le storage
        var currentStation = sessionStorage.getItem("currentStation");
        
        // On affecte une nouvelle date à une variable
        var dateReservation = new Date();
        
        // On enregistre dans le storage la date au moment de la réservation
        // Permet de récupérer le nombre de millisecondes depuis le 1 janver 1970
        sessionStorage.setItem("dateReservation", dateReservation.getTime());
        
        // On enregistre le nom de la station concernée par la réservation 
        sessionStorage.setItem("stationReservee", currentStation);
                    
        // On affiche un vélo en moins et un emplacement en plus
        document.getElementById("emplacementsDisponibles").textContent = emplacementsDisponibles + 1;
        document.getElementById("velosDisponibles").textContent = velosDisponibles - 1;
        
        // On enregistre le nombre de vélos - 1 après la réservation
        sessionStorage.setItem("nbVelosApresReservation", velosDisponibles - 1);
        
        // On récupère l'index de la station où la précédente réservation a eu lieu
        var indexDeLaStationReservee = Number(sessionStorage.getItem("indexDeLaStationReservee"));
        
        /* Vérifie si la précédente réservation a modifié l'icône (nb vélos à 0)
        et si oui, modifie à nouveau l'icône */
        if (indexDeLaStationReservee !== null) {
            
            var iconeVelosDisponibles = 'images/available-bikes.png';
            
            stations[indexDeLaStationReservee].marker.setIcon(iconeVelosDisponibles);
            
        }
        
        // Affiche l'icone rouge si le nombre de vélos est à zéro
        if (document.getElementById("velosDisponibles").textContent === "0") {
            
            var indexStation = Number(sessionStorage.getItem("indexStation"));
            
            /* Enregistre l'index de la station où se fait
            la réservation pour modifier l'icône du marqueur si besoin */
            sessionStorage.setItem("indexDeLaStationReservee", indexStation)

            var iconeAucunVelo = 'images/no-bikes.png';
            
            stations[indexStation].marker.setIcon(iconeAucunVelo);
            
        }
        
        document.getElementById("zoneCanvas").style.display = "none";
                    
        document.getElementById("bandeauReservation").style.display = "block";
        document.getElementById("aucunVeloReserve").style.display = "none";
        document.getElementById("unVeloReserve").style.display = "block";
        document.getElementById("stationVeloReserve").textContent = currentStation;
        document.getElementById("boutonAnnulation").style.display = "block";
        
        /* Pour ne pas lancer plusieurs fois le compteur
        on vérifie si le compteur est déjà lancé */
        if (this.compteur.intervalId !== false) {
            
            // Si oui, on stoppe le compteur en cours
            this.compteur.stop();
            
        }
        
        // On lance le compteur
        this.compteur.init();
        
    },
    
    annulation: function() {
        
        // On récupère les Nb de vélos et d'emplacements disponibles enregistrés dans le storage
        var velosDisponibles = Number(sessionStorage.getItem("velosDisponibles"));
        var emplacementsDisponibles = Number(sessionStorage.getItem("emplacementsDisponibles"));

        // On affiche ces valeurs
        document.getElementById("emplacementsDisponibles").textContent = emplacementsDisponibles;
        document.getElementById("velosDisponibles").textContent = velosDisponibles;
        
        // Affiche l'icone verte si le nombre de vélos est différent de zéro
        if (document.getElementById("velosDisponibles").textContent !== "0") {
            
            var indexStation = Number(sessionStorage.getItem("indexStation"));
            
            var iconeVelosDisponibles = 'images/available-bikes.png';
            
            stations[indexStation].marker.setIcon(iconeVelosDisponibles);
            
        }

        document.getElementById("unVeloReserve").style.display = "none";
        document.getElementById("aucunVeloReserve").style.display = "block";

        document.getElementById("boutonAnnulation").style.display = "none";
        
        sessionStorage.removeItem("stationReservee");
        
        this.compteur.stop();
        
    }
    
};