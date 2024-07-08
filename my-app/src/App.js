import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ isXNext, squares, onPlay }) {
  //クリックイベント
  const handleSquareClick = (y, x) => {
    const newSquares = squares.map(row => [...row]);
    // 置いた位置が既に埋まっているか、勝者が存在している場合は何もしない
    if (newSquares[y][x] || calculateWinner(newSquares)) {
      return;
    }
    // ステータスの反映
    newSquares[y][x] = isXNext ? 'X' : 'O';
    onPlay(newSquares);
  };

  // 勝者が存在するか確認
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (isXNext ? 'X' : 'O');
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
  const [isXNext, setIsXNext] = useState(true);

  // ステータス反映
  const handlePlay = (newSquares) => {
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  return (
    <div>
      <Board isXNext={isXNext} squares={squares} onPlay={handlePlay} />
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

function calculateWinner(squares) {
  // TODO: 勝利判定の実装
}
