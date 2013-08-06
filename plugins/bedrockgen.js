function bedrockgen(chunk) {
	var chances = [1, 0.75, 0.5, 0.25, 0.1];
	for (var y = 0; y < 5; y++) {
		for (var x = 0; x < 16; x++) {
			for (var z = 0; z < 16; z++) {
				if (Math.random() < chances[y]) {
					chunk.setBlock(x, y, z, 7);
				}
			}
		}
	}
}

module.exports = function(server) {
	server.generators = server.generators || [];
	server.generators.push(bedrockgen);
};
