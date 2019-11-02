import { delimeterMsg, logF, log } from "./utils";
import { threadId } from "worker_threads";

function Person(name: string) {
  this.name = name;
}
Person.prototype.move = function () {
  console.log('I am moving');
}
Person.prototype.sayHello = function () {
  console.log(`Hello, I am ${this.name}`);
}
Person.prototype.sayHelloTo = function (toName: string) {
  console.log(`Hello ${toName}, I am ${this.name}`);
}

function ObserversList() {
  this.observersList = [];
}
ObserversList.prototype.add = function (observer: any) {
  this.observersList.push(observer);
}
ObserversList.prototype.get = function (index: number) {
  this.observersList[index];
}
ObserversList.prototype.indexOf = function (observer: any) {
  this.observersList.indexOf(observer);
}
ObserversList.prototype.remove = function (observer: any) {
  const index = this.observersList.indexOf(observer);
  if (index > -1) {
    this.observersList.splice(index, 1);
  }
}
ObserversList.prototype.notify = function (context: any) {
  this.observersList.forEach((observer: any) => observer(context));
}

class Logger {
  log(msg: any) {
    console.log('== Logger ==', msg);
  }
}

function createObservablePerson() {
  function ObservablePerson(name: string) {
    Person.call(this, name);
    // @ts-ignore
    this.observers = new ObserversList();
  }
  ObservablePerson.prototype = Object.create(Person.prototype);
  ObservablePerson.prototype.addObserver = function (observer: any) {
    this.observers.add(observer);
  }
  ObservablePerson.prototype.notifyObservers = function () {
    this.observers.notify(this);
  }
  ObservablePerson.prototype.move = function () {
    Person.prototype.move.call(this);
    this.notifyObservers();
  }
  ObservablePerson.prototype.removeObserver = function (observer: any) {
    this.observers.remove(observer);
  }


  // @ts-ignore
  const obsPerson = new ObservablePerson('Leon Yalin');
  const logger = new Logger();

  obsPerson.addObserver(logger.log);
  obsPerson.addObserver((context: any) => {
    console.log('Works with anonimous function too :)', context);
  });

  obsPerson.move(); // should notify observers
  obsPerson.removeObserver(logger.log);
  obsPerson.move();
}

function createMediator() {
  class Mediator {
    private channels: { [key: string]: Function[] } = {};

    publish(channel: string, data: any) {
      if (!this.channels[channel]) return;
      this.channels[channel].forEach(fn => fn(data));
    }

    subscribe(channel: string, callback: Function) {
      if (!this.channels[channel]) {
        this.channels[channel] = [];
      }
      this.channels[channel].push(callback);
    }
  }

  const mediator = new Mediator();
  mediator.subscribe('hello', (data: any) => {
    console.log('Mediator subscribe callback', data);
  });
  mediator.publish('hello', { foo: 'bar' });
}

function createCommand() {
  class Command {
    private persons: any = [];
    private state: any = [];

    private add(person: any) {
      console.log('Executing "add" command');
      
      this.persons.push(person);
    }

    private savePersons() {
      console.log('Executing "savePersons" command');
    }

    private sayHelloTo(name: string) {
      console.log('Executing "sayHelloTo" command');
      this.persons.forEach((person: any) => person.sayHelloTo(name));
    }

    execute(name: string, ...args: any[]) {
      if (!this[name]) {
        console.log('Invalid command name..');
        return;
      }

      this.state.push({ name, args });
      this[name].apply(this, args);
    }

    replay() {
      console.log('Executing "replay" command. Clearing data..');
      this.persons = [];
      console.log(`Persons cleared. Current value: ${this.persons}`);
      console.log(`Replaying all commands..`);
      this.state.forEach((command: any) => this[command.name].apply(this, command.args));
    }
  }

  const command = new Command();
  command.execute('lala'); // invalid command
  // @ts-ignore
  command.execute('add', new Person('Leon Yalin'));
  command.execute('savePersons');
  command.execute('sayHelloTo', 'Liza');

  command.replay();
}


function observerPattern() {
  log('Oиserver pattern helps objects watching about the changes of another objects; + loosely coupling.',
    'We\'ll use the decorator pattern to wrap the person object with ObservablePerson to be able to notify the observers.');
  createObservablePerson();
}

function mediatorPattern() {
  log('Mediator pattern (a.k.a Pus-Sub) helps communicating between objects and decouples between them - one object doesn\'t know about the other.');
  createMediator();
}

function commandPattern() {
  log('Command pattern helps with calling object methods as commands, to fully decouple the execution from the implementation.',
    'This also enables doing other things before and after method execution, e.g. saving used methods names in some "state".');
  createCommand();
}

export default function behavioralDesignPatterns() {
  delimeterMsg('BEHAVIORAL DESIGN PATTERNS');
  logF(observerPattern);
  logF(mediatorPattern);
  logF(commandPattern);
}