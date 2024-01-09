import React, { useState, useEffect } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';

const Game = () => {
  const [birdPosition, setBirdPosition] = useState({ x: 100, y: 200 });
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const gravity = setInterval(() => {
      setBirdPosition((prev) => ({ ...prev, y: prev.y + 3 }));
    }, 30);

    const pipeGenerator = setInterval(() => {
      setPipes((prevPipes) => [...prevPipes, { position: 400, height: Math.random() * 150 }]);
    }, 3000);

    return () => {
      clearInterval(gravity);
      clearInterval(pipeGenerator);
    };
  }, []);

  const jump = () => {
    setBirdPosition((prev) => ({ ...prev, y: prev.y - 50 }));
  };

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setPipes((prevPipes) =>
        prevPipes.map((pipe) => ({ ...pipe, position: pipe.position - 5 }))
      );

      const collided = pipes.some(
        (pipe) =>
          birdPosition.x < pipe.position + 50 &&
          birdPosition.x + 50 > pipe.position &&
          (birdPosition.y < pipe.height || birdPosition.y + 50 > 400 - pipe.height)
      );

      if (collided) {
        alert(`Game Over! Your score is ${score}`);
        clearInterval(gameLoop);
      }

      setPipes((prevPipes) => prevPipes.filter((pipe) => pipe.position > -50));

      setScore((prevScore) => prevScore + 1);
    }, 20);

    return () => clearInterval(gameLoop);
  }, [birdPosition, pipes, score]);

  return (
    <div
      style={{
        position: 'relative',
        width: '400px',
        height: '400px',
        border: '1px solid #000',
        overflow: 'hidden',
      }}
      onClick={jump}
    >
      <Bird position={birdPosition} />
      {pipes.map((pipe, index) => (
        <Pipe key={index} position={pipe.position} height={pipe.height} isBottom={index % 2 === 0} />
      ))}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '20px',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

export default Game;
