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

- class of human player

```
class is a collection of variable and methods
gave two part has part does part
gas part name: string
and mark is characteer

does part
markaMove()
isValid move

in setter local variable name is same as instance variable humanplayer(local)
```

```
class LanchGame extends HumanPlayer{
   player1 = new HumanPlayer("bob", "X");
   player2 = new HumanPlayer("Priya", "O");
   //find current player
    HumanPlayer currentplayer;

    currentplayer = this.player1;

    console.log(currentplayer.name + "goes First");
}
```

- why i cant do that

1. Scope Issue: currentplayer is declared outside of any method in the LanchGame class, which isn't valid TypeScript. Variables should be declared within methods or the class scope, not directly within the class body.

2. Initialization Timing: Even if you fix the scope issue, you're trying to initialize currentplayer outside of any method or constructor, meaning it gets initialized immediately when the class is instantiated, rather than at the start of the game.
