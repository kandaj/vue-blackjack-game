import Vue from 'vue'
import Game from '@/components/Game'

const Constructor = Vue.extend(Game)
const GameComponent = new Constructor().$mount()
describe('Game.vue', () => {
  it('should render correct contents', () => {
    expect(GameComponent.$el.querySelector('h1').textContent)
      .to.equal('BlackJack Game')
  })
})

describe('Deck of cards', () => {
  it('getDeck should have 52 cards', () => {
    GameComponent.getDeck()
    expect(GameComponent.deckCards).to.have.lengthOf(52)
  })
  it('dealCards should return 1 card with keys "value", "suit", "weight" and deckCards length should be 51', () => {
    GameComponent.player.cards.push(GameComponent.dealCards())
    expect(GameComponent.player.cards).to.have.lengthOf(1)
    expect(GameComponent.deckCards).to.have.lengthOf(51)
    expect(GameComponent.player.cards[0]).to.include.all.keys('value', 'suit', 'weight')
  })
})

describe('checkTotal', () => {
  let cards = [
    {value: '9', suit: 'diamonds', weight: 9},
    {value: '10', suit: 'diamonds', weight: 10},
    {value: '2', suit: 'diamonds', weight: 2}]
  it('with number 9,10,2 cards  should return number 21', () => {
    expect(GameComponent.checkTotal(cards)).to.equal(21)
  })
  let cards1 = [
    {value: 'Q', suit: 'diamonds', weight: 10},
    {value: 'A', suit: 'diamonds', weight: 11}]
  it('with Q and A should return 21', () => {
    expect(GameComponent.checkTotal(cards1)).to.equal(21)
  })
  let cards2 = [
    {value: 'A', suit: 'diamonds', weight: 11},
    {value: 'A', suit: 'spades', weight: 11},
    {value: '10', suit: 'diamonds', weight: 10}]
  it('with 10,A(11)and A(11) should return 21', () => {
    expect(GameComponent.checkTotal(cards2)).to.equal(12)
  })
})
describe('checkWinner', () => {
  describe('with player 21 and dealer 22 points', () => {
    GameComponent.player.points = 21
    GameComponent.dealer.points = 22
    GameComponent.checkWinner()
    it('it should return player as winner', () => {
      expect(GameComponent.player.won).to.equal(true)
    })
  })
  describe('with player 22 and dealer 20 points', () => {
    GameComponent.player.points = 22
    GameComponent.dealer.points = 20
    GameComponent.checkWinner()
    it('it should return dealer as winner', () => {
      expect(GameComponent.dealer.won).to.equal(true)
    })
  })
  describe('with player 21 and dealer 21 points', () => {
    GameComponent.player.points = 21
    GameComponent.dealer.points = 21
    GameComponent.checkWinner()
    it('it should return as draw', () => {
      expect(GameComponent.draw).to.equal(true)
    })
  })
})

describe('checkBlackJack', () => {
  describe('with 2 cards and points 21', () => {
    const GameComponent1 = new Constructor().$mount()
    GameComponent1.player.cards = [
      {value: 'A', suit: 'diamonds', weight: 11},
      {value: '10', suit: 'diamonds', weight: 10}]
    GameComponent1.checkBlackJack()
    it('it should return player won as BlackJack and game should end', () => {
      expect(GameComponent1.blackJack).to.equal(true)
      expect(GameComponent1.player.won).to.equal(true)
      expect(GameComponent1.gameEnd).to.equal(true)
      expect(GameComponent1.gameInProgress).to.equal(false)
    })
  })
  describe('with 2 cards and points 17', () => {
    const GameComponent1 = new Constructor().$mount()
    GameComponent1.player.cards = [
      {value: '7', suit: 'diamonds', weight: 7},
      {value: '10', suit: 'diamonds', weight: 10}]
    GameComponent1.checkBlackJack()
    it('it should return BlackJack falase and game should be in progress', () => {
      expect(GameComponent1.blackJack).to.equal(false)
      expect(GameComponent1.gameEnd).to.equal(false)
    })
  })
})
