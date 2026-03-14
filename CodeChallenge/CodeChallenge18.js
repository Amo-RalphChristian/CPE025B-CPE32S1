function getPromiseArray(arr) {
  let result = [];
  
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    
    let myPromise = new Promise(function(resolve, reject) {
      if (Number.isInteger(item) && item > 0) {
        // If it is a positive integer, wait 'item' milliseconds, then resolve
        setTimeout(function() {
          resolve(item);
        }, item);
      } else {
        // Otherwise, reject immediately with an error
        reject(new Error(item + " is not a positive integer"));
      }
    });
    
    result.push(myPromise);
  }
  
  return result;
}

// Test code provided in the scenario
// Note: You need to recreate the array of promises for the second test 
// because Promise states are final once they settle!

let promises1 = getPromiseArray([10, 30, 5, 20, 'a']);
Promise.all(promises1)
  .then(a => console.log(`all: ${a}`))
  .catch(e => console.log(`all: ${e.message}`)); 
  // -> all: a is not a positive integer

let promises2 = getPromiseArray([10, 30, 5, 20, 'a']);
Promise.any(promises2)
  .then(a => console.log(`any: ${a}`))
  .catch(e => console.log(`any: ${e.message}`)); 
  // -> any: 5