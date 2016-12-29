var commands = require('common.commands');

var roleHarvester = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.carry.energy < creep.carryCapacity) {
      if(!creep.memory.destination) {
        var droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);
        if(droppedResources.length > 0) {
          var resource = creep.pos.findClosestByPath(droppedResources);
          if(resource) {
            if(creep.pickup(resource) == ERR_NOT_IN_RANGE) {
              creep.moveTo(resource);
            }
          }
        } else {
          var source = commands.findNearestSource(creep);
          creep.memory.destination = source.id;

          if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
          }
        }
      } else {
        var source = Game.getObjectById(creep.memory.destination);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      }
    } else {
      creep.memory.destination = null;
      var energyStore = commands.findNearestEnergyStore(creep);

      if(energyStore) {
        if(creep.transfer(energyStore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(energyStore);
        }
      } else {
        var spawnPosition = creep.room.find(FIND_MY_SPAWNS)[0];
        creep.moveTo(spawnPosition);
      }
    }
  }
}

module.exports = roleHarvester;