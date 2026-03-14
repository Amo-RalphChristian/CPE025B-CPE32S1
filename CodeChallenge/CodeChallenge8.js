// The base User class needed for inheritance
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
    if (!found) {
      this.addCourse(course, level);
    }
  }
}

// Task 8 Code: Modified ExtendedUser class
class ExtendedUser extends User {
  get fullName() {
    return this.name + " " + this.surname;
  }

  set fullName(fullNameString) {
    let nameParts = fullNameString.split(" ");
    this.name = nameParts[0];
    this.surname = nameParts[1];
  }

  static match(teacher, student, courseName = undefined) {
    let matches = [];
    
    // Find all valid matches where teacher level is equal or greater
    for (let i = 0; i < student.courses.length; i++) {
      for (let j = 0; j < teacher.courses.length; j++) {
        if (student.courses[i].course === teacher.courses[j].course && 
            teacher.courses[j].level >= student.courses[i].level) {
          matches.push({ course: student.courses[i].course, level: student.courses[i].level });
        }
      }
    }

    // If a specific course was requested, return that object or undefined
    if (courseName !== undefined) {
      for (let i = 0; i < matches.length; i++) {
        if (matches[i].course === courseName) {
          return matches[i];
        }
      }
      return undefined;
    }
    
    // Otherwise, return the whole array of matches
    return matches;
  }
}

class Student extends ExtendedUser {
  constructor(data) {
    super({ name: data.name, surname: data.surname, email: data.email, role: 'student' });
  }
}

class Teacher extends ExtendedUser {
  constructor(data) {
    super({ name: data.name, surname: data.surname, email: data.email, role: 'teacher' });
  }
}

// Test code provided in the scenario
let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 4);
teacher1.addCourse('maths', 4);

let match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> [{course: 'maths', level: 2}]

teacher1.editCourse('maths', 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []

teacher1.addCourse('physics', 4);
match = ExtendedUser.match(teacher1, student1, 'physics');
console.log(match); // -> {course: 'physics', level: 4}