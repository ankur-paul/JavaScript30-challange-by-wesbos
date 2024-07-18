// Selectors
const player = document.querySelector(".player");
const playerControls = document.querySelector(".player__controls");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipBtns = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const bntFullScreen = player.querySelector(".btn--full-screen");

let timeout;

// Functions
const togglePlay = function () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updateBtn = function (e) {
  const icon = this.paused ? "►" : "| |";
  toggle.textContent = icon;
};

const skip = function (e) {
  video.currentTime += Number.parseFloat(this.dataset.skip);
};

const handleRangeUpdate = function (e) {
  video[this.name] = this.value;
};

const handleProgress = function (e) {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
};

const scrub = function (e) {
  if (!mouseDown && e.type === "mousemove") return;
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const handleKeyboardEvents = function (e) {
  console.log(e);
  if (e.code == "Space") togglePlay();
  if (e.key === "ArrowLeft")
    video.currentTime += Number.parseFloat(skipBtns[0].dataset.skip);
  if (e.key === "ArrowRight")
    video.currentTime += Number.parseFloat(skipBtns[1].dataset.skip);
  if (e.key === "f" || e.key === "Escape") toggleFullScreen();
};

const toggleFullScreen = function (e) {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    clearTimeout(timeout);
    playerControls.style.opacity = "1";
    player.style.cursor = "default";
    return;
  }
  if (player.requestFullscreen) {
    player.requestFullscreen();
    timeout = setTimeout(() => {
      playerControls.style.opacity = "0";
      player.style.cursor = "none";
    }, 2000);
    // playerControls.style.opacity = "0";
  } else if (player.webkitRequestFullscreen) {
    /* Safari */
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) {
    /* IE11 */
    player.msRequestFullscreen();
  }
};

const handleFullScreen = function (e) {
  if (document.fullscreenElement) {
    console.log("fulls");

    playerControls.style.opacity = "1";
    player.style.cursor = "default";
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      playerControls.style.opacity = "0";
      player.style.cursor = "none";
    }, 3000);
  } else {
    playerControls.style.opacity = "1";
    player.style.cursor = "default";
  }
};

// EventListeners

let mouseDown = false;

video.addEventListener("click", togglePlay);
video.addEventListener("dblclick", toggleFullScreen);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", handleProgress);
player.addEventListener("mousemove", handleFullScreen);
toggle.addEventListener("click", togglePlay);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", scrub);
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));
bntFullScreen.addEventListener("click", toggleFullScreen);
skipBtns.forEach((btn) => btn.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
window.addEventListener("keydown", handleKeyboardEvents);
