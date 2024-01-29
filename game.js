class Game {
    // gameScreen, instructionsScreen, gameEndScreen are initially not displayed.
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.instructionsScreen = document.getElementById("instructions-screen");
        this.gameScreen = document.getElementById("game-screen");
        this.gameOverScreen = document.getElementById("game-over");

        // tha base of the player for the future
        this.player = new Player (
            this.gameScreen,
            100,
            100,
            100,
            100,
            "./images/cat" // ---->>> add the cat image
        );

        // game window dimensions
        this.height = 500;
        this.width = 800; // --->>> we need to change the dimensions

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


    }

    start() {
        //Sets the height and width of the game screen.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        //Hides the start screen.
        this.startScreen.style.display = "none";

        // Show the instructions screen
        this.instructionsScreen.style.display = "none"; // ----->>> ask about this

        //Shows the game screen.
        this.gameScreen.style.display = "block";

        //Starts the game loop
        this.gameLoop();

    }

    gameLoop() {
        if (this.gameIsOver) {
          return;
        }
    
        this.update();
    
        window.requestAnimationFrame(() => this.gameLoop());
      }

    update() {
        /* Score, Lives ScoreBoard */
        let score = document.getElementById("score");
        let lives = document.getElementById("lives");
    
        /* Every Frame of the Game check if the cat is moving */
        this.player.move();
}
}