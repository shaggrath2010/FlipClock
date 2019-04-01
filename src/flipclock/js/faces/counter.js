
/**
 * Counter Clock Face
 *
 * This class will generate a generice flip counter. The timer has been
 * disabled. clock.increment() and clock.decrement() have been added.
 *
 * @param  object  The parent FlipClock.Factory object
 * @param  object  An object of properties to override the default
 */

FlipClock.CounterFace = FlipClock.Face.extend({

	/**
	 * Tells the counter clock face if it should auto-increment
	 */

	shouldAutoIncrement: false,

	/**
	 * Constructor
	 *
	 * @param  object  The parent FlipClock.Factory object
	 * @param  object  An object of properties to override the default
	 */

	constructor: function(factory, options) {

		if(typeof options != "object") {
			options = {};
		}

		factory.autoStart = options.autoStart ? true : false;

		if(options.autoStart) {
			this.shouldAutoIncrement = true;
		}

		factory.increment = function() {
			factory.countdown = false;
			factory.setTime(factory.getTime().getTimeSeconds() + 1);
		};

		factory.decrement = function() {
			factory.countdown = true;
			var time = factory.getTime().getTimeSeconds();
			if(time > 0) {
				factory.setTime(time - 1);
			}
		};

		factory.setValue = function(digits) {
			factory.setTime(digits);
		};

		factory.setCounter = function(digits) {
			factory.setTime(digits);
		};

		this.base(factory, options);
	},

	/**
	 * Build the clock face
	 */

	build: function() {
		var t        = this;
		var children = this.factory.$el.querySelectorAll('ul');
		var time 	 = this.factory.getTime().digitize([this.factory.getTime().time]);

		if(children !== null && time.length > children.length) {
            time.forEach(function(digit, i){
                var list = t.createList(digit);
                list.select(digit);
            });
		}
        this.lists.forEach(function(list, i){
            list.play();
        });

		this.base();
	},

	/**
	 * Flip the clock face
	 */

	flip: function(time, doNotAddPlayClass) {
		if(this.shouldAutoIncrement) {
			this.autoIncrement();
		}

		if(!time) {
			time = this.factory.getTime().digitize([this.factory.getTime().time]);
		}

		this.base(time, doNotAddPlayClass);
	},

	/**
	 * Reset the clock face
	 */

	reset: function() {
		this.factory.time = new FlipClock.Time(
			this.factory,
			this.factory.original ? Math.round(this.factory.original) : 0
		);

		this.flip();
	}
});