function myDecorator(fn) {
  let history = new Set();
  
  return function(...args) {
    // Convert the arguments array to a string so we can easily save and check it
    let argsString = JSON.stringify(args);
    
    if (history.has(argsString)) {
      console.log("arguments already used: " + args.join(","));
    } else {
      history.add(argsString);
    }
    
    // Call the original function with the arguments and return its result
    return fn(...args);
  };
}

// Test code provided in the scenario
let sum = function(...args) {
    let retVal = 0;
    for(let arg of args) {
        retVal += arg;
    }
    return retVal;
}

let dfn = myDecorator(sum);

dfn(2, 3, 4);
dfn(4, 5);
dfn(2, 3, 4); // -> arguments already used: 2,3,4
dfn(4, 5); // -> arguments already used: 4,5