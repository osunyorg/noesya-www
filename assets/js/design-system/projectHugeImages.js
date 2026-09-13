class ProjectHugeImages {
    constructor () {
        this.blocksClass = 'body.projects__page .block-image';
        this.blocks = document.querySelectorAll(this.blocksClass);
        this.addListeners();
    }

    addListeners() {
        this.blocks.forEach( function (block) {
            block.addEventListener('click', function () {
                this.expand(block)
            }.bind(this));
        }.bind(this));
    }

    expand(block) {
        block.classList.add('block-image--expanded');
    }
}

export default new ProjectHugeImages();
