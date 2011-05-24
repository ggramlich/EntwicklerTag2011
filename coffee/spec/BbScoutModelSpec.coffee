model = require('BbScoutModel').BbScout.model

describe 'Spieler', ->
  spieler = null

  beforeEach ->
    spieler = new model.Spieler '23'

  it 'soll den gesamten Namen angeben', ->
    spieler.vorname = 'A'
    spieler.nachname = 'B'
    expect(spieler.name()).toBe 'A B'

  it 'soll die Trikotnummer haben', ->
    expect(spieler.trikot).toBe '23'

  it 'soll keine Punkte am Anfang haben', ->
    expect(spieler.punkte).toBe 0

  it 'soll einen Fehler werfen, wenn die Trefferart unbekannt ist', ->
    expect(-> spieler.trifft 'x').toThrow new Error 'Unbekannte Trefferart "x"'

  it 'soll zwei Punkte nach einem Feldkorb haben', ->
    spieler.trifft 'Feldkorb'
    expect(spieler.punkte).toBe 2

  it 'soll drei Punkte nach einem Dreier haben', ->
    spieler.trifft 'Dreier'
    expect(spieler.punkte).toBe 3

  it 'soll einen Punkt nach einem Freiwurf haben', ->
    spieler.trifft 'Freiwurf'
    expect(spieler.punkte).toBe 1

  it 'soll fünf Punkte nach einem Feldkorb und einem Dreier haben', ->
    spieler.trifft 'Feldkorb'
    spieler.trifft 'Dreier'
    expect(spieler.punkte).toBe 5

  it 'soll treffer zählen', ->
    expect(spieler.treffer('Feldkorb')).toBe 0
    spieler.trifft 'Feldkorb'
    expect(spieler.treffer('Feldkorb')).toBe 1

  it 'soll würfe zählen', ->
    expect(spieler.wuerfe('Feldkorb')).toBe 0
    spieler.verfehlt 'Feldkorb'
    expect(spieler.wuerfe('Feldkorb')).toBe 1
    spieler.trifft 'Feldkorb'
    expect(spieler.wuerfe('Feldkorb')).toBe 2

describe 'Mannschaft', ->
  mannschaft = spieler = null

  beforeEach ->
    mannschaft = new model.Mannschaft
    spieler = new model.Spieler '23'

  it 'soll undefined für unbekannte Trikotnummer zurückgeben', ->
    expect(mannschaft.getSpieler '').toBe undefined

  it 'soll den Spieler anhand seiner Trikotnummer zurückgeben', ->
    mannschaft.addSpieler spieler
    expect(mannschaft.getSpieler '23').toBe spieler

  it 'soll 0 Punkte zu Beginn haben', ->
    expect(mannschaft.punkte()).toBe 0

  it 'soll die Summe der Spielerpunkte berechnen', ->
    spieler2 = new model.Spieler('2')
    mannschaft.addSpieler spieler
    mannschaft.addSpieler spieler2
    expect(mannschaft.punkte()).toBe 0
    spieler.punkte = 4
    expect(mannschaft.punkte()).toBe 4
    spieler2.punkte = 3
    expect(mannschaft.punkte()).toBe 7

