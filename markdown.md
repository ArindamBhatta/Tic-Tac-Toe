### Winning Logic for Tic tac Toe

```
((pos[0] !== empty) && (pos[0] === pos[1]) && (pos[1] === pos[2])),


```

### Main class for tic tac tow game

```

enum Board {
    Empty,
    X,
    O
}

class TicTacToe {
    protected cells: Board[][];

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
                return ' ';
            case Board.X:
                return 'X';
            case Board.O:
                return 'O';
            default:
                return '';
        }
    }

    placeMark(row: number, col: number, value: Board): void {
        if (row >= 0 && row < 3 && col >= 0 && col < 3) {
            this.cells[row][col] = value;
        }
    }
}

const game = new TicTacToe();
game.displayBoard();
game.placeMark(0, 0, Board.X);
game.displayBoard();
```
