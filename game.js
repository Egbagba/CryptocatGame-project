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
            100,
            100,
            100,
            "./images/cat.png" // ---->>> add the cat image
        );

        // game window dimensions
        this.height = 643;
        this.width = 1800; // --->>> we need to change the dimensions

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

    }
}