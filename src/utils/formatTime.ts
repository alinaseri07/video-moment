const formatTime = (seconds: number): string => {
  const pad = (num: number, size: number): string =>
    ("000" + num).slice(size * -1);
  const time = Math.floor(seconds);
  const minutes = Math.floor(time / 60) % 60;
  const secondsLeft = time % 60;

  return pad(minutes, 2) + ":" + pad(secondsLeft, 2);
};

export default formatTime;
