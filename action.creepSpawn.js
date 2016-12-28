var creepSpawn = {

  /** @param {Spawn} spawn **/
  maintainHarvesters: function(spawn, numberOfHarvesters) {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if(spawn.energy / spawn.energyCapacity > 0.8) {
      if(harvesters.length < numberOfHarvesters) {
        if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'}) == OK) {
          console.log('Creating harvester: ', spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'}));
        } else if(spawn.canCreateCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'}) == OK) {
          console.log('Creating harvester: ', spawn.createCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'}));
        } else if(spawn.canCreateCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'}) == OK) {
          console.log('Creating harvester: ', spawn.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'}));
        } else {
          console.log('Creating harvester: ', spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'}));
        }
      }
    }
  },

  /** @param {Spawn} spawn **/
  maintainUpgraders: function(spawn, numberOfUpgraders) {
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(spawn.energy / spawn.energyCapacity > 0.8) {
      if(upgraders.length < numberOfUpgraders) {
        if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'}) == OK) {
          console.log('Creating upgrader: ', spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'}));
        } else if(spawn.canCreateCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'}) == OK) {
          console.log('Creating upgrader: ', spawn.createCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'}));
        } else if(spawn.canCreateCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'}) == OK) {
          console.log('Creating upgrader: ', spawn.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'}));
        } else {
          console.log('Creating upgrader: ', spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'}));
        }
      }
    }
  },

  /** @param {Spawn} spawn **/
  maintainBuilders: function(spawn, numberOfBuilders) {
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(spawn.energy / spawn.energyCapacity > 0.8) {
      if(builders.length < numberOfBuilders) {
        if(spawn.canCreateCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'}) == OK) {
          console.log('Creating builder: ', spawn.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'}));
        } else if(spawn.canCreateCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'}) == OK) {
          console.log('Creating builder: ', spawn.createCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'}));
        } else if(spawn.canCreateCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'}) == OK) {
          console.log('Creating builder: ', spawn.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'}));
        } else {
          console.log('Creating builder: ', spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'builder'}));
        }
      }
    }
  },

  /** @param {Spawn} spawn **/
  maintainArmy: function(spawn) {
    var tank = _.filter(Game.creeps, (creep) => creep.memory.role == 'tank');
    var ranged = _.filter(Game.creeps, (creep) => creep.memory.role == 'ranged');
    var hostiles = spawn.room.find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0) {
      if(ranged.length < 2) {
        if(spawn.canCreateCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE], undefined, {role: 'ranged'}) == OK) {
          console.log('Creating ranged: ', spawn.createCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE], undefined, {role: 'ranged'}));
        } else if(spawn.canCreateCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE], undefined, {role: 'ranged'}) == OK) {
          console.log('Creating ranged: ', spawn.createCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE], undefined, {role: 'ranged'}));
        } else if(spawn.canCreateCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE], undefined, {role: 'ranged'}) == OK) {
          console.log('Creating ranged: ', spawn.createCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE], undefined, {role: 'ranged'}));
        } else {
          console.log('Creating ranged: ', spawn.createCreep([RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE], undefined, {role: 'ranged'}));
        }
      }
    }
  }
}

module.exports = creepSpawn;