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

# Definitionen des Modells

model =
  mannschaften: {}

  Mannschaft: class Mannschaft
    constructor: (@name) ->
      @spielerListe = {}

    addSpieler: (spieler) ->
      @spielerListe[spieler.trikot] = spieler

    getSpieler: (trikot) ->
      @spielerListe[trikot]

  Spieler: class Spieler
    constructor: (@trikot) ->
      @vorname
      @nachname

    name: () -> @vorname + " " + @nachname if (@vorname? and @nachname)


