import * as readlineSync from "readline-sync";

enum Board {
  Empty,
  x,
  o,
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

  placeMark(row: number, col: number, value: Board): boolean {
    if (this.cells[row][col] === Board.Empty) {
      this.cells[row][col] = value;
      return true;
    } else {
      console.log("This position is already taken.");
      return false;
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

interface Player {
  name: string;
  makeMove(): void;
  isValidMove(row: number, col: number): boolean;
}

class HumanPlayer implements Player {
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
    let moveMade: boolean = false;
    do {
      console.log(`${this.name}'s turn.`);
      const input = readlineSync.question("Enter row and column:\n");
      const [rowArr, colArr] = input.split(" ").map(Number);
      if (!isNaN(rowArr) && !isNaN(colArr)) {
        row = rowArr;
        col = colArr;
        if (this.isValidMove(row, col)) {
          moveMade = this.game.placeMark(row, col, this.mark);
        }
      } else {
        console.log("Please enter numbers separated by a space, for example, '0 0'.");
      }
    } while (!moveMade);
  }

  isValidMove(row: number, col: number): boolean {
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      return true;
    } else {
      console.log("Index out of bounds.");
      return false;
    }
  }
}

class AIPlayer implements Player {
  public name: string;
  private mark: Board;
  private game: TicTacToe;

  constructor(name: string, mark: Board, game: TicTacToe) {
    this.name = name;
    this.mark = mark;
    this.game = game;
  }

  makeMove(): void {
    let moveMade: boolean = false;
    while (!moveMade) {
      const row = Math.floor(Math.random() * 3);
      const col = Math.floor(Math.random() * 3);
      if (this.isValidMove(row, col)) {
        moveMade = this.game.placeMark(row, col, this.mark);
      }
    }
  }

  isValidMove(row: number, col: number): boolean {
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      return true;
    } else {
      console.log("Index out of bounds.");
      return false;
    }
  }
}

class LaunchGame {
  private player1: Player;
  private player2: Player;
  private currentPlayer: Player;
  private game: TicTacToe;

  constructor(numPlayers: number) {
    this.game = new TicTacToe();
    this.player1 = new HumanPlayer("Player X", Board.x, this.game);

    if (numPlayers === 2) {
      this.player2 = new HumanPlayer("Player O", Board.o, this.game);
    } else {
      this.player2 = new AIPlayer("AI Player", Board.o, this.game);
    }

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

const numPlayers = parseInt(readlineSync.question("Enter number of players (1 or 2): "));
const game = new LaunchGame(numPlayers);
game.startGame();
