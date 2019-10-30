import { delimeterMsg, logF, log } from "./utils";

function Person(name: string) {
  this.name = name;
}
Person.prototype.move = function() {
  console.log('I am moving');
}
Person.prototype.sayHello = function() {
  console.log(`Hello, I am ${this.name}`);
}

function simpleDecorator() {
  // @ts-ignore
  const person = new Person('Leon Yalin');
  person.move = () => {
    console.log('before moving..');
    Person.prototype.move.call(this);
  }
  person.move();
}

function advancedDecorator() {
  // build the wrapper object
  function Student(name: string, grade: number) {
    Person.call(this);
    this.grade = grade;
  }

  // use Object.create to create a new object and not assign by reference.
  Student.prototype = Object.create(Person.prototype);
  Student.prototype.move = () => {
    console.log('student move..');
    Person.prototype.move.call(this);
  }

  // @ts-ignore
  const student = new Student('Leon Yalin', 77);
  student.move();

  // another way of decorating a method
  student.walk = () => {console.log('walk')};
  const oldWalk = student.walk;
  student.walk = () => {
    console.log('new walk method..');
    oldWalk();
  }
  student.walk();
}

function decoratorPattern() {
  log('Decorator pattern helps with extending object functionality while keeping existing abilities.');
  simpleDecorator();
  advancedDecorator();
}

function facadePattern() {
  log('Facade pattern helps with simplifying work with the complex system by providing a unified interface.');
  const personFacade = (() => {
    const createAndTestPerson = () => {
      // @ts-ignore
      const person = new Person('Leon Yalin');
      person.move();
      person.sayHello();
      person.walk = () => {console.log('walk')};
      person.walk();
    }
    return {
      createAndTestPerson,
    }
  })();
  personFacade.createAndTestPerson();
}

function flyweightPattern() {
  log('Flyweight pattern helps with saving memory by sharing portions of an object between objects.');
  
}

export default function structuralDesignPatterns() {
  delimeterMsg('STUCTURAL DESIGN PATTERNS');
  logF(decoratorPattern);
  logF(facadePattern);
  logF(flyweightPattern);
}