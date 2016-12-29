var roleHarvester = require('role.harvester');
var commands = require('common.commands');

var roleBuilder = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.memory.structureToRepair = null;
    }

    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
    }
    if(creep.memory.building) {
      var roads = creep.room.find(FIND_STRUCTURES, {
        filter: road => road.structureType == STRUCTURE_ROAD && road.hits / road.hitsMax < 0.5
      });
      var site = commands.findNearestConstructionSite(creep);
      var structureToRepair = Game.getObjectById(creep.memory.structureToRepair) || commands.findStructureToRepair(creep);

      if(roads.length > 0) {
        var closestRoad = creep.pos.findClosestByPath(roads);
        if(creep.repair(closestRoad) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestRoad);
        }
      } else if(site) {
        if(creep.build(site) == ERR_NOT_IN_RANGE) {
          creep.moveTo(site);
        }
      } else if(structureToRepair) {
        creep.memory.structureToRepair = structureToRepair.id;
        var result = creep.repair(structureToRepair);
        if(result == ERR_NOT_IN_RANGE) {
          creep.moveTo(structureToRepair);
        } else {
          if(structureToRepair.hits == structureToRepair.hitsMax) {
            creep.memory.structureToRepair = null;
          }
        }
      }
    } else {
      var source = commands.findNearestSource(creep);

      if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
}

module.exports = roleBuilder;