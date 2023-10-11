import 'normalize.css';
import './styles.css';
import Chessboard from './modules/board.js'
import Display from './modules/UI.js'

const display = new Display;
const board = new Chessboard(8);

const testTravails = () => {
    const start = display.start;
    const finish = display.finish;
    const result = board.pathFind(start, finish);
    console.log(result);
    display.handleTravail(result);
}

const button = document.getElementById("launch-button");

button.addEventListener('click', testTravails);