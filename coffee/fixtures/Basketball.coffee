loadFile = (filename) ->
  JsSlim.loadJsFile(filename + '.js')

loadFile('BbScoutModel');

model = this.BbScout.model

class Mannschaft
  constructor: (@name) ->
    @mannschaft = new model.Mannschaft(@name)
    model.mannschaften[@name] = @mannschaft

  setTrikot: (@trikot) ->
  setNachname: (@nachname) ->
  setVorname: (@vorname) ->

  execute: ->
    spieler = new model.Spieler(@trikot);
    spieler.nachname = @nachname
    spieler.vorname = @vorname
    @mannschaft.addSpieler spieler

class WaehleSpieler
  constructor: (@mannschaft, @trikot) ->
    @spieler = model.mannschaften[@mannschaft]?.getSpieler(@trikot)

  Spielername: -> @spieler?.name() ? 'unbekannt'

class SpielerSimulation
  @TRIKOT: '1'
  constructor: -> @spieler = new model.Spieler(@TRIKOT)

  setPunkte: (punkte) -> @spieler.punkte = parseInt punkte

  trifft: (trefferArt) -> @spieler['trifft' + trefferArt]()

  punkte: -> @spieler.punkte

class SpielSimulation
  constructor: (@mannschaftsnameA, @mannschaftsnameB) ->
    @mannschaftA = @getMannschaft(@mannschaftsnameA)
    @mannschaftB = @getMannschaft(@mannschaftsnameB)

  spielstand: -> @mannschaftA?.punkte() + ':' + @mannschaftB?.punkte()
  
  spielerVonTrifft: (trikot, mannschaft, trefferArt) -> @getSpieler(mannschaft, trikot)?['trifft' + trefferArt]()
  
  getSpieler: (mannschaft, trikot) -> @getMannschaft(mannschaft)?.getSpieler(trikot)
  
  getMannschaft: (mannschaft) -> model.mannschaften[mannschaft]

# Exportiere die fixtures als Modul Basketball

this.Basketball =
  Mannschaft: Mannschaft
  WähleSpieler: WaehleSpieler
  SpielerSimulation: SpielerSimulation
  SpielSimulation: SpielSimulation



