var Reviews = (function() {
	var pub = {};
	
	function parseReviews(data, target) {
		if ($(target).empty()){
		console.log("Data: " + data);
		console.log("Target: " + target);	
		$(target).append("<ul>");
		var ul = $(target).children("ul");
		$(data).find("review").each( function() {
			$(ul).append("<li>" + $(this).find("user")[0].textContent + ": " + $(this).find("rating")[0].textContent);	
		});
		$(target).append("</ul>");
		}
	}
	
	function showReviews() {
		console.log("Show Reviews Called");
		var target = $(this).parent().find(".review")[0];
		var image = $(this).parent().find("img")[0];
		var formTarget = $(this).parent().find(".addReview")[0];
		var imageSrc = $(image).attr("src");
		var xmlSrc = imageSrc.replace("images", "_reviews").replace(".jpg", ".xml");
		console.log("SRC: " + xmlSrc);
		$.ajax({
			type: "GET",
			url: xmlSrc,
			cache: false,
			success: function(data) {
				parseReviews(data, target);	
			}
		});
	}
	function addRating() { 
		var form = $(this);
		$.ajax({
			url:"/212bin/csutton/addReview.py", 
			type: "post",
			data: $(this).serialize(),
			cache: false,
			success: function(data) { 
				form.parent().find(".showReviews").trigger("click");
		} });
		return false;
	}
	
	pub.setup = function() {
		$(".showReviews").click(showReviews);
		$(".addRating").submit(addRating);
	};
	
	return pub;
}());

$(document).ready(Reviews.setup);