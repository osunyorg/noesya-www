class RevertHeader {
    constructor () {
        this.hero = document.querySelector('.hero--with-image');
        this.header = document.getElementById('document-header');

        if (!this.hero) {
            return;
        }
        
        this.resize();
        
        this.listen();
    }

    listen () {
        this.header.classList.add('revert');

        window.addEventListener('resize', this.resize.bind(this));

        ['scroll'].forEach(event => {
            window.addEventListener(event, this.onScroll.bind(this));
        });
    }

    resize () {
        this.heroHeight = this.hero.offsetHeight - this.header.offsetHeight / 2;
    }

    onScroll () {
        if (window.scrollY < this.heroHeight) {
            this.header.classList.add('revert');
        } else {
            this.header.classList.remove('revert');
        }
    }
}

export default new RevertHeader();
