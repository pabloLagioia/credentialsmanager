Keys = new Meteor.Collection("keys");

Keys.allow({
	insert: function(userId) {
		return !!userId;
	},
	update: function(userId) {
		return !!userId;
	}
});

function validateUser(user) {

	if ( !user ) {
		throw new Meteor.Error(401, "You need to login first");
	}

}

function validateService(service) {

	if ( !service ) {
		throw new Meteor.Error(422, "You must provide a service");
	}

	if ( !service.name ) {
		throw new Meteor.Error(422, "You must provide the name of the service to add");
	}

}

function validateItem(item, options) {

	if ( !item ) {
		throw new Meteor.Error(422, "You must provide an item");
	}

	if ( !item.name ) {
		throw new Meteor.Error(422, "You must provide a name for the item");
	}

	if ( !item.value ) {
		if ( options && !options.checkValue ) {
			return;
		}
		throw new Meteor.Error(422, "You must provide a value for the item");
	}

}

Meteor.methods({

	encrypt: function(s, pw) {

		var a = 0;
		var myString = '';
		var textLen = s.length;
		var pwLen = pw.length;

		for (i = 0; i < textLen; i++) {
			a = parseInt(s.charCodeAt(i));

			a = a ^ (pw.charCodeAt(i % pwLen));
			a = a + "";
			while (a.length < 3)
				a = '0' + a;

			myString += a;
		}
		return myString;
	},

	newKey: function(service) {

		var user = Meteor.user();

		validateUser(user);
		validateService(service);

		Keys.insert({
			name: service.name,
			userId: user._id,
			items: []
		});

		return service.name;

	},

	addKey: function(service) {

		var user = Meteor.user();

		validateUser(user);
		validateService(service);
		validateItem(service.item);

		service.item.value = Meteor.call("encrypt", service.item.value, user._id);

    	Keys.update({
    		name: service.name,
			userId: user._id
    	}, {
    		$addToSet: {
    			items: service.item
    		}
    	});

	},

	removeKey: function(service) {

		var user = Meteor.user();

		validateUser(user);
		validateService(service);
		validateItem(service.item, {checkValue: false});

		Keys.update({
			name: service.name,
			userId: user._id,
		}, {
			$pull: {
				items: {
					name: service.item.name
				}
			}
		});

	},

	saveKey: function(service) {

		var user = Meteor.user();

		validateUser(user);
		validateService(service);

		Keys.update({
			_id: service.serviceId
		}, {
			userId: user._id,
			name: service.name,
			items: service.items
		});

		Router.go("keyDetails", {
			name: service.name
		});

	}

});