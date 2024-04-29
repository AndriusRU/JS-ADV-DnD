import Board from './Board';

const trello = document.querySelector('#trello');
const board = new Board(trello);

board.init();
