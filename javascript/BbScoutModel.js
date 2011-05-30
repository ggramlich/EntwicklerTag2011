(function() {
  var TrefferArten, root, _ref;
  var __hasProp = Object.prototype.hasOwnProperty;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
    if ((_ref = root.BbScout) != null) {
    _ref;
  } else {
    root.BbScout = {};
  };
  TrefferArten = {
    Freiwurf: 1,
    Feldkorb: 2,
    Dreier: 3
  };
  root.BbScout.model = {
    mannschaften: {},
    Mannschaft: (function() {
      function _Class(name) {
        this.name = name;
        this.spielerListe = {};
      }
      _Class.prototype.addSpieler = function(spieler) {
        return this.spielerListe[spieler.trikot] = spieler;
      };
      _Class.prototype.getSpieler = function(trikot) {
        return this.spielerListe[trikot];
      };
      _Class.prototype.punkte = function() {
        var spieler, summe, trikot, _ref2;
        summe = 0;
        _ref2 = this.spielerListe;
        for (trikot in _ref2) {
          if (!__hasProp.call(_ref2, trikot)) continue;
          spieler = _ref2[trikot];
          summe += spieler.punkte;
        }
        return summe;
      };
      return _Class;
    })(),
    Spieler: (function() {
      function _Class(trikot, vorname, nachname, punkte) {
        this.trikot = trikot;
        this.vorname = vorname != null ? vorname : '';
        this.nachname = nachname != null ? nachname : '';
        this.punkte = punkte != null ? punkte : 0;
        this.statistik = {
          Freiwurf: {
            treffer: 0,
            wuerfe: 0
          },
          Feldkorb: {
            treffer: 0,
            wuerfe: 0
          },
          Dreier: {
            treffer: 0,
            wuerfe: 0
          }
        };
      }
      _Class.prototype.name = function() {
        return this.vorname + " " + this.nachname;
      };
      _Class.prototype.trifft = function(trefferArt) {
        this.validateTrefferArt(trefferArt);
        this.punkte += this.punkteFuer(trefferArt);
        this.statistik[trefferArt].treffer++;
        return this.statistik[trefferArt].wuerfe++;
      };
      _Class.prototype.verfehlt = function(trefferArt) {
        this.validateTrefferArt(trefferArt);
        return this.statistik[trefferArt].wuerfe++;
      };
      _Class.prototype.punkteFuer = function(trefferArt) {
        return TrefferArten[trefferArt];
      };
      _Class.prototype.validateTrefferArt = function(trefferArt) {
        if (TrefferArten[trefferArt] == null) {
          throw new Error('Unbekannte Trefferart "' + trefferArt + '"');
        }
      };
      _Class.prototype.treffer = function(trefferArt) {
        this.validateTrefferArt(trefferArt);
        return this.statistik[trefferArt].treffer;
      };
      _Class.prototype.wuerfe = function(trefferArt) {
        this.validateTrefferArt(trefferArt);
        return this.statistik[trefferArt].wuerfe;
      };
      return _Class;
    })()
  };
}).call(this);
