// A simplified version of previous classes needed to run the test
function sendEmail(from, to, message) {}

class User {
  constructor(data) {
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.role = data.role;
    this.messages = [];
  }
  
  sendMessage(fromUser, message) {
    this.messages.push({
      from: fromUser.email,
      to: this.email,
      content: message
    });
    sendEmail(fromUser.email, this.email, message);
  }

  showMessagesHistory() {
    for (let i = 0; i < this.messages.length; i++) {
      let msg = this.messages[i];
      console.log(msg.from + " -> " + msg.to + ": " + msg.content);
    }
  }
}

class ExtendedUser extends User {}

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

class Tutoring {
  constructor() {
    this.students = [];
    this.teachers = [];
  }
  addStudent(name, surname, email) {
    this.students.push(new Student({ name: name, surname: surname, email: email }));
  }
  addTeacher(name, surname, email) {
    this.teachers.push(new Teacher({ name: name, surname: surname, email: email }));
  }
  getStudentByName(name, surname) {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].name === name && this.students[i].surname === surname) return this.students[i];
    }
  }
  getTeacherByName(name, surname) {
    for (let i = 0; i < this.teachers.length; i++) {
      if (this.teachers[i].name === name && this.teachers[i].surname === surname) return this.teachers[i];
    }
  }
}

// Task 10 Code: ExtendedTutoring Class
class ExtendedTutoring extends Tutoring {
  sendMessages(from, toArray, message) {
    for (let i = 0; i < toArray.length; i++) {
      // Call the recipient's sendMessage method, passing the sender (from)
      toArray[i].sendMessage(from, message);
    }
  }
}

// Test code provided in the scenario
let tutoring = new ExtendedTutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');

let to = [];
to.push(tutoring.getStudentByName('Rafael', 'Fife'));
to.push(tutoring.getStudentByName('Kelly', 'Estes'));

tutoring.sendMessages(tutoring.getTeacherByName('Paula', 'Thompkins'), to, 'test message');

for(let user of to) {
    user.showMessagesHistory();
}