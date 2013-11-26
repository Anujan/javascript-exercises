(function(root) {
  var __ = require('underscore');
  var readline = require('readline');

  var READER = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});



  function Board() {
    this.board = [[' ',' ',' '], [' ',' ',' '], [' ',' ',' ']];
  };

  Board.prototype.display = function() {
    this.board.forEach(function(el) {
      console.log(el.join("|"));
      console.log("-----");
    });
  };

  Board.prototype.empty = function(pos) {
    return this.board[pos[0]][pos[1]] === ' ';
  };

  Board.prototype.won = function() {
    return !!this.winner();
  };

  var all = function(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] != arr[0] || arr[i] === ' ') {
        return false;
      }
    }
    return true;
  }

  Board.prototype.transpose = function() {
    var transposed = [[],[],[]];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        transposed[i][j] = this.board[j][i];
      }
    }
    return transposed;
  };

  Board.prototype.winner = function() {
    var winner = null;
    var self = this;
    self.board.forEach(function(row) {
      if (all(row)) {
        winner = row[0];
      }
    });

    self.transpose().forEach(function(row) {
      if (all(row)) {
        winner = row[0];
      }
    });

    var rightDiag = [[0, 0], [1, 1], [2, 2]];
    var leftDiag = [[2, 0], [1, 1], [0, 2]];

    rightDiag = __.map(rightDiag, function(pos) {
      return self.board[pos[0]][pos[1]];
    });

    leftDiag = __.map(leftDiag, function(pos) {
      return self.board[pos[0]][pos[1]];
    });

    if (all(rightDiag) || all(leftDiag)) {
      winner = self.board[1][1];
    }

    return winner;
  };

  Board.prototype.placeMark = function(pos, mark) {
    if (this.empty(pos)) {
      this.board[pos[0]][pos[1]] = mark;
    }
  };

  Board.prototype.dup = function() {
    var duped = [];
    this.board.forEach(function(arr) {
      duped.push(arr.slice(0));
    });

    return duped;
  };



  TicTacToe.Game = function(numHumans) {
    this.board = new Board();
    this.players = [];
    for (var i = 0; i < numHumans; i++) {
      this.players.push(new HumanPlayer(i == 0 ? 'O' : 'X', this));
    }
    for (var i = numHumans; i < 2; i++) {
      this.players.push(new ComputerPlayer(i == 0 ? 'O' : 'X', this));
    }
  };

  var Game = TicTacToe.Game;

  Game.prototype.play = function(turn) {
    this.board.display();
    if (this.board.won()) {
      console.log(this.board.winner() + " WINS");
      READER.close();
      return;
    }

    var player = this.players[turn == 'O' ? 0 : 1];
    console.log(turn + "'s turn");
    player.playTurn();
  }



  function HumanPlayer(mark, game) {
    this.mark = mark;
    this.game = game;
  }

  HumanPlayer.prototype.playTurn = function() {

    var self = this;
     READER.question("Enter row: ", function(input) {
      var row = parseInt(input);
      READER.question("Enter column: ", function(input) {
        var col = parseInt(input);
        if (self.game.board.empty([row, col])) {
          self.game.board.placeMark([row, col], self.mark);
          self.game.play(self.mark == 'O' ? 'X' : 'O');
        } else {
          console.log("That spot isn't empty");
          self.playTurn();
        }
      });
    });
  }



  function ComputerPlayer(mark, game) {
    this.mark = mark;
    this.game = game;
  }

  ComputerPlayer.prototype.playTurn = function() {
    var self = this;
    var pos;
    pos = this.winningMove();
    if (!pos) {
      pos = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
    }
    if (self.game.board.empty(pos)) {
      self.game.board.placeMark(pos, self.mark);
      self.game.play(self.mark == 'O' ? 'X' : 'O');
    } else {
      self.playTurn();
    }
  }

  ComputerPlayer.prototype.winningMove = function() {
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        var board = new Board();
        board.board = this.game.board.dup();
        board.placeMark([row, col], this.mark);
        if (board.won()) {
          return [row, col];
        }
      }
    }
    return null;
  }



  return TicTacToe;
})(this);



game = new this.TicTacToe.Game(0);
game.play('O');