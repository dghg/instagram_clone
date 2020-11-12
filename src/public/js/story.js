const STORY_TIMER = 7000;

window.onload = function () {
  setTimeout(() => {
    location.href = '/';
  }, STORY_TIMER);
  const progress = document.getElementsByClassName('progress-bar')[0];
  progress.style.width = '0%';
  let width = 0;
  const interval = setInterval(frame, 50);
  function frame() {
    if (width >= 100) {
      clearInterval(interval);
    } else {
      width += (50 * 100) / STORY_TIMER;
      progress.style.width = width + '%';
    }
  }
};

window.onclick = function () {
  location.href = '/';
};
