/*
TinyURL Helper v1.0.1

cf. http://fnd.lewcid.org/blog/archive/16
*/
//javascript:
(function() {
	var extractTinyURL = function() {
		var txt = document.body.innerHTML;
		var RE = /(http:\/\/tinyurl.com\/\w+)/;
		var original = document.getElementsByName("url")[0].value;
		var tiny = txt.match(RE)[1];
		return tiny + " (" + original + ")";
	}

	var displayTinyURL = function() {
		var txt = extractTinyURL();
		var c = document.createElement("div");
		c.style.position = "absolute";
		c.style.top = "25%";
		c.style.left = "25%";
		c.style.width = "50%";
		c.style.width = "border: 2px solid #AAA";
		c.style.padding = "50px";
		c.style.backgroundColor = "#EEE";
		var e = document.createElement("input");
		e.setAttribute("type", "text");
		e.setAttribute("value", txt);
		e.style.width = "100%";
		c.appendChild(e);
		document.body.appendChild(c);
		e.select();
	}

	if(document.location.toString().indexOf("tinyurl.com") == -1) {
		document.location.href = "http://tinyurl.com/create.php?url=" + location.href;
	} else {
		displayTinyURL();
	}
})();
