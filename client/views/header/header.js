Template.header.events = {
	"click #new-key": function(event) {

		event.preventDefault();

		bootbox.prompt("What is the name of the service?", function(result) {

			if (result !== null) {

				Meteor.call('newKey', {
					name: result
				}, function(error, name) {

					if (error) {
						return bootbox.alert(error.reason);
					}

					Router.go('keyDetails', {
						name: name
					});

				});

			}

		});

	}
}