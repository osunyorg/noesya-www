window.noesya = window.noesya || {};
window.osuny = window.osuny || {};

window.noesya.Reveal = function (element) {
  this.element = element;
  this.init();
}; 

window.noesya.Reveal.prototype.init = function () {
  const observer = new IntersectionObserver(this.show.bind(this), {
    rootMargin: "0px 0px -20% 0px"
  });
  this.element.querySelectorAll('p, .name').forEach(function (element) {
    observer.observe(element);
  });
};

window.noesya.Reveal.prototype.show = function (entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
    } else {
      // entry.target.classList.remove('is-revealed');
    }
  });
};

window.osuny.page.registerComponent({
    name: 'Reveal',
    selector: '.block-class-reveal',
    klass: window.noesya.Reveal
});
