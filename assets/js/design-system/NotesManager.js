window.osuny = window.osuny || {};

window.osuny.NotesManager = function () {
    this.notes = window.osuny.page.getComponents('Note');
    window.addEventListener('scroll', this.update.bind(this));
    this.update();
}; 

window.osuny.NotesManager.prototype.update = function () {
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
};

window.osuny.page.registerComponent({
    name: 'NotesManager',
    selector: 'main',
    klass: window.osuny.NotesManager
});
