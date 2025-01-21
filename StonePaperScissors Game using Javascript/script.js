let userScore = 0;
let comScore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const uscr = document.querySelector("#userScore");
const cscr = document.querySelector("#comScore");

const gencomchoice = () => {
  const optns = ["rock", "paper", "scissors"];
  const rndx = Math.floor(Math.random() * 3);
  return optns[rndx];
};
function winner(userwin) {
  if (userwin) {
    userScore++;
    uscr.innerText = userScore;
    msg.innerText = "You Win!";
    msg.style.backgroundColor = "green";
    msg.style.color = "black";
  } else {
    comScore++;
    cscr.innerText = comScore;
    msg.innerText = "You Lose Computer Wins";
    msg.style.backgroundColor = "red";
    msg.style.color = "black";
  }
}
const playgame = (userchoice, computerchoice) => {
  if (userchoice === computerchoice) {
    msg.innerText = "the game is draw";
    msg.style.backgroundColor = "#ffd710";
    msg.style.color = "black";
  } else {
    let userwin = true;
    if (userchoice === "rock") {
      userwin = computerchoice === "paper" ? false : true;
    } else if (userchoice == "paper") {
      userwin = computerchoice === "scissors" ? false : true;
    } else {
      userwin = computerchoice === "rock" ? false : true;
    }
    winner(userwin);
  }
};
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userchoice = choice.getAttribute("id");
    const computerchoice = gencomchoice();

    playgame(userchoice, computerchoice);
  });
});
