export class Board {
    get cell() {
        return this._cell;
    }

    private _cells;
    private _cell;
    private _canvas;
    private _boardCover = [];
    private _board = [];
    constructor() {
        this._cells = 18;
        this._canvas = document.getElementById("canvas");
        this._cell = this._canvas.width / (this._cells - 2);

        for (let i = 0; i < this._cells; i++) {
            let lineBoard = [];
            let lineBoardCover = [];
            for (let j = 0; j < this._cells; j++) {
                lineBoard.push(0);
                lineBoardCover.push(1);
            }
            this._board.push(lineBoard);
            this._boardCover.push(lineBoardCover);
        }
        console.log(this._board);
    }

    /**
     * Nastavi kryti bunky
     * @param coordinates
     * @param value
     */
    setCover(posX, posY, value) {
       this._boardCover[posX][posY] = value;
    }

    getCover(posX, posY) {
        return this._boardCover[posX][posY];
    }

    placeMines() {
        for (let i = 0; i < 30; i++) {
            let randomX = Math.ceil(Math.random() * (this._cells - 2));
            let randomY = Math.ceil(Math.random() * (this._cells - 2));
            console.log(randomX + "  " + randomY);

            if (this._board[randomX][randomY] != 9) {
                this._board[randomX][randomY] = 9;
            } else {
                i--;
            }
        }

        for (let i = 1; i < 17; i++) {
            for (let j = 1; j < 17; j++) {
               if (this._board[i][j] != 9) {
                   let pocetMin = 0;
                   for (let a = -1; a <= 1; a++) {
                       for (let b = -1; b <= 1; b++) {
                            if (this._board[i + a][j + b] == 9) {
                                pocetMin++;
                            }
                       }
                   }
                   this._board[i][j] = pocetMin;
               }
            }
        }

    }

    drawBoard() {
        for (let i = 1; i < this._cells - 1; i++) {
            for (let j = 1; j < this._cells - 1; j++) {
                this.drawCell(j, i);
            }
        }

    }

    /**
     * Funkce kresli jednu bunku hraci plochy
     * @param posX
     * @param posY
     * @param flag
     */
    drawCell(posX , posY) {
        let posXDraw = posX - 1;
        let posYDraw = posY - 1;
        let kontext = this._canvas.getContext("2d")
        this._boardCover[posX][posY] = 0;
       // vykresleni plochy na zacatku hry nebo kliknuti pravym (vlajka)
        if (this._boardCover[posX][posY] > 0) {
            kontext.fillStyle = "#C0C0C0";
            kontext.fillRect(posXDraw * this._cell + 1, posYDraw * this._cell + 1, this._cell - 2, this._cell - 2);

            kontext.beginPath();
            kontext.strokeStyle = "#DBDBDB";
            kontext.moveTo(posXDraw * this._cell, posYDraw * this._cell + this._cell);
            kontext.lineTo(posXDraw * this._cell, posYDraw * this._cell);
            kontext.lineTo(posXDraw * this._cell + this._cell, posYDraw * this._cell);
            kontext.stroke();
            kontext.closePath();

            kontext.beginPath();
            kontext.moveTo(posXDraw * this._cell + this._cell - 1, posYDraw * this._cell);
            kontext.lineTo(posXDraw * this._cell + this._cell - 1, posYDraw * this._cell + this._cell - 1);
            kontext.lineTo(posXDraw * this._cell, posYDraw * this._cell + this._cell - 1);

            kontext.strokeStyle = "#606060";
            kontext.stroke();
            kontext.closePath();

            if (this._boardCover[posX][posY] == 2) {

                let image = new Image();
                image.onload = () => {
                    kontext.drawImage(image, posXDraw * this._cell, posYDraw * this._cell);
                }
                image.src = 'pics/flag.png';
            }
        }
        //kliknuti na policko levym
        else if (this._boardCover[posX][posY] == 0) {
            kontext.clearRect(posXDraw * this._cell, posYDraw * this._cell, this._cell, this._cell);
            kontext.strokeStyle = "#C0C0C0";
            kontext.beginPath();
            kontext.moveTo(posXDraw * this._cell, posYDraw * this._cell);
            kontext.lineTo(posXDraw * this._cell + this._cell, posYDraw * this._cell);
            kontext.lineTo(posXDraw * this._cell + this._cell, posYDraw * this._cell + this._cell);
            kontext.lineTo(posXDraw * this._cell, posYDraw * this._cell + this._cell);
            kontext.lineTo(posXDraw * this._cell, posYDraw * this._cell);
            kontext.stroke();
            kontext.closePath();



            if (this._board[posX][posY] > 0) {
                let image = new Image();
                image.onload = () => {
                    kontext.drawImage(image, posXDraw * this._cell + 1, posYDraw * this._cell + 1);
                }

                switch (this._board[posX][posY]) {
                    case 1:
                        image.src = 'pics/1.png';
                        break;
                    case 2:
                        image.src = 'pics/2.png';
                        break;
                    case 3:
                        image.src = 'pics/3.png';
                        break;
                    case 4:
                        image.src = 'pics/4.png';
                        break;
                    case 5:
                        image.src = 'pics/5.png';
                        break;
                    case 6:
                        image.src = 'pics/6.png';
                        break;
                    case 7:
                        image.src = 'pics/7.png';
                        break;
                    case 8:
                        image.src = 'pics/8.png';
                        break;
                    case 9:
                        image.src = 'pics/mine.png';
                        break;

                }
            }

        }

    }

}