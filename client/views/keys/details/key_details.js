Template.keyDetails.helpers({


	decrypt: function(s) {

		var pw = Meteor.user()._id;
		var myString = '';
		var a = 0;
		var pwLen = pw.length;
		var textLen = s.length;
		var i = 0;
		var myHolder = "";
		while (i < s.length - 2) {
			myHolder = s.charAt(i) + s.charAt(i + 1) + s.charAt(i + 2);
			if (s.charAt(i) == '0') {
				myHolder = s.charAt(i + 1) + s.charAt(i + 2);
			}
			if ((s.charAt(i) == '0') && (s.charAt(i + 1) == '0')) {
				myHolder = s.charAt(i + 2);
			}
			a = parseInt(myHolder);
			a = a ^ (pw.charCodeAt(i / 3 % pwLen));
			myString += String.fromCharCode(a);
			i += 3;
		} //end of while i

		return myString;

	}

});

Template.keyDetails.events = {

	"click .btn-primary": function(event) {
		event.preventDefault();
		bootbox.dialog({
			title: "Add new item",
			message: $("#keyDetailsAdd").html(),
			buttons: {
                success: {
                    label: "Ok",
                    className: "btn-success",
                    callback: function () {
                        
                        var name = $(".new-item-name")[1].value,
                        	value = $(".new-item-value")[1].value,
                        	serviceName = $("#service").val();

                        Meteor.call("addKey", {
                        	name: serviceName,
                        	item: {
                        		name: name,
                        		value: value
                        	}
                        });

                    }
                }
            }
		});
	},

	"click .btn-default": function(event) {
		event.preventDefault();
                        
        var serviceId = $("#service").data("service-id"),
        	serviceName = $("#service").val(),
        	items = [];

    	$(".item").each(function(index, item) {
    		items.push({
    			name: $(item).find("label").html(),
    			value: $(item).find("input").val()
    		});
    	});

        Meteor.call("saveKey", {
        	serviceId: serviceId,
        	name: serviceName,
        	items: items
        });

	},

	"click .item .btn-danger": function(event) {

		event.preventDefault();

		var serviceName = $("#service").val(),
			valueName = $(event.target).parents(".item").find("label").html();

		bootbox.confirm("Are you sure you want to delete " + valueName + "?", function(result) {

			if ( result ) {

				Meteor.call("removeKey", {
					name: serviceName,
					item: {
						name: valueName
					}
				});

			}

		});

	}
	
};