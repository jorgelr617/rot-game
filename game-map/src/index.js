import {Map} from './map.js';

let map = new Map();

map.createGameState();

map.assignControlNodes();

map.assignNodeNeighbors();

map.createPlayers([1,2,3,4]);

module.exports = {
	
	logGameState: function() {
		console.log(map.nodes);
		console.log(map.hexes);
		console.log(map.players);
	}
	
};
