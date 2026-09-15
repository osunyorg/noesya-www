class PostParagraphs {
    constructor (selector) {
        this.element = document.querySelector(selector);
        
        if (!this.element) {
            return;
        }
        
        this.paragraphs = document.querySelectorAll('.block-chapter p');

        this.addCounterToParagraphs();
    }

    addCounterToParagraphs () {
        this.paragraphs.forEach( function (paragraph, index) {
            paragraph.innerHTML += `<span class="paragraph-count">§${index + 1}</span>`
        }.bind(this));
    }
}

export default new PostParagraphs('.posts__page');
