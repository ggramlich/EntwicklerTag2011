(function() {
  var GameSimulation, POINT_TYPES, PlayerSimulation, SelectPlayer, Team, loadFile, model, normalizePointType;
  loadFile = function(filename) {
    return JsSlim.loadJsFile(filename + '.js');
  };
  loadFile('BbScoutModel');
  model = this.BbScout.model;
  Team = (function() {
    function Team(name) {
      this.name = name;
      this.team = new model.Team(this.name);
      model.teams[this.name] = this.team;
    }
    Team.prototype.resetTeams = function() {
      return model.teams = {};
    };
    Team.prototype.setNumber = function(number) {
      this.number = number;
    };
    Team.prototype.setFirstName = function(firstName) {
      this.firstName = firstName;
    };
    Team.prototype.setLastName = function(lastName) {
      this.lastName = lastName;
    };
    Team.prototype.execute = function() {
      var player;
      player = new model.Player(this.number, this.firstName, this.lastName);
      return this.team.addPlayer(player);
    };
    return Team;
  })();
  SelectPlayer = (function() {
    function SelectPlayer(teamname, number) {
      var _ref;
      this.teamname = teamname;
      this.number = number;
      this.player = (_ref = model.teams[this.teamname]) != null ? _ref.getPlayer(this.number) : void 0;
    }
    SelectPlayer.prototype.playerName = function() {
      var _ref, _ref2;
      return (_ref = (_ref2 = this.player) != null ? _ref2.name() : void 0) != null ? _ref : 'unknown';
    };
    return SelectPlayer;
  })();
  POINT_TYPES = {
    'free throw': 'Freethrow',
    'free throws': 'Freethrow',
    'field goal': 'Fieldgoal',
    'field goals': 'Fieldgoal',
    'three pointer': 'Threepointer',
    'three pointers': 'Threepointer'
  };
  normalizePointType = function(pointType) {
    return POINT_TYPES[pointType];
  };
  PlayerSimulation = (function() {
    var NUMBER;
    NUMBER = '1';
    return (function() {
      function _Class() {
        this.player = new model.Player(NUMBER);
      }
      _Class.prototype.points = function() {
        return this.player.points;
      };
      _Class.prototype.setPoints = function(points) {
        return this.player.points = parseInt(points);
      };
      _Class.prototype.scores = function(pointType) {
        return this.player.scores(normalizePointType(pointType));
      };
      _Class.prototype.misses = function(pointType) {
        return this.player.misses(normalizePointType(pointType));
      };
      _Class.prototype.scored = function(pointType) {
        return this.player.scored(normalizePointType(pointType));
      };
      _Class.prototype.attempted = function(pointType) {
        return this.player.attempted(normalizePointType(pointType));
      };
      return _Class;
    })();
  })();
  GameSimulation = (function() {
    function GameSimulation(teamNameA, teamNameB) {
      this.teamNameA = teamNameA;
      this.teamNameB = teamNameB;
      this.teamA = this.getTeam(this.teamNameA);
      this.teamB = this.getTeam(this.teamNameB);
    }
    GameSimulation.prototype.score = function() {
      var _ref, _ref2;
      return ((_ref = this.teamA) != null ? _ref.points() : void 0) + ':' + ((_ref2 = this.teamB) != null ? _ref2.points() : void 0);
    };
    GameSimulation.prototype.playerOfScoresA = function(number, teamName, pointType) {
      var player, pointTypeOk;
      player = this.getPlayer(teamName, number);
      pointTypeOk = player != null ? player.scores(normalizePointType(pointType)) : void 0;
      return (player != null) && pointTypeOk;
    };
    GameSimulation.prototype.getPlayer = function(teamName, number) {
      var _ref;
      return (_ref = this.getTeam(teamName)) != null ? _ref.getPlayer(number) : void 0;
    };
    GameSimulation.prototype.getTeam = function(teamName) {
      return model.teams[teamName];
    };
    return GameSimulation;
  })();
  this.BasketballEnglish = {
    Team: Team,
    SelectPlayer: SelectPlayer,
    PlayerSimulation: PlayerSimulation,
    GameSimulation: GameSimulation
  };
}).call(this);
