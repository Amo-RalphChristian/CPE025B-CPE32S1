//task 6
function firstUniqueChar(s) {
    // Code Here
    let count = {};

    for(let i = 0; i < s.length; i++){
        let char = s[i];

        if (Object.keys(count).includes(char)){
            let amount = count[char]
            count[char] = amount + 1;
        } else {
            count[char] = 1;
        }
    }

    for(char in count){
        if(count[char] === 1){
            return s.indexOf(char);
        }
    }
    return null;
};

// Test Code
console.log(firstUniqueChar('sTreSS'));
console.log(firstUniqueChar('aabbc')); 

// Expected Output: 'T', 'c'