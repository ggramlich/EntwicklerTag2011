model = require('BbScoutModel').BbScout.model

describe 'Spieler', ->
  it 'soll den gesamten Namen angeben', ->
    spieler = new model.Spieler(1)
    spieler.vorname = 'A'
    spieler.nachname = 'B'
    expect(spieler.name()).toBe 'A B'

  it 'soll die Trikotnummer haben', ->
    spieler = new model.Spieler('23')
    expect(spieler.trikot).toBe '23'


