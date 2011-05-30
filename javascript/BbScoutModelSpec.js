(function() {
  var model;
  model = require('BbScoutModel').BbScout.model;
  describe('Spieler', function() {
    var spieler;
    spieler = null;
    beforeEach(function() {
      return spieler = new model.Spieler('23');
    });
    it('soll den gesamten Namen angeben', function() {
      spieler.vorname = 'A';
      spieler.nachname = 'B';
      return expect(spieler.name()).toBe('A B');
    });
    it('soll die Trikotnummer haben', function() {
      return expect(spieler.trikot).toBe('23');
    });
    it('soll keine Punkte am Anfang haben', function() {
      return expect(spieler.punkte).toBe(0);
    });
    it('soll einen Fehler werfen, wenn die Trefferart unbekannt ist', function() {
      return expect(function() {
        return spieler.trifft('x');
      }).toThrow(new Error('Unbekannte Trefferart "x"'));
    });
    it('soll zwei Punkte nach einem Feldkorb haben', function() {
      spieler.trifft('Feldkorb');
      return expect(spieler.punkte).toBe(2);
    });
    it('soll drei Punkte nach einem Dreier haben', function() {
      spieler.trifft('Dreier');
      return expect(spieler.punkte).toBe(3);
    });
    it('soll einen Punkt nach einem Freiwurf haben', function() {
      spieler.trifft('Freiwurf');
      return expect(spieler.punkte).toBe(1);
    });
    it('soll fünf Punkte nach einem Feldkorb und einem Dreier haben', function() {
      spieler.trifft('Feldkorb');
      spieler.trifft('Dreier');
      return expect(spieler.punkte).toBe(5);
    });
    it('soll treffer zählen', function() {
      expect(spieler.treffer('Feldkorb')).toBe(0);
      spieler.trifft('Feldkorb');
      return expect(spieler.treffer('Feldkorb')).toBe(1);
    });
    return it('soll würfe zählen', function() {
      expect(spieler.wuerfe('Feldkorb')).toBe(0);
      spieler.verfehlt('Feldkorb');
      expect(spieler.wuerfe('Feldkorb')).toBe(1);
      spieler.trifft('Feldkorb');
      return expect(spieler.wuerfe('Feldkorb')).toBe(2);
    });
  });
  describe('Mannschaft', function() {
    var mannschaft, spieler;
    mannschaft = spieler = null;
    beforeEach(function() {
      mannschaft = new model.Mannschaft;
      return spieler = new model.Spieler('23');
    });
    it('soll undefined für unbekannte Trikotnummer zurückgeben', function() {
      return expect(mannschaft.getSpieler('')).toBe(void 0);
    });
    it('soll den Spieler anhand seiner Trikotnummer zurückgeben', function() {
      mannschaft.addSpieler(spieler);
      return expect(mannschaft.getSpieler('23')).toBe(spieler);
    });
    it('soll 0 Punkte zu Beginn haben', function() {
      return expect(mannschaft.punkte()).toBe(0);
    });
    return it('soll die Summe der Spielerpunkte berechnen', function() {
      var spieler2;
      spieler2 = new model.Spieler('2');
      mannschaft.addSpieler(spieler);
      mannschaft.addSpieler(spieler2);
      expect(mannschaft.punkte()).toBe(0);
      spieler.punkte = 4;
      expect(mannschaft.punkte()).toBe(4);
      spieler2.punkte = 3;
      return expect(mannschaft.punkte()).toBe(7);
    });
  });
}).call(this);
