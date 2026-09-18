window.osuny = window.osuny || {};

window.osuny.PostNotesManager = function (element) {
    this.notes = window.osuny.page.getComponents('postNote');
    window.addEventListener('scroll', this.update.bind(this));
    this.update();
}; 

window.osuny.PostNotesManager.prototype.update = function () {
    var nearest = null,
        i;
    for (i = this.notes.length - 1; i >= 0; i -= 1) {
        if (this.notes[i].isVisible && !nearest) {
            nearest = this.notes[i];
            nearest.show();
        } else {
            this.notes[i].hide();
        }
    }

    console.log(nearest);
};

window.osuny.page.registerComponent({
    name: 'postNotesManager',
    selector: '.posts__page',
    klass: window.osuny.PostNotesManager
});
