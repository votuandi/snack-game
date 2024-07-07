// src/App.tsx
import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

type Position = {
  x: number;
  y: number;
};

const getRandomPosition = (
  width: number,
  height: number,
  snake: Position[]
): Position => {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  } while (
    snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    )
  );
  return position;
};

const App: React.FC = () => {
  const [width, setWidth] = useState<number>(20);
  const [height, setHeight] = useState<number>(20);
  const [snake, setSnake] = useState<Position[]>([]);
  const [direction, setDirection] = useState<Position>({ x: 0, y: 1 });
  const [bait, setBait] = useState<Position | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highest, setHightest] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1000);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!gameStarted) return;

      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    },
    [direction, gameStarted]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      };

      // Check if snake hits the wall
      if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
        setGameOver(true);
        setGameStarted(false);
        if (score > highest) {
          alert("You got new highest score");
          setHightest(score);
        } else alert("You lose");
        return;
      }

      // Check if snake hits itself
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        if (score > highest) {
          alert("You got new highest score");
          setHightest(score);
        } else alert("You lose");
        setGameStarted(false);
        return;
      }

      newSnake.unshift(head);

      // Check if snake gets the bait
      if (bait && head.x === bait.x && head.y === bait.y) {
        setBait(getRandomPosition(width, height, newSnake));
        setScore((sc) => sc + 1);
        // Remove these comment symbols if you want the game to be more interesting
        // setSpeed((sp) =>
        //   sp * (0.9 + 0.1 / (score < 1 ? 1 : score)) <= 60
        //     ? 60
        //     : sp * (0.9 + 0.1 / (score < 1 ? 1 : score))
        // );
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);

      // Check if there's no more space
      if (newSnake.length === width * height) {
        alert("You win");
        setGameOver(true);
        setGameStarted(false);
      }

      console.log(newSnake);
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, bait, width, height, gameOver, gameStarted]);

  const startGame = () => {
    setScore(0);
    setSpeed(1000);
    setSnake(
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ].reverse()
    );
    setDirection({ x: 0, y: 1 });
    setBait(
      getRandomPosition(width, height, [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ])
    );
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div className="App">
      <h1>Snake Game</h1>
      <div className="info">
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value) || 10)}
            disabled={gameStarted}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value) || 10)}
            disabled={gameStarted}
          />
        </label>
        <label>
          Score:
          <span className="score">{score}</span>
        </label>
        <label>
          Heighest:
          <span className="score highest">{highest}</span>
        </label>
      </div>
      <button onClick={startGame} disabled={gameStarted}>
        Start Game
      </button>
      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${width}, 20px)` }}
      >
        {Array.from({ length: width * height }).map((_, i) => {
          const x = i % width;
          const y = Math.floor(i / width);
          const isSnake = snake.some(
            (segment) => segment.x === x && segment.y === y
          );
          const isBait = bait && bait.x === x && bait.y === y;
          return (
            <div
              key={i}
              className={`cell ${isSnake ? "snake" : ""} ${
                isBait ? "bait" : ""
              }`}
            ></div>
          );
        })}
      </div>
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
};

export default App;
