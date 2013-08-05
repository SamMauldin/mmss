var protocol = require("minecraft-protocol");

function server(options) {
    this.opts = options || {};
    this.opts["gamemode"] = opts["gamemode"] || 0;
    this.opts["motd"] = opts["motd"] || "MMSS Server";
    this.opts["max-players"] = opts["max-players"] || 20;
    this.opts["port"] = opts["port"] || 25565;
    this.opts["online-mode"] = opts["online-mode"] || true;
    this.serv = protocol.createServer(this.opts);
    this.serv.on("login", function() {
        client.write(1, {
            entityId: client.id,
            levelType: "default",
            gameMode: 1,
            dimension: 0,
            difficulty: 2,
            maxPlayers: server.maxPlayers
        });
        client.write(13, {
            x: 0,
            y: 256,
            stance: 255,
            z: 0,
            yaw: 0,
            pitch: 0,
            onGround: true
        });
    });
}

exports.createServer = function(options) {
    return new server(options);
};
