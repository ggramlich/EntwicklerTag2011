loadFile = (filename) ->
  JsSlim.loadJsFile(filename + '.js')

loadFile('BbScoutModel');

model = this.BbScout.model

class Mannschaft
  constructor: (@name) ->
    @mannschaft = new model.Team(@name)
    model.teams[@name] = @mannschaft

  LöscheAlleMannschaften: () -> model.teams = {}

  setTrikot: (@trikot) ->
  setNachname: (@nachname) ->
  setVorname: (@vorname) ->

  execute: ->
    spieler = new model.Player(@trikot, @vorname, @nachname);
    @mannschaft.addPlayer spieler

class WaehleSpieler
  constructor: (@mannschaft, @trikot) ->
    @spieler = model.teams[@mannschaft]?.getPlayer(@trikot)

  Spielername: -> @spieler?.name() ? 'unbekannt'

TREFFER_ARTEN =
  Freiwürfen: 'Freethrow'
  Freiwürfe: 'Freethrow'
  Freiwurf: 'Freethrow'
  Feldkörben: 'Fieldgoal'
  Feldkörbe: 'Fieldgoal'
  Feldkorb: 'Fieldgoal'
  Dreier: 'Threepointer'

trefferArtEnglisch = (trefferArt) -> TREFFER_ARTEN[trefferArt]

SpielerSimulation = (->
  TRIKOT = '1'

  class
    constructor: -> @spieler = new model.Player(TRIKOT)

    punkte: -> @spieler.points

    setPunkte: (punkte) -> @spieler.points = parseInt punkte

    trifft: (trefferArt) -> @spieler.scores trefferArtEnglisch(trefferArt)

    verfehlt: (trefferArt) -> @spieler.misses trefferArtEnglisch(trefferArt)

    treffer: (trefferArt) -> @spieler.scored trefferArtEnglisch(trefferArt)

    wuerfe: (trefferArt) -> @spieler.attempted trefferArtEnglisch(trefferArt)
)()

class SpielSimulation
  constructor: (@mannschaftsnameA, @mannschaftsnameB) ->
    @mannschaftA = @getMannschaft(@mannschaftsnameA)
    @mannschaftB = @getMannschaft(@mannschaftsnameB)

  spielstand: -> @mannschaftA?.points() + ':' + @mannschaftB?.points()
  
  spielerVonTrifft: (trikot, mannschaft, trefferArt) ->
    spieler = @getSpieler(mannschaft, trikot)
    trefferArtOk = spieler?.scores trefferArtEnglisch(trefferArt)
    spieler? and trefferArtOk
  
  getSpieler: (mannschaft, trikot) -> @getMannschaft(mannschaft)?.getPlayer(trikot)
  
  getMannschaft: (mannschaft) -> model.teams[mannschaft]

# Exportiere die fixtures als Modul BasketballDeutsch

this.BasketballDeutsch =
  Mannschaft: Mannschaft
  WähleSpieler: WaehleSpieler
  SpielerSimulation: SpielerSimulation
  SpielSimulation: SpielSimulation



