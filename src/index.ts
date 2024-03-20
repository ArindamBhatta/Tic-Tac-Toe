import * as readlineSync from 'readline-sync';

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
        }else{
            console.log("Invalied Position");
            
        }
    }
    //column wise win condition
    checkColumnWin():boolean{
        for (let j = 0; j <= 2; j++) {
           if ((this.cells[0][j] !== Board.Empty) && (this.cells[0][j] === this.cells[1][j]) &&
              (this.cells[1][j] === this.cells[2][j])) {
                return true
           }
            return false
        }
    }

    checkRowWin():boolean{
        for (let i = 0; i <= 2; i++) {
           if ((this.cells[i][0] !== Board.Empty) && (this.cells[i][0] === this.cells[i][1]) &&
              (this.cells[i][1] === this.cells[i][2])) {
                return true
           }
            return false
        }
    }

    checkDiagonalWin():boolean{
        if ((this.cells[0][0] != Board.Empty) && (this.cells[0][0] === this.cells[1][1]) &&
        (this.cells[1][1] === this.cells[2][2]) ||

       (this.cells[0][2] !== Board.Empty) && (this.cells[0][2] === this.cells[1][1]) &&
        (this.cells[1][1] === this.cells[2][0])
        ) {
          return true
     }
      return false
    }
}


const game = new TicTacToe();
game.displayBoard()

console.log(game.checkDiagonalWin());
console.log(game.checkRowWin());
console.log(game.checkColumnWin());





