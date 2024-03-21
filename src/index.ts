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

class HumanPlayer extends TicTacToe {
    private name:string;
    private mark:string;
    //has part is going their
    constructor(name:string, mark:string){
        super();
        this.name = name;
        this.mark = mark
    }

    //before you make a move always check that if the move is valed or not
    makeMove(mark:Board):void{
/*  step1: -  we needs to take input from keyboard 
    step2: - Accept input enter the row and column
    step3: - store row values in into a number varable call row
    step4: - store column values in into a number varable call column
*/ 
              let row: number, col: number;
              // Reading row and column inputs
              const input = readlineSync.question('Format: row column\n');
              //as long as user make wrong move he get a chance
              do {
                console.log(`\n${this.name}, enter your move (row and column, separated by space:`);
                const [rowInput, colInput] = input.split(' ').map(Number);
                row = rowInput - 1;
                col = colInput - 1;
              } while (!this.isValidMove(row, col)); //suppose cell is not empty so return false so, false and false became true, so he get a chance
              this.placeMark(row, col, mark);
    }
    //logic is move is valed 
    isValidMove(row:number, col:number):boolean{
        if ((row > 0 && row <= 2 ) && (col >= 0 && col <=2)){
             // Access the cell value using `this.cells[row][col]`
            if (this.cells[row][col] === Board.Empty) {
                    return true
                }
            return false
        }
    }
}


const game = new TicTacToe();
game.displayBoard()

console.log(game.checkDiagonalWin());
console.log(game.checkRowWin());
console.log(game.checkColumnWin());