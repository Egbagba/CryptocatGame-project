class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        // gameScreen HTML element
        this.gameScreen = gameScreen;
    
        // Position Values
        this.left = left;
        this.top = top;
    
        // Player Dimension Values
        this.width = width;
        this.height = height;
    
        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = "absolute";
    
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    
        this.directionX = 0;
        this.directionY = 0;
    
        this.gameScreen.appendChild(this.element);
      }
    
      move() {
        this.left += this.directionX;
        this.top += this.directionY;
    
        this.updatePosition();
      }
    
      updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
      }

}