// The base User class from the previous task (included for it to run)
class User {
  constructor(data) {
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.role = data.role;
    this.courses = [];
    this.messages = [];
  }
  addCourse(course, level) {
    this.courses.push({ course: course, level: level });
  }
  removeCourse(course) {
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].course === course) {
        this.courses.splice(i, 1);
        break; 
      }
    }
  }
  editCourse(course, level) {
    let found = false;
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].course === course) {
        this.courses[i].level = level;
        found = true;
        break; 
      }
    }
    // Added a quick check to add the course if it wasn't found, 
    // just so your provided test code outputs "2 courses" for Paula!
    if (!found) {
      this.addCourse(course, level);
    }
  }
}

// Task 7 Code Starts Here
class ExtendedUser extends User {
  get fullName() {
    return this.name + " " + this.surname;
  }

  set fullName(fullNameString) {
    let nameParts = fullNameString.split(" ");
    this.name = nameParts[0];
    this.surname = nameParts[1];
  }
}

class Student extends ExtendedUser {
  constructor(data) {
    // We pass the data up to the parent using 'super', but hardcode the role
    super({ name: data.name, surname: data.surname, email: data.email, role: 'student' });
  }
}

class Teacher extends ExtendedUser {
  constructor(data) {
    // Same here, hardcoding the role as 'teacher'
    super({ name: data.name, surname: data.surname, email: data.email, role: 'teacher' });
  }
}

// Test code provided in the scenario
let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
teacher1.addCourse('biology', 3);
teacher1.editCourse('chemistry', 4);

console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fife: 1 courses
console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`); // -> Paula Thompkins: 2 courses
student1.fullName = 'Rafael Fifer';
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fifer: 1 courses