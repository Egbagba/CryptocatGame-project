class Obstacle {
    constructor(gameScreen, coinImg, points) {
      this.gameScreen = gameScreen;
      this. points = points;
  
      // Random Position
      this.left = 1000;
  
      this.top = 500;
      this.width = 50;
      this.height = 50;
  
      // create the HTML element and create default styling
      this.element = document.createElement("img");
      this.element.src = coinImg;
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