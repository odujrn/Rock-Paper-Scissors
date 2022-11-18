const game = () => {
  let pScore = 0;
  let cScore = 0;
  let tentimeswinner = 10;

  //Start the game
  const startGame = () => {
    const playbtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playbtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.remove("fadeOut");
      console.log("text");
    });
  };

  //play match
  const playmatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    //computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((Option) => {
      Option.addEventListener("click", function () {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        console.log("computerNumber: ", computerNumber);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          playerHand.src = `./images/${this.textContent}.png`;
          computerHand.src = `./images/${computerChoice}.png`;

          //Update Images
          compareHands(this.textContent, computerChoice);
        }, 2000);

        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakecomputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
    gameover(playerScore, computerScore);
  };

  const gameover = (playerScore, computerScore) => {
    if (
      (pScore === 3 && cScore === 0) ||
      (cScore === 3 && pScore === 0) ||
      tentimeswinner === pScore ||
      cScore === tentimeswinner
    ) {
      if (pScore > cScore) {
        alert("Player wins");
        pScore = 0;
        cScore = 0;
      } else if (cScore > pScore) {
        alert("Computer wins");
        pScore = 0;
        cScore = 0;
      }
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;

      // Gameover screen
      setTimeout(() => {
        const gameoverScreen = document.getElementById("match");
        gameoverScreen.style.display = "none";

        const scoreboard = document.getElementById("score");
        scoreboard.style.display = "none";
      }, [500]);

      // startGame()
    }
  };

  const compareHands = (playerChoice, computerChoice) => {
    //update text
    const winner = document.querySelector(".winner");

    //We are checking for a tie
    if (playerChoice === computerChoice) {
      winner.textcontent = "It is a tie";
      return;
    }
    // 3 > 2 > 1
    // rock > scissors > paper
    //check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors" || computerChoice === "paper") {
        pScore++;
        updateScore();
        return;
      }
    }
    //check for paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors" || computerChoice === "rock") {
        cScore++;
        updateScore();
        return;
      }
    }
    //check for scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        cScore++;
        updateScore();
        return;
      } else if (computerChoice === "paper") {
        pScore++;
        updateScore();
        return;
      }
    }
  };

  //Is call all the inner function
  startGame();
  playmatch();
};
//start the game fuction
game();
