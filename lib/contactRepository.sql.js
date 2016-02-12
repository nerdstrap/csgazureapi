'use strict';

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var crypto = require('crypto');

var config = {
	userName: 'geekstrap@csgazureapi.database.windows.net',
	password: 'Jock(5^0',
	server: 'csgazureapi.database.windows.net',

	options: {
		encrypt: true, // required for Azure Sql database
		database: 'csgazureapi'
	}
};

function _all(callback) {
	var connection = new Connection(config);
	var contacts = [];

	connection.on('connect', function (connectionErr) {
		if (connectionErr) {
			callback(connectionErr);
		}

		var sql = "SELECT c.id, c.name, c.email FROM contacts c ORDER BY name DESC;";

		var request = new Request(sql, function (err, rowCount) {
			if (err) {
				callback(err);
			}
			else {
				if (rowCount < 1) {
					callback(null, false);
				} else {
					callback(null, contacts);
				}
			}
		});

		var rowObject;
		request.on('row', function (columns) {
			rowObject = {};
			columns.forEach(function (column) {
				rowObject[column.metadata.colName] = column.value;
			});
			contacts.push(rowObject);
		});

		connection.execSql(request);
	});
}

function _add(name, email, callback) {
	var connection = new Connection(config);
	var contacts = [];

	connection.on('connect', function (connectionErr) {
		if (connectionErr) {
			callback(connectionErr);
		}

		var sql = "INSERT contacts (id, name, email) OUTPUT INSERTED.id VALUES (@id, @name, @email);";

		var request = new Request(sql, function (err, rowCount) {
			if (err) {
				callback(err);
			}
			else {
				if (rowCount < 1) {
					callback(null, false);
				} else {
					callback(null, contacts);
				}
			}
		});

		var id = crypto.randomBytes(20).toString('hex');
		request.addParameter('id', TYPES.NVarChar, id);
		request.addParameter('name', TYPES.NVarChar, name);
		request.addParameter('email', TYPES.NVarChar, email);

		var rowObject;
		request.on('row', function (columns) {
			rowObject = {};
			columns.forEach(function (column) {
				rowObject[column.metadata.colName] = column.value;
			});
			contacts.push(rowObject);
		});

		connection.execSql(request);
	});

}

module.exports = {
	get: function (id) {
		return {};
	},
	all: function (callback) {
		_all(function (err, contacts) {
			callback(err, contacts);
		});
	},
	add: function ( name, email, callback) {
		_add(name, email, function (err, contacts) {
			callback(err, contacts);
		});
	}
};
