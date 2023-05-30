import {Board} from "./Board.js";

export class Game {

    private _board;
    private _flagSwitch;
    private _runGame;
    constructor() {
        this._board = new Board();

        this._flagSwitch = false;
        this.newGame();
    }

    set flagSwitch(value) {
        this._flagSwitch = value;
    }

    newGame() {
        this._runGame = true;
        this._board.resetBoard();
        this._board.placeMines();
        this._board.drawBoard();
    }


    //kliknuti levym
    clickedCell(mouseCoordinates: { x: number; y: number }) {
        if (!this._runGame) {
            return;
        };
        let clickedCell = {
            i: Math.floor(mouseCoordinates.x / this._board.cell + 1),
            j: Math.floor(mouseCoordinates.y / this._board.cell + 1)
        };

        if (this._flagSwitch) {
            this.clickedCellRight(mouseCoordinates);
        } else {
            if (this._board.getCover(clickedCell.i, clickedCell.j) == 1) {
                this._board.setCover(clickedCell.i, clickedCell.j, 0);
                this._board.drawCell(clickedCell.i, clickedCell.j);
                this._runGame = this._board.checkUncovered(clickedCell.i, clickedCell.j);
            }
        }
    }

    //kliknuti pravym
    clickedCellRight(mouseCoordinates: { x: number; y: number }) {
        if (!this._runGame) {
            return;
        };
        let clickedCell = {
            i: Math.floor(mouseCoordinates.x / this._board.cell + 1),
            j: Math.floor(mouseCoordinates.y / this._board.cell + 1)
        };
        if (this._board.getCover(clickedCell.i, clickedCell.j) == 1 && this._board.minesLeft > 0) {
            this._board.setCover(clickedCell.i, clickedCell.j, 2);
            if (!this._board.downMinesLeft()) {
                let runGame = document.getElementById('smiles');
                runGame.setAttribute('src', 'pics/cool.png');
                this._runGame = false;
            }
            this._board.drawCell(clickedCell.i, clickedCell.j);
        } else if (this._board.getCover(clickedCell.i, clickedCell.j) == 2) {
            this._board.setCover(clickedCell.i, clickedCell.j, 1);
            this._board.upMinesLeft();
            this._board.drawCell(clickedCell.i, clickedCell.j);
        }
    }
}