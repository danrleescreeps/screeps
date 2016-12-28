var army = {
  /** @param {Creep} creep **/
  rangedAttack: function(creep) {
    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0) {
      var targetHostile = creep.pos.findClosestByRange(hostiles);
      if(creep.rangedAttack(targetHostile) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targetHostile);
      }
    }
  }
}

module.exports = army;