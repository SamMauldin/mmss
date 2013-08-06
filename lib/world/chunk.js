function chunk() {
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
   	
   	return cdata;
}

exports.build = chunk