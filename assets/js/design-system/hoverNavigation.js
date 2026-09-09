class HoverNavigation {
    constructor (selector) {
        this.element = document.querySelector(selector);
        
        if (!this.element) {
            return;
        }
        
        this.navigationElements = this.element.querySelectorAll('li');
        this.delay = 3;

        this.listen();
    }

    listen () {
        this.navigationElements.forEach( function (navigationElement) {
            navigationElement.addEventListener('mouseenter', function () {
                var link = event.currentTarget.querySelector('a');
                 this.timeout = setTimeout(this.click.bind(this, link), this.delay * 1000);
            }.bind(this));
    
            navigationElement.addEventListener('mouseleave', function () {
                clearTimeout(this.timeout);
            }.bind(this));
        }.bind(this));
    }
    click (link) {
        var event = new MouseEvent('click');
        link.dispatchEvent(event);
    }
}

export default new HoverNavigation('.block-siblings-navigation');
