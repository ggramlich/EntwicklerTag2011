root = exports ? this
root.BbScout ?= {};
root.BbScout.model = {
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
}

