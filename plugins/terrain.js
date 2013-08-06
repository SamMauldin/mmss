function dataCallback(err, res) {
	if (err) { throw err; }
	cdata = res;
}

var cdata;
var chunk = require("../lib/world/chunk").build().getCompressedData(dataCallback);

module.exports = function(server) {
	server.on("client_preconnect2", function(client) {
		if (cdata) {
			for (var x = 0; x < 14; x++) {
				
				for (var z = 0; z < 14; z++) {
					
					client.write(0x38, {
						data: {
							skyLightSent: true,
							compressedChunkData: cdata,
							meta: [{
								x: x-7,
								z: z-7,
								bitMap: 15,
								addBitMap: 0
							}]
						}
					});
					
				}
				
			}
		}
	});
}