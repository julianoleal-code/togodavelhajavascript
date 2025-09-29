const readline = require('readline-sync');

let board = Array(9).fill(null);
let player = 'X';
let score = { X: 0, O: 0 };

const positions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function printBoard() {
  console.clear();
  console.log(`\nJogo da Velha - Terminal\n`);
  console.log(`Placar: X = ${score.X} | O = ${score.O}\n`);
  console.log(
    board
      .map((val, i) => val || i + 1)
      .map((val, i) => (i % 3 === 2 ? `${val}\n` : `${val} | `))
      .join('')
  );
  console.log(`\nVez do jogador: ${player}`);
}

function checkWinner() {
  for (let pos of positions) {
    const [a, b, c] = pos;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function isDraw() {
  return board.every((cell) => cell !== null);
}

function playGame() {
  while (true) {
    printBoard();
    const move = readline.questionInt(`Escolha uma posicao de 1 a 9): `) - 1;

    if (move < 0 || move > 8 || board[move]) {
      console.log(`Posição inválida. Tente novamente.`);
      continue;
    }

    board[move] = player;
    const winner = checkWinner();

    if (winner) {
      score[winner]++;
      printBoard();
      console.log(`\n Jogador '${winner}' venceu!\n`);
      break;
    }

    if (isDraw()) {
      printBoard();
      console.log(`\n Empate!\n`);
      break;
    }

    player = player === 'X' ? 'O' : 'X';
  }

  const again = readline.question(`Deseja jogar novamente? (s/n): `);
  if (again.toLowerCase() === 's') {
    board = Array(9).fill(null);
    player = 'X';
    playGame();
  } else {
    console.log(`\n Obrigado por jogar! Até a próxima!\n`);
  }
}

playGame();