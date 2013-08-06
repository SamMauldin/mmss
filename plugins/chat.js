var utils = require("../lib/core/utils");

module.exports = function(server) {
	server.on("client_connect", function(client) {
		client.on(0x03, function(data) {
			var message = "<" + client.username + "> " + data.message
			utils.broadcast(message, server)
		});
		var message = client.username + " has joined the game";
		utils.broadcast(message, server);
	});
	server.on("client_disconnect", function(client) {
		var message = client.username + " has left the game";
		utils.broadcast(message, server);
	});
}