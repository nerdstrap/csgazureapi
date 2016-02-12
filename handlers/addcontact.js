'use strict';

var repository = require('../lib/contactRepository.sql');

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
				res.json(contacts);
			} else {
				res.json([]);
			}
		});
	}

};
