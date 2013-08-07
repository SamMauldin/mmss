var chunk = require("../lib/world/chunk");
var chunks = []

module.exports = function(server) {
	server.on("client_preconnect2", function(client) {
		for (var x = 0; x < 14; x++) {
			chunks[x] = chunks[x] || []
			for (var z = 0; z < 14; z++) {
				var cdata;
				if (!chunks[x][z]) {
					chunks[x][z] = chunk.build(x-7, z-7);
					chunks[x][z].generate(server);
				}
				cdata = chunks[x][z];
				cdata.send(client);
			}
		}
	});
	server.on("player_move", function(client) {
		
	});
};
