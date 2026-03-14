// Simulated email sending function
function sendEmail(from, to, message) {
  // We will just leave this empty as requested to simulate the action
}

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
        break; // Stop looking once we find and remove it
      }
    }
  }

  editCourse(course, level) {
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].course === course) {
        this.courses[i].level = level;
        break; 
      }
    }
  }

  sendMessage(fromUser, message) {
    // Save the message details in the object's local array
    this.messages.push({
      from: fromUser.email,
      to: this.email,
      content: message
    });
    // Trigger the simulated email function
    sendEmail(fromUser.email, this.email, message);
  }

  showMessagesHistory() {
    for (let i = 0; i < this.messages.length; i++) {
      let msg = this.messages[i];
      console.log(msg.from + " -> " + msg.to + ": " + msg.content);
    }
  }
}

// Test code provided in the scenario
let student1 = new User({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com', role: 'student'});
let student2 = new User({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com', role: 'student'});
let teacher1 = new User({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com', role: 'teacher'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 1);
student1.removeCourse('physics');
teacher1.addCourse('biology', 3);
teacher1.editCourse('biology', 4);

console.log(`${student1.name}: ${student1.courses.length} courses`); // -> Rafael: 1 courses
console.log(`${teacher1.name}: ${teacher1.courses.length} courses`); // -> Paula: 1 courses

teacher1.sendMessage(student1, 'test message');
teacher1.sendMessage(student1, 'another message');
teacher1.showMessagesHistory();