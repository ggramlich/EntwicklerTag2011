(function() {
  var PointTypes, root, _ref;
  var __hasProp = Object.prototype.hasOwnProperty;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
    if ((_ref = root.BbScout) != null) {
    _ref;
  } else {
    root.BbScout = {};
  };
  PointTypes = {
    Freethrow: 1,
    Fieldgoal: 2,
    Threepointer: 3
  };
  root.BbScout.model = {
    teams: {},
    Team: (function() {
      function _Class(name) {
        this.name = name;
        this.playersList = {};
      }
      _Class.prototype.addPlayer = function(player) {
        return this.playersList[player.number] = player;
      };
      _Class.prototype.getPlayer = function(number) {
        return this.playersList[number];
      };
      _Class.prototype.points = function() {
        var number, player, sum, _ref2;
        sum = 0;
        _ref2 = this.playersList;
        for (number in _ref2) {
          if (!__hasProp.call(_ref2, number)) continue;
          player = _ref2[number];
          sum += player.points;
        }
        return sum;
      };
      return _Class;
    })(),
    Player: (function() {
      function _Class(number, firstName, lastName, points) {
        this.number = number;
        this.firstName = firstName != null ? firstName : '';
        this.lastName = lastName != null ? lastName : '';
        this.points = points != null ? points : 0;
        this.stats = {
          Freethrow: {
            scored: 0,
            attempted: 0
          },
          Fieldgoal: {
            scored: 0,
            attempted: 0
          },
          Threepointer: {
            scored: 0,
            attempted: 0
          }
        };
      }
      _Class.prototype.name = function() {
        return this.firstName + " " + this.lastName;
      };
      _Class.prototype.scores = function(pointType) {
        if (!this.validatePointType(pointType)) {
          return false;
        }
        this.points += this.pointsFor(pointType);
        this.stats[pointType].scored++;
        return this.stats[pointType].attempted++;
      };
      _Class.prototype.misses = function(pointType) {
        if (!this.validatePointType(pointType)) {
          return false;
        }
        return this.stats[pointType].attempted++;
      };
      _Class.prototype.pointsFor = function(pointType) {
        return PointTypes[pointType];
      };
      _Class.prototype.validatePointType = function(pointType) {
        return PointTypes[pointType] != null;
      };
      _Class.prototype.scored = function(pointType) {
        if (!this.validatePointType(pointType)) {
          return false;
        }
        return this.stats[pointType].scored;
      };
      _Class.prototype.attempted = function(pointType) {
        if (!this.validatePointType(pointType)) {
          return false;
        }
        return this.stats[pointType].attempted;
      };
      return _Class;
    })()
  };
}).call(this);
