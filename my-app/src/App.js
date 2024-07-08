import { useState, useEffect, useMemo } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ nextPlayer, squares, onPlay }) {
  // クリックイベント
  const handleSquareClick = (y, x) => {
    const newSquares = squares.map(row => [...row]);
    // 置いた位置が既に埋まっているか、勝者が存在している場合は何もしない
    if (newSquares[y][x] || calculateWinner(newSquares)) {
      return;
    }
    // ステータスの反映
    newSquares[y][x] = nextPlayer;
    onPlay(newSquares);
  };

  // 勝者が存在するか確認
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + nextPlayer;
  }

  return (
    <div>
      <div className="status">{status}</div>
      {squares.map((row, y) => (
        <div className="board-row" key={`row-${y}`}>
          {row.map((item, x) => (
            <Square key={`item-${y}-${x}`} value={item} onSquareClick={() => handleSquareClick(y, x)} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function GameState() {
  const [squares, setSquares] = useState(Array(3).fill(Array(3).fill(null)));
  const [nextPlayerID, setNextPlayerID] = useState(0);
  const playerArray = useMemo(() => ['X', 'O'], []);
  const [nextPlayer, setNextPlayer] = useState(playerArray[nextPlayerID]);

  // playerIDに応じて、nextPlayerを切り替える
  useEffect(() => {
    setNextPlayer(playerArray[nextPlayerID]);
  }, [nextPlayerID, playerArray]);

  // ステータス反映
  const handlePlay = (newSquares) => {
    setSquares(newSquares);
    setNextPlayerID((nextPlayerID + 1) % playerArray.length); // 次のplayerIDをセット
  };

  return (
    <div>
      <Board nextPlayer={nextPlayer} squares={squares} onPlay={handlePlay} />
      <GenerateArray setSquares={setSquares} />
    </div>
  );
}

function GenerateArray({ setSquares }) {
  const [value, setValue] = useState('');

  const handleClick = () => {
    const size = parseInt(value, 10);
    // 0以下、非数ではない場合に生成する
    if (!isNaN(size) && size > 0) {
      const newSquares = Array(size).fill().map(() => Array(size).fill(null));// 二次元配列
      setSquares(newSquares);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>生成</button>
    </div>
  );
}

//勝利判定
const calculateWinner = (squares) => {
  const size = squares.length;

  // 対角線上が同じ値かどうか
  let isWinning = true;
  let currentPlayer = squares[0][0];
  for (let i = 0; i < size; i++) {
    if (squares[i][i] !== currentPlayer || currentPlayer == null) {
      isWinning = false;
      break;
    }
  }
  if (isWinning) {
    return currentPlayer;
  }

  // 反対側の対角線上が同じ値かどうか
  isWinning = true;
  currentPlayer = squares[0][size - 1];
  for (let i = 0; i < size; i++) {
    if (squares[i][size - i - 1] !== currentPlayer || currentPlayer == null) {
      isWinning = false;
      break;
    }
  }
  if (isWinning) {
    return currentPlayer;
  }

  // 縦か横の値が同じかチェック
for (let row = 0; row < size; row++) {
  // 横のチェック
  isWinning = true;
  currentPlayer = squares[row][0];
  for (let col = 0; col < size; col++) {
    if (squares[row][col] !== currentPlayer || currentPlayer == null) {
      isWinning = false;
      break;
    }
  }
  if (isWinning) {
    return currentPlayer;
  }
  
  // 縦のチェック
  isWinning = true;
  currentPlayer = squares[0][row];
  for (let col = 0; col < size; col++) {
    if (squares[col][row] !== currentPlayer || currentPlayer == null) {
      isWinning = false;
      break;
    }
  }
  if (isWinning) {
    return currentPlayer;
  }
}

  return null;
}

