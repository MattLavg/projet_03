// Objet DIAPORAMA
var Diaporama = {
    
    // Indique la position du contenu affiché par le diaporama
    current: 0,
    intervalId: false,
    
    // Tableau d'objets contenant images et textes affichés par le diaporama
    contenu: [
        {
            image : "images/img01.jpg",
            texte : "Bienvenue sur l'application Velo'v"
        },
        
        {
            image : "images/img02.jpg",
            texte : "Pour réserver un vélo vous devez cliquer sur une station présente sur la carte. Les stations rouges indiquent qu'aucun vélo n'est disponible."
        },
        
        {
            image : "images/img03.jpg",
            texte : "Vous devez ensuite cliquer sur le bouton ''réserver'', puis signer dans la zone prévue à cet effet pour valider votre réservation."
        },
        
        {
            image : "images/img04.jpg",
            texte : "Votre réservation restera active pendant 20 minutes. Vous pouvez modifier ou annuler votre réservation à tous moment"
        }
    ],
    
    // Initialise le diaporama
    // Lance la lecture automatique
    // Initialise les intéractions souris et clavier 
    init: function() {
        
        this.lectureAuto();
        this.afficherContenu();
        
        /* Pour ne pas perdre le contexte de this
        on l'affecte à une variable _this */
        var _this = this;
        
        document.addEventListener("keydown", function (e) {
            
            _this.keyEvents(e);
            
        });
        
        document.getElementById("prev").addEventListener("click", function() {
            
            _this.stopLecture();
            _this.contenuPrecedent();
            
        });
        
        document.getElementById("next").addEventListener("click", function() {
            
            _this.stopLecture();
            _this.contenuSuivant();
            
        });
        
        document.getElementById("play").addEventListener("click", function() {
            
            if (_this.intervalId == false) {
                _this.lectureAuto();
            }
            
        });
        
        document.getElementById("stop").addEventListener("click", function() {
            
            if (_this.intervalId) {
                _this.stopLecture();
            }
            
        });
        
    },
    
    // Permet de gérer l'affichage avec les flèches du clavier
    keyEvents: function(e) {
        
        var touche = e.keyCode;
        
        switch (touche) {
                
            case 37 :
                this.contenuPrecedent();
                this.stopLecture();
                break;
                
            case 39 :
                this.contenuSuivant();
                this.stopLecture();
                break;
                
        }
        
    },
    
    // Incrémente current et affiche le contenu correspondant
    contenuSuivant: function() {
        
        if (this.current === this.contenu.length - 1) {
            
            this.current = 0;
            
        } else {
            
            this.current++;
        }
        
        this.afficherContenu();
    },
    
    // Décrémente current et affiche le contenu correspondant
    contenuPrecedent: function() {
        
        if (this.current === 0) {
            
            this.current = this.contenu.length - 1;
            
        } else {
            
            this.current--;
        }
        
        this.afficherContenu();
    },
    
    // Modifie la source de l'image et le contenu du texte en fonction du current
    afficherContenu: function() {
        
        document.getElementById("imageDiaporama").src = this.contenu[this.current].image;
        
        if (this.current === 0) {
            
            document.getElementById("texteDiaporama").style.display = "none";
            
        } else {
            
            document.getElementById("texteDiaporama").style.display = "block";
            document.getElementById("texteDiaporama").textContent = this.contenu[this.current].texte;
            
        }
        
    },
    
    // Lance le diaporama en mode automatique
    lectureAuto: function() {
        
        this.intervalId = setInterval(function(objet) {
            
            objet.contenuSuivant();
            
        }, 4000, this);
        
    },
    
    // Arrête le diaporama
    stopLecture: function() {
        
        clearInterval(this.intervalId);
        this.intervalId = false;
    },
    
};