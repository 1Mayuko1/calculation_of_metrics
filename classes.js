class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

class Student extends Person {
    constructor(name, age, school) {
        super(name, age);
        this.school = school;
    }

    study() {
        console.log(`${this.name} is studying at ${this.school}`);
    }

    sayHello() {
        super.sayHello();
        console.log('I am a student');
    }
}

class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }

    teach() {
        console.log(`${this.name} is teaching ${this.subject}`);
    }

    sayHello() {
        super.sayHello();
        console.log('I am a teacher');
    }
}

class Classroom {
    constructor() {
        this.students = [];
        this.teacher = null;
    }

    addStudent(student) {
        this.students.push(student);
    }

    setTeacher(teacher) {
        this.teacher = teacher;
    }

    conductLesson() {
        if (this.teacher) {
            this.teacher.teach();
        }
        for (const student of this.students) {
            student.study();
        }
    }
}
