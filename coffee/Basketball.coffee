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

  execute: () ->
    spieler = new model.Spieler(@trikot);
    spieler.nachname = @nachname
    spieler.vorname = @vorname
    @mannschaft.addSpieler spieler

class WaehleSpieler
  constructor: (@mannschaft, @trikot) ->
    @spieler = model.mannschaften[@mannschaft]?.getSpieler(@trikot)

  Spielername: () -> @spieler?.name() ? 'unbekannt'


# Exportiere die fixtures als Modul Basketball

this.Basketball =
  Mannschaft: Mannschaft
  WähleSpieler: WaehleSpieler



