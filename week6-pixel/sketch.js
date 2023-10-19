class ImageEntity {
  constructor(image, colorRangeStart, colorRangeEnd) {
    this.image = image;
    this.colorRangeStart = colorRangeStart;
    this.colorRangeEnd = colorRangeEnd;
  }

  display(x, y, size) {
    image(this.image, x, y, size, size);
  }

  isInColorRange(color) {
    return color >= this.colorRangeStart && color < this.colorRangeEnd;
  }
}

let images = [];

function preload() {
  images.push(new ImageEntity(loadImage("images/red.png"), 0, 45));
  images.push(new ImageEntity(loadImage("images/orange.png"), 45, 90));
  images.push(new ImageEntity(loadImage("images/yellow.png"), 90, 135));
  images.push(new ImageEntity(loadImage("images/green.png"), 135, 180));
  images.push(new ImageEntity(loadImage("images/cyan.png"), 180, 225));
  images.push(new ImageEntity(loadImage("images/blue.png"), 225, 270));
  images.push(new ImageEntity(loadImage("images/pink.png"), 270, 315));
  images.push(new ImageEntity(loadImage("images/purple.png"), 315, 360));
}

let capture;
let scaleValue = 15;
let videoWidth = 1920;
let videoHeight = 1080;
let appWidth = 700;
let appHeight = 700;

function setup() {
  createCanvas(appWidth, appHeight);
  capture = createCapture(VIDEO);
  capture.size(videoWidth / scaleValue, videoHeight / scaleValue);
  pixelDensity(1);
  rectMode(CENTER);
  noStroke();
}

function drawImages(color, xpos, ypos, imageSize) {
  let distance = dist(xpos, ypos, mouseX, mouseY);
  let newSize = map(distance, 0, 200, 5, 10);

  for (let i = 0; i < images.length; i++) {
    let imageEntity = images[i];
    if (imageEntity.isInColorRange(color)) {
      imageEntity.display(xpos, ypos, newSize);
      break;
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
