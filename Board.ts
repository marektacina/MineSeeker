export class Board {
    get cell() {
        return this._cell;
    }

    private _cells;
    private _cell;
    private _canvas;
    private _boardCover = [];
    constructor() {
        this._cells = 16;
        this._canvas = document.getElementById("canvas");
        this._cell = this._canvas.width / this._cells;

        for (let i = 0; i < this._cells; i++) {
            let line = [];
            for (let j = 0; j < this._cells; j++) {
                 line.push(1);
            }
            this._boardCover.push(line);

        }
    }

    /**
     * Nastavi kryti bunky
     * @param coordinates
     * @param value
     */
    setCover(coordinates, value) {
        this._boardCover[coordinates.j][coordinates.i] = value;
    }

    drawBoard() {

        let kontext = this._canvas.getContext("2d");
        kontext.clearRect(0,0,400,400);
        kontext.beginPath();
        kontext.strokeStyle = "#606060";
        kontext.lineWidth = 1;

        //cary vodorovne
        for (let i = 0; i < this._cells + 1; i++) {
            kontext.moveTo(0, i * this._cell);
            kontext.lineTo(400, i * this._cell);
        }

        //cary svisle
        for (let j = 0; j < this._cells; j++) {
            kontext.moveTo(j * this._cell, 0);
            kontext.lineTo(j * this._cell, 400);
        }

        kontext.stroke();
        kontext.closePath();

        //kryti bunky
        kontext.fillStyle =  "#C0C0C0";
        for (let i = 0; i < this._cells; i++) {
            for (let j = 0; j < this._cells; j++) {
                if (this._boardCover[i][j]) {
                    this.drawCell(j, i);
                }
            }
        }

    }

    /**
     * Funkce kresli jednu bunku hraci plochy
     * @param posX
     * @param posY
     */
    drawCell(posX, posY) {
        let kontext = this._canvas.getContext("2d")

        kontext.fillStyle =  "#C0C0C0";
        kontext.clearRect(posX * this._cell, posY * this._cell, this._cell, this._cell);
        kontext.fillStyle =  "#C0C0C0";
        kontext.fillRect(posX * this._cell + 1, posY * this._cell + 1 , this._cell - 2, this._cell - 2);

        kontext.beginPath();
        kontext.strokeStyle = "#DBDBDB";
        kontext.moveTo(posX * this._cell, posY * this._cell + this._cell);
        kontext.lineTo(posX  * this._cell, posY * this._cell);
        kontext.lineTo(posX * this._cell + this._cell, posY * this._cell);
        kontext.stroke();
        kontext.closePath();

        kontext.beginPath();
        kontext.moveTo(posX * this._cell + this._cell - 1, posY * this._cell);
        kontext.lineTo(posX * this._cell + this._cell - 1, posY * this._cell + this._cell - 1);
        kontext.lineTo(posX  * this._cell, posY * this._cell + this._cell - 1);

        kontext.strokeStyle = "#606060";
        kontext.stroke();
        kontext.closePath();



    }

}