import * as readlineSync from "readline-sync";

enum Board {
  Empty,
  x, //this value is one of the enum values
  o, // this value is two of the enum values
  Draw
}

class TicTacToe {
  public cells: Board[][];

  constructor() {
    this.cells = [
      [Board.Empty, Board.Empty, Board.Empty],
      [Board.Empty, Board.Empty, Board.Empty],
      [Board.Empty, Board.Empty, Board.Empty]
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
        return " ";
      case Board.x:
        return "X";
      case Board.o:
        return "O";
      default:
        return "";
    }
  }

  placeMark(row: number, col: number, value: Board): void {
    if (this.cells[row][col] === Board.Empty) {
      this.cells[row][col] = value;
    } else {
      console.log("This position is already taken.");
    }
  }

  checkRowWin(): Board {
    for (let i = 0; i < 3; i++) {
      if (
        this.cells[i][0] !== Board.Empty &&
        this.cells[i][0] === this.cells[i][1] &&
        this.cells[i][1] === this.cells[i][2]
      ) {
        return this.cells[i][0];
      }
    }
    return Board.Empty;
  }

  checkColumnWin(): Board {
    for (let i = 0; i < 3; i++) {
      if (
        this.cells[0][i] !== Board.Empty &&
        this.cells[0][i] === this.cells[1][i] &&
        this.cells[1][i] === this.cells[2][i]
      ) {
        return this.cells[0][i];
      }
    }
    return Board.Empty;
  }

  checkDiagonalWin(): Board {
    if (
      this.cells[0][0] !== Board.Empty &&
      this.cells[0][0] === this.cells[1][1] &&
      this.cells[1][1] === this.cells[2][2]
    ) {
      return this.cells[0][0];
    }
    if (
      this.cells[0][2] !== Board.Empty &&
      this.cells[0][2] === this.cells[1][1] &&
      this.cells[1][1] === this.cells[2][0]
    ) {
      return this.cells[0][2];
    }
    return Board.Empty;
  }

  checkDraw(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.cells[i][j] === Board.Empty) {
          return false;
        }
      }
    }
    return true;
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
      console.log(`${this.name}'s turn.`);
      const input = readlineSync.question("Enter row and column:\n");
      const [rowArr, colArr] = input.split(" ").map(Number);
      if (!isNaN(rowArr) && !isNaN(colArr)) {
        row = rowArr;
        col = colArr;
      } else {
        console.log("Please enter numbers separated by a space, for example, '0 0'.");
        continue;
      }
    } while (!this.isValidMove(row, col));
    this.game.placeMark(row, col, this.mark);
  }

  isValidMove(row: number, col: number): boolean {
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      return true;
    } else {
      console.log("Index out of bounds.");
    }
  }
}

class LaunchGame {
  private player1: HumanPlayer;
  private player2: HumanPlayer;
  private currentPlayer: HumanPlayer;
  private game: TicTacToe;

  constructor() {
    this.game = new TicTacToe();
    this.player1 = new HumanPlayer("Player X", Board.x, this.game);
    this.player2 = new HumanPlayer("Player 0", Board.o, this.game);
    this.currentPlayer = this.player1;
  }

  startGame(): void {
    while (true) {
      this.currentPlayer.makeMove();
      this.game.displayBoard();

      if (
        this.game.checkRowWin() !== Board.Empty ||
        this.game.checkColumnWin() !== Board.Empty ||
        this.game.checkDiagonalWin() !== Board.Empty
      ) {
        console.log(this.currentPlayer.name + " wins!");
        break;
      }

      if (this.game.checkDraw()) {
        console.log("Draw!");
        break;
      }

      this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }
  }
}

const game = new LaunchGame();
game.startGame();
