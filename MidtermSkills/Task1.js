// Task 1

function sumDeepStrictNumbers(arr) {
    let sum = 0;

    function Array1(subArr) {
        for (const item of subArr) {
            if (typeof item === 'number' && Number.isFinite(item)) {
                sum += item;
            } else if (Array.isArray(item)) {
                Array1(item);
            }
        }
    }

    Array1(arr);
    return sum;
}

// Test Code
const testArray1 = [10, ['5', [true, 5]], null, [undefined, [10, NaN]]];
console.log(sumDeepStrictNumbers(testArray1))

// Expected Output: 25