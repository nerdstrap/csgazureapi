'use strict';

var repository = require('../lib/contactRepository.sql');
//var notificationHelper = require('../lib/notificationHelper');

/**
 * Operations on /addcontact
 */
module.exports = {

	/**
	 *
	 * parameters: id, name, email
	 * produces: application/json, text/json
	 */
	get: function addcontact(req, res) {
		repository.add(req.query['name'], req.query['email'], function (err, contacts) {
			if (err) {
				throw err;
			}

			if (contacts) {
				//notificationHelper.sendContactAddedNotification(function (notificationErr, output) {
				//	if (notificationErr) {
				//		console.log(notificationErr);
				//	}
				//	else {
				//		console.log(output);
				//	}
				//});
				res.json(contacts);
			} else {
				res.json([]);
			}
		});
	}

};
