(function() {
  var Mannschaft, SpielSimulation, SpielerSimulation, TREFFER_ARTEN, WaehleSpieler, loadFile, model, trefferArtEnglisch;
  loadFile = function(filename) {
    return JsSlim.loadJsFile(filename + '.js');
  };
  loadFile('BbScoutModel');
  model = this.BbScout.model;
  Mannschaft = (function() {
    function Mannschaft(name) {
      this.name = name;
      this.mannschaft = new model.Team(this.name);
      model.teams[this.name] = this.mannschaft;
    }
    Mannschaft.prototype.setTrikot = function(trikot) {
      this.trikot = trikot;
    };
    Mannschaft.prototype.setNachname = function(nachname) {
      this.nachname = nachname;
    };
    Mannschaft.prototype.setVorname = function(vorname) {
      this.vorname = vorname;
    };
    Mannschaft.prototype.execute = function() {
      var spieler;
      spieler = new model.Player(this.trikot, this.vorname, this.nachname);
      return this.mannschaft.addPlayer(spieler);
    };
    return Mannschaft;
  })();
  WaehleSpieler = (function() {
    function WaehleSpieler(mannschaft, trikot) {
      var _ref;
      this.mannschaft = mannschaft;
      this.trikot = trikot;
      this.spieler = (_ref = model.teams[this.mannschaft]) != null ? _ref.getPlayer(this.trikot) : void 0;
    }
    WaehleSpieler.prototype.Spielername = function() {
      var _ref, _ref2;
      return (_ref = (_ref2 = this.spieler) != null ? _ref2.name() : void 0) != null ? _ref : 'unbekannt';
    };
    return WaehleSpieler;
  })();
  TREFFER_ARTEN = {
    Freiwürfen: 'Freethrow',
    Freiwürfe: 'Freethrow',
    Freiwurf: 'Freethrow',
    Feldkörben: 'Fieldgoal',
    Feldkörbe: 'Fieldgoal',
    Feldkorb: 'Fieldgoal',
    Dreier: 'Threepointer'
  };
  trefferArtEnglisch = function(trefferArt) {
    return TREFFER_ARTEN[trefferArt];
  };
  SpielerSimulation = (function() {
    var TRIKOT;
    TRIKOT = '1';
    return (function() {
      function _Class() {
        this.spieler = new model.Player(TRIKOT);
      }
      _Class.prototype.punkte = function() {
        return this.spieler.points;
      };
      _Class.prototype.setPunkte = function(punkte) {
        return this.spieler.points = parseInt(punkte);
      };
      _Class.prototype.trifft = function(trefferArt) {
        return this.spieler.scores(trefferArtEnglisch(trefferArt));
      };
      _Class.prototype.verfehlt = function(trefferArt) {
        return this.spieler.misses(trefferArtEnglisch(trefferArt));
      };
      _Class.prototype.treffer = function(trefferArt) {
        return this.spieler.scored(trefferArtEnglisch(trefferArt));
      };
      _Class.prototype.wuerfe = function(trefferArt) {
        return this.spieler.attempted(trefferArtEnglisch(trefferArt));
      };
      return _Class;
    })();
  })();
  SpielSimulation = (function() {
    function SpielSimulation(mannschaftsnameA, mannschaftsnameB) {
      this.mannschaftsnameA = mannschaftsnameA;
      this.mannschaftsnameB = mannschaftsnameB;
      this.mannschaftA = this.getMannschaft(this.mannschaftsnameA);
      this.mannschaftB = this.getMannschaft(this.mannschaftsnameB);
    }
    SpielSimulation.prototype.spielstand = function() {
      var _ref, _ref2;
      return ((_ref = this.mannschaftA) != null ? _ref.points() : void 0) + ':' + ((_ref2 = this.mannschaftB) != null ? _ref2.points() : void 0);
    };
    SpielSimulation.prototype.spielerVonTrifft = function(trikot, mannschaft, trefferArt) {
      var spieler, trefferArtOk;
      spieler = this.getSpieler(mannschaft, trikot);
      trefferArtOk = spieler != null ? spieler.scores(trefferArtEnglisch(trefferArt)) : void 0;
      return (spieler != null) && trefferArtOk;
    };
    SpielSimulation.prototype.getSpieler = function(mannschaft, trikot) {
      var _ref;
      return (_ref = this.getMannschaft(mannschaft)) != null ? _ref.getPlayer(trikot) : void 0;
    };
    SpielSimulation.prototype.getMannschaft = function(mannschaft) {
      return model.teams[mannschaft];
    };
    return SpielSimulation;
  })();
  this.BasketballDeutsch = {
    Mannschaft: Mannschaft,
    WähleSpieler: WaehleSpieler,
    SpielerSimulation: SpielerSimulation,
    SpielSimulation: SpielSimulation
  };
}).call(this);
