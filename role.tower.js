var commands = require('common.commands');

var tower = {

  run: function(spawn) {
    var hostiles = spawn.room.find(FIND_HOSTILE_CREEPS);
    var towers = spawn.room.find(FIND_MY_STRUCTURES, {
      filter: structure => structure.structureType == STRUCTURE_TOWER
    });

    if(hostiles.length > 0) {
      towers.forEach(tower => {
        var targetHostile = tower.pos.findClosestByRange(hostiles);
        tower.attack(targetHostile);
      });
    } else {
      var structureToRepair = commands.findStructureToRepair(spawn);
      if(structureToRepair) {
        towers.forEach(tower => {
          if(tower.energy / tower.energyCapacity > 0.75) {
            tower.repair(structureToRepair);
          }
        });
      }
    }
  }
}

module.exports = tower;