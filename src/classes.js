class Person {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }

    get name() {
        return this._name;
    }

    set age(age) {
        this._age = age;
    }

    sayHello() {
        console.log(`Hello, my name is ${this._name}`);
    }
}

class Student extends Person {
    constructor(name, age, school) {
        super(name, age);
        this._school = school;
    }

    study() {
        console.log(`${this._name} is studying at ${this._school}`);
    }

    sayHello() {
        super.sayHello();
        console.log('I am a student');
    }
}

class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this._subject = subject;
    }

    teach() {
        console.log(`${this._name} is teaching ${this._subject}`);
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

const exampleObj = new Student('John', 20, 'Example School');
console.log(exampleObj.name);
exampleObj.age = 21;
console.log(exampleObj.age);
console.log(exampleObj.study());

const exampleObj2 = new Teacher('Jane', 30, 'Example Subject');
console.log(exampleObj2.name);
console.log(exampleObj2.teach());

const exampleObj3 = new Classroom();
exampleObj3.setTeacher(exampleObj2);
exampleObj3.addStudent(exampleObj);
exampleObj3.conductLesson();

let x = 0;
if (exampleObj.age > 20) {
    x = exampleObj.age;
}
console.log({ x });

const obj = {
    method({ name, age }) {
        console.log(`Name: ${name}, Age: ${age}`);
    },
};

obj.method({ name: 'John', age: 20 });

const y = x;
const z = y;
