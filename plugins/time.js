module.exports = function(server) {
	server.on("client_connect", function(client) {
		client.write(0x04, {
			age: [1, 0],
			time: [1, 0]
		});
	});
}