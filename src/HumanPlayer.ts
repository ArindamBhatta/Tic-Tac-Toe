import { Board } from "./Board"
import { TicTacToe } from "./TicTacToe"
import { Player } from "./Player.interface"
import * as readlineSync from "readline-sync"

export class HumanPlayer implements Player {
  public name: string
  private mark: Board
  private game: TicTacToe

  constructor(name: string, mark: Board, game: TicTacToe) {
    this.name = name
    this.mark = mark
    this.game = game
  }

  makeMove(): void {
    let row: number, col: number
    let moveMade: boolean = false
    do {
      console.log(`${this.name}'s turn.`)
      const input = readlineSync.question("Enter row and column:\n")
      const [rowArr, colArr] = input.split(" ").map(Number)
      if (!isNaN(rowArr) && !isNaN(colArr)) {
        row = rowArr
        col = colArr
        if (this.game.isValidMove(row, col)) {
          moveMade = this.game.placeMark(row, col, this.mark)
        }
      } else {
        console.log(
          "Please enter numbers separated by a space, for example, '0 0'."
        )
      }
    } while (!moveMade)
  }
}
