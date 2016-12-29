var commands = require('common.commands');

var buildingSpawn = {

  /** @param {Spawn} spawn **/
  buildExtensions: function(spawn) {
    if(spawn.room.controller.level >= 2) {
      var extensionSites = spawn.room.find(FIND_MY_STRUCTURES, {
        filter: structure => structure.structureType == STRUCTURE_EXTENSION
      });
      if(extensionSites.length < 10) {
        var currentConstruction = spawn.room.find(FIND_CONSTRUCTION_SITES);
        var currentDamagedWalls = spawn.room.find(FIND_STRUCTURES, {
          filter: structure => structure.structureType == STRUCTURE_WALL && structure.hits < 20000
        })

        if(currentConstruction.length == 0 && currentDamagedWalls.length == 0) {
          var constructionSite = commands.getRandomLocation(spawn);
          constructionSite.createConstructionSite(STRUCTURE_EXTENSION);
        }
      }
    }
  },

  /** @param {Spawn} spawn **/
  buildRoads: function(spawn) {
    var completedRoads = spawn.memory.roads || [];
    var sources = spawn.room.find(FIND_SOURCES);
    for(var source in sources) {
      if(completedRoads.indexOf(sources[source].id) == -1) {
        var roadSites = spawn.room.findPath(spawn.pos, sources[source].pos);
        for(var roadSite in roadSites) {
          var road = spawn.room.getPositionAt(roadSites[roadSite].x, roadSites[roadSite].y);
          road.createConstructionSite(STRUCTURE_ROAD);
        }
        completedRoads.push(sources[source].id);
      }
    }
    spawn.memory.roads = completedRoads;
  },

  /** @param {Spawn} spawn **/
  buildTowers: function(spawn) {
    if(spawn.room.controller.level > 2) {
      var towers = spawn.room.find(FIND_MY_STRUCTURES, {
        filter: structure => structure.structureType == STRUCTURE_TOWER
      });
      if(towers.length < 2) {
        var constructionSite = commands.getRandomLocation(spawn);
        if(constructionSite) {
          constructionSite.createConstructionSite(STRUCTURE_TOWER);
        }
      }
    }
  }
}

module.exports = buildingSpawn;