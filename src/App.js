import { useRef, useEffect } from "react";
import "./Components/App.css";
import BulletController from "./Components/BulletController";
import Player from "./Components/Player";
import Enemy from "./Components/Enemy";

const width = 550;
const height = 600;

const rows = 3;
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

const blocks = Array.from({ length: 5 * rows }, (_, n) => {
  const fromLeft = 50 + (n % 5) * 100;
  const fromTop = 20 + Math.floor(n / 5) * 80;
  return new Enemy(
    fromLeft,
    fromTop,
    getRandomColor(),
    Math.floor(Math.random() * 100)
  );
});

function App() {
  const canvasRef = useRef(null);
  let bulletController;
  let player;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    bulletController = new BulletController(canvas);
    player = new Player(550 / 2.2, 600 / 1.3, bulletController, canvas.width);
    const interval = setInterval(() => gameLoop(ctx), 100 / 6);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function gameLoop(ctx) {
    setCommonStyle(ctx);
    bulletController.draw(ctx);
    player.draw(ctx);
    blocks.forEach((enemy) => {
      if (bulletController.collideWith(enemy)) {
        if (enemy.health <= 0) {
          const index = blocks.indexOf(enemy);
          blocks.splice(index, 1);
        }
      } else {
        enemy.draw(ctx);
      }
    });
  }

  function setCommonStyle(ctx) {
    ctx.shadowColor = "#d53";
    ctx.shadowBlur = 20;
    ctx.lineJoin = "bevel";
    ctx.lineWidth = 5;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 550, 600);
  }

  return (
    <div className="app">
      <h1>React Shooting Bullets</h1>
      <span className="controls">
        <div>Move: </div>
        <div>Arrow Keys</div>
        <div>Shoot: </div>
        <div>Space bar</div>
      </span>
      <canvas id="game" className="game" ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
