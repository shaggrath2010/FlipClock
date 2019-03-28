
/**
 * Daily Counter Clock Face
 *
 * This class will generate a daily counter for FlipClock.js. A
 * daily counter will track days, hours, minutes, and seconds. If
 * the number of available digits is exceeded in the count, a new
 * digit will be created.
 *
 * @param  object  The parent FlipClock.Factory object
 * @param  object  An object of properties to override the default
 */

FlipClock.DailyCounterFace = FlipClock.Face.extend({

	showSeconds: true,

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

	build: function(time) {
		var t = this;
		var children = this.factory.$el.querySelectorAll('ul');
		var offset = 0;

		time = time ? time : this.factory.time.getDayCounter(this.showSeconds);

		if(children !== null && time.length > children.length) {
            time.forEach(function(digit, i){
                t.createList(digit);
            });
		}

		if(this.showSeconds) {
            this.lists[this.lists.length - 2].$el.insertBefore(this.createDivider('Seconds'), this.lists[this.lists.length - 2].$el.firstChild);
		}
		else
		{
			offset = 2;
		}

        this.lists[this.lists.length - 4 + offset].$el.insertBefore(this.createDivider('Minutes'), this.lists[this.lists.length - 4 + offset].$el.firstChild);
        this.lists[this.lists.length - 6 + offset].$el.insertBefore(this.createDivider('Hours'), this.lists[this.lists.length - 6 + offset].$el.firstChild);
        this.lists[0].$el.insertBefore(this.createDivider('Days'), this.lists[0].$el.firstChild);
		this.base();
	},

	/**
	 * Flip the clock face
	 */

	flip: function(time, doNotAddPlayClass) {
		if(!time) {
			time = this.factory.time.getDayCounter(this.showSeconds);
		}

		this.autoIncrement();

		this.base(time, doNotAddPlayClass);
	}

});