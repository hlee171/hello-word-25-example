let balloons = []; // Array to store balloons
let arrows = []; // Array to store arrows
let player; // Player object
let playerSpeed = 5; // Player's movement speed
let score = 0; // Score variable
let attempts = 0; // Variable to store the number of failed attempts
let maxAttempts = 3; // Maximum number of allowed failed attempts

function setup() {
  createCanvas(400, 600);
  player = new Player();
}

function draw() {
  background(220);

  // Add new balloon
  if (frameCount % 100 === 0) {
    let balloon = new Balloon();
    balloons.push(balloon);
  }

  // Update and draw arrows
  for (let i = arrows.length - 1; i >= 0; i--) {
    arrows[i].update();
    arrows[i].show();

    // Check if arrow hits a balloon
    for (let j = balloons.length - 1; j >= 0; j--) {
      if (arrows[i].hits(balloons[j])) {
        balloons.splice(j, 1);
        arrows.splice(i, 1);
        score++; // Arrow hits a balloon, increase the score
        break;
      }
    }
  }

  // Update and draw balloons
  for (let i = balloons.length - 1; i >= 0; i--) {
    balloons[i].update();
    balloons[i].show();

    // Check if balloon goes off the screen
    if (balloons[i].y < -balloons[i].r) {
      balloons.splice(i, 1);
      attempts++; // Balloon goes off the screen, increase the failed attempts
      if (attempts >= maxAttempts) {
        // If the number of failed attempts reaches the maximum allowed, game over
        gameOver();
      }
    }
  }

  // Update and draw the player
  player.update();
  player.show();

  // Display the score and attempts
  fill(0);
  textSize(24);
  text(`Score: ${score}`, 20, 30);
  text(`Attempts: ${attempts}/${maxAttempts}`, 20, 60);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && player.x > 0) {
    player.move(-1);
  } else if (keyCode === RIGHT_ARROW && player.x < width - player.w) {
    player.move(1);
  } else if (key === ' ' && arrows.length < 3) {
    let arrow = new Arrow(player.x + player.w / 2, player.y);
    arrows.push(arrow);
  }
}

function gameOver() {
  // Display game over message
  background(0); // Set the background color to black
  fill(255); // Set the text color to white
  textSize(48); // Set the text size
  textAlign(CENTER, CENTER); // Set text alignment to center
  text("Game Over", width / 2, height / 2); // Display "Game Over" text in the center of the screen
  noLoop(); // Stop calling the draw function to freeze the game
}

class Balloon {
  constructor() {
    this.r = 30; // Radius of the balloon
    this.x = random(this.r, width - this.r); // Random x-coordinate within the canvas width
    this.y = height + this.r; // Start off-screen at the bottom
    this.speed = random(1, 3); // Random speed for the balloon
  }

  update() {
    this.y -= this.speed; // Move the balloon upwards based on its speed
  }

  show() {
    // Draw the balloon body
    noFill();
    stroke(255, 0, 0); // Red balloon outline
    strokeWeight(4);
    ellipse(this.x, this.y, this.r * 2);

    // Draw eyes, nose, and mouth (black)
    let eyeSize = 6;
    let noseSize = 4;
    let mouthSize = 20;

    fill(255, 0, 0); // Color for eyes, nose, and mouth: black
    ellipse(this.x - 10, this.y - 5, eyeSize, eyeSize); // Left eye
    ellipse(this.x + 10, this.y - 5, eyeSize, eyeSize); // Right eye
    ellipse(this.x, this.y + 5, noseSize, noseSize); // Nose
    arc(this.x, this.y + 12, mouthSize, mouthSize, 0, PI); // Mouth

    // Draw devil horns (triangles)
    let hornSize = 8;
    fill(255, 0, 0); // Color for devil horns: red
    triangle(this.x - 10, this.y - 15, this.x - 5, this.y - 20, this.x - 25, this.y - 35); // Left horn
    triangle(this.x + 10, this.y - 15, this.x + 5, this.y - 20, this.x + 25, this.y - 35); // Right horn
  }
}

class Arrow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
  }

  update() {
    this.y -= this.speed; // Move the arrow upwards based on its speed
  }

  show() {
    fill(0, 0, 0); // Black arrow
    rect(this.x, this.y, 4, 20); // Arrow shape (rectangle)
  }

  hits(balloon) {
    let d = dist(this.x, this.y, balloon.x, balloon.y); // Calculate distance between arrow and balloon
    return d < balloon.r; // Return true if the distance is less than the balloon's radius (arrow hits the balloon)
  }
}

class Player {
  constructor() {
    this.w = 60; // Width of the player rectangle
    this.h = 20; // Height of the player rectangle
    this.x = width / 2 - this.w / 2; // Initial x-coordinate at the center of the canvas
    this.y = height - 40; // Initial y-coordinate near the bottom of the canvas
  }

  update() {
    // Automatically move the player (check left and right boundaries)
    this.x += playerSpeed;
    if (this.x < 0 || this.x > width - this.w) {
      playerSpeed *= -1; // Reverse direction
    }
  }

  show() {
    fill(0, 0, 0); // Blue player
    rect(this.x, this.y, this.w, this.h); // Draw the player rectangle
  }

  move(dir) {
    this.x += dir * 10; // Move the player horizontally based on the direction
    this.x = constrain(this.x, 0, width - this.w); // Ensure the player stays within the screen boundaries
  }
}
