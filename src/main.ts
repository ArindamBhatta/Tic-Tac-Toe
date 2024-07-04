import * as readlineSync from "readline-sync"
import { LaunchGame } from "./LaunchGame"

let numPlayers: number

do {
  numPlayers = parseInt(
    readlineSync.question(`Enter the number of players (1 or 2)\n`)
  )
  if (numPlayers !== 1 && numPlayers !== 2) {
    console.error("Number of players must be 1 or 2")
  }
} while (numPlayers !== 1 && numPlayers !== 2)

const game = new LaunchGame(numPlayers)
game.startGame()
