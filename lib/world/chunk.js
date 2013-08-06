var zlib = require("zlib");

function Chunk() {
	var cdata = new Buffer(196864);
	
	cdata.fill(0);
   	
   	for (var x = 0; x < 16; x++) {
   		for (var z = 0; z < 16; z++) {
   			var index = 196608 + x + (z << 4);
   			cdata[index] = 1
   			var index = x + (z << 4) + (0 << 8);
   			cdata[index] = 7;
   			var index = x + (z << 4) + (1 << 8);
   			cdata[index] = 2;
   		}
   	}
   	this.data = cdata;
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

Chunk.prototype.generate = function() {
	
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