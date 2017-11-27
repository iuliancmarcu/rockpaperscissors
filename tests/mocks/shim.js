global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

global.localStorage = {
  getItem: () => "",
  setItem: () => ""
};
