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
        this.gravity = 0;
        this.isJumping = false;
    
        this.gameScreen.appendChild(this.element);
      }
    
      move() {
        this.left += this.directionX;
        this.top += this.directionY;

        // Handling the top part
        if (this.top < 300) {
          this.top = 300;
      }
      else if (this.top >= 300 && this.isJumping){
          this.gravity +=1;
          this.top += this.gravity;
      }

      // Handling the bottom part
      if (this.top > 450 && this.isJumping) {
          this.top = 449;
          this.gravity = 0;
          this.isJumping = false;
      }

      if (this.left + this.width > this.gameScreen.offsetWidth) {
          this.left = this.gameScreen.offsetWidth - this.width;
      } else if (this.left < 0) {
          this.left = 0;
      }

    
        this.updatePosition();
      }
    
      updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
      }

      jump(){
        this.gravity = - 20;
        this.isJumping = true;
      }

      didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
          ) {
            return true;
          } else {
            return false;
          }
        }

}