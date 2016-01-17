var EventController = {};

EventController.emit = function (eventName, details) {
	var event = new CustomEvent(eventName, {'detail': details});
	document.dispatchEvent(event);
	//console.warn('emited ', eventName, details);
}

EventController.listen = function (eventName, handler) {
	document.addEventListener(eventName, handler, false);
}

EventController.unlisten = function (eventName, handler) {
	document.removeEventListener(eventName, handler, false);
}

module.exports = EventController;