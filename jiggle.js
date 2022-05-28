var GDX = 1
var GDY = 1
var GPX = 0
var GPY = 0

var dragndrop = function( elem, strictDrag, limitByParent ) {
	elem.addEventListener("mousedown", onMouseDown);
	elem.addEventListener("change", onChange);
	
	var startX;
	var startY;
	
	var startMouseX;
	var startMouseY;
	
	var parent;
	var limited;
	
	function refresh() {
		parent = elem.parentNode;
		limited = limitByParent;
		if (limited === undefined && parent) {
			limited = parent.classList.contains(dragndrop.dragndropLimiterClass);
		}
	}
	
	function setPos( x, y ) {
		if (limited) {
			var xMax = parent.offsetWidth - elem.offsetWidth;
			var yMax = parent.offsetHeight - elem.offsetHeight;
			
			x = (x > xMax) ? xMax : ((x < 0) ? 0 : x);
			y = (y > yMax) ? yMax : ((y < 0) ? 0 : y);
		}
		
		elem.style.left = x + "px";
		elem.style.top = y + "px";
	}
	
	function onMouseDown( e ) {
		if (strictDrag && e.target !== elem) {
			return;
		}
		
		e.stopPropagation();
		
		refresh();
		
		startX = elem.offsetLeft;
		startY = elem.offsetTop;
		
		startMouseX = e.screenX;
		startMouseY = e.screenY;
		
		document.addEventListener("mouseup", onMouseUp);
		document.addEventListener("mousemove", onMouseMove);
        return false;
	}
	
	function onMouseUp( e ) {
		onMouseMove(e);
		document.removeEventListener("mouseup", onMouseUp);
		document.removeEventListener("mousemove", onMouseMove);
		var x = startX + e.screenX - startMouseX;
		var y = startY + e.screenY - startMouseY;
		setPos(Math.round((x - GPX) / GDX) * GDX + GPX, 
               Math.round((y - GPY) / GDY) * GDY + GPY);
        return false;
	}
	
	function onMouseMove( e ) {
		var x = startX + e.screenX - startMouseX;
		var y = startY + e.screenY - startMouseY;
		setPos(x, y);
        return false;
	}
	
	function onChange( e ) {
		refresh();
		setPos(elem.offsetLeft, elem.offsetTop);
	}
}


dragndrop.dragndropClass = "js-dragndrop";
dragndrop.dragndropLimiterClass = "js-dragndrop-limiter";


dragndrop.init = function() {
	var arr = document.querySelectorAll("." + dragndrop.dragndropClass);
	var i = -1;
	var l = arr.length;
	while (++i < l) {
		dragndrop(arr[i], true);
	}
}

dragndrop.initOnDocumentReady = function() {
	document.addEventListener("DOMContentLoaded", dragndrop.init);
}

