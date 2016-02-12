'use strict';

var repository = require('../../lib/contactRepository.sql');

module.exports = {
	get: function contacts_get(req, res) {
		res.json(repository.get(req.params['id']));
	}
};
