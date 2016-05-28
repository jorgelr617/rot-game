import {Map} from './map.js';

let map = new Map();

map.createGameState();

map.assignControlNodes();

map.assignNodeNeighbors();

map.createPlayers([1,2,3,4]);

module.exports = {
	
	getNodes: function() {
		return JSON.parse(JSON.stringify(map.nodes));
	},
	
	getHexes: function() {
		return JSON.parse(JSON.stringify(map.hexes));
	},
	
	getPlayers: function() {
		return JSON.parse(JSON.stringify(map.players));
	}
	
};
