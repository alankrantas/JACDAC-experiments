function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  const { accelerometer } = jacdac.sensors;
  const [acceleration = {}] = accelerometer;
  const { x = 0, y = 0, z = 0 } = acceleration;
  
  background(0);
  fill(0);
  stroke(255);
  rotateX(x);
  rotateY(y);
  rotateZ(z);
  box(100, 100, 100);
}
