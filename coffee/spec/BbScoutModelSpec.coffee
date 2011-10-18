model = require('BbScoutModel').BbScout.model

describe 'Player', ->
  player = null

  beforeEach ->
    player = new model.Player '23'

  it 'returns the full name', ->
    player.firstName = 'A'
    player.lastName = 'B'
    expect(player.name()).toBe 'A B'

  it 'has the right shirt number', ->
    expect(player.number).toBe '23'

  it 'has 0 points at the beginning', ->
    expect(player.points).toBe 0

  it 'returns false, when the point type is unknown', ->
    expect(player.scores 'x').toBeFalsy()

  it 'has two points after a field goal', ->
    player.scores 'Fieldgoal'
    expect(player.points).toBe 2

  it 'has three points after a three pointer', ->
    player.scores 'Threepointer'
    expect(player.points).toBe 3

  it 'has one point after a free throw', ->
    player.scores 'Freethrow'
    expect(player.points).toBe 1

  it 'has five points after a field goal and a three pointer', ->
    player.scores 'Fieldgoal'
    player.scores 'Threepointer'
    expect(player.points).toBe 5

  it 'counts its successful attempts', ->
    expect(player.scored('Fieldgoal')).toBe 0
    player.scores 'Fieldgoal'
    expect(player.scored('Fieldgoal')).toBe 1

  it 'counts its attempts', ->
    expect(player.attempted('Fieldgoal')).toBe 0
    player.misses 'Fieldgoal'
    expect(player.attempted('Fieldgoal')).toBe 1
    player.scores 'Fieldgoal'
    expect(player.attempted('Fieldgoal')).toBe 2

describe 'Team', ->
  team = player = null

  beforeEach ->
    team = new model.Team
    player = new model.Player '23'

  it 'returns undefined for an unknown player number', ->
    expect(team.getPlayer '').toBe undefined

  it 'returns the player for his player number', ->
    team.addPlayer player
    expect(team.getPlayer '23').toBe player

  it 'has 0 points at the beginning', ->
    expect(team.points()).toBe 0

  it "computes the sum of its players' points", ->
    player2 = new model.Player('2')
    team.addPlayer player
    team.addPlayer player2
    expect(team.points()).toBe 0
    player.points = 4
    expect(team.points()).toBe 4
    player2.points = 3
    expect(team.points()).toBe 7

