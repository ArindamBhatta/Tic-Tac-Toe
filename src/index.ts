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
        }
        return false
    }

    checkRowWin():boolean{
        for (let i = 0; i <= 2; i++) {
           if ((this.cells[i][0] !== Board.Empty) && (this.cells[i][0] === this.cells[i][1]) &&
              (this.cells[i][1] === this.cells[i][2])) {
                return true
           }
        }
        return false
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
    public name:string;
    private mark:Board;
    constructor(name:string, mark:Board){
        super();
        this.name = name;
        this.mark = mark
    }

    makeMove():void{
              let row: number, col: number;
              do {
                const input = readlineSync.question('Format: row column\n');
                console.log(`\n${this.name}, enter your move (row and column, separated by space:`);
                const [rowInput, colInput] = input.split(' ').map(Number);
                row = rowInput;
                col = colInput;
              } while (!this.isValidMove(row, col)); 
              this.placeMark(row, col, this.mark);
    }

    isValidMove(row:number, col:number):boolean{
        if ((row >= 0 && row < 3 ) && (col >= 0 && col < 3)){
            if (this.cells[row][col] === Board.Empty) {
                    return true
                }
            return false
        }
        return false
    }
}

class LanchGame extends HumanPlayer{
   private player1:HumanPlayer; 
   private player2:HumanPlayer;
   private currentPlayer:HumanPlayer; //Reference

    constructor(){
        super("dummy",Board.Empty);
        this.player1 = new HumanPlayer("bob", Board.X);
        this.player2 = new HumanPlayer("Priya", Board.O);
        this.currentPlayer = this.player1;
     //make a infinite loop for check every time condition

        while (true) {
            console.log(this.currentPlayer.name + " is Your Turn");
            this.currentPlayer.makeMove();
            game.displayBoard()
            //if curren player not win change to 2
            if (game.checkColumnWin() || game.checkRowWin() || game.checkDiagonalWin()) {
                 console.log(this.currentPlayer.name + "has won"); 
                 break;
            }else{
                if (this.currentPlayer === this.player1) {
                        this.currentPlayer = this.player2 
                }else{
                        this.currentPlayer = this.player1
                }
            }
        }
    }
  
}


const game = new TicTacToe();
game.displayBoard()
const ticTacToeGame = new LanchGame();


