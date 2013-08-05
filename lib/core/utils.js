function sendchat(message, client) {
	var msg = {"text": message}
	client.write(0x03, { message: JSON.stringify(msg) });
}

function broadcast(message, server) {
	for (var cid in server.clients) {
		var client = server.clients[cid]
		sendchat(message, client)
	}
}

exports.sendchat = sendchat
exports.broadcast = broadcast