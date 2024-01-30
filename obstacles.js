class Obstacle {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
  
      // Random Position
      this.left = 1000;
  
      this.top = 500;
      this.width = 50;
      this.height = 50;
  
      // create the HTML element and create default styling
      this.element = document.createElement("img");
      this.element.src = "./images/coin.png";
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
  
      this.gameScreen.appendChild(this.element);
    }
  
    move() {
      // Move obstacle down
      this.left -= 3;
  
      this.updatePosition();
    }
  
    updatePosition() {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  }