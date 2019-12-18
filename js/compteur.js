// Objet COMPTEUR de 20 minutes
var Compteur = {
    
    zoneCompteur: document.getElementById("compteur"),
    intervalId: false,
    delai: 1200000, // 20 minutes  
    
    // Initialise le compteur
    init: function() {
        
        // On récupère la date enregistrée lors de la validation
        this.dateReservation = Number(sessionStorage.getItem("dateReservation"));
        
        this.animeDecompte();
    },
    
    /* Permet au décompte de se faire 
    et vérifie le temps restant toutes les secondes */
    animeDecompte: function() {
        
        this.intervalId = setInterval(function(objet) {
            
            objet.verificationDuree();
            objet.affichageTempsRestant();
            
        }, 1000, this);
    
    },
    
    // Vérifie que le temps de la réservation ne dépasse pas 20 minutes
    verificationDuree: function() {
        
        var dateActuelle = new Date();
        var timeCheck = dateActuelle.getTime();
        
        if (timeCheck > this.dateReservation + this.delai) {
            
            this.finCompteur();
            
        }
        
    },
    
    // Permet de calculer le temps restant avant le fin de la réservation
    affichageTempsRestant: function() {
        
        var dateActuelle = new Date();
        var timeCheck = dateActuelle.getTime();
        
        var finReservation = this.dateReservation + this.delai;
        
        /* Le temps restant correspond à la soustraction entre la date 
        de fin de réservation et la date actuelle */
        var tempsRestant = new Date(finReservation - timeCheck);
        
        this.zoneCompteur.textContent = tempsRestant.getMinutes() + " minute(s) et " + tempsRestant.getSeconds() + " seconde(s)";
        
    },
    
    // Gère l'expiration du compteur
    finCompteur: function() {
        
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
        
        // On stoppe le compteur
        this.stop();
        
    },
    
    // Arrête le compteur
    stop: function() {
        
        clearInterval(this.intervalId);
        this.intervalId = false;
    }
};