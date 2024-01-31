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

    restartButton.addEventListener("click", function () {
      game.restartGame(); // for the restart button to display the start screen

    });


    function handleKeydown(event) {
      const key = event.key;
      const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
  
      if (possibleKeys.includes(key)) {
        event.preventDefault();
  
        if(game) {
          switch(key) {
            case "ArrowLeft":
              game.player.directionX = - 10;
              break;
            case "ArrowUp":
              if (!game.player.isJumping){
                game.player.directionY = - 30;
                game.player.isJumping = true;
              }
              break;
            case "ArrowRight":
              game.player.directionX = 10;
              break;
            case "ArrowDown":
              game.player.directionY = 10;
              break;
  
          }
        }
  
      }
  
    }
  
    function handleKeyup(event) {
      const key = event.key;
      const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
  
      if (possibleKeys.includes(key)) {
        event.preventDefault();
  
        if(game) {
          switch(key) {
            case "ArrowLeft":
              game.player.directionX = 0;
              break;
            case "ArrowUp":
              game.player.directionY = game.player.gravity;
              break;
            case "ArrowRight":
              game.player.directionX = 0;
              break;
            case "ArrowDown":
              game.player.directionY = 0;
              break;
          }
        }
  
      }
  
    }
  
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

}