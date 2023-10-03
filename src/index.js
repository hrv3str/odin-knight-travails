import 'normalize.css';
import './styles.css';
import Moves from './modules/move.js'

const start = [0, 1];
console.log(`Start position is ${start}`);
const target = [4, 6];
console.log(`Target position is ${target}`);
const routes = new Moves(start);
const result = routes.getRoute();
console.log(result);