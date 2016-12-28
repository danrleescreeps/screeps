var tower = {

  run: function(spawn) {
    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0) {
      var towers = spawn.room.find(FIND_MY_STRUCTURES, {
        filter: structure => structure.structureType == STRUCTURE_TOWER
      });
      towers.forEach(tower => {
        var targetHostile = tower.pos.findClosestByRange(hostiles);
        tower.attack(targetHostile);
      });
    }
  }
}

module.exports = tower;