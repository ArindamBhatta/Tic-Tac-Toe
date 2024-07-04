import { Board } from "./Board"
import { TicTacToe } from "./TicTacToe"
import { Player } from "./Player.interface"

export class AIPlayer implements Player {
  public name: string
  private mark: Board
  private game: TicTacToe

  constructor(name: string, mark: Board, game: TicTacToe) {
    this.name = name
    this.mark = mark
    this.game = game
  }

  makeMove(): void {
    const bestMove = this.findBestMove()
    this.game.placeMark(bestMove.row, bestMove.col, this.mark)
  }

  private findBestMove(): { row: number; col: number } {
    // 1. Take the center if available
    if (this.game.cells[1][1] === Board.Empty) {
      return { row: 1, col: 1 }
    }

    // Check for row specific
    for (let i = 0; i < 3; i++) {
      if (
        this.game.cells[i][0] === Board.x &&
        this.game.cells[i][1] === Board.x &&
        this.game.cells[i][2] === Board.Empty
      ) {
        return { row: i, col: 2 }
      }

      if (
        this.game.cells[i][0] === Board.x &&
        this.game.cells[i][2] === Board.x &&
        this.game.cells[i][1] === Board.Empty
      ) {
        return { row: i, col: 1 }
      }

      if (
        this.game.cells[i][1] === Board.x &&
        this.game.cells[i][2] === Board.x &&
        this.game.cells[i][0] === Board.Empty
      ) {
        return { row: i, col: 0 }
      }
    }

    // Check for column specific
    for (let j = 0; j < 3; j++) {
      if (
        this.game.cells[0][j] === Board.x &&
        this.game.cells[1][j] === Board.x &&
        this.game.cells[2][j] === Board.Empty
      ) {
        return { row: 2, col: j }
      }

      if (
        this.game.cells[0][j] === Board.x &&
        this.game.cells[2][j] === Board.x &&
        this.game.cells[1][j] === Board.Empty
      ) {
        return { row: 1, col: j }
      }

      if (
        this.game.cells[1][j] === Board.x &&
        this.game.cells[2][j] === Board.x &&
        this.game.cells[0][j] === Board.Empty
      ) {
        return { row: 0, col: j }
      }
    }

    // we don't needs to check diagonal 1,1 position taken by ai
    if (
      this.game.cells[0][0] === Board.x &&
      this.game.cells[1][1] === Board.x &&
      this.game.cells[2][2] === Board.Empty
    ) {
      return { row: 2, col: 2 }
    }
    if (
      this.game.cells[1][1] === Board.x &&
      this.game.cells[2][2] === Board.x &&
      this.game.cells[0][0] === Board.Empty
    ) {
      return { row: 0, col: 0 }
    }
    if (
      this.game.cells[0][2] === Board.x &&
      this.game.cells[1][1] === Board.x &&
      this.game.cells[2][0] === Board.Empty
    ) {
      return { row: 2, col: 0 }
    }
    if (
      this.game.cells[1][1] === Board.x &&
      this.game.cells[2][0] === Board.x &&
      this.game.cells[0][2] === Board.Empty
    ) {
      return { row: 0, col: 2 }
    }

    // 3. Take any empty cell
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.game.cells[i][j] === Board.Empty) {
          return { row: i, col: j }
        }
      }
    }

    // If no moves left, return an invalid move
    return { row: -1, col: -1 }
  }
}
