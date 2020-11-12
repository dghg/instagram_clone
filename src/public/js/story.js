var STORY_TIMER = 7000;

window.onload = function (e) {
  setTimeout(() => {
    location.href = '/';
  }, STORY_TIMER);
};

window.onclick = function (e) {
  location.href = `/`;
};
