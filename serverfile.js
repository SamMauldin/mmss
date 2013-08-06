var server = require("./lib/core/core").createServer({
	gamemode: 1
});

// Plugin loading sequence
/*
	Core libraries
	Generators
	Behavior, like entities and chat
	Command plugins
*/

require("./lib/core/utils")(server);

require("./plugins/flatgen")(server);
require("./plugins/bedrockgen")(server);

require("./plugins/chat")(server);
require("./plugins/terrain")(server);
require("./plugins/time")(server);
