var EventController = {};

EventController.emit = function (eventName, details) {
	var event = new CustomEvent(eventName, details);
	document.dispatchEvent(event);
}

EventController.listen = function (eventName, handler) {
	// Listen for the event.
	document.addEventListener('build', handler, false);
}

EventController.unlisten = function (eventName, handler) {
	// Unlisten for the event.
	document.removeEventListener(eventName, handler, false);
}

module.exports = EventController;