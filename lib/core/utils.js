exports.sendchat = function(message, server, client) {
	var msg = {"text": message}
	client.write(0x03, { message: JSON.stringify(msg) });
}

exports.broadcast = function(message, server) {
	
}