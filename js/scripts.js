$(function() {
  var player = Object.create(Player);
  var computer = Object.create(Player);
  var dice = Object.create(hand);

  $("button#roll").click(function() {    
    dice.roll();
    $("#player-roll").empty().append(dice.translateddice);
    dice.score();
    player.addPoints(dice.scored);
    $("#player-dice-type").empty().append(dice.diceType);
    $("#player-turn-score").empty().append(dice.scored);
    $("#player-score").empty().append(player.total);

    dice.roll();
    $("#computer-roll").empty().append(dice.translateddice);
    dice.score();
    computer.addPoints(dice.scored);
    $("#computer-dice-type").empty().append(dice.diceType);
    $("#computer-turn-score").empty().append(dice.scored);
    $("#computer-score").empty().append(computer.total);

    player.nextRound();

    
    if (player.round === 13) {
      $("#results").empty().append("The final scores were " + player.total + " and " + computer.total);
      // $("#game-over").fadeIn();
      $("#header").empty().append("Game Over!");
      $("button#roll").empty().append("Reset?");
    }
    
    if (player.round === 14) {
      $("#current-roll").empty().append(0);
      $("#dice-type").empty().append("nothing, yet");
      $("#player-total").empty().append(0);
      $("button#roll").empty().append("Roll!");
      $("#round-number").empty().append(0);
      player.round = 0;
      player.total = 0;
      computer.total = 0;
      $("#results").empty().append("A beautiful and amazing game masterminded by the folks at Epicodus in Javascript");
      $("#header").empty().append("Let's Play Yacht Dice!");
    }
    if (player.round <= 13) {
      $("#round-number").empty().append(player.round);
    }
  });
});

var diceFaces = {
  1 : "&#9856;",
  2 : "&#9857;",
  3 : "&#9858;",
  4 : "&#9859;",
  5 : "&#9860;",
  6 : "&#9861;"
};


var Player = {
  total: 0,
  round: 1,
  setNumber: function(number) {
    this.number = number;
  },
  addPoints: function(points) {
    this.total += points;
  },
  nextRound: function() {
    this.round = this.round += 1;
  },
  over: function() {
    return this.round === 13;
  }
}

var hand = {
  roll: function() {
    var dice = [];
    for(var i = 0; i < 5; i++) {
      dice.push(Math.floor(Math.random() * 5 + 1));
    } 
    this.dice = dice;
    var translateddice = this.dice.map(function(number) {
      return diceFaces[number];
    });
    this.translateddice = translateddice;
  },
  score: function() {
    var unsorted = this.dice;
    var sorted = this.dice.sort();
    var stringdice = sorted.join('');
    var diceType = "none";
    var smallStraight = false;
    // for (i = 0; i < sorted.length - 2; i++) {
    //   if ((this.dice[i] !== this.dice[i+1] - 1) || (this.dice[i + 1] !== this.dice[i + 2] - 1) {
    //     smallStraight = false;
    //   }
    //   if (this.dice[i + 1] !== this.dice[i + 2] - 1) {

    //   }
    // }
    if ($.inArray(3, unsorted) !== -1 && $.inArray(4, unsorted) !== -1) {
      if ($.inArray(1, unsorted) !== -1 && $.inArray(2, unsorted) !== -1) {
        smallStraight = true;
      } else if ($.inArray(2, unsorted) !== -1 && $.inArray(5, unsorted) !== -1) {
        smallStraight = true;
      } else if ($.inArray(5, unsorted) !== -1 && $.inArray(6, unsorted) !== -1) {
        smallStraight = true;
      } else {
        smallStraight = false;
      }
    }

    var diceTypes = {
      "yacht" : 50,
      "full straight" : 40
    }

    if (sorted[0] === sorted[4]) {
      this.diceType = "yacht";
      return this.scored = 50;
    } else if (stringdice === "12345" || stringdice === "23456") {
      this.diceType = "full straight";
      return this.scored = 40;
    } else if (smallStraight) {
      this.diceType = "small straight";
      return this.scored = 15;
    } else if ((sorted[1] === sorted[2] && sorted[1] === sorted[3]) && (sorted[0] === sorted[1] || sorted[4] === sorted[1])) {
      this.diceType = "four of a kind";
      return this.scored = (4 * sorted[1]);
    } else if (sorted[2] === sorted[0] && sorted[3] === sorted[4] || sorted[2] === sorted[4] && sorted[0] === sorted[1]) {
      this.diceType = "full house";
      return this.scored = 25;
    } else if ((sorted[0] === sorted[1]) && (sorted[1] === sorted[2]) || (sorted[2] === sorted[3] && sorted[3] === sorted[4]) || (sorted[1] === sorted[2] && sorted[2] === sorted[3])){
      this.diceType = "three of a kind";
      return this.scored = this.dice[2] * 3;
    } else {
      this.diceType = "big fat zero";
      return this.scored = 0;
    }
  }
}