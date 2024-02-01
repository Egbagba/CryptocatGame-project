class Obstacle {
    constructor(gameScreen, coinImg, points) {
      this.gameScreen = gameScreen;
      this. points = points;
  
      // Random Position
      this.left = this.gameScreen.offsetWidth;
  
      this.top = this.randomCoinPosition(200, 500);
      this.width = 60;
      this.height = 60;
  
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

    randomCoinPosition(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

  }
  