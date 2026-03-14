// Modified User class from Task 12 to use name and surname for the test
class User {
  #name;
  #surname;
  #email;

  constructor(name, surname, email) {
    this.name = name;
    this.surname = surname;
    this.email = email;
  }

  get name() { return this.#name; }
  set name(value) {
    if (/^[A-Z][a-zA-Z]*$/.test(value)) this.#name = value;
    else throw new Error("Invalid name format.");
  }

  get surname() { return this.#surname; }
  set surname(value) {
    if (/^[A-Z][a-zA-Z]*$/.test(value)) this.#surname = value;
    else throw new Error("Invalid surname format.");
  }

  get email() { return this.#email; }
  set email(value) {
    if (/^[a-zA-Z]+(\.[a-zA-Z]+)*@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(value)) this.#email = value;
    else throw new Error("Invalid email format.");
  }
}

// Task 13 Code: Users Collection Class
class Users {
  constructor() {
    this.collection = new Map();
  }

  add(name, surname, email) {
    try {
      let newUser = new User(name, surname, email);
      // The map uses the email as the key, and the user object as the value
      this.collection.set(email, newUser);
    } catch (error) {
      console.log(error.message);
    }
  }

  delete(email) {
    this.collection.delete(email);
  }

  get(email) {
    return this.collection.get(email);
  }

  getAll(sortField) {
    // Convert map values to an array so we can sort them
    let usersArray = Array.from(this.collection.values());
    
    return usersArray.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });
  }
}

// Test code provided in the scenario
let users = new Users();
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Mmmm", "Ffff", "eeee@gmail.com");
users.add("Aaaa", "Bbbb", "cccc@gmail.com"); // Replaces the first one due to same email
users.add("Xxxx", "Oooo", "dddd@gmail.com");

console.log(users.get("dddd@gmail.com"));
console.log(users.getAll("name").map(u => u.name));
console.log(users.getAll("surname").map(u => u.surname));
console.log(users.getAll("email").map(u => u.email));