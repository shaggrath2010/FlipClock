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
 * Capitalize the first letter in a string
 *
 * @return string
 */

String.prototype.ucfirst = function() {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
};