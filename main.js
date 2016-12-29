var creepSpawn = require('action.creepSpawn');
var buildingSpawn = require('action.buildingSpawn');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleArmy = require('role.army');
var tower = require('role.tower');
var scan = require('scan.resources');

var mainSpawn = Game.spawns['Spawn1'];
console.log(scan.scanResources(mainSpawn.room));
tower.run(mainSpawn);
creepSpawn.maintainArmy(mainSpawn);
if(mainSpawn.room.controller.level == 1) {
  creepSpawn.maintainHarvesters(mainSpawn, 2);
  creepSpawn.maintainUpgraders(mainSpawn, 2);
  creepSpawn.maintainBuilders(mainSpawn, 2);
} else {
  var currentConstruction = mainSpawn.room.find(FIND_CONSTRUCTION_SITES);
  var damagedWalls = mainSpawn.room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_WALL && structure.hits < 20000
  });
  creepSpawn.maintainHarvesters(mainSpawn, 2);
  if(currentConstruction.length > 3 || damagedWalls.length > 6) {
    creepSpawn.maintainBuilders(mainSpawn, 5);
    creepSpawn.maintainUpgraders(mainSpawn, 3);
  } else {
    creepSpawn.maintainBuilders(mainSpawn, 3);
    creepSpawn.maintainUpgraders(mainSpawn, 6);
  }
}
buildingSpawn.buildRoads(Game.spawns['Spawn1']);
buildingSpawn.buildTowers(Game.spawns['Spawn1']);
buildingSpawn.buildExtensions(Game.spawns['Spawn1']);

for(var name in Memory.creeps) {
  if(!Game.creeps[name]) {
    delete Memory.creeps[name];
  }
}

for(var name in Game.creeps) {
  var creep = Game.creeps[name];
  if(creep.memory.role == 'harvester') {
    roleHarvester.run(creep);
  }
  if(creep.memory.role == 'upgrader') {
    roleUpgrader.run(creep);
  }
  if(creep.memory.role == 'builder') {
    roleBuilder.run(creep);
  }
  if(creep.memory.role == 'ranged') {
    roleArmy.rangedAttack(creep);
  }
}