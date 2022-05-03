// [these things are an empty array]
var cars = [];
var frogPos;
var myState = 0 ;
var maxCars = 5 ;
var maxTimer = 12*60 ;

var timer = maxTimer

function setup() {
  // put setup code here
  createCanvas(800, 800)

//spawn cars
//number of cars
  for (var i = 0; i < maxCars; i++) {
    cars.push(new Car());
  }

  frogPos = createVector(400, height - 100);
  textAlign(CENTER) ;

}

function draw() {
  //state machine in draw loop

switch(myState) {

  case 0: //menu
  background('red')
  fill('white')
  textSize(24) ;
  text("Welcome to my game!! Click to play", width/2, height/2) ;
  break ;

  case 1: // game State
  game() ;

  timer = timer - 1 ;
  if (timer<=0) {
    timer = maxTimer ;
    myState = 3 ;
  }
  break ;

  case 2: //win State
  background('yellow') ;
  text("YAY YOU WON", width/2, height/2) ;
  break ;

  case 3: //lose
  background('purple') ;
  text("ha YOU LOST", width/2, height/2) ;
  break ;

}



}

function mouseReleased() {
  switch(myState) {
    case 0:
    myState = 1 ;
    break ;

    case 2: //won!! respawn cars
    //reset timer
      timer = maxTimer ;
    cars = [] ;
    for (var i = 0; i < maxCars; i++) {
      cars.push(new Car());
    }
    myState = 0 ;
    break ;

    case 3: //boo you lose, respawn cars
    //reset timer
      timer = maxTimer ;
    cars = [] ;
    for (var i = 0; i < maxCars; i++) {
      cars.push(new Car());
    }
    myState = 0
    break ;
  }
}

//this is where the game is
function game() {
  background('lightblue')

  for (var i = 0; i < cars.length; i++) {
    cars[i].display();
    cars[i].drive();
    //distance between car and the frog
    if (cars[i].pos.dist(frogPos) < 50) {
      //splice command
      cars.splice(i, 1);
      //you can put a score here if you DECLARE IT
    }
  }

if (cars.length ==0) {
  myState = 2
}

  // frog
  fill('green')
  ellipse(frogPos.x, frogPos.y, 50, 50);
  checkForKeys();
}

function checkForKeys() {
  if (keyIsDown(LEFT_ARROW)) frogPos.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) frogPos.x += 5;
  if (keyIsDown(UP_ARROW)) frogPos.y -= 5;
  if (keyIsDown(DOWN_ARROW)) frogPos.y += 5;
}

function Car() {
  //attributes
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(random(-5, 5), random(-5, 5));
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);

  //methods
  this.display = function() {
    fill(this.r, this.g, this.b);
    rect(this.pos.x, this.pos.y, 30, 30);


  }
  this.drive = function() {
    this.pos.add(this.vel);
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;

  }

}


// code phrases from video - downers grove and Mrs. Incredible
// code phrase 3 - photography
// code 4 mac n cheese
