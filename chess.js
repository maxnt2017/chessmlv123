const boardElement = document.getElementById("chessboard");
const messageElement = document.getElementById("message");
const gameStatusElement = document.getElementById("game-status");

const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

let board = JSON.parse(JSON.stringify(initialBoard));
let selectedPiece = null;
let selectedPosition = null;
let turn = "white";

function createBoard() {
  boardElement.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((row + col) % 2 === 0 ? "white" : "black");
      square.dataset.row = row;
      square.dataset.col = col;
      square.dataset.piece = board[row][col];
      square.addEventListener("click", handleSquareClick);
      boardElement.appendChild(square);
    }
  }
}

function handleSquareClick(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  if (selectedPiece) {
    if (isValidMove(selectedPosition, { row, col })) {
      movePiece(selectedPosition, { row, col });
      if (isCheckmate()) {
        messageElement.textContent = `${turn} програли! Мат!`;
        return;
      }
      if (isCheck()) {
        messageElement.textContent = `${turn} під шахом!`;
      }
      turn = turn === "white" ? "black" : "white";
      gameStatusElement.textContent = `Хід: ${turn === "white" ? "білих" : "чорних"}`;
      selectedPiece = null;
      selectedPosition = null;
    } else {
      messageElement.textContent = "Недопустимий хід!";
    }
  } else {
    if (board[row][col] && isPlayerPiece(board[row][col])) {
      selectedPiece = board[row][col];
      selectedPosition = { row, col };
      highlightValidMoves(selectedPiece, selectedPosition);
    } else {
      messageElement.textContent = "Виберіть правильну фігуру!";
    }
  }

  createBoard();
}

function isValidMove(from, to) {
  // Реалізувати логіку для кожної фігури
  return true; // Спрощено для прикладу
}

function isCheck() {
  // Логіка для перевірки шаху
  return false;
}

function isCheckmate() {
  // Логіка для перевірки мату
  return false;
}

function isPlayerPiece(piece) {
  return (turn === "white" && piece === piece.toUpperCase()) ||
         (turn === "black" && piece === piece.toLowerCase());
}

function movePiece(from, to) {
  board[to.row][to.col] = board[from.row][from.col];
  board[from.row][from.col] = "";
}

function highlightValidMoves(piece, position) {
  // Додати підсвітку для можливих ходів
}

createBoard();
