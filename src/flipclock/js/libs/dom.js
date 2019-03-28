FlipClock.Dom = FlipClock.Dom || {};

/**
 * Get all by css selector
 * @param selector
 * @returns {*}
 */
FlipClock.Dom.getAll = function (selector) {
    const elements = document.querySelectorAll(selector);
    if (elements.length < 1) {
        return null;
    }
    return elements;
};


/**
 * Get element by selector
 * @param selector
 * @returns {*}
 */
FlipClock.Dom.get = function (selector) {
    const element = document.querySelector(selector);
    if (element === null) {
        return null;
    }
    return element;
};

/**
 * Get data attributes
 * @param element
 * @returns {{}}
 */
FlipClock.Dom.data = function (element) {
    if (typeof element === 'undefined' || element === null) {
        return {};
    }
    const dataAttr = element.dataset;
    const keys = Object.keys(dataAttr);
    const dataSet = {};
    keys.map((k) => {
        if (typeof dataAttr[k] !== 'undefined') {
            dataSet[k] = dataAttr[k];
        }
    });
    return dataSet;
};

/**
 * Add class
 * @param element
 * @param classList
 * @returns {*}
 */
FlipClock.Dom.addClass = function (element, classList = []) {
    if (typeof element === 'undefined' || element === null || typeof element === 'undefined' || classList == null) {
        return false;
    }
    classList.map((className) => {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ` ${className}`;
        }
    });
    return element;
};

/**
 * Attributes
 * @param element
 * @param key
 * @param value
 * @returns {*}
 */
FlipClock.Dom.attr = function (element, key, value) {
    if (typeof element === 'undefined' || element === null) {
        return {};
    }
    if (typeof value === 'undefined') {
        return element.getAttribute(key);
    }
    element.setAttribute(key, value);
};

/**
 * Prepend
 * @param parent
 * @param element
 * @returns {boolean}
 */
FlipClock.Dom.prepend = function (parent, element) {
    if (typeof element === 'undefined' || element === null || typeof parent === 'undefined' || parent === null) {
        return false;
    }
    parent.insertBefore(element, parent.firstChild);
};

/**
 * Remove Class
 * @param element
 * @param classList
 * @returns {boolean}
 */
FlipClock.Dom.removeClass = function (element, classList) {
    if (typeof element === 'undefined' || element === null || typeof className === 'undefined' || className === null) {
        return false;
    }
    classList.map((className) => {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
        }
    });
};

/**
 * Has Class
 * @param element
 * @param className
 * @returns {boolean}
 */
FlipClock.Dom.hasClass = function (element, className) {
    if (typeof element === 'undefined' || element === null || typeof className === 'undefined' || className === null) {
        return false;
    }
    if (element.classList) {
        return element.classList.contains(className);
    }
    return new RegExp(`(^| )${className}( |$)`, 'gi').test(element.className);
};

/**
 * Remove object from DOM
 * @param element
 * @returns {null}
 */
FlipClock.Dom.remove = function (element) {
    if (typeof element === 'undefined' || element === null) {
        return null;
    }
    element.parentNode.removeChild(element);
};
