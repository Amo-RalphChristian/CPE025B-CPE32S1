class MyIterable {
  constructor() {
    this.elements = [];
  }

  add(item) {
    // Only add the item if it does not already exist in the array
    if (!this.has(item)) {
      this.elements.push(item);
    }
  }

  has(item) {
    return this.elements.includes(item);
  }

  del(item) {
    let index = this.elements.indexOf(item);
    if (index !== -1) {
      this.elements.splice(index, 1);
    }
  }

  // A getter makes 'length' act like a property instead of a method
  get length() {
    return this.elements.length;
  }

  // The generator method that makes the object iterable
  *[Symbol.iterator]() {
    for (let i = 0; i < this.elements.length; i++) {
      yield this.elements[i];
    }
  }
}

// Test code provided in the scenario
let iterable = new MyIterable();
iterable.add(2);
iterable.add(5);
iterable.add(3);
iterable.add(2);
iterable.del(3);

console.log(iterable.length); // -> 2
console.log(iterable.has(2)); // -> true
console.log(iterable.has(3)); // -> false
console.log(...iterable); // -> 2 5