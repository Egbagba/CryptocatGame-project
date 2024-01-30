window.onload = function () {
    const startButton = document.getElementById("start-button");
    const instructionsButton = document.getElementById("instructions-button");
    const backHomeButton = document.getElementById("back-home-button");
    const restartButton = document.getElementById("restart-button");

    let game = new Game();
  
    startButton.addEventListener("click", function () {
      game.startGame();
    });

    instructionsButton.addEventListener("click", function () {
      game.showInstructions();

    });

    backHomeButton.addEventListener("click", function () {
      game.backHome();
    });

}