root = exports ? this
root.BbScout ?= {};
root.BbScout.model = {
  mannschaften: {}

  Mannschaft: class
    constructor: (@name) ->
      @spielerListe = {}

    addSpieler: (spieler) ->
      @spielerListe[spieler.trikot] = spieler

    getSpieler: (trikot) ->
      @spielerListe[trikot]

    punkte: ->
      summe = 0
      for own trikot, spieler of @spielerListe
        summe += spieler.punkte
      summe

  Spieler: class
    constructor: (@trikot, @vorname = '', @nachname = '', @punkte = 0) ->

    name: -> @vorname + " " + @nachname

    trifft: (punkte) -> @punkte += punkte

    trifftFeldkorb: -> @trifft(2)

    trifftDreier: -> @trifft(3)

    trifftFreiwurf: -> @trifft(1)

}

