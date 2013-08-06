function flatgen(chunk) {
	var chances = [1, 0.75, 0.5, 0.25, 0.1];
	for (var x = 0; x < 16; x++) {
		for (var z = 0; z < 16; z++) {
			for (var y = 0; y < 21; y++) {
				var block = y == 20 ? 2 : 3
				chunk.setBlock(x, y, z, block)
			}
		}
	}
}

module.exports = function(server) {
	server.generators = server.generators || [];
	server.generators.push(flatgen);
}