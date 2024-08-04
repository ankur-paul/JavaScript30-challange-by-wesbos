"use strict";

let SecretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess);

  if (score > 1) {
    // When there is no input
    if (!guess) {
      displayMessage("🚫 No Number");
    }

    // When player wins
    else if (guess === SecretNumber) {
      displayMessage("👌 You got it !");
      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = "30rem";
      document.querySelector(".number").textContent = SecretNumber;

      // Highscore
      let highscore = document.querySelector(".highscore").textContent;

      if (score > highscore) {
        highscore = score;
        document.querySelector(".highscore").textContent = highscore;
      }
    }

    // Wrong guess
    else if (guess != SecretNumber) {
      displayMessage(
        guess > SecretNumber
          ? `📈 Not ${guess}, Try Smaller Number...`
          : `📉 Not ${guess}, Try higher number...`
      );

      score--;
      document.querySelector(".score").textContent = score;
      document.querySelector(".guess").value = "";
    }
  }

  // When player loses
  else {
    displayMessage("😞 You lost it...");
    document.querySelector(".score").textContent = 0;
    document.querySelector("body").style.backgroundColor = "red";
    document.querySelector(".number").textContent = SecretNumber;
  }
});

// Working of Again Button
document.querySelector(".again").addEventListener("click", function () {
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  SecretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector(".score").textContent = score;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".guess").value = " ";
});
