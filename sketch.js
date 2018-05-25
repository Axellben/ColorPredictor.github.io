let r, g, b;
let brain;

let which = "BLACK";

function pickColor() {
  r = random(255);
  g = random(255);
  b = random(255);
  redraw();
}


function setup() {
  createCanvas(600, 400);
  img = loadImage("hedgehog.png");
  brain = new NeuronalNetwork(3, 20, 2);
  pickColor();
  noLoop();
}

function mousePressed() {
  let inputs = [r / 255, g / 2555, b / 255];
  let y;
  if (mouseX > width / 2) {
    y = [0, 1];
  } else {
    y = [1, 0];
  }
  brain.train(inputs, y);

  pickColor();
}

function draw() {
  background(0);
  strokeWeight(4);
  stroke(0);
  line(width / 2, 0, width / 2, height);

  textSize(25);
  fill(255);
  text("Does White or BLACK look better over this color?", 300, 50);

  textSize(55);
  noStroke();
  fill(r, g, b);

  ellipse(width - width / 4, height / 2, 200, 200);
  ellipse(width / 4, height / 2, 200, 200);

  which = colorPredictor(r, g, b);

  textAlign(CENTER, CENTER);
  fill(0);
  text("BLACK", width / 4, 200);
  fill(255);

  text("WHITE", width - width / 4, 200);

  fill(255);
  textSize(15);
  textAlign(CENTER, CENTER);
  if (which === "BLACK") {
    // ellipse(width / 4, height / 4, 60, 60);
    image(img, width / 4 - 50, height / 2 + 100, img.width / 8, img.height / 8);
    text("I think is , BLACK!!!", width / 4, height / 2 + 175);
  } else {
    // ellipse(width - width / 4, height / 4, 60, 60);
    image(img, width - width / 4 - 25, height / 4 + 200, img.width / 8, img.height / 8);
    text("I think is , WHITE!!!", width - width / 4, height / 4 + 275);
  }
}

function colorPredictor(r, g, b) {
  let inputs = [r / 255, g / 2555, b / 255];
  let outputs = brain.predict(inputs);
  console.log(outputs[0]);
  console.log(outputs[1]);
  if (outputs[0] > outputs[1]) {
    return "BLACK";
  } else {
    return "WHITE";
  }

  // if (r + g + b > 300) {
  //   return "black";
  // } else {
  //   return "white";
  // }

}

// function GrabRandomColAndGuess() {
//   // Pick colors randomly
//   r = random(255);
//   g = random(255);
//   b = random(255);
//
//   inputs = [r, g, b];
//   // for guessing
//   outputs = brain.predict(inputs);
//
//   if (outputs[0] > outputs[1]) {
//     which = "black";
//   } else {
//     which = "white";
//   }
// }
//
// function keyPressed() {
//   if (keyCode === RIGHT_ARROW) {
//     GrabRandomColAndGuess();
//     redraw();
//   }
// }