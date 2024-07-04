import { Board } from "./Board"

export class TicTacToe {
  public cells: Board[][]

  constructor() {
    this.cells = [
      [Board.Empty, Board.Empty, Board.Empty],
      [Board.Empty, Board.Empty, Board.Empty],
      [Board.Empty, Board.Empty, Board.Empty]
    ]
  }

  displayBoard(): void {
    console.log("-------------")
    for (let i = 0; i < 3; i++) {
      let row = "| "
      for (let j = 0; j < 3; j++) {
        row = row + this.symbolForCell(this.cells[i][j]) + " | "
      }
      console.log(row)
      console.log("-------------")
    }
  }

  private symbolForCell(cell: Board): string {
    switch (cell) {
      case Board.Empty:
        return " "
      case Board.x:
        return "X"
      case Board.o:
        return "O"
      default:
        return ""
    }
  }

  isValidMove(row: number, col: number): boolean {
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      return true
    } else {
      console.log("Index out of bounds.")
      return false
    }
  }

  placeMark(row: number, col: number, value: Board): boolean {
    if (this.cells[row][col] === Board.Empty) {
      this.cells[row][col] = value
      return true
    } else {
      console.log("This position is already taken.")
      return false
    }
  }

  checkRowWin(): Board {
    for (let i = 0; i < 3; i++) {
      if (
        this.cells[i][0] !== Board.Empty &&
        this.cells[i][0] === this.cells[i][1] &&
        this.cells[i][1] === this.cells[i][2]
      ) {
        return this.cells[i][0]
      }
    }
    return Board.Empty
  }

  checkColumnWin(): Board {
    for (let i = 0; i < 3; i++) {
      if (
        this.cells[0][i] !== Board.Empty &&
        this.cells[0][i] === this.cells[1][i] &&
        this.cells[1][i] === this.cells[2][i]
      ) {
        return this.cells[0][i]
      }
    }
    return Board.Empty
  }

  checkDiagonalWin(): Board {
    if (
      this.cells[0][0] !== Board.Empty &&
      this.cells[0][0] === this.cells[1][1] &&
      this.cells[1][1] === this.cells[2][2]
    ) {
      return this.cells[0][0]
    }
    if (
      this.cells[0][2] !== Board.Empty &&
      this.cells[0][2] === this.cells[1][1] &&
      this.cells[1][1] === this.cells[2][0]
    ) {
      return this.cells[0][2]
    }
    return Board.Empty
  }

  checkDraw(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.cells[i][j] === Board.Empty) {
          return false
        }
      }
    }
    return true
  }
}
