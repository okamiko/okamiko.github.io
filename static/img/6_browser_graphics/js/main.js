function preload() {
  img = loadImage("../assets/img/aran.jpg");
}
function setup() {
  createCanvas(484,250);
  background('#272727');
  x = 1; y = 1;
  xSpeed = ySpeed = 9;
}

function draw() {
  var pix = img.get(x,y); // Fill with color
  fill(pix);
 
  ellipse(x,y,9,9); // Initial ellipse size
  y += ySpeed; //1,10,19,28 etc y=y+ySpeed -8+9

  if (y > height) { // bottom of page
  	ySpeed = -ySpeed; // set -9 back to ySpeed
  	x += 1;
  }

  if (y < 0) { // top of page
  	ySpeed = -ySpeed; //set 9 back to ySpeed
  	x += 5;
  }
  stroke(150); //grey circles
  // console.log(y);
}