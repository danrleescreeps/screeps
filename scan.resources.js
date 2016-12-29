var scanResources = {

  /** @param {Room} room **/
  scanEnergy: room => {
    var sources = room.find(FIND_SOURCES);
    var sourceLocs = [];
    if(sources.length > 0) {
      sources.forEach(source => sourceLocs.push([source.pos.x, source.pos.y]));
    }
  }

};

module.exports = scanResources;