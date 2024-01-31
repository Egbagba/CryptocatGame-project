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
            "./images/cat.png"
        );

        // game window dimensions
        this.height = 643;
        this.width = 1200;

        // Obstacles
        this.obstacles = [];

        // coin images array to randomize the types of coins
        this.coinTypes = ["./images/fida_coin.webp", "./images/near_coin.webp", "./images/sushi_coin.png"];

        // coin points array to define the points or loses of each coin
        this.coinTypePoints = [1, -1, 6];

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

          // If player colide with obstacle
          if (this.player.didCollide(obstacle)) {
            obstacle.element.remove();
    
            this.obstacles.splice(i, 1);
    

            // Get the obstacle points
            // if it is positive add to score and update score
            // if it is negative remove life and update lives


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
                // Calculate a random value between 0 and coinTypes array lenght
                const i = Math.floor(Math.random() * this.coinTypes.length);

                // Create a new Obstacle instance and pass as argument the gameScreen, the coint image and coin point 
                let obstacle = new Obstacle(this.gameScreen, this.coinTypes[i], this.coinTypePoints[i]);
                
                this.obstacles.push(obstacle);
                this.isPushingObstacle = false;
            }, 1000);
        }
        score.innerHTML = this.score;
        lives.innerHTML = this.lives;
    }

    endGame() {
        // Change the gameOver status. If it's true, remember this is going to break the animation loop.
        this.gameOver = true;
    
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

        //Show total score
        let totalScore = document.getElementById("score-game-over");
        totalScore.innerHTML = this.score;

    }

    // when clicking in the restart game button, we go to the start screen
    restartGame() {
        this.gameOver = false;
        // Restart the lives icon and lives lable to original value
        let lifelessArray = document.querySelectorAll('.lifeless');
        lifelessArray.forEach(element => {
            element.src = 'images/lives.png';
            element.classList = 'lives-icon';
        });
        this.lives = 3;
        document.getElementById("lives").innerHTML = this.lives;

        // Restart the score label and variable to original value
        this.score = 0;
        document.getElementById("score").innerHTML = this.score;

        this.gameOverScreen.style.display = "none";
        this.startScreen.style.display = "block";
        this.player.element.remove();
        this.player = new Player (
            this.gameScreen,
            100,
            500, // for the cat to go down
            100,
            100,
            "./images/cat.png" // ---->>> add the cat image
        );
    }

}
