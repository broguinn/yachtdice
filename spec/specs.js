describe ('Player', function() {
  it("lets you set its number", function() {
    var player = Object.create(Player);
    player.setNumber(1);
    player.number.should.equal(1);
  });

  it("starts out with 0 points", function() {
    var player = Object.create(Player);
    player.total.should.equal(0);
  });

  it("lets you add points to its total", function() {
    var player = Object.create(Player);
    player.addPoints(5);
    player.total.should.equal(5);
  });

  it("starts at round 1", function() {
    var player = Object.create(Player);
    player.round.should.equal(1);  
  });

  it("lets you add 1 to the round", function() {
    var player = Object.create(Player);
    player.nextRound();
    player.round.should.equal(2);
  });

  describe ('over', function() {
    it("initially returns false", function() {
      var player = Object.create(Player);
      player.over().should.equal(false);      
    });
    
    it("returns over on 13th round after player rolls", function() {
      var player = Object.create(Player);
      player.round = 13;
      player.over().should.equal(true);
    });
  });
});

describe("Die", function() {
  it("returns five values for array 'hand'", function() {
    var die = Object.create(Die);
    die.roll();
    die.hand.length.should.equal(5);
  });

  it("returns five random integers for array 'hand'", function() {
    var die = Object.create(Die);
    sinon.stub(Math, 'random').returns(1);
    die.roll();
    Math.random.restore();
    die.hand.should.eql([6,6,6,6,6]);
  });

  describe("score", function() {
    it("returns '50' for five of a kind", function() {
      var die = Object.create(Die);
      sinon.stub(Math, "random").returns(6);
      die.roll();
      die.score();
      Math.random.reset();
      die.scored.should.equal(50);
    });
    
    it("doesn't return 50 if not five of a kind", function() {
      var die = Object.create(Die);
      var rollNumber = 1;
      var fourOfAKind = function() {
        if (rollNumber < 5) {
          return 2;
        } else {
          return 1;
        }
        rollNumber++;
      }
      sinon.stub(Math, "random", fourOfAKind);
      die.roll();
      die.score();
      Math.random.reset();
      die.scored.should.equal(40);
    });   
    it("returns '40' for sequential dice", function() {
      var die = Object.create(Die);
      die.hand = [1, 2, 3, 4, 5];
      die.score();
      die.scored.should.equal(40);
    });
    it("returns sum of the 4 dice if four of a kind", function() {
      var die = Object.create(Die);
      die.hand = [2, 1, 2, 2, 2];
      die.score();
      die.scored.should.equal(8);
    });
    it("returns sum of the 3 dice if three of a kind", function() {
      var die = Object.create(Die);
      die.hand = [3, 5, 5, 5, 6];
      die.score();
      die.scored.should.equal(15);
    });
    it("returns 25 for a full house", function() {
      var die = Object.create(Die);
      die.hand = [1, 2, 2, 1, 1];
      die.score();
      die.scored.should.equal(25);
    });
    it("returns 15 points for a small straight", function() {
      var die = Object.create(Die);
      die.hand = [1,2,3,4,6];
      die.score();
      die.scored.should.equal(15);
    });   
    it("returns 0 for all other combinations", function() {
      var die = Object.create(Die)
      die.hand = [4, 3, 2, 4, 6];
      die.score();
      die.scored.should.equal(0);
    })
  });
});








