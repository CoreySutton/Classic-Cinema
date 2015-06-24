/** Module for show/hide functions
 *
 * These functions implement the show/hide functions from Lab 3.
 * Clicking on film's titles causes the details to be hidden or
 * revealed.
 */
var ShowHide = (function () {

    var pub = {}; // public interface

    /** Show/Hide a film's details
     *
     * This provides the callback to show or hide a film's details.
     * The <img> and <p> siblings of the <h3> element are found and
     * their visibility toggled.
     */
    function showHideDetails() {
        /*var images, paragraphs, i, p;
        images = this.parentNode.getElementsByTagName("img");
        for (i = 0; i < images.length; i += 1) {
            if (images[i].style.display === "none") {
                images[i].style.display = "block";
            } else {
                images[i].style.display = "none";
            }
        }
        paragraphs = this.parentNode.getElementsByTagName("p");
        for (p = 0; p < paragraphs.length; p += 1) {
            if (paragraphs[p].style.display === "none") {
                paragraphs[p].style.display = "block";
            } else {
                paragraphs[p].style.display = "none";
            }
        }*/
		$(this).siblings().toggle("easeOutQuart");
    }

    /** Setup show/hide functions
     *
     * Attach showHideDetails() as a callback to each film's title.
     */
    pub.setup = function () {
        var films, f, title;
        films = document.getElementsByClassName("film");
        for (f = 0; f < films.length; f += 1) {
            title = films[f].getElementsByTagName("h3")[0];
            title.onclick = showHideDetails;
            title.style.cursor = "pointer";
        }
    };

    return pub; // Expose the public interface
}());

// Register ShowHide.setup for execution when the page loads
if (window.addEventListener) {
    window.addEventListener('load', ShowHide.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', ShowHide.setup);
} else {
    alert("Could not attach 'ShowHide.setup' to the 'window.onload' event");
}