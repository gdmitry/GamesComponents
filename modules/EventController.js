var Core = {};

Core.emit = function (eventName, details) {
	var event = new CustomEvent(eventName, {'detail': details});
	document.dispatchEvent(event);
	//console.warn('emited ', eventName, details);
}

Core.listen = function (eventName, handler) {
	document.addEventListener(eventName, handler, false);
}

Core.unlisten = function (eventName, handler) {
	document.removeEventListener(eventName, handler, false);
}

window.Core = Core;