Function.prototype.inherits = function(parent) {
  function Surrogate() {}
  Surrogate.prototype = parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject () {}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

MovingObject.prototype.iAmAMovingObject = function() {
  console.log("I am a moving object!");
};

ship1 = new Ship(); 
asteroid1 = new Asteroid();
ship1.iAmAMovingObject();
asteroid1.iAmAMovingObject();

Asteroid.prototype.iAmAnAsteroid = function() {
  console.log("I am an asteroid!");
};

// ship1.iAmAnAsteroid();
asteroid1.iAmAnAsteroid();

movingObject1 = new MovingObject();

movingObject1.iAmAMovingObject();
// movingObject1.iAmAnAsteroid();

console.log(ship1 instanceof(MovingObject));
console.log(ship1.prototype instanceof(MovingObject));
console.log(asteroid1.prototype instanceof(MovingObject));





