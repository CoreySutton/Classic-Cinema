/** Module for the category carousel
 *
 * This creates a cycling 'carousel' of category
 * information on the front page
 */
var Carousel = (function () {

    var categoryList, categoryIndex, pub;

    pub = {}; // public interface

    /** Advance the carousel to the next category
     *
     * This function changes the display to show the next
     * category. If the index goes off the end of the list,
     * then it wraps around to the start.
     */
    function nextMovie() {
//        var carousel = document.getElementById("carousel");
//        carousel.innerHTML = categoryList[categoryIndex].makeHTML();
		$("#carousel").animate({opacity : 1}, 1500, "linear");
		$("#carousel").html(categoryList[categoryIndex].makeHTML());
		$("#carousel").animate({opacity : 0}, 1500, "linear");
        categoryIndex += 1;
        if (categoryIndex >= categoryList.length) {
            categoryIndex = 0;
        }
    }

    /** Constructor for MovieCategory objects
     *
     * The details about each category are stored in
     * a simple object created by this function.
     *
     * title the title of the category
     * image a URL to the a movie cover image
     * page a URL for the category's full page
     */
    function MovieCategory(title, image, page) {
        this.title = title;
        this.image = image;
        this.page = page;
        this.makeHTML = function () {
            return "<a href='" + page + "'><img src='" + image + "' alt='" + title + "'><br>" + title + "</a>";
        };
    }

    /** Setup carousel functions
     *
     * The list of categories is created, and the front page
     * updated with the first element from this list. A timer
     * is then set to advance the carousel every 3 seconds.
     */
    pub.setup = function () {
        categoryList = [];
        categoryList.push(new MovieCategory("Classics", "images/Metropolis.jpg", "classic.html"));
        categoryList.push(new MovieCategory("Science Fiction and Horror", "images/Plan_9_from_Outer_Space.jpg", "scifi.html"));
        categoryList.push(new MovieCategory("Alfred Hitchcock", "images/Vertigo.jpg", "hitchcock.html"));
        categoryIndex = 0;
        nextMovie();
        setInterval(nextMovie, 3000);
    };

    return pub; // Expose the public interface

}());

// Register Carousel.setup for execution when the page loads
if (window.addEventListener) {
    window.addEventListener('load', Carousel.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', Carousel.setup);
} else {
    alert("Could not attach 'Carousel.setup' to the 'window.onload' event");
}