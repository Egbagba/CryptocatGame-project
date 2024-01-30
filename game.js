class Game {
    // gameScreen, instructionsScreen, gameEndScreen are initially not displayed.
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.instructionsScreen = document.getElementById("instructions-screen");
        this.instructionsScreen.style.display = "none";
        this.gameScreen = document.getElementById("game-screen");
        this.gameScreen.style.display = "none";
        this.gameOverScreen = document.getElementById("game-over");
        this.gameOverScreen.style.display = "none";

        // tha base of the player for the future
        this.player = new Player (
            this.gameScreen,
            100,
            500, // for the cat to go down
            100,
            100,
            "./images/cat.png" // ---->>> add the cat image
        );

        // game window dimensions
        this.height = 643;
        this.width = 1200; // --->>> we need to change the dimensions

        // Obstacles
        this.obstacles = [];

        // Score
        this.score = 0;

        // Lives
        this.lives = 3;

        // Variable to Check if we are in the Process of creating an obstacle ---->>>> Ask about this
        this.isPushingObstacle = false;

        // Variable to check if the game is over
        this.gameOver = false;

        this.sountrack = null;
    }

    showInstructions() {
        this.startScreen.style.display = "none";
        this.instructionsScreen.style.display = "block";
    }

    backHome() {
        this.instructionsScreen.style.display = "none";
        this.startScreen.style.display = "block";
    }

    /**
     * Trigger when start game button is clicked
     */
    startGame() {
        //Sets the height and width of the game screen.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        //Hides the start screen.
        this.startScreen.style.display = "none";
        
        //Shows the game screen.
        this.gameScreen.style.display = "block";

        // Add soundtrack
        this.soundtrack = document.getElementById("soundtrack");
        this.soundtrack.play();

        this.gameLoop();

    }

    gameLoop() {
        if (this.gameOver) {
            return;
        }

        this.update();

        window.requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        /* Score, Lives ScoreBoard */
        let score = document.getElementById("score");
        let lives = document.getElementById("lives");
    
        /* Every Frame of the Game, I want to check if the cat is moving */
        this.player.move();
    
        // Iterate over the obstacles array and make them move
        for (let i = 0; i < this.obstacles.length; i++) {
          const obstacle = this.obstacles[i];
          obstacle.move();
    
          if (this.player.didCollide(obstacle)) {
            obstacle.element.remove();
    
            this.obstacles.splice(i, 1);
    
            this.lives--;

            // update images of lives: remove life-img & add lifeless-img
            document.querySelector('.lives-icon').className = 'lifeless';
            let lifelessArray = document.querySelectorAll('.lifeless');
            lifelessArray.forEach(element => {
            element.src = 'images/lifeless.png';
          });
            

          } else if (obstacle.left < 0 ) {
            this.score++;
    
            // Remove the Obstacle HTML Element from the HTML.
            obstacle.element.remove();
    
            // Remove the Obstacle from the Game Class'obstacles array.
            this.obstacles.splice(i, 1);
          }
        }

        // When lives go 0 the game is over
        if (this.lives === 0) {
            this.endGame();
        }

            // If there are no obstacles, push a new one after 1second and half.
            if (!this.obstacles.length && !this.isPushingObstacle) {
            this.isPushingObstacle = true;
            setTimeout(() => {
            this.obstacles.push(new Obstacle(this.gameScreen));
            this.isPushingObstacle = false;
        }, 1500);
      }
      
      score.innerHTML = this.score;
      lives.innerHTML = this.lives;
    }

    endGame() {
        // Change the gameOver status. If it's true, remember this is going to break the animation loop.
        this.gameOver = true;
    
        // Remove my player
        this.player.element.remove();
    
        // Remove all obstacles
        this.obstacles.forEach((obstacle, index) => {
            // Remove the obstacle from JS
            this.obstacles.splice(index, 1);
            // Remove the obstacle from HTML
            obstacle.element.remove();
        });
    
        // Hide the current game screen
        this.gameScreen.style.display = "none";
    
        // In order, to display the Game end screen
        this.gameOverScreen.style.display = "block";

    }

    // when clicking in the restart game button, we go to the start screen
    restartGame() {
        this.gameOverScreen.style.display = "none";
        this.startScreen.style.display = "block";
    }

}
