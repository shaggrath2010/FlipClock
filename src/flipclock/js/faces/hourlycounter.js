
/**
 * Hourly Counter Clock Face
 *
 * This class will generate an hourly counter for FlipClock.js. An
 * hour counter will track hours, minutes, and seconds. If number of
 * available digits is exceeded in the count, a new digit will be
 * created.
 *
 * @param  object  The parent FlipClock.Factory object
 * @param  object  An object of properties to override the default
 */

FlipClock.HourlyCounterFace = FlipClock.Face.extend({

	// clearExcessDigits: true,

	/**
	 * Constructor
	 *
	 * @param  object  The parent FlipClock.Factory object
	 * @param  object  An object of properties to override the default
	 */

	constructor: function(factory, options) {
		this.base(factory, options);
	},

	/**
	 * Build the clock face
	 */

	build: function(excludeHours, time) {
		var t = this;


        var children = null;
        if(this.factory.$el !== null){
            children = this.factory.$el.querySelectorAll('ul');
		}
		time = time ? time : this.factory.time.getHourCounter();

		if(children !== null && time.length > children.length) {
            time.forEach(function(digit, i){
                t.createList(digit);
            });
		}

        this.lists[this.lists.length - 2].$el.insertBefore(this.createDivider('Seconds'), this.lists[this.lists.length - 2].$el.firstChild);
        this.lists[this.lists.length - 4].$el.insertBefore(this.createDivider('Minutes'), this.lists[this.lists.length - 4].$el.firstChild);

		if(!excludeHours) {
            this.lists[0].$el.insertBefore(this.createDivider('Hours'), this.lists[0].$el.firstChild);
		}

		this.base();
	},

	/**
	 * Flip the clock face
	 */

	flip: function(time, doNotAddPlayClass) {
		if(!time) {
			time = this.factory.time.getHourCounter();
		}

		this.autoIncrement();

		this.base(time, doNotAddPlayClass);
	},

	/**
	 * Append a newly created list to the clock
	 */

	appendDigitToClock: function(obj) {
		this.base(obj);

		this.dividers[0].insertAfter(this.dividers[0].next());
	}

});