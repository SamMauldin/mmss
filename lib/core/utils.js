var colors = {
	black: "0",
	blue: "1",
	green: "2",
	lightBlue: "3",
	red: "4",
	purple: "5",
	yellow: "6",
	gray: "7",
	darkGray: "8",
	darkAqua: "9",
	lightGreen: "a",
	aqua: "b",
	lightRed: "c",
	lightPurple: "d",
	lightYellow: "e",
	white: "f",
	magic: "k",
	bold: "l",
	strike: "m",
	underline: "n",
	italic: "o",
	reset: "r",
	code: "§"
}

function sendChat(message, client) {
	var msg = { "text": message };
	client.write(0x03, { message: JSON.stringify(msg) });
}

function broadcast(message, server) {
	for (var cid in server.clients) {
		var client = server.clients[cid];
		sendChat(message, client);
	}
	console.log(message);
}

function getChunk(x, z) {
	return [Math.floor(x/16), Math.floor(z/16)];
}

function toAbs(i) {
	var abs = new Buffer(1);
	abs.writeInt8(i*32, 0);
	return abs;
}

function toRel(i) {
	return i.readInt8(0)/32
}

module.exports = function(server) {
	server.colors = colors;
	server.sendChat = sendChat;
	server.broadcast = broadcast;
	server.getChunk = getChunk;
	server.toAbs = toAbs;
	server.toRel = toRel;
}
