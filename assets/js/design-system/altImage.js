class Gallery {
    constructor (selector) {
        this.element = document.querySelector(selector);
        this.heroFigure = document.querySelector('.hero figure');
        this.altPicture = this.element.querySelector('picture');
        
        if (!this.element) {
            return;
        }

        this.movePicture();
        this.destroyBlock();
    }

    movePicture () {
      this.heroFigure.appendChild(this.altPicture);
    }

    destroyBlock () {
      this.element.remove();
    }
}

export default new Gallery('.block-class-portrait-alt');
