// Previous classes needed for this system to work
class User {
  constructor(data) {
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.role = data.role;
    this.courses = [];
  }
  addCourse(course, level) {
    this.courses.push({ course: course, level: level });
  }
}

class ExtendedUser extends User {
  static match(teacher, student) {
    let matches = [];
    for (let i = 0; i < student.courses.length; i++) {
      for (let j = 0; j < teacher.courses.length; j++) {
        if (student.courses[i].course === teacher.courses[j].course && 
            teacher.courses[j].level >= student.courses[i].level) {
          matches.push({ course: student.courses[i].course, level: student.courses[i].level });
        }
      }
    }
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

// Task 9 Code: The Tutoring System Class
class Tutoring {
  constructor() {
    this.students = [];
    this.teachers = [];
  }

  getStudentByName(name, surname) {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].name === name && this.students[i].surname === surname) {
        return this.students[i];
      }
    }
    return undefined;
  }

  getTeacherByName(name, surname) {
    for (let i = 0; i < this.teachers.length; i++) {
      if (this.teachers[i].name === name && this.teachers[i].surname === surname) {
        return this.teachers[i];
      }
    }
    return undefined;
  }

  getStudentsForTeacher(teacher) {
    let matchedStudents = [];
    for (let i = 0; i < this.students.length; i++) {
      // If the match array has at least one item, they are a match
      if (ExtendedUser.match(teacher, this.students[i]).length > 0) {
        matchedStudents.push(this.students[i]);
      }
    }
    return matchedStudents;
  }

  getTeacherForStudent(student) {
    let matchedTeachers = [];
    for (let i = 0; i < this.teachers.length; i++) {
      if (ExtendedUser.match(this.teachers[i], student).length > 0) {
        matchedTeachers.push(this.teachers[i]);
      }
    }
    return matchedTeachers;
  }

  addStudent(name, surname, email) {
    this.students.push(new Student({ name: name, surname: surname, email: email }));
  }

  addTeacher(name, surname, email) {
    this.teachers.push(new Teacher({ name: name, surname: surname, email: email }));
  }
}

// Test code provided in the scenario
let tutoring = new Tutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');

let student = tutoring.getStudentByName('Rafael', 'Fife');
student.addCourse('maths', 2);
student.addCourse('physics', 4);

let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');
teacher.addCourse('maths', 4);

let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...

student = tutoring.getStudentByName('Kelly', 'Estes');
students = tutoring.getTeacherForStudent(student);
teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> undefined
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...