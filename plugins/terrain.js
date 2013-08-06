var chunk = require("../lib/world/chunk");

module.exports = function(server) {
	server.on("client_preconnect2", function(client) {
		for (var x = 0; x < 14; x++) {
			for (var z = 0; z < 14; z++) {
				var cdata = chunk.build(x-7, z-7);
				cdata.generate(server);
				cdata.send(client);
			}
		}
	});
}