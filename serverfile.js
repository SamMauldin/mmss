var server = require("./lib/core/core").createServer({
	gamemode: 1
})

require("./plugins/terrain")(server)
require("./plugins/chat")(server)