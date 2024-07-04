import * as readlineSync from "readline-sync"
import { LaunchGame } from "./LaunchGame"

const numPlayers = parseInt(
  readlineSync.question("Enter number of players (1 or 2) \n")
)
const game = new LaunchGame(numPlayers)
game.startGame()
