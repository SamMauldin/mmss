var chunk = require("../lib/world/chunk");
var chunks = []

module.exports = function(server) {
	server.on("client_preconnect2", function(client) {
		for (var x = 0; x < 14; x++) {
			chunks[x] = chunks[x] || []
			for (var z = 0; z < 14; z++) {
				var cdata;
				if (!chunks[x][y]) {
					chunks[x][y] = chunk.build(x-7, z-7);
					chunks[x][y].generate(server);
				}
				cdata = chunks[x][y];
				cdata.send(client);
			}
		}
	});
	server.on("packet_
};
