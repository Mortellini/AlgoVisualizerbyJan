import CookieManager from "./cookie-manager";

const canvasMainColors = {
  "light-mode": {
    primary: "#ffffff",
    secondary: "#000000",
  },
  "dark-mode": {
    primary: "#000000",
    secondary: "#ffffff",
  },
};

const arrayColors = {
    1: "#0000ff", // Comparision: blue
    2: "#ff0000", // Swap: red
    3: "#ff00ff", // Current: purple
    4: "#ff00ff", // Pivot: purple
    5: "#00ff00", // Sorted Correct: green
    6: "#ff0000", // Sorted Wrong: red
}

/**
 * Draws the array as columns on the canvas
 *
 * @param {React.MutableRefObject<null>} canvasRef
 * @param {Number[][2]} array
 */
export const drawArray = (canvasRef, array) => {
  console.log("draw");
  const mainColor =
    canvasMainColors[CookieManager.getCookie("theme")].secondary;
  arrayColors[0] = mainColor;
  const canvas = canvasRef.current;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const barWidth = width / array.length - 1;
  const barHeight = height / array.length;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = canvasMainColors[CookieManager.getCookie("theme")].primary;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = mainColor;
  for (let i = 0; i < array.length; i++) {
    ctx.fillStyle = arrayColors[array[i][1]];
    ctx.fillRect(
      i * (barWidth + 1),
      height - (array[i][0]+1) * barHeight,
      barWidth,
      array[i][0] * barHeight
    );
  }
};

export const resizeCanvas = (canvasRef) => {
  const canvas = canvasRef.current;
  let width = canvas.parentElement.clientWidth - 20;
  let height = canvas.parentElement.clientHeight - 40;
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;
};
