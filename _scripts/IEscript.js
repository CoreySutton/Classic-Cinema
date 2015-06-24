/** IE 8 work around script
 *
 * Declares new HTML5 elements for IE 8 and
 * provides workarounds for some missing
 * JavaScript functionality.
 */

document.createElement('header');
document.createElement('nav');
document.createElement('section');
document.createElement('footer');

/* Add trim() to Strings */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

/* Add document.getElementsByClassName */
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (className) {
        return this.querySelectorAll("." + className);
    };
    Element.prototype.getElementsByClassName = document.getElementsByClassName;
}