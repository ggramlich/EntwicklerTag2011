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
      @punkte = 0;

    name: -> @vorname + " " + @nachname if (@vorname? and @nachname)

    trifft: (punkte) -> @punkte = punkte

    trifftFeldkorb: -> @trifft(2)

    trifftDreier: -> @trifft(3)

    trifftFreiwurf: -> @trifft(1)

}

