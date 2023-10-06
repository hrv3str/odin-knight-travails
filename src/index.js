import 'normalize.css';
import './styles.css';
import Chessboard from './modules/board.js'

const start = [3, 3];
console.log(`Start position is [${start}]`);
const target = [4, 6];
console.log(`Target position is [${target}]`);

const board = new Chessboard(8);

const route = board.pathFind(start, target);

console.group('result');
console.log('Shortest path is:');
console.log(route);
console.groupEnd()