/** Module for checkout functions
 *
 * These functions support checkout.html for Lab 7.
 * The two main tasks are the display of the shopping cart
 * and the validation of the checkout form. Shopping cart
 * display is linked to page load, and validation to form
 * submission.
 *
 * Further form validation (via change or keypress events)
 * could be added, but this is sufficient for now.
 *
 * Requires cookie.js
 */
var Checkout = (function () {

    var pub = {}; // public interface

    /** Hide the shopping cart and checkout form
     *
     * The shopping cart and checkout form don't make much sense
     * when the cart is empty, so this function hides them using CSS.
     */
    function hideCartElements() {
		$("#cartList").hide();
        $("#checkoutForm").hide();
    }

    /** Display cart items
     *
     * This function reads the shopping cart from the cookie and
     * adds them to the table with id cartList.
     */
    function displayCart() {
        // Get the contents of the cart from the cookie
        var cart, cartTable, cartTotal, i, newRow, newCell, message;

        cart = JSON.parse(Cookie.get("shoppingCart"));
        if (!cart || cart.length === 0) {
            message = $("#message");
            message.html("<p>Your shopping cart is empty, please add something to your cart before checking out</p>");
            hideCartElements();
            return;
        }
		
        cartTable = $("#cartList");
        cartTotal = 0;

        // Add a new row to the table for each item in the cart
        for (i = 0; i < cart.length; i += 1) {
			$("<tr><td>" + cart[i].title + "</td><td>" + cart[i].price + "</td></tr>").appendTo(cartTable);
            cartTotal += parseFloat(cart[i].price);
        }

        // Add a last row for the total value of the cart
		$("<tr><td><strong>Total</strong></td><td><strong>" + cartTotal.toFixed(2) + "</strong></td></tr>").appendTo(cartTable);
    }
	/** Setup checkout functions
     *
     * Show the cart contents (if any), and then link validation to form submission.
     */
    pub.setup = function () {
        displayCart();
        // $("#checkoutForm").submit(validateCheckout);
		$("#checkoutForm").validate({
			rules: {
				name: {
					required: true,
					minlength: 1
				},
				address: {
					required: true,
					minlength: 1
				},
				city: {
					required: true,
					minlength: 1
				},
				postcode: {
					required: true,
					minlength: 1,
					digits: true
				},
				cardNumber: {
					required: true,
					creditcard: true
				},
				cvc: {
					required: true,
					minlength: 3,
					maxlength: 3,
					digits: true
				}
			},
			message: {
				name: {
					required:"A name is required",
					minlength:"Name must be longer then 1 character"	
				},
				address: {
					required:"An address is required",
					minlength: "Address must be longer then 1 character"
				},
				city: {
					required:"A city is required",
					minlength: "City must be longer then 1 character"
				},
				postcode: {
					required:"A postcode is required",
					minlength: "Postcode must be longer then 1 character",
					digits: "Please only enter digits"
				},
				cardNumber: {
					required:"A credit card number is required",
					creditcard: "A valid credit card number is required"
				},
				cvc: {
					required:"A 3 digit verification code is required",
					minlength:"A 3 digit verification code is required",
					maxlength:"A 3 digit verification code is required",
					digits: "Please only enter digits"
				}
			}
		});
    };

    return pub; // Expose the public interface
}());

// Register Checkout.setup for execution when the page loads
if (window.addEventListener) {
    window.addEventListener('load', Checkout.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', Checkout.setup);
} else {
    alert("Could not attach 'Checkout.setup' to the 'window.onload' event");
}