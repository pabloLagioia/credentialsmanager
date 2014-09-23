UI.registerHelper('session', function(value) {
	if (value) {
		return Session.get(value);
	}
});