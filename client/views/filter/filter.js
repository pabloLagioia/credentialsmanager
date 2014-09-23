Template.filter.events({
	"keyup input": function(event) {
		
		var input = event.target;
		
		if ( input.value && input.value.length ) {

			Session.set("filter", {
				name: {
					$regex: ".*" + input.value + "*."
				},
				userId: Meteor.user()._id
			});

		} else {

			Session.set("filter", {});

		}

	}
});