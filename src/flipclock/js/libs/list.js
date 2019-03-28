/*jshint smarttabs:true */

/**
 * FlipClock.js
 *
 * @author     Justin Kimbrell
 * @copyright  2013 - Objective HTML, LLC
 * @licesnse   http://www.opensource.org/licenses/mit-license.php
 */


"use strict";

/**
 * The FlipClock List class is used to build the list used to create
 * the card flip effect. This object fascilates selecting the correct
 * node by passing a specific digit.
 *
 * @param    object  A FlipClock.Factory object
 * @param    mixed   This is the digit used to set the clock. If an
 *                    object is passed, 0 will be used.
 * @param    object  An object of properties to override the default
 */

FlipClock.List = FlipClock.Base.extend({

    /**
     * The digit (0-9)
     */

    digit: 0,

    /**
     * The CSS classes
     */

    classes: {
        active: 'flip-clock-active',
        before: 'flip-clock-before',
        flip: 'flip'
    },

    /**
     * The parent FlipClock.Factory object
     */

    factory: false,

    /**
     * The jQuery object
     */

    $el: false,

    /**
     * The jQuery object (deprecated)
     */

    $obj: false,

    /**
     * The items in the list
     */

    items: [],

    /**
     * The last digit
     */

    lastDigit: 0,

    /**
     * Constructor
     *
     * @param  object  A FlipClock.Factory object
     * @param  int     An integer use to select the correct digit
     * @param  object  An object to override the default properties
     */

    constructor: function (factory, digit, options) {
        this.factory = factory;
        this.digit = digit;
        this.lastDigit = digit;
        this.$el = this.createList();

        // Depcrated support of the $obj property.
        this.$obj = this.$el;

        if (digit > 0) {
            this.select(digit);
        }

        if (this.factory.$el !== null) {
            this.factory.$el.appendChild(this.$el);
        }
    },

    /**
     * Select the digit in the list
     *
     * @param  int  A digit 0-9
     */

    select: function (digit) {
        if (typeof digit === "undefined") {
            digit = this.digit;
        }
        else {
            this.digit = digit;
        }

        if (this.digit != this.lastDigit) {
            var $delete = null;
            var $active = null;
            if (this.$el !== null) {
                $delete = this.$el.querySelector('.' + this.classes.before);
                $active = this.$el.querySelector('.' + this.classes.active);
            }
            FlipClock.Dom.removeClass($delete, [this.classes.before]);
            FlipClock.Dom.removeClass($active, [this.classes.active]);
            FlipClock.Dom.addClass($active, [this.classes.before]);
            this.appendListItem(this.classes.active, this.digit);
            FlipClock.Dom.remove($delete);
            this.lastDigit = this.digit;
        }
    },

    /**
     * Adds the play class to the DOM object
     */

    play: function () {

        FlipClock.Dom.addClass(this.$el, [this.factory.classes.play]);
    },

    /**
     * Removes the play class to the DOM object
     */

    stop: function () {
        var t = this;

        setTimeout(function () {
            FlipClock.Dom.removeClass(t.$el, [t.factory.classes.play]);
        }, this.factory.timer.interval);
    },

    /**
     * Creates the list item HTML and returns as a string
     */

    createListItem: function (css, value) {

        var el = document.createElement('li');
        if (css) {
            el.classList.add(css);
        }

        el.innerHTML = [
            '<a href="#">',
                '<div class="up">',
                    '<div class="shadow"></div>',
                    '<div class="inn">' + (value ? value : '') + '</div>',
                '</div>',
                '<div class="down">',
                    '<div class="shadow"></div>',
                    '<div class="inn">' + (value ? value : '') + '</div>',
                '</div>',
            '</a>'].join('');
        return el;
    },

    /**
     * Append the list item to the parent DOM node
     */

    appendListItem: function (css, value) {
        var html = this.createListItem(css, value);
        this.$el.appendChild(html);
    },

    /**
     * Create the list of digits and appends it to the DOM object
     */

    createList: function () {

        var lastDigit = this.getPrevDigit() ? this.getPrevDigit() : this.digit;

        var html = document.createElement('ul');
        html.classList.add(this.classes.flip);
        if (this.factory.running) {
            html.classList.add(this.factory.classes.play);
        }
        html.appendChild(this.createListItem(this.classes.before, lastDigit));
        html.appendChild(this.createListItem(this.classes.active, this.digit));
        return html;
    },

    getNextDigit: function () {
        return this.digit == 9 ? 0 : this.digit + 1;
    },

    getPrevDigit: function () {
        return this.digit == 0 ? 9 : this.digit - 1;
    }

});

