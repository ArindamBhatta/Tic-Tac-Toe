import * as readlineSync from 'readline-sync';

enum Board {
  Empty,
  X,
  O,
  Draw,
}

class TicTacToe {
  public cells: Board[][];

  constructor() {
    this.cells = [
      [Board.Empty, Board.Empty, Board.Empty],
      [Board.Empty, Board.Empty, Board.Empty],
      [Board.Empty, Board.Empty, Board.Empty],
    ];
  }

  displayBoard(): void {
    console.log("-------------");
    for (let i = 0; i < 3; i++) {
      let row = "| ";
      for (let j = 0; j < 3; j++) {
        row = row + this.symbolForCell(this.cells[i][j]) + " | ";
      }
      console.log(row);
      console.log("-------------");
    }
  }

  private symbolForCell(cell: Board): string {
    switch (cell) {
      case Board.Empty:
        return ' ';
      case Board.X:
        return 'X';
      case Board.O:
        return 'O';
      default:
        return '';
    }
  }

  placeMark(row: number, col: number, value: Board): void {
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      this.cells[row][col] = value;
    } else {
      console.log("Invalid Position");
    }
  }

  // Function to check for win conditions in rows
  checkRowWin(): Board {
    for (let i = 0; i < 3; i++) {
      if (this.cells[i][0] !== Board.Empty &&
        this.cells[i][0] === this.cells[i][1] &&
        this.cells[i][1] === this.cells[i][2]) {
        return this.cells[i][0];
      }
    }
    return Board.Empty; // No winner in any row yet
  }

  // Function to check for win conditions in columns
  checkColumnWin(): Board {
    for (let i = 0; i < 3; i++) {
      if (this.cells[0][i] !== Board.Empty &&
        this.cells[0][i] === this.cells[1][i] &&
        this.cells[1][i] === this.cells[2][i]) {
        return this.cells[0][i];
      }
    }
    return Board.Empty; // No winner in any column yet
  }

  // Function to check for win conditions in diagonals
  checkDiagonalWin(): Board {
    if (this.cells[0][0] !== Board.Empty &&
      this.cells[0][0] === this.cells[1][1] &&
      this.cells[1][1] === this.cells[2][2]) {
      return this.cells[0][0];
    }
    if (this.cells[0][2] !== Board.Empty &&
      this.cells[0][2] === this.cells[1][1] &&
      this.cells[1][1] === this.cells[2][0]) {
      return this.cells[0][2];
    }
    return Board.Empty; // No winner in diagonals yet
  }

  // Function to check for a draw (all cells are filled)
  checkForDraw(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.cells[i][j] === Board.Empty) {
          return false; // Game not over (empty cell found)
        }
      }
    }
    return true; // Draw condition (all cells filled)
  }
}

class HumanPlayer {
  public name: string;
  private mark: Board;
  private game: TicTacToe;

  constructor(name: string, mark: Board, game: TicTacToe) {
    this.name = name;
    this.mark = mark;
    this.game = game;
  }

  makeMove(): void {
    let row: number, col: number;
    do {
      console.log(`${this.name}, enter your move (row and column, separated by space):`);
      const input = readlineSync.question('Format: row column\n');
      const [rowInput, colInput] = input.split(' ').map(Number);
      row = rowInput;
      col = colInput;
    } while (!this.isValidMove(row, col));
    this.game.placeMark(row, col, this.mark);
  }

  isValidMove(row: number, col: number): boolean {
    if (this.game.cells[row][col] === Board.Empty) {
      return true;
    }
    console.log("Invalid Move! Cell is already occupied.");
    return false;
  }
}

class LaunchGame {
  private player1: HumanPlayer;
  private player2: HumanPlayer;
  private currentPlayer: HumanPlayer;
  private game: TicTacToe;

  constructor() {
    this.game = new TicTacToe();
    this.player1 = new HumanPlayer("Bob", Board.X, this.game);
    this.player2 = new HumanPlayer("Priya", Board.O, this.game);
    this.currentPlayer = this.player1;

    while (true) {
      console.log(this.currentPlayer.name + "'s Turn");
      this.currentPlayer.makeMove();
      this.game.displayBoard();

      if (this.game.checkColumnWin() || this.game.checkRowWin() || this.game.checkDiagonalWin()) {
        console.log(this.currentPlayer.name + " has won");
        break;
      }

      // Check for draw
      if (this.game.checkForDraw()) {
        console.log("It's a draw!");
        break;
      }

      // Switch players
      this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
    }
  }
}

const ticTacToeGame = new LaunchGame();
