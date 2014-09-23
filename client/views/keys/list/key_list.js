Template.keyList.helpers({
	keys: function (argument) {

		return Keys.find(Session.get("filter") || {
			userId: Meteor.user()._id
		}, {
			values: false
		});

	}
});