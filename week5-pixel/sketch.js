let red, green, blue, yellow, purple, orange, pink, cyan;
function preload() {
  red = loadImage("images/red.png");
  green = loadImage("images/green.png");
  blue = loadImage("images/blue.png");
  yellow = loadImage("images/yellow.png");
  purple = loadImage("images/purple.png");
  orange = loadImage("images/orange.png");
  pink = loadImage("images/pink.png");
  cyan = loadImage("images/cyan.png");
}

let capture;
let scaleValue = 15;
let videoWidth = 1920;
let videoHeight = 1080;
let appWidth = 700;
let appHeight = 700;

function setup() {
  createCanvas(appWidth, appHeight);
  //  https://p5js.org/examples/dom-video-capture.html
  capture = createCapture(VIDEO);
  capture.size(videoWidth / scaleValue, videoHeight / scaleValue);
  // capture.hide();
  // https://p5js.org/reference/#/p5/pixelDensity
  pixelDensity(1);
  rectMode(CENTER);
  noStroke();
}

function drawRetangles(color, xpos, ypos, pixelSize) {
  fill(color);
  rect(
    xpos,
    ypos,
    pixelSize, // (pixelSize * capture.pixels[offset] + 0) / 255,
    pixelSize // (pixelSize * capture.pixels[offset] + 1) / 255
  );
}

// ...

function drawImages(color, xpos, ypos, imageSize) {
  let distance = dist(xpos, ypos, mouseX, mouseY); // Calculate the distance between the mouse and the image
  let newSize = map(distance, 0, 200, 5, 10); // Adjust image size based on distance (convert size to 10-50 pixels depending on the distance ranging from 0 to 200 pixels)
  
  for (let j = 0; j < 8; j++) {
    if (color > j * 45 && color < (j + 1) * 45) {
      switch (j) {
        case 0:
          image(red, xpos, ypos, newSize, newSize);
          break;
        case 1:
          image(orange, xpos, ypos, newSize, newSize);
          break;
        case 2:
          image(yellow, xpos, ypos, newSize, newSize);
          break;
        case 3:
          image(green, xpos, ypos, newSize, newSize);
          break;
        case 4:
          image(cyan, xpos, ypos, newSize, newSize);
          break;
        case 5:
          image(blue, xpos, ypos, newSize, newSize);
          break;
        case 6:
          image(pink, xpos, ypos, newSize, newSize);
          break;
        case 7:
          image(purple, xpos, ypos, newSize, newSize);
          break;
      }
    }
  }
}

function draw() {
  background(255);
  fill(255);

  translate(width, 0);
  scale(-1, 1);

  capture.loadPixels();

  let pixelSize = 25;
  // ...

  let gridSize = 2;
  for (let captureY = 0; captureY < capture.height; captureY += gridSize) {
    for (let captureX = 0; captureX < capture.width; captureX += gridSize) {
      let offset = (captureY * capture.width + captureX) * 4;
      let xpos = (captureX / capture.width) * appWidth;
      let ypos = (captureY / capture.height) * appHeight;

      let r = capture.pixels[offset];
      let g = capture.pixels[offset + 1];
      let b = capture.pixels[offset + 2];
      let a = capture.pixels[offset + 3];

      let brightness = (r + g + b) / 3;
      let hsbValue = map(brightness, 0, 255, 0, 360);

      drawImages(hsbValue, xpos, ypos, pixelSize * 2);
    }
  }
}
