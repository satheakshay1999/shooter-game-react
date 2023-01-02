export default class Player {
    constructor(x, y, bulletController, width) {
      this.x = x;
      this.y = y;
      this.canvasWidth = width;
      this.bulletController = bulletController;
      this.width = 50;
      this.height = 50;
      this.speed = 4;
  
      document.addEventListener("keydown", this.keydown);
      document.addEventListener("keyup", this.keyup);
    }
  
    draw(ctx) {
      this.move();
      ctx.strokeStyle = "yellow";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.width, this.height);
  
      this.shoot();
    }
  
    shoot() {
      if (this.shootPressed) {
        const speed = 5; // speed of bullet
        const delay = 7;
        const damage = 1;
        const bulletX = this.x + this.width / 2; // to fire bullet from middle
        const bulletY = this.y;
        this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
      }
    }
  
    move() {
      if (this.leftPressed && this.x > 10) {
        this.x -= this.speed;
      }
  
      if (this.rightPressed && this.x < this.canvasWidth - 60) {
        this.x += this.speed;
      }
    }
  
    keydown = (e) => {
      if (e.code === "ArrowLeft") {
        this.leftPressed = true;
      }
      if (e.code === "ArrowRight") {
        this.rightPressed = true;
      }
      if (e.code === "Space") {
        this.shootPressed = true;
      }
    };
  
    keyup = (e) => {
      if (e.code === "ArrowLeft") {
        this.leftPressed = false;
      }
      if (e.code === "ArrowRight") {
        this.rightPressed = false;
      }
      if (e.code === "Space") {
        this.shootPressed = false;
      }
    };
  }
  