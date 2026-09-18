import { isMobile } from '../theme/utils/breakpoints';

window.osuny.PostNote = function (element) {
    window.osuny.Note.call(this, element);

    this.chapter = this.note.closest('.chapter');
    window.addEventListener('resize', this.update.bind(this));
    window.addEventListener('load', this.update.bind(this));
    window.addEventListener('scroll', this.update.bind(this));
    this.update();
};

window.osuny.PostNote.prototype = window.osuny.Note.prototype;

window.osuny.PostNote.prototype.update = function () {
    if (!isMobile()) {
        this.setPosition();
    } else {
        this.content.removeAttribute('style');
    }
    this.setVisibility();
};

window.osuny.PostNote.prototype.setVisibility = function () {
    var anchorTop = this.call.getBoundingClientRect().top,
        offset = window.innerHeight * 0.5;

    this.isVisible = anchorTop > 0 && anchorTop < offset;
}

// Mobile mode
window.osuny.PostNote.prototype.show = function () {
    this.content.classList.add('is-visible');
};

window.osuny.PostNote.prototype.hide = function () {
    this.content.classList.remove('is-visible');
};

// Desktop mode
window.osuny.PostNote.prototype.setPosition = function () {
    this.minTop = 0;
    this.avoidOverlapTitle();
    this.avoidOverlapNotes();

    var top = Math.max(this.minTop, this.call.offsetTop);
    this.content.style.top = top + "px";
};

window.osuny.PostNote.prototype.avoidOverlapTitle = function () {
    var title = this.chapter.querySelector('.block-title');
    if (title) {
        this.minTop = title.offsetHeight;
    }
};

window.osuny.PostNote.prototype.avoidOverlapNotes = function () {
    var notes = this.chapter.querySelectorAll('.note'),
        isAfter = false;

    notes.forEach(function (note) {
        if (isAfter) return;

        var noteContent = note.querySelector('.note__content'),
            noteCall = note.querySelector('.note__call');

        if (noteContent === this.content) {
            isAfter = true;
        } else {
            this.minTop = Math.max(this.minTop, noteCall.offsetTop + noteContent.offsetHeight);
        }

    }.bind(this));
};

window.osuny.page.registerComponent({
    name: 'postNote',
    selector: '.posts__page .note',
    klass: window.osuny.PostNote
});
