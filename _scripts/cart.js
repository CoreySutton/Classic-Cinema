/** Module for shopping cart functions.
 *
 * These functions allow items to be added to the cart
 * from the category pages for Lab 7. Further processing
 * of the cart is handled by checkout.js.
 *
 * Requires Cookie.js
 */
var Cart = (function () {

    var pub = {}; // public interface

    /** Add an item to the cart
     *
     * This function is called when the user clicks on
     * a button to add an item to the cart. The cart
     * is retrieved from the cookie, updated, and stored.
     */
    function addToCart() {
        var movieToAdd, film, listOfFilms;
        movieToAdd = {};
        film = $(this).parent().parent();
        movieToAdd.price = parseFloat($(this).parent().find(".price")[0].textContent);
        movieToAdd.title = film.find("h3")[0].textContent;
        listOfFilms = Cookie.get("shoppingCart");
        // The listOfFilms might be null, so check...
        if (listOfFilms) {
            listOfFilms = JSON.parse(listOfFilms);
        } else {
            listOfFilms = [];
        }
        listOfFilms.push(movieToAdd);
        Cookie.set("shoppingCart", JSON.stringify(listOfFilms));
    }

    /** Setup Cart functions
     *
     * This registers the addToCart function as the callback for
     * when users click on the buy buttons.
     */
    pub.setup = function () {
    	$(".buy").click(addToCart); 
    };

    return pub; // Expose the public interface

}());

// Register Cart.setup for execution when the page loads
if (window.addEventListener) {
    window.addEventListener('load', Cart.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', Cart.setup);
} else {
    alert("Could not attach 'Cart.setup' to the 'window.onload' event");
}