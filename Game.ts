import {Board} from "./Board.js";

export class Game {

    _board;
    constructor() {

        this._board = new Board();
        this._board.drawBoard();

    }

    clickedCell(mouseCoordinates: { x: number; y: number }) {
        let clickedCell = {
            i: Math.floor(mouseCoordinates.x / this._board.cell),
            j: Math.floor(mouseCoordinates.y / this._board.cell)
        };
        this._board.setCover(clickedCell, 0);
        this._board.drawBoard();
    }
}