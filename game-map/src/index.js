import {Map} from './map.js';
import * as util from 'util';
import * as fs from 'fs';

let map = new Map();

map.createGameState();

map.assignControlNodes();

map.assignNodeNeighbors();

map.createPlayers([1,2,3,4]);

let outputStream = fs.createWriteStream('output.txt');

module.exports = {
	
	logGameState: function() {
		outputStream.write(util.inspect(map.nodes, {depth: 3}));
		outputStream.write('\n\n\n');
		outputStream.write(util.inspect(map.hexes, {depth: 3}));
		outputStream.write('\n\n\n');
		outputStream.write(util.inspect(map.players, {depth: 3}));
	}
	
};
