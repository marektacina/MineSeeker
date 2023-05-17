import {Board} from "./Board.js";

export class Game {

    private _board;
    private _flagSwitch;
    constructor() {
        this._board = new Board();

        this._flagSwitch = false;
        this.newGame()
    }

    set flagSwitch(value) {
        this._flagSwitch = value;
    }

    newGame() {
        this._board.placeMines();
        this._board.drawBoard();
    }

    //kliknuti levym
    clickedCell(mouseCoordinates: { x: number; y: number }) {
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
            }
        }
    }

    //kliknuti pravym
    clickedCellRight(mouseCoordinates: { x: number; y: number }) {
        let clickedCell = {
            i: Math.floor(mouseCoordinates.x / this._board.cell + 1),
            j: Math.floor(mouseCoordinates.y / this._board.cell + 1)
        };
        if (this._board.getCover(clickedCell.i, clickedCell.j) == 1) {
            this._board.setCover(clickedCell.i, clickedCell.j, 2);
            this._board.drawCell(clickedCell.i, clickedCell.j);
        } else if (this._board.getCover(clickedCell.i, clickedCell.j) == 2) {
            this._board.setCover(clickedCell.i, clickedCell.j, 1);
            this._board.drawCell(clickedCell.i, clickedCell.j);
        }
    }
}