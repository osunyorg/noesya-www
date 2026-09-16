class NotesInPosts {
    constructor (selector) {
        this.element = document.querySelector(selector);
        
        if (!this.element) {
            return;
        }
        
        this.notes = document.querySelectorAll('.note .note__content');
        this.titles = document.querySelectorAll('h2');
        this.lineHeight = 58.5;
        this.y = 0;

        // 1. on vérifie si la note superpose un autre élément : si oui on la baisse
        // - titres - OK
        // - autres notes
        
        // 2. mobile : 
        // on fixe les notes en bas de l'écran
        // si on scroll et que la note est au milieu de l'écran ça fait apparaître le contenu de celle-ci
        // ça reste jusqu'à disparaître de l'écran

        this.init();
    }

    init () {
        this.notes.forEach((note) => {
            var parent = note.offsetParent; // on prend le p avec `position: relative` comme référence pour le `top`
            this.y = this.getTop(note) - this.getTop(parent); // on récupère la position de la note dans le paragraphe

            this.titles.forEach((title) => {
                this.testTitleOverlap(parent, title);
            });

            note.style.top = `${this.y}px`; // on applique la position à la note une fois les titres testés
        });
    }

    getTop (element) {
        return element.getBoundingClientRect().top + window.scrollY;
    }

    testTitleOverlap (parent, title) {
        var top = this.getTop(title) - this.getTop(parent), // position du haut du titre
            safer = 10, // valeur de sécurité pour le chevauchement
            bottom = top + title.offsetHeight, // position du bas du titre
            offset = Math.max(bottom - this.y, this.lineHeight); // min: soit juste sous le titre, soit décalé d'une ligne

        if (this.y >= top - safer && this.y <= bottom + safer) {
            // on check si ça tombe dans la zone titre + valeur de sécurité
            this.y += offset; // si oui on incrémente y, ce qui baisse la note
        }
    }

}

export default new NotesInPosts('.posts__page');