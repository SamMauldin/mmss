var zlib = require("zlib");

function Chunk() {
   	this.data = new Buffer(196864);
   	this.data.fill(0);
}

Chunk.prototype.setBlockMeta = function(x, y, z, meta) {
	var index = 65536 + Math.floor((x + (z << 4) + (y << 8)) / 2);
	if (x % 2) {
    	this.data[index] &= 0x0f;
    	this.data[index] |= (meta << 4);
	} else {
		this.data[index] &= 0xf0;
    	this.data[index] |= (meta & 0x0f);
  }
}
Chunk.prototype.setBlock = function(x, y, z, type) {
	var index = x + (z << 4) + (y << 8);
	this.data[index] = type;
}

Chunk.prototype.getBlockMeta = function(x, y, z, meta) {
	var index = 65536 + Math.floor((x + (z << 4) + (y << 8)) / 2);
	if (x % 2) {
		return this.data[index] >> 4;
	} else {
		return this.data[index] & 0x0f;
	}
}

Chunk.prototype.getBlock = function(x, y, z) {
	var index = x + (z << 4) + (y << 8);
	return this.data[index];
}

Chunk.prototype.generate = function(server) {
	var local = this;
	for (var gen in server.generators) {
		var generator = server.generators[gen];
		generator(local, server);
	}
}

Chunk.prototype.getData = function() {
   		return this.data;
}

Chunk.prototype.getCompressedData = function(cb) {
	zlib.deflate(this.data, cb);
}

function Build() {
	return new Chunk();
}

exports.build = Build