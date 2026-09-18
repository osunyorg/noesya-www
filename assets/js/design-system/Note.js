import { isMobile } from '../theme/utils/breakpoints';

var OriginalNote = window.osuny.Note;

window.osuny.Note = function (element) {
    OriginalNote.call(this, element);

    this.chapter = this.note.closest('.chapter');
    window.addEventListener('resize', this.update.bind(this));
    window.addEventListener('load', this.update.bind(this));
    window.addEventListener('scroll', this.update.bind(this));
    this.update();
};

window.osuny.Note.prototype = OriginalNote.prototype;

window.osuny.Note.prototype.update = function () {
    if (!isMobile()) {
        this.setPosition();
    } else {
        this.content.removeAttribute('style');
    }
    this.setVisibility();
};

window.osuny.Note.prototype.setVisibility = function () {
    var anchorTop = this.call.getBoundingClientRect().top,
        offset = window.innerHeight * 0.5;

    this.isVisible = anchorTop > 0 && anchorTop < offset;
}

// Mobile mode
window.osuny.Note.prototype.show = function () {
    this.content.classList.add('is-visible');
};

window.osuny.Note.prototype.hide = function () {
    this.content.classList.remove('is-visible');
};

// Desktop mode
window.osuny.Note.prototype.setPosition = function () {
    this.minTop = 0;
    this.avoidOverlapTitle();
    this.avoidOverlapNotes();

    var top = Math.max(this.minTop, this.call.offsetTop);
    this.content.style.top = top + "px";
};

window.osuny.Note.prototype.avoidOverlapTitle = function () {
    var title = this.chapter.querySelector('.block-title');
    if (title) {
        this.minTop = title.offsetHeight;
    }
};

window.osuny.Note.prototype.avoidOverlapNotes = function () {
    var notes = this.chapter.querySelectorAll('.note'),
        isAfter = false;

    notes.forEach(function (note) {
        if (isAfter) return;

        var noteContent = note.querySelector('.note__content'),
            noteCall = note.querySelector('.note__call');

        if (noteContent === this.content) {
            isAfter = true;
        } else {
            this.minTop = Math.max(this.minTop, noteContent.offsetTop + noteContent.offsetHeight);
        }

    }.bind(this));
};

window.osuny.page.registerComponent({
    name: 'Note',
    selector: '.note',
    klass: window.osuny.Note
});
