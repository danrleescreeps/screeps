
var commands = {

  /** @param {Creep} creep **/
  findNearestSource: function(creep) {
    var sources = creep.room.find(FIND_SOURCES);
    if(sources.length == 0) {
      return null;
    } else {
      return creep.pos.findClosestByPath(sources);
    }
  },

  /** @param {Creep} creep **/
  findNearestConstructionSite: function(creep) {
    var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
    if(sites.length == 0) {
      return null;
    } else {
      return creep.pos.findClosestByPath(sites);
    }
  },

  /** @param {Creep} creep **/
  findNearestEnergyStore: function(creep) {
    var energyStores = creep.room.find(FIND_MY_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_SPAWN ||
          structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_TOWER) &&
          structure.energy < structure.energyCapacity
      }
    });
    if(energyStores.length == 0) {
      return null;
    } else {
      return creep.pos.findClosestByPath(energyStores);
    }
  },

  getRandomLocation: function(entity) {
    var multiplier = Math.random() < 0.5 ? -1 : 1;
    return entity.room.getPositionAt(Math.floor(Math.random() * 4 * multiplier) + entity.pos.x, Math.floor(Math.random() * 4 * multiplier) + entity.pos.y)
  },

  findStructureToRepair: function(creep) {
    var structuresToRepair = creep.room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType != STRUCTURE_ROAD && structure.hits < structure.hitsMax
    });
    var sortedStructuresToRepair = structuresToRepair.sort((a, b) => a.hits - b.hits);
    return sortedStructuresToRepair[0];
  }
}

module.exports = commands;