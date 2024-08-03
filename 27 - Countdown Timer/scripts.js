let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const btns = document.querySelectorAll("[data-time]");

const timer = function (seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeleft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeleft(secondsLeft);
  }, 1000);
};

const displayTimeleft = function (seconds) {
  console.log(seconds);
  const minutes = Math.floor(seconds / 60);
  const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  const remainderSeconds = seconds % 60;
  //   prettier-ignore
  const displaySeconds = seconds < 10 ? "0" + remainderSeconds : remainderSeconds;
  timerDisplay.textContent = `${displayMinutes} : ${displaySeconds}`;
  document.title = timerDisplay.textContent;
};

const displayEndTime = function (timeStamp) {
  const end = new Date(timeStamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();

  endTime.textContent = `Be Back At ${hours > 12 ? hours - 12 : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};

const startTimer = function () {
  const seconds = Number.parseInt(this.dataset.time);
  timer(seconds);
};
btns.forEach((btn) => btn.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
});
