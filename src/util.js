export const sleep = (n) => new Promise(r => setTimeout(r, n));

export const img = (path) => `https://ionic-react-demos.s3.amazonaws.com/${path}`;

export const msToTime = (d) => {
  var seconds = Math.floor((d / 1000) % 60),
    minutes = Math.floor((d / (1000 * 60)) % 60);

  return minutes + ":" + (seconds < 10 ? `0${seconds}` : seconds);
}
