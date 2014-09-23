Meteor.publish("keys", function() {
	return Keys.find();
});