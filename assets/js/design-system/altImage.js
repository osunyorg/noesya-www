class Gallery {
    constructor (selector) {
        this.element = document.querySelector(selector);
        
        if (!this.element) {
            return;
        }

        this.heroFigure = document.querySelector('.hero figure');
        this.altPicture = this.element.querySelector('picture');

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
