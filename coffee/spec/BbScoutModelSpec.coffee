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

  it 'soll zwei Punkte nach einem Feldkorb haben', ->
    spieler.trifftFeldkorb()
    expect(spieler.punkte).toBe 2

  it 'soll drei Punkte nach einem Dreier haben', ->
    spieler.trifftDreier()
    expect(spieler.punkte).toBe 3

  it 'soll einen Punkt nach einem Freiwurf haben', ->
    spieler.trifftFreiwurf()
    expect(spieler.punkte).toBe 1

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


