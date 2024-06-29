# Tic-Tac-Toe Game in TypeScript
This project implements a simple command-line Tic-Tac-Toe game using TypeScript. It supports both single-player (against an AI) and two-player modes. The game logic includes checking for wins across rows, columns, and diagonals, as well as detecting draw conditions.
## Table of Contents
- Installation
- Usage
- Game Structure
- Board Enum
- TicTacToe Class
- Player Interface
- HumanPlayer Class
- AIPlayer Class
- LaunchGame Class

### Installation

1. Ensure you have Node.js and npm installed on your machine.
2. Clone this repository: 
git clone https://github.com/yourusername/tic-tac-toe-ts.git

### Game Structure
#### Board Enum
The Board enum defines the possible states for each cell in the Tic-Tac-Toe board:

- Empty: The cell is empty.
- x: The cell contains an 'X'.
- o: The cell contains an 'O'.
- Draw: The game is a draw.

### TicTacToe Class

The TicTacToe class represents the game board and contains methods to display the board, place marks, and check for winning conditions.

- cells: A 3x3 array representing the board.
displayBoard(): Displays the current state of the board.

- placeMark(row, col, value): Places a mark on the board at the specified row and column.

- checkRowWin(): Checks if there is a winning condition in any row.

- checkColumnWin(): Checks if there is a winning condition in any column.

- checkDiagonalWin(): Checks if there is a winning condition in either diagonal.

- checkDraw(): Checks if the game is a draw.

### Player Interface

The Player interface defines the structure for player classes. It includes methods for making a move and validating moves.

- name: The player's name.

- makeMove(): Prompts the player to make a move.

- isValidMove(row, col): Checks if a move is valid.

### HumanPlayer Class

The HumanPlayer class implements the Player interface for human players. It prompts the user for input to make a move.

- name: The player's name.
- mark: The player's mark ('X' or 'O').
- game: The current game instance.

### AIPlayer Class

The AIPlayer class implements the Player interface for an AI player. It randomly selects an empty cell to make a move.

- name: The AI player's name.
- mark: The AI player's mark ('X' or 'O').
- game: The current game instance.

### LaunchGame Class

The LaunchGame class initializes the game and manages the game loop. It supports both single-player and two-player modes.

- player1: The first player (always a human player).
- player2: The second player (either a human player or an AI player).
- currentPlayer: The player whose turn it is to make a move.
- game: The current game instance.


