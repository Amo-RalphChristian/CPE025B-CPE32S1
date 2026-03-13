// task 3
function composePipeline(fns) {
    // Code Here
    return function (input) {
        return fns.reduce((acc, fn) => fn(acc), input);
    }
}

// Test Code
const add2 = x => x + 2;
const sqr = x => x * x;
const half = x => x / 2;
const pipeline = composePipeline([add2, sqr, half]);
console.log(pipeline(4));

// Expected Output: 18
