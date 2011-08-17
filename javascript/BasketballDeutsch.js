(function() {
  var Mannschaft, SpielSimulation, SpielerSimulation, WaehleSpieler, loadFile, model;
  loadFile = function(filename) {
    return JsSlim.loadJsFile(filename + '.js');
  };
  loadFile('BbScoutModel');
  model = this.BbScout.model;
  Mannschaft = (function() {
    function Mannschaft(name) {
      this.name = name;
      this.mannschaft = new model.Mannschaft(this.name);
      model.mannschaften[this.name] = this.mannschaft;
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
      spieler = new model.Spieler(this.trikot);
      spieler.nachname = this.nachname;
      spieler.vorname = this.vorname;
      return this.mannschaft.addSpieler(spieler);
    };
    return Mannschaft;
  })();
  WaehleSpieler = (function() {
    function WaehleSpieler(mannschaft, trikot) {
      var _ref;
      this.mannschaft = mannschaft;
      this.trikot = trikot;
      this.spieler = (_ref = model.mannschaften[this.mannschaft]) != null ? _ref.getSpieler(this.trikot) : void 0;
    }
    WaehleSpieler.prototype.Spielername = function() {
      var _ref, _ref2;
      return (_ref = (_ref2 = this.spieler) != null ? _ref2.name() : void 0) != null ? _ref : 'unbekannt';
    };
    return WaehleSpieler;
  })();
  SpielerSimulation = (function() {
    var TREFFER_ARTEN, TRIKOT;
    TRIKOT = '1';
    TREFFER_ARTEN = {
      Freiwürfen: 'Freiwurf',
      Feldkörben: 'Feldkorb'
    };
    return (function() {
      function _Class() {
        this.spieler = new model.Spieler(TRIKOT);
      }
      _Class.prototype.punkte = function() {
        return this.spieler.punkte;
      };
      _Class.prototype.setPunkte = function(punkte) {
        return this.spieler.punkte = parseInt(punkte);
      };
      _Class.prototype.trifft = function(trefferArt) {
        return this.spieler.trifft(trefferArt);
      };
      _Class.prototype.verfehlt = function(trefferArt) {
        return this.spieler.verfehlt(trefferArt);
      };
      _Class.prototype.treffer = function(trefferArt) {
        return this.spieler.treffer(this.trefferArtSingular(trefferArt));
      };
      _Class.prototype.wuerfe = function(trefferArt) {
        return this.spieler.wuerfe(this.trefferArtSingular(trefferArt));
      };
      _Class.prototype.trefferArtSingular = function(trefferArt) {
        var _ref;
        return (_ref = TREFFER_ARTEN[trefferArt]) != null ? _ref : trefferArt;
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
      return ((_ref = this.mannschaftA) != null ? _ref.punkte() : void 0) + ':' + ((_ref2 = this.mannschaftB) != null ? _ref2.punkte() : void 0);
    };
    SpielSimulation.prototype.spielerVonTrifft = function(trikot, mannschaft, trefferArt) {
      var spieler;
      spieler = this.getSpieler(mannschaft, trikot);
      if (spieler != null) {
        spieler.trifft(trefferArt);
      }
      return spieler != null;
    };
    SpielSimulation.prototype.getSpieler = function(mannschaft, trikot) {
      var _ref;
      return (_ref = this.getMannschaft(mannschaft)) != null ? _ref.getSpieler(trikot) : void 0;
    };
    SpielSimulation.prototype.getMannschaft = function(mannschaft) {
      return model.mannschaften[mannschaft];
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
