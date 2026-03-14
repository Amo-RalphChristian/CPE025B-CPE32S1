function deepComp(obj1, obj2) {
  // Check if they are exactly the same value or reference
  if (obj1 === obj2) {
    return true;
  }

  // Check if either is not an object or is null
  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
    return false;
  }

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  // If they have a different number of properties, they aren't equal
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    // If obj2 is missing a key from obj1, they aren't equal
    if (!keys2.includes(key)) {
      return false;
    }

    // Ignore methods
    if (typeof obj1[key] === "function" || typeof obj2[key] === "function") {
      continue; 
    }

    // If both properties are objects, check them recursively
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (!deepComp(obj1[key], obj2[key])) {
        return false;
      }
    } 
    // Otherwise, do a strict comparison of the basic values
    else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

// Given test cases
let a = {x:[1,2,3,4,5], y:0, z: {m:'test', n:false}};
let b = {x:[1,2,3,4,5], y:0, z: {m:'test', n:false}};
let c = {x:[1,2,3,4,5,6], y:0, z: {m:'test', n:false}};
let d = {x:[1,2,3,4], y:0, z: {m:'test', n:false}};
let e = {x:[1,2,3,4,5], y:0, z: {m:'test', n:true}};
let f = {x:[1,2,3,4,5], y:-1, z: {m:'test', n:false}};

console.log(deepComp(a,b)); // -> true
console.log(deepComp(a,c)); // -> false
console.log(deepComp(a,d)); // -> false
console.log(deepComp(a,e)); // -> false
console.log(deepComp(a,f)); // -> false