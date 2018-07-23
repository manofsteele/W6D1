function sumWithArguments() {
  let args = Array.from(arguments);
  sum = args.reduce((accumulator, value) => accumulator + value);
  return sum;
}

// console.log(sumWithArguments(3,4,5,1,2));

function sumWithRest(...args) {
  sum = args.reduce((accumulator, value) => accumulator + value);
  return sum;
}

// console.log(sumWithRest(3,4,5,1,2));


class Cat {
  constructor(name) {
    this.name = name;
  }
  
  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");


Function.prototype.myBindWithArguments = function () {
  let args = Array.from(arguments);
  let obj = args.shift();
  let that = this;
  console.log("Args:",args);
  return function() {
    let otherArgs = Array.from(arguments);
    // console.log("this:", this);
    console.log("OtherArgs:", otherArgs);
    return that.apply(obj, args.concat(otherArgs));
  };
};


let nextBind = () => {
  let args = Array.from(arguments);
  this.apply(obj, args);
};

// markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBindWithArguments(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
markov.says.myBindWithArguments(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBindWithArguments(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
let notMarkovSays = markov.says.myBindWithArguments(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

Function.prototype.myBindWithRest = function(obj, ...args) {
  console.log(args);
  return (...callArgs) => this.apply(obj, args.concat(callArgs));
};


markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBindWithRest(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
markov.says.myBindWithRest(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBindWithRest(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
notMarkovSays = markov.says.myBindWithRest(breakfast);
// notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

console.log(sumThree(4, 20, 6)); // == 30

function curriedSum(numArgs) {
  let numbers = [];
  function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return numbers.reduce((acc, val) => acc + val);
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

const sum4 = curriedSum(4);
console.log(sum4(5)(30)(20)(1)); // => 56


Function.prototype.curryWithApply = function(numArgs) {
  let args = [];
  let that = this;
  function _curryWithApply(arg){
    args.push(arg);
    if (args.length === numArgs) {
      return that.apply(null, args);
    } else {
      return _curryWithApply;
    }
  }
  return _curryWithApply;
};

const sum5 = sumWithArguments.curryWithApply(4);
console.log(sum5(5)(30)(20)(1)); // => 56


Function.prototype.curryWithSpread = function(numArgs) {
  let args = [];
  let that = this;
  function _curryWithSpread(arg){
    args.push(arg);
    if (args.length === numArgs) {
      return that(...args);
    } else {
      return _curryWithSpread;
    }
  }
  return _curryWithSpread;
};

const sum8 = sumWithArguments.curryWithSpread(4);

console.log(sum8(5)(30)(20)(1)); // => 56



