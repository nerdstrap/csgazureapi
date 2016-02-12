'use strict';

var repository = require('../lib/contactRepository.sql');

module.exports = {

	get: function contacts_get(req, res) {
		repository.all(function (err, contacts) {
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
