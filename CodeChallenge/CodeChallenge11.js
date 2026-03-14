class User {
  // Declare private properties using the # symbol
  #firstName;
  #lastName;
  #email;

  constructor(firstName, lastName, email) {
    // Calling the setters to apply the validation right away
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  get firstName() {
    return this.#firstName;
  }

  set firstName(value) {
    let nameRegex = /^[A-Z][a-zA-Z]*$/;
    if (nameRegex.test(value)) {
      this.#firstName = value;
    } else {
      throw new Error("Invalid first name format. Must start with a capital letter and contain only letters.");
    }
  }

  get lastName() {
    return this.#lastName;
  }

  set lastName(value) {
    let nameRegex = /^[A-Z][a-zA-Z]*$/;
    if (nameRegex.test(value)) {
      this.#lastName = value;
    } else {
      throw new Error("Invalid last name format. Must start with a capital letter and contain only letters.");
    }
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    // Regex for letters and dots, an @ symbol, and a domain with at least one dot
    let emailRegex = /^[a-zA-Z]+(\.[a-zA-Z]+)*@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
    if (emailRegex.test(value)) {
      this.#email = value;
    } else {
      throw new Error("Invalid email format. Only letters and dots are allowed.");
    }
  }
}

// Test code provided in the scenario
try {
  let user1 = new User('Aaaa', 'Bbbb', 'Aaaa@gmail.com');
  console.log(user1);
  
  let user2 = new User('aaaa', 'Bbbb', 'Aaaa@gmail.com'); // -> Error
  console.log(user2);
} catch(err) {
  console.log(err.message);
}