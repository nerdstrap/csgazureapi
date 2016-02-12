'use strict';

var port = process.env.PORT || 8000;

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var swaggerize = require('swaggerize-express');
var swaggerUi = require('swaggerize-ui');
var path = require('path');

var app = express();

var server = http.createServer(app);

app.use(bodyParser.json());

app.use(swaggerize({
	api: path.resolve('./config/api.json'),
	handlers: path.resolve('./handlers'),
	docspath: '/swagger'
}));

app.use('/docs', swaggerUi({
	docs: '/swagger'
}));

server.listen(port, function () {
	var port = server.address().port;

	console.log('csgazureapi is listening on port %s', port);
});
