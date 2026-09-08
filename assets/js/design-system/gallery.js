class Gallery {
    constructor (selector) {
        this.element = document.querySelector(selector);
        
        if (!this.element) {
            return;
        }
        
        this.figures = document.querySelectorAll('figure');
        this.fullWidthText = '[full]';

        this.updateClasses();
    }

    updateClasses () {
        this.figures.forEach( function (figure) {
            if (figure.innerText.includes(this.fullWidthText)) {
                figure.removeAttribute("aria-label");
                figure.classList.add("cover");
            } 
        }.bind(this));
    }
}

export default new Gallery('.block-gallery--grid');
