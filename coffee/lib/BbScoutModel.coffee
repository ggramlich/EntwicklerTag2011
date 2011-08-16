root = exports ? this
root.BbScout ?= {};

TrefferArten =
  Freiwurf: 1
  Feldkorb: 2
  Dreier: 3

root.BbScout.model =
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
      @statistik =
          Freiwurf: {treffer: 0, wuerfe: 0}
          Feldkorb: {treffer: 0, wuerfe: 0}
          Dreier: {treffer: 0, wuerfe: 0}

    name: -> @vorname + " " + @nachname

    trifft: (trefferArt) ->
      return false unless @validateTrefferArt trefferArt
      @punkte += @punkteFuer(trefferArt)
      @statistik[trefferArt].treffer++
      @statistik[trefferArt].wuerfe++
    
    verfehlt: (trefferArt) ->
      return false unless @validateTrefferArt trefferArt
      @statistik[trefferArt].wuerfe++
    
    punkteFuer: (trefferArt) ->
      TrefferArten[trefferArt]

#TODO move into TrefferArten
    validateTrefferArt: (trefferArt) -> TrefferArten[trefferArt]?

    treffer: (trefferArt) ->
      return false unless @validateTrefferArt trefferArt
      @statistik[trefferArt].treffer
    
    wuerfe: (trefferArt) ->
      return false unless @validateTrefferArt trefferArt
      @statistik[trefferArt].wuerfe


