testMap = require('../../game-map');

testMap.setup();

testMap.createGameState();

testMap.assignControlNodes();

testMap.createPlayers([ 1, 2, 3, 4]);

testMap.setNodeOwner(1, [2,2,'L']);

console.log(testMap);

//console.log(testMap.nodes);



