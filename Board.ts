export class Board {
    get cell() {
        return this._cell;
    }

    private _cells;
    private _cell;
    private _canvas;
    private _boardCover = [];
    private _board = [];
    private _placedMines;
    private _minesLeft;
    constructor() {
        this._cells = 18;
        this._placedMines = 40;
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

    }

    get minesLeft() {
        return this._minesLeft;
    }

    resetBoard() {
        for (let i = 0; i < this._cells; i++) {
            for (let j = 0; j < this._cells; j++) {
                this._board[i][j] = 0;
                this._boardCover[i][j] = 1;
            }
        }
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
        for (let i = 0; i < this._placedMines; i++) {
            let randomX = Math.ceil(Math.random() * (this._cells - 2));
            let randomY = Math.ceil(Math.random() * (this._cells - 2));

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
        this._minesLeft = this._placedMines;
        this.setMinesLeft(this._minesLeft);
    }

    upMinesLeft() {
        this.setMinesLeft(this._minesLeft + 1);
    }

    downMinesLeft() {
        return this.setMinesLeft(this._minesLeft - 1);
    }

    setMinesLeft(minesLeft) {
        this._minesLeft = minesLeft;
        let minesAmount = document.getElementById('mines-amount');
        minesLeft > 9 ? minesAmount.innerText = `0${minesLeft}` :  minesAmount.innerText = `00${minesLeft}`;

        if (this._minesLeft == 0) {
            let guessed = 0;
            for (let i = 1; i < 17; i++) {
                for (let j = 1; j < 17; j++) {
                    if (this._board[i][j] == 9 && this._boardCover[i][j] == 2) {
                        guessed += 1;
                    }
                }
            }
            if (guessed == this._placedMines) {
                return false;
            }
        }
        return true;
    }

    checkUncovered(posX, posY) {
        if (this._board[posX][posY] == 0) {
            for (let a = -1; a <= 1; a++) {
                let posunX = posX + a;
                for (let b = -1; b <= 1; b++) {
                    let posunY = posY + b;
                    if ((posunX > 0) && (posunY > 0) && (posunX < this._cells - 1) && (posunY < this._cells - 1)) {
                        if (this._boardCover[posunX][posunY] == 1) {
                            if (this._board[posunX][posunY] != 9) {
                                this._boardCover[posunX][posunY] = 0;
                            }

                            this.drawCell(posunX, posunY);
                            this.checkUncovered(posunX, posunY);
                            // if (((a == 0) && (b == -1)) || ((a == 0) && (b == 1)) || ((a == -1) && (b == 0)) || ((a == 1) && (b == 0))) {
                            //
                            // }
                        }
                    }

                }
            }
        } else if (this._board[posX][posY] == 9) {
            this._board[posX][posY] = 11;
            this.drawCell(posX, posY);
            for (let i = 1; i < 17; i++) {
                for (let j = 1; j < 17; j++) {
                    if (this._board[i][j] == 9) {
                        this._boardCover[i][j] = 0;
                        this.drawCell(i, j);
                    }
                    // if (this._board[i][j] == 9 && this._boardCover[i][j] != 2) {
                    //     this._boardCover[i][j] = 0;
                    // } else if (this._board[i][j] != 9 && this._boardCover[i][j] == 2) {
                    //     this._boardCover[i][j] = 1;
                    // }
                    // this.drawCell(i, j);
                }
            }
            let newGameBtn = document.getElementById('smiles');
            newGameBtn.setAttribute('src', 'pics/cry.png');
            return false;
        }
        return true;
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
        //this._boardCover[posX][posY] = 0;
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
                    case 11:
                        image.src = 'pics/mine_exploded.png';

                }
            }

        }

    }

}