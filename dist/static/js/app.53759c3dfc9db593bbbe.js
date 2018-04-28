webpackJsonp([0],{CXPU:function(t,s){},Jmt5:function(t,s){},LNP7:function(t,s){},NHnr:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("7+uW"),i={data:function(){return{deckCards:[],player:{points:null,cards:[],won:!1,timesWon:0},dealer:{points:null,cards:[],won:!1,timesWon:0},gameStarted:!1,gameInProgress:!1,gameEnd:!1,show:!1,draw:!1,blackJack:!1}},methods:{start:function(){this.gameInProgress=!0,this.getDeck();for(var t=0;t<2;t++)this.player.cards.push(this.dealCards()),this.dealer.cards.push(this.dealCards());this.player.points=this.checkTotal(this.player.cards),21===this.player.points&&(this.blackJack=!0)},restart:function(){this.player.timesWon=0,this.dealer.timesWon=0,this.playAgain()},playAgain:function(){this.player.point=null,this.player.cards=[],this.player.won=!1,this.dealer.point=null,this.dealer.cards=[],this.dealer.won=!1,this.gameStarted=!1,this.gameInProgress=!1,this.gameEnd=!1,this.deckCards=[],this.draw=!1,this.blackJack=!1,this.start()},getDeck:function(){for(var t=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],s=["diamonds","hearts","spades","clubs"],a=0;a<t.length;a++)for(var e=0;e<s.length;e++){var i=parseInt(t[a]);"J"!==t[a]&&"Q"!==t[a]&&"K"!==t[a]||(i=10),"A"===t[a]&&(i=11);var l={value:t[a],suit:s[e],weight:i};this.deckCards.push(l)}this.shuffle()},shuffle:function(){for(var t=0;t<1e3;t++){var s=Math.floor(Math.random()*this.deckCards.length),a=Math.floor(Math.random()*this.deckCards.length),e=this.deckCards[s];this.deckCards[s]=this.deckCards[a],this.deckCards[a]=e}},dealCards:function(){var t=this.deckCards[this.deckCards.length-1];return this.deckCards.splice(this.deckCards.length-1,1),t},hitGame:function(){this.player.cards.push(this.dealCards()),this.player.points=this.checkTotal(this.player.cards),this.player.points>21&&this.endGame()},endGame:function(){for(this.gameInProgress=!1,this.gameEnd=!0,this.dealer.points=this.checkTotal(this.dealer.cards);this.dealer.points<17;)this.dealer.cards.push(this.dealCards()),this.dealer.points=this.checkTotal(this.dealer.cards);this.checkWinner()},checkTotal:function(t){for(var s=0,a=0,e=0;e<t.length;e++)"A"===t[e].value&&(s+=1),a+=t[e].weight;if(a>21&&0!==s)for(var i=0;i<s;i++)s-=1,a-=10;return a},checkWinner:function(){var t=this.player.points,s=this.dealer.points;t<22&&s<t||s>21&&t<22?(this.player.won=!0,this.player.timesWon=this.player.timesWon+1):t>21?(this.dealer.won=!0,this.dealer.timesWon=this.player.timesWon+1):t===s?this.draw=!0:this.dealer.won=!0},cardObject:function(t){return"playing-card "+t.suit}}},l={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"container"},[t._m(0),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 col-sm-12 text-center"},[t.gameInProgress||t.gameEnd?t._e():a("button",{staticClass:"btn btn-primary",on:{click:t.start}},[t._v("Start Game")]),t._v(" "),t.gameEnd?a("button",{staticClass:"btn btn-primary",on:{click:t.playAgain}},[t._v("Play Again")]):t._e(),t._v(" "),t.gameEnd?a("button",{staticClass:"btn btn-primary",on:{click:t.restart}},[t._v("Restart")]):t._e()])]),t._v(" "),t.player.timesWon||t.dealer.timesWon?a("div",{staticClass:"row mt-3"},[t._m(1),t._v(" "),a("div",{staticClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},[a("div",[a("h4",[t._v("Player: "+t._s(t.player.timesWon)+"  Dealer: "+t._s(t.dealer.timesWon))])])])]):t._e(),t._v(" "),t.gameInProgress&&!t.gameEnd?a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},[a("button",{staticClass:"btn btn-success",on:{click:t.hitGame}},[t._v("Hit")]),t._v(" "),a("button",{staticClass:"btn btn-danger",on:{click:t.endGame}},[t._v("Stay")])])]):t._e(),t._v(" "),t.gameEnd?a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-xs-6 col-sm-6 col-md-12 col-lg-12"},[t.player.won||t.blackJack?a("h4",{staticClass:"alert alert-success",attrs:{role:"alert"}},[t.blackJack?a("span",[t._v("Its a Blackjack!")]):t._e(),t._v(" You Won!!!")]):t._e(),t._v(" "),t.dealer.won?a("h4",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[t._v("You Lost")]):t._e(),t._v(" "),t.draw?a("h4",{staticClass:"alert alert-warning",attrs:{role:"alert"}},[t._v("Draw")]):t._e()])]):t._e(),t._v(" "),t.gameInProgress||t.gameEnd?a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-xs-6 col-sm-6 col-md-6 col-lg-6"},[a("h3",[t._v("Player "),t.player.points?a("span",[t._v("Points: "+t._s(t.player.points))]):t._e()]),t._v(" "),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-xs-1 col-sm-1 col-md-4 col-lg-4"}),t._v(" "),t._l(this.player.cards,function(s,e){return a("div",{key:e,staticClass:"col-xs-1 col-sm-1 col-md-1 col-lg-1"},[a("div",{class:t.cardObject(s)},[a("div",{staticClass:"top suit"},[t._v(t._s(s.value))]),t._v(" "),a("div",{staticClass:"content suit"}),t._v(" "),a("div",{staticClass:"bottom suit"},[t._v(t._s(s.value))])])])})],2)]),t._v(" "),a("div",{staticClass:"col-xs-6 col-sm-6 col-md-6 col-lg-6"},[a("h3",[t._v("Dealer "),t.gameEnd?a("span",[t._v("Points: "+t._s(t.dealer.points))]):t._e()]),t._v(" "),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-xs-1 col-sm-1 col-md-4 col-lg-4"}),t._v(" "),t._l(this.dealer.cards,function(s,e){return a("div",{key:e,staticClass:"col-xs-1 col-sm-1 col-md-1 col-lg-1"},[0==e||t.gameEnd?a("div",{class:t.cardObject(s)},[a("div",{staticClass:"top suit"},[t._v(t._s(s.value))]),t._v(" "),a("div",{staticClass:"content suit"}),t._v(" "),a("div",{staticClass:"bottom suit"},[t._v(t._s(s.value))])]):a("div",{staticClass:"playing-card"},[a("div",{staticClass:"card-back"})])])})],2)])]):t._e(),t._v(" "),a("div",{staticClass:"row mt-3 justify-content-md-center"},[a("div",{staticClass:"col-sm-12"},[a("button",{staticClass:"btn btn-info",on:{click:function(s){t.show=!t.show}}},[t._v("Show Rules")])]),t._v(" "),a("div",{staticClass:"col-sm-12 col-md-6 col-lg-6 mt-3"},[a("transition",{attrs:{name:"bounce"}},[t.show?a("div",{staticClass:"col-sm-12 col-md-12 col-lg-12"},[a("p",[t._v("You are tasked with beating the dealer’s hand total, without exceeding 21. That’s the magic number – but you don’t need to hit 21 to win; any hand total that beats the dealer is good enough.")]),t._v(" "),a("p",[t._v("The following card values hold true in Blackjack:")]),t._v(" "),a("div",[a("ul",{staticClass:"list-group"},[a("li",{staticClass:"list-group-item font-weight-bold"},[t._v("Face cards are valued at 10")]),t._v(" "),a("li",{staticClass:"list-group-item font-weight-bold"},[t._v("Aces are valued at 1 or 11")]),t._v(" "),a("li",{staticClass:"list-group-item font-weight-bold"},[t._v("Cards 2 - 10 retain their face value")])])])]):t._e()])],1)])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12 col-sm-12 text-center"},[s("h1",[s("span",{staticClass:"title-start"}),this._v("BlackJack Game"),s("span",{staticClass:"title-end"})])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},[s("div",[s("h4",[this._v("Scores")])])])}]};var r={name:"App",components:{Game:a("VU/8")(i,l,!1,function(t){a("CXPU")},null,null).exports}},c={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("game")],1)},staticRenderFns:[]};var n=a("VU/8")(r,c,!1,function(t){a("LNP7")},null,null).exports;a("Jmt5");e.a.config.productionTip=!1,new e.a({el:"#app",components:{App:n},template:"<App/>"})}},["NHnr"]);
//# sourceMappingURL=app.53759c3dfc9db593bbbe.js.map