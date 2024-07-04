import { TicTacToe } from "./TicTacToe"
import { Board } from "./Board"
import { Player } from "./Player.interface"
import { HumanPlayer } from "./HumanPlayer"
import { AIPlayer } from "./AIPlayer"

export class LaunchGame {
  private player1: Player
  private player2: Player
  private currentPlayer: Player
  private game: TicTacToe

  constructor(numPlayers: number) {
    this.game = new TicTacToe()
    this.player1 = new HumanPlayer("Player X", Board.x, this.game)

    if (numPlayers === 2) {
      this.player2 = new HumanPlayer("Player O", Board.o, this.game)
    } else {
      this.player2 = new AIPlayer("AI Player", Board.o, this.game)
    }

    this.currentPlayer = this.player1
  }

  startGame(): void {
    let gameOngoing = true
    while (gameOngoing) {
      this.currentPlayer.makeMove()
      console.clear()
      this.game.displayBoard()
      if (
        this.game.checkRowWin() !== Board.Empty ||
        this.game.checkColumnWin() !== Board.Empty ||
        this.game.checkDiagonalWin() !== Board.Empty
      ) {
        console.log(this.currentPlayer.name + " wins!")
        gameOngoing = false
        break
      }

      if (this.game.checkDraw()) {
        console.log("Draw!")
        gameOngoing = false
        break
      }

      this.currentPlayer =
        this.currentPlayer === this.player1 ? this.player2 : this.player1
    }
  }
}
