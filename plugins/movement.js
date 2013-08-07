module.exports = function(server) {
	server.on("client_connect", function(client) {
		for (var cid in server.clients) {
			var c = server.clients[cid];
			if (c != client) {
				c.write(0x14, {
					entityId: client.id,
					name: client.username,
					x: client.pos.x*32,
					y: client.pos.y*32,
					z: client.pos.z*32,
					yaw: client.pos.yaw,
					pitch: client.pos.pitch,
					currentItem: 276,
					metadata: [
						{type: "byte", value: 0x00, key: 0}
					]
				});
				client.write(0x14, {
					entityId: c.id,
					name: c.username,
					x: c.pos.x*32,
					y: c.pos.y*32,
					z: c.pos.z*32,
					yaw: c.pos.yaw,
					pitch: c.pos.pitch,
					currentItem: 276,
					metadata: [
						{type: "byte", value: 0x00, key: 0}
					]
				});
			}
		}
		client.on(0x0b, function(data) {
			for (var cid in server.clients) {
				if (server.clients[cid] != client) {
					console.log(Math.round(client.pos.x-data.x));
					server.clients[cid].write(0x1f, {
						entityId: client.id,
						dx: Math.round(client.pos.x-data.x),
						dy: Math.round(client.pos.y-data.y),
						dz: Math.round(client.pos.z-data.z)
					});
				}
			}
			client.pos.x = data.x
			client.pos.y = data.y
			client.pos.z = data.z
		});
	});
	server.on("client_disconnect", function(client) {
		for (var cid in server.clients) {
			server.clients[cid].write(0x0D, {
				entityIds: [client.id]
			});
		}
	});
};