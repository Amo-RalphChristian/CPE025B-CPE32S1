const memo = {};
function power(base, exp) {
    // Code Here
    const key = 
    "" + base + "," + exp;
    if (memo[key] !== undefined) {
        return memo[key];
    }
}

// Test Code
console.log(power(2, 5));
console.log(power(2, -2));

// Expected Output: 32, 0.25