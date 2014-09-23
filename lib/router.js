Router.configure({
	layoutTemplate: "layout",
	loadingTemplate: 'loading',
	waitOn: function() {
		return Meteor.subscribe('keys');
	}
});

Router.map(function() {
	this.route("keyList", {
		path: "/"
	});
	this.route("keyDetails", {
		path: "/key/:name",
		data: function() {
			return Keys.findOne({
				name: this.params.name
			});
		}
	});
});

function requireLogin(pause) {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('login');
		}
		pause();
	}
}

// Router.onBeforeAction('loading');

Router.onBeforeAction(requireLogin);