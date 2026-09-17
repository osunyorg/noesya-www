class PostsNotes {
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
        // - autres notes - OK
        // alignement horizontal correct - help
        
        // 2. mobile : 
        // on fixe les notes en bas de l'écran
        // si on scroll et que la note est au milieu de l'écran ça fait apparaître le contenu de celle-ci
        // ça reste jusqu'à disparaître de l'écran

        this.init();
    }

    init () {
        this.notes.forEach((note, index) => {
            var parent = note.offsetParent, // on prend le p avec `position: relative` comme référence pour le `top`
                previousNote = null;
            
            if (index > 0) {
                previousNote = this.notes[index - 1]; // si on n'est pas dans la première note, alors on récupère la précédente
            }
            
            this.y = this.getTop(note) - this.getTop(parent); // on récupère la position de la note dans le paragraphe
            
            this.titles.forEach((title) => {
                this.testTitleOverlap(parent, title);
            });

            if (previousNote) {
                this.preventOverlap(previousNote);
            }

            note.style.top = `${this.y}px`; // on applique la position à la note une fois les titres testés
        });
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

    preventOverlap (previousNote) {
        var previousNoteTop = (previousNote.style.top).replace('px', ''), // on récupère la valeur css `top` à laquelle on enlève `px`
            safer = 10, // même valeur de sécurité
            distance = previousNote.offsetHeight + safer; // hauteur de la note + sécurité
        
        if (previousNoteTop == this.y) {
            console.log('overlap')
            this.y = Math.max(this.y, this.y + distance);
        }
    }

    getTop (element) {
        return element.getBoundingClientRect().top + window.scrollY;
    }

}

export default new PostsNotes('.posts__page');