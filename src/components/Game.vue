<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-12 text-center">
        <h1><span class="title-start"></span>BlackJack Game<span class="title-end"></span></h1>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 text-center">
        <button v-on:click="start"  v-if="!gameInProgress && !gameEnd" class="btn btn-primary">Start Game</button>
        <button v-on:click="playAgain" v-if="gameEnd"  class="btn btn-primary">Play Again</button>
        <button v-on:click="restart" v-if="gameEnd"  class="btn btn-primary">Reset scores</button>
      </div>
    </div>
    <div class="row mt-3" v-if="player.timesWon || dealer.timesWon">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div><h4>Scores</h4></div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div><h4>Player: {{player.timesWon}}  Dealer: {{dealer.timesWon}}</h4></div>
      </div>
    </div>
    <div class="row mt-3" v-if="gameInProgress && !gameEnd">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <button v-on:click="hitGame" class="btn btn-success">Hit</button>
        <button v-on:click="endGame" class="btn btn-danger">Stay</button>
      </div>
    </div>
    <div class="row mt-3" v-if="gameEnd">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
        <h4 class="alert alert-success" role="alert" v-if="player.won || blackJack"><span v-if="blackJack">Its a Blackjack!</span> You Won!!!</h4>
        <h4  class="alert alert-danger" role="alert" v-if="dealer.won">You Lost</h4>
        <h4  class="alert alert-warning" role="alert" v-if="draw">Draw</h4>
      </div>
    </div>
    <div class="row mt-3"  v-if="gameInProgress || gameEnd">
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <h3>Player <span v-if="player.points">Points: {{player.points}}</span></h3>
        <div class="row mt-3">
          <div class="col-xs-1 col-sm-1 col-md-4 col-lg-4"></div>
            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" v-for="(card,index) in this.player.cards" v-bind:key="index">
              <div v-bind:class="cardObject(card)">
                <div class="top suit">{{card.value}}</div>
                <div class="content suit"></div>
                <div class="bottom suit">{{card.value}}</div>
              </div>
            </div>
          <!--<div class="col-sm-10 col-md-9 col-lg-9"></div>-->
        </div>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <h3>Dealer <span v-if="gameEnd">Points: {{dealer.points}}</span></h3>
        <div class="row mt-3">
          <div class="col-xs-1 col-sm-1 col-md-4 col-lg-4"></div>
          <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" v-for="(card,index) in this.dealer.cards" v-bind:key="index">
            <div v-if="index != 0 && !gameEnd" class="playing-card">
              <div class="card-back"></div>
            </div>
            <div v-else v-bind:class="cardObject(card)">
              <div class="top suit">{{card.value}}</div>
              <div class="content suit"></div>
              <div class="bottom suit">{{card.value}}</div>
            </div>
          </div>
          <!--<div class="col-sm-10 col-md-6 col-lg-6"></div>-->
        </div>
      </div>
    </div>
    <div class="row mt-3 justify-content-md-center">
      <div class="col-sm-12">
        <button v-on:click="show = !show" class="btn btn-info">Show Rules</button>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6 mt-3">
        <transition name="bounce">
          <div v-if="show" class="col-sm-12 col-md-12 col-lg-12">
            <p>You are tasked with beating the dealer’s hand total, without exceeding 21. That’s the magic number – but you don’t need to hit 21 to win; any hand total that beats the dealer is good enough.</p>
            <p>The following card values hold true in Blackjack:</p>
            <div>
              <ul class="list-group">
                <li class="list-group-item font-weight-bold">Face cards are valued at 10</li>
                <li class="list-group-item font-weight-bold">Aces are valued at 1 or 11</li>
                <li class="list-group-item font-weight-bold">Cards 2 - 10 retain their face value</li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      deckCards: [],
      player: {
        points: null,
        cards: [],
        won: false,
        timesWon: 0
      },
      dealer: {
        points: null,
        cards: [],
        won: false,
        timesWon: 0
      },
      gameStarted: false,
      gameInProgress: false,
      gameEnd: false,
      show: false,
      draw: false,
      blackJack: false
    }
  },
  methods: {
    start: function () {
      this.gameInProgress = true
      this.getDeck()
      for (let i = 0; i < 2; i++) {
        this.player.cards.push(this.dealCards())
        this.dealer.cards.push(this.dealCards())
      }
      this.player.points = this.checkTotal(this.player.cards)
      if (this.player.points === 21) {
        this.blackJack = true
      }
    },
    restart: function () {
      this.player.timesWon = 0
      this.dealer.timesWon = 0
      this.playAgain()
    },
    playAgain: function () {
      this.player.point = null
      this.player.cards = []
      this.player.won = false
      this.dealer.point = null
      this.dealer.cards = []
      this.dealer.won = false
      this.gameStarted = false
      this.gameInProgress = false
      this.gameEnd = false
      this.deckCards = []
      this.draw = false
      this.blackJack = false
      this.start()
    },
    getDeck: function () {
      const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
      const suits = ['diamonds', 'hearts', 'spades', 'clubs']
      for (var i = 0; i < cards.length; i++) {
        for (var x = 0; x < suits.length; x++) {
          var weight = parseInt(cards[i])
          if (cards[i] === 'J' || cards[i] === 'Q' || cards[i] === 'K') {
            weight = 10
          }
          if (cards[i] === 'A') {
            weight = 11
          }
          let card = { value: cards[i], suit: suits[x], weight: weight }
          this.deckCards.push(card)
        }
      }
      this.shuffle()
    },
    shuffle: function () {
      for (let i = 0; i < 1000; i++) {
        var location1 = Math.floor((Math.random() * this.deckCards.length))
        var location2 = Math.floor((Math.random() * this.deckCards.length))
        var tmp = this.deckCards[location1]
        this.deckCards[location1] = this.deckCards[location2]
        this.deckCards[location2] = tmp
      }
    },
    dealCards: function () {
      // remove top card from deck
      var card = this.deckCards[this.deckCards.length - 1]
      this.deckCards.splice(this.deckCards.length - 1, 1)

      return card
    },
    hitGame: function () {
      this.player.cards.push(this.dealCards())
      this.player.points = this.checkTotal(this.player.cards)
      if (this.player.points > 21) {
        this.endGame()
      }
    },
    endGame: function () {
      this.gameInProgress = false
      this.gameEnd = true
      this.dealer.points = this.checkTotal(this.dealer.cards)
      while (this.dealer.points < 17) {
        this.dealer.cards.push(this.dealCards())
        this.dealer.points = this.checkTotal(this.dealer.cards)
      }
      this.checkWinner()
    },
    checkTotal: function (cards) {
      let aceCount = 0
      let total = 0
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].value === 'A') {
          aceCount = aceCount + 1
        }
        total = total + cards[i].weight
      }
      if (total > 21 && aceCount !== 0) {
        for (let i = 0; i < aceCount; i++) {
          aceCount = aceCount - 1
          total = total - 10
        }
      }

      return total
    },
    checkWinner: function () {
      const playerPoints = this.player.points
      const dealerPoints = this.dealer.points

      if ((playerPoints < 22 && dealerPoints < playerPoints) || (dealerPoints > 21 && playerPoints < 22)) {
        this.player.won = true
        this.player.timesWon = this.player.timesWon + 1
      } else if (playerPoints > 21) {
        this.dealer.won = true
        this.dealer.timesWon = this.player.timesWon + 1
      } else if (playerPoints === dealerPoints) {
        this.draw = true
      } else {
        this.dealer.won = true
      }
    },
    cardObject: function (card) {
      let suit = card.suit
      return 'playing-card' + ' ' + suit
    }
  }
}
</script>
<style>
  .playing-card {
    height: 160px;
    width: 120px;
    padding: 3px;
    border: 1px solid black;
    background-color: white;
    border-radius: 10px;
    /*position: absolute;*/
    left: 100px;
    display: inline-block;
    font-family: 'Lato';
    -moz-box-shadow:    inset 0 0 1px #000000;
    -webkit-box-shadow: inset 0 0 1px #000000;
    box-shadow:         inset 0 0 1px #000000;
  }

  .top {
    font-size: 20px;
    line-height: 20px;
    left: 2px;
    top: 2px;
    text-align:left
  }

  .content {
    text-align: center;
    font-size: 70px;
    margin-top: -20px;
  }

  .bottom {
    margin-top:-10px;
    font-size: 20px;
    line-height: 20px;
    right: 2px;
    bottom: 2px;
    text-align:left;
    transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
  }

  .card-back {
    margin-top: -20px;
    font-size: 120px;
  }

  .clubs,
  .spades {
    color: black;
  }

  .hearts,
  .diamonds {
    color: red;
  }

  .hearts .suit::after {
    content: '\2665';
    display: block;
    white-space: pre;
  }

  .diamonds .suit::after {
    content: '\2666';
    display: block;
    white-space: pre;
  }

  .spades .suit::after {
    content: '\2660';
    display: block;
    white-space: pre;
  }

  .clubs .suit::after {
    content: '\2663';
    display: block;
    white-space: pre;
  }

  .title-start::before{
    content: '\2660 ';
    color: black;
  }

  .title-start::after{
    content: '\2665 ';
    color: red;
  }

  .title-end::before{
    content: ' \2666 ';
    color: red;
  }

  .title-end::after{
    content: '\2663 ';
    color: black;
  }

   .card-back::after {
    /*height: 160px;*/
    /*width: 120px;*/
    /*padding: 3px;*/
    /*border: 1px solid black;*/
    /*background-color: white;*/
    /*border-radius: 10px;*/
    /*!*position: absolute;*!*/
    /*left: 100px;*/
    /*display: inline-block;*/
    /*font-family: 'Lato';*/
    /*-moz-box-shadow:    inset 0 0 1px #000000;*/
    /*-webkit-box-shadow: inset 0 0 1px #000000;*/
    /*box-shadow:         inset 0 0 1px #000000;*/
    content: '\1F0A0';
  }
  .card-back::after {

  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
