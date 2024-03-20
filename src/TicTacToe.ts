import * as readlineSync from 'readline-sync';

enum Mark {
    Empty,
    X,
    O
}

class Board {
    private cells: Mark[][];

    constructor() {
        this.cells = [
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty]
        ];
    }

    markCell(i: number, j: number, mark: Mark): boolean {
        if (i < 0 || i >= 3 || j < 0 || j >= 3 || this.cells[i][j] !== Mark.Empty) {
            return false; // Invalid move
        }

        this.cells[i][j] = mark;
        return true;
    }

    isFull(): boolean {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.cells[i][j] === Mark.Empty) {
                    return false;
                }
            }
        }
        return true;
    }

    checkWinner(): Mark | null {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (this.cells[i][0] !== Mark.Empty && 
                this.cells[i][0] === this.cells[i][1] && 
                this.cells[i][0] === this.cells[i][2]) {
                return this.cells[i][0];
            }
        }

        // Check columns
        for (let j = 0; j < 3; j++) {
            if (this.cells[0][j] !== Mark.Empty && 
                this.cells[0][j] === this.cells[1][j] && 
                this.cells[0][j] === this.cells[2][j]) {
                return this.cells[0][j];
            }
        }

        // Check diagonals
        if (this.cells[0][0] !== Mark.Empty && 
            this.cells[0][0] === this.cells[1][1] && 
            this.cells[0][0] === this.cells[2][2]) {
            return this.cells[0][0];
        }

        if (this.cells[0][2] !== Mark.Empty && 
            this.cells[0][2] === this.cells[1][1] && 
            this.cells[0][2] === this.cells[2][0]) {
            return this.cells[0][2];
        }

        return null; // No winner yet
    }

    printBoard(): void {
        let output = '';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                output += this.cells[i][j] === Mark.Empty ? ' ' : Mark[this.cells[i][j]];
                if (j < 2) {
                    output += ' | ';
                }
            }
            if (i < 2) {
                output += '\n---------\n';
            }
        }
        console.log(output);
    }
}

const board = new Board();
console.log("Let's play Tic Tac Toe!");

// Game loop
while (true) {
    // Player X's turn
    let input = readlineSync.question("Player X, enter row and column number (0-2) separated by space:");
    let [rowX, colX] = input.split(" ").map(Number);
    if (board.markCell(rowX, colX, Mark.X)) {
        board.printBoard();
        let winner = board.checkWinner();
        if (winner !== null) {
            console.log(`Player ${Mark[winner]} wins!`);
            break;
        } else if (board.isFull()) {
            console.log("It's a draw!");
            break;
        }
    } else {
        console.log('Invalid move. Try again.');
    }

    // Player O's turn
    input = readlineSync.question("Player O, enter row and column number (0-2) separated by space:");
    let [rowO, colO] = input.split(" ").map(Number);
    if (board.markCell(rowO, colO, Mark.O)) {
        board.printBoard();
        let winner = board.checkWinner();
        if (winner !== null) {
            console.log(`Player ${Mark[winner]} wins!`);
            break;
        } else if (board.isFull()) {
            console.log("It's a draw!");
            break;
        }
    } else {
        console.log('Invalid move. Try again.');
    }
}
