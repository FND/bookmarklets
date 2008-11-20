/*
adapted from Oskar Krawczyk's WTFramework
(http://blog.olicio.us/2008/11/08/wtframework-bookmarklet/)
*/
//javascript:
(function() {
	var c = document.getElementById("__wtframework");
	if(c) {
		document.body.removeChild(c);
		return;
	}
	c = document.createElement("a");
	c.id = "__wtframework";
	c.style.opacity = "0.7";
	c.style.filter = "alpha(opacity = 70)";
	c.style.position = "fixed";
	c.style.zIndex = "9000";
	c.style.top = "15px";
	c.style.right = "20px";
	c.style.background = "#000";
	c.style.styleFloat = "right"; /* IE */
	c.style.cssFloat = "right";
	c.style.padding = "7px 10px";
	c.style.color = "#FFF";
	c.style.border = "solid 2px #FFF";
	c.style.textDecoration = "none";
	c.style.textAlign = "left";
	c.style.fontFamily = "'Lucida Grande;,Helvetica,Tahoma";
	c.style.fontSize = "12px";
	c.style.MozBorderRadius = "5px";
	c.style.WebkitBorderRadius = "5px";
	c.style.MozBoxShadow = "0px 0px 20px #000";
	c.style.WebkitBoxShadow = "0px 0px 20px #000";
	c.href = "#";
	document.body.appendChild(c);
	c.onclick = function() {
		document.body.removeChild(c); // XXX: use this.parentNode.removeChild(this) ?
	};

	var frameworks = [];
	var check = function(indicator, name, version) { // TODO: support links
		try {
			if(window[indicator]) {
				frameworks.push({ name: name, version: eval(version) }); // XXX: eval is evil
			}
		} catch(ex) {}
	};
	check("MooTools", "MooTools", "MooTools.version");
	check("YAHOO", "YUI", "YAHOO.util.Dom.VERSION");
	check("Prototype", "Prototype", "Prototype.Version");
	check("Scriptaculous", "Script.aculo.us", "Scriptaculous.Version");
	check("jQuery", "jQuery", "jQuery.fn.jquery");
	check("dojo", "Dojo Toolkit", "dojo.version");
	check("MochiKit", "MochiKit", "MochiKit.MochiKit.VERSION");
	check("base2", "Base2", "base2.version");
	try { // TiddlyWiki requires special handling
		if(version && version.title == "TiddlyWiki") {
			if(window.formatVersion) {
				var v = formatVersion();
			} else {
				v = version.major + "." + version.minor + "." + version.revision +
					(version.beta ? " (beta " + version.beta + ")" : "");
			}
			frameworks.push({
				name: "TiddlyWiki",
				version: v
			});
		}
	} catch(ex) {}

	if(frameworks.length) {
		for(var i = 0; i < frameworks.length; i++) {
			var el = document.createElement("div");
			el.appendChild(document.createTextNode(frameworks[i].name +
				" " + frameworks[i].version));
			c.appendChild(el);
		}
	} else {
		c.appendChild(document.createTextNode("no frameworks detected"));
	}
})();
