(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var readline = require('readline');
  var READER = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function Game() {
    this.piles = [[3,2,1],[],[]];
    console.log("Initialized Game");
  }

  Game.prototype.run = function() {
    if (this.piles[1].length == 3 || this.piles[2].length == 3) {
      console.log("You win");
      READER.close();
      return;
    }
    this.display();
    var self = this;
    READER.question("Enter source pile [0-2]: ", function(input) {
      src = parseInt(input);
      READER.question("Enter destination pile [0-2]: ", function(input) {
        dest = parseInt(input);

        self.move(src, dest);
      });
    });
  };


  Game.prototype.move = function(src, dest) {
    if (this.piles[src].length > 0) {
      destDisk = this.piles[dest][this.piles[dest].length - 1] || 4;
      srcDisk = this.piles[src][this.piles[src].length - 1];
      console.log(destDisk, srcDisk);
      if (srcDisk < destDisk) {
        this.piles[src].pop();
        this.piles[dest].push(srcDisk);
      } else {
        console.log("You can't move it there");
      }
    } else {
      console.log("There's no disks there");
    }
    this.run();
  };

  Game.prototype.display = function() {
    console.log("-----");
    for (var i = 0; i < this.piles.length; i++) {
      console.log(this.piles[i]);
    }
    console.log("-----");
  }

  var game = Hanoi.game = new Game();

  return Hanoi;
})(this);

this.Hanoi.game.run();

