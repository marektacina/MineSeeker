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
    canvas.onclick = function () {
        game.clickedCell(mouseCoordinates);
    };
}

