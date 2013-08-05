var protocol = require("minecraft-protocol");
var events = require("events");

function server(opts) {
	this.setMaxListeners(0)
	
	opts = opts || {};
    this.opts = opts;
    this.opts["gamemode"] = opts["gamemode"] || 0;
    this.opts["motd"] = opts["motd"] || "MMSS Server";
    this.opts["max-players"] = opts["max-players"] || 20;
    this.opts["port"] = opts["port"] || 25565;
    this.opts["online-mode"] = opts["online-mode"] || true;
    
    this.clients = [];
    this.id = 1;
    
    var local = this
    
    this.serv = protocol.createServer(this.opts);
    this.serv.on("login", function(client) {
    	client.id = local.id++;
    	local.clients[client.id] = client
        client.write(0x01, {
            entityId: client.id,
            levelType: "default",
            gameMode: local.opts.gamemode,
            dimension: 0,
            difficulty: 2,
            maxPlayers: server.maxPlayers
        });
        client.write(0x0d, {
            x: 0,
            y: 256,
            stance: 255,
            z: 0,
            yaw: 0,
            pitch: 0,
            onGround: true
        });
        client.on("end", function() {
        	local.clients.filter(function(c) {
        		if (client == c) {
        			return false;
        		}
        		return true;
        	});
        	local.emit("client_disconnect", client)
        });
        local.emit("client_connect", client)
    });
    
    this.serv.on("error", function(err) {
    	console.log("Error: " + err)
    });
    
    setInterval(function() {
    	local.emit("server_tick")
    }, 50)
}

server.prototype.__proto__ = events.EventEmitter.prototype;

exports.createServer = function(options) {
    return new server(options);
};
