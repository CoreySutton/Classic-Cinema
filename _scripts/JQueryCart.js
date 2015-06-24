var Cart = (function() {
	
	var pub = {};
	
	function MovieObject(title, price) {
		this.title = title;
		this.price = price;
	}
	
	function addToCart() {
		
		console.log("The addToCart function was called");
		
		var cart, title, price, CookieArray=[];
		
		cart = {};
		title = $(this).parent().siblings("h3").html(); //title = this.parentNode.parentNode.getElementsByTagName("h3")[0].textContent;
		price = $(this).parent().$("price"[0]).html(); // price = this.parentNode.getElementsByClassName("price")[0].textContent;
		cart = new MovieObject(title, price);
		if (Cookie.get("cart") !== null) {
			CookieArray = JSON.parse(Cookie.get("cart"));
			CookieArray.push(cart);
		} else {
			CookieArray.push(cart);
		}
		Cookie.set("cart", JSON.stringify(CookieArray), 1);
		
		console.log("The addToCart functino has finshed");
		
	}
	
	pub.setup = function() {
		
		console.log("The setup function was called");
		
		var i, total, div_cart;

		total = 0.0;		
		cart = JSON.parse(Cookie.get("cart"));
		div_cart = $("#div_cart");
		
		// Adds onclick event to all buy buttons
		for (i = 0; i < $(".buy").length; i++) {
			$(".buy"[i]).click(addToCart);
		}
		/*
		* Used to populate the cart.html page with the items of the cart
		*/
		if (div_cart) { // Check if you are on cart.html
			if (cart !== null) { 
				for (i = 0; i < cart.length; i++) {
					div_cart.html(div_cart.html() + "<p><strong>" + cart[i].title + "</strong>&#09;&#09;&#09; $" + cart[i].price + "</p>");
					total += parseFloat(cart[i].price);
				}
				div_cart.html(div_cart.html() +  "<p><strong>Total Price: </strong>&#09;&#09;&#09; $" + total + "</p>");
			} else {
				div_cart.html(div_cart.html() + "There are no items in your cart");
			}
		}
		
		console.log("The setup finction had finished");
		
	};
	
	return pub;
}());

$(document).ready(Cart.setup);