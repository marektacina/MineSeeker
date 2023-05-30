import {Game} from "./Game.js";


window.onload = () => {
    let game = new Game();
    let mouseCoordinates = {
        x: 0,
        y: 0
    };
    let canvas = document.getElementById("canvas");

    /***    Obsluha pohybu mysi    ***/
    canvas.onmousemove = function (e) {
        mouseCoordinates.x = e.clientX - canvas.offsetLeft;
        mouseCoordinates.y = e.clientY - canvas.offsetTop;
    };
    /***    Obsluha kliknuti mysi    ***/
    canvas.onclick = () => {
        game.clickedCell(mouseCoordinates);
    };

    canvas.oncontextmenu = (event) => {
        event.preventDefault();
        game.clickedCellRight(mouseCoordinates);
    }

    let flagBtn = document.getElementById("flag-button");

    flagBtn.onclick = () => {
        if (flagBtn.className == "no-pressed") {
            flagBtn.className = "pressed";
            game.flagSwitch = true;
        } else {
            flagBtn.className = "no-pressed";
            game.flagSwitch = false;
        }
    }

    let newGameBtn = document.getElementById('smiles');

    newGameBtn.onmousedown = () => {
        newGameBtn.className = "pressed";
    }

    newGameBtn.onmouseup = () => {
        let flagBtn = document.getElementById("flag-button");
        flagBtn.className = "no-pressed";
        newGameBtn.className = "no-pressed";
        newGameBtn.setAttribute('src', 'pics/smile.png');
        game.flagSwitch = false;
        game.newGame();
    }
}

