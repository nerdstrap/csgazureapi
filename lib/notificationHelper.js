//'use strict';
//
//var azure = require('azure');
//
//module.exports = {
//
//	sendContactAddedNotification: function (callback) {
//		var hubname = 'csgazureapi';
//		var connectionstring = 'Endpoint=sb://csgazureapi.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=+p/HF1upK74rC4quJpzNUrpqzjNv5DLmp9qPDOrjS4M=';
//		var notificationHubService = azure.createNotificationHubService(hubname, connectionstring);
//
//		var payload = {
//			alert: 'Contact added to csgazureapi!'
//		};
//		notificationHubService.apns.send(null, payload, function (err) {
//			if (err) {
//				callback(err);
//			}
//			callback(null, 'success');
//		});
//
//	}
//
//};
