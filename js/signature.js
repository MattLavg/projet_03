// Objet SIGNATURE permettant de valider la réservation
var Signature = {
    
    zoneCanvas: document.getElementById("zoneCanvas"),
    canvas: document.getElementById("mon_canvas"),
    isDrawing: false,
    onGoingTouches: [],
    
    // Initialise le canvas
    // Défini le contexte
    // Reset le canvas à l'initialisation
    init: function(e) {
        
        this.ctx = this.canvas.getContext('2d'); 

        this.ctx.lineJoin = 'round'; // Coin arrondi lorsque deux lignes se rejoignent
        this.ctx.lineCap = 'round'; // Coins arrondis aux extrémités d'un trait
        this.ctx.lineWidth = 10;       // Epaisseur du trait
        this.ctx.strokeStyle = '#000'; // Couleur du trait
        
        var _this = this;
        
        /* --- TACTILE --- */
        
        this.canvas.addEventListener("touchstart", function(e) {
            
            _this.touchStart(e);
            
        });
        
        this.canvas.addEventListener("touchmove", function(e) {
            
            _this.touchMove(e);
            
        });
        
        this.canvas.addEventListener("touchend", function(e) {
            
            _this.touchEnd(e)
            
        });
        
        /* --- SOURIS --- */
        
        this.canvas.addEventListener("mousedown", function(e) {
            
            _this.mouseDown(e);
            
        });
        
        this.canvas.addEventListener("mousemove", function(e) {
            
            _this.dessiner(e);
            
        });
        
        this.canvas.addEventListener("mouseup", function() {
            
            _this.arreterDessiner();
            
        });
        
        this.canvas.addEventListener("mouseout", function() {
            
            _this.arreterDessiner();
            
        });
        
        /* --- RESET --- */
        
        document.getElementById("resetButton").addEventListener("click", function() {
            
            _this.resetCanvas();
            
        });
        
        /* --- QUITTER --- */
        
        // Au changement de taille de la fenêtre
        window.addEventListener("resize", function() {
            
            _this.quitterCanvas();
            
        });
        
        // Au clic sur le span (la croix), quitter le Canvas
        document.querySelector(".close").addEventListener("click", function() {

            _this.quitterCanvas();

        });
        
        // Au clic en dehors du canvas, quitter le canvas
        window.addEventListener("click", function(e) {

            if (e.target == _this.zoneCanvas) {

                _this.quitterCanvas();

            }

        });
        
    },
    
    // Permet d'afficher la zone de dessin
    affichageSignature: function() {
        
        this.zoneCanvas.style.display = "block"; 
        
        this.resetCanvas();
        
        document.getElementById("boutonValidation").style.display = "none";
        
        // On récupère la hauteur du container du canvas
        var hauteur = document.querySelector(".containerCanvas").offsetHeight;
        
        // On donne cette taille au canvas  
        this.canvas.height = hauteur;
        this.canvas.width = window.innerWidth;
        
    },
    
    // Permet de dessiner à la souris sur le canvas
    dessiner: function(e) {
        
        /* Arrête de dessiner quand on ne clique plus 
        ou que l'on sort du canvas */
        if (this.isDrawing === false) {

            return;
            
        }    
        
        this.ctx.beginPath(); // Début du tracé
        this.ctx.moveTo(this.lastX, this.lastY); // On part des coordonnées lastX et laxtY
        this.ctx.lineTo(e.offsetX, e.offsetY); // On ajoute un segment vers les nouvelles coordonnées
        this.ctx.stroke(); // On fait apparaître le contour du tracé
        
        this.lastX = e.offsetX; // lastX vaut nouvelle coordonnée 
        this.lastY = e.offsetY; // lastY vaut nouvelle coordonnée
        
    },
    
    // Permet l'arrêt du dessin
    arreterDessiner: function() {
        
        this.isDrawing = false;
        
    },
    
    // Permet de retrouver le toucher en cours
    retrouverToucherEnCours: function(idToFind) {
        
        for (var i = 0; i < this.onGoingTouches.length; i++) {
            var id = this.onGoingTouches[i].identifier;

            if (id == idToFind) {
            return i;
            }
        } 
        return -1; // toucher non trouvé  
        
    },
    
    // Au premier toucher
    touchStart: function(e) {
            
        e.preventDefault(); // Empêche le scroll
        var touches = e.changedTouches; // Renvoie une liste des touchers

        for (var i = 0; i < touches.length; i++) {
            this.onGoingTouches.push(touches[i]);
        }

        // On fait apparaître le bouton de validation
        document.getElementById("boutonValidation").style.display = "block";
        
    },
    
    // Toucher maintenu et en mouvement
    touchMove: function(e) {
           
        e.preventDefault();
        var touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            
            // vaut ligne du tableau du dernier toucher
            var idx = this.retrouverToucherEnCours(touches[i].identifier);

            this.ctx.beginPath();
            this.ctx.moveTo(this.onGoingTouches[idx].clientX, this.onGoingTouches[idx].clientY);
            this.ctx.lineTo(touches[i].clientX, touches[i].clientY);
            this.ctx.closePath();
            this.ctx.stroke();

            this.onGoingTouches.splice(idx, 1, touches[i]);  // Mettre à jour la liste des touchers

        }
        
    },
    
    // Fin du toucher
    touchEnd: function(e) {
            
        e.preventDefault();
        var touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.onGoingTouches[i].clientX, this.onGoingTouches[i].clientY);
            this.ctx.lineTo(touches[i].clientX, touches[i].clientY);
            this.onGoingTouches.splice(i, 1);  // On enlève le point
        }
    
    },

    // Au clic de la souris
    mouseDown: function(e) {

        this.isDrawing = true;
        this.lastX = e.offsetX;
        this.lastY = e.offsetY;

        document.getElementById("boutonValidation").style.display = "block";
            
    },
    
    // Efface le canvas
    resetCanvas: function() {
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    },

    
    // Permet de quitter le Canvas
    quitterCanvas: function() {
        
        this.zoneCanvas.style.display = "none";
        
    }
    
};