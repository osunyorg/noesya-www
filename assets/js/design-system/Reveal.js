window.noesya = window.noesya || {};
window.osuny = window.osuny || {};

window.noesya.Reveal = function (element) {
  this.element = element;
  this.init();
}; 

window.noesya.Reveal.prototype.init = function () {
  const observer = new IntersectionObserver(this.show.bind(this));
  observer.observe(this.element);
};

window.noesya.Reveal.prototype.show = function () {
  console.log('show');
  this.element.classList.add('is-revealed');
};

window.osuny.page.registerComponent({
    name: 'Reveal',
    selector: '.block-class-reveal, .block-class-manifesto',
    klass: window.noesya.Reveal
});
