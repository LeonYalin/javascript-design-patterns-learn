import { delimeterMsg, logF, log } from "./utils";

function Person(name: string, age: number) {
  this.name = name;
  this.age = age;
}
Person.prototype.toString = function () {
  return `Person[name=${this.name}, age=${this.age}]`;
}

function constructorPattern() {
  // @ts-ignore
  const person = new Person('Leon Yalin', 33);
}

function modulePattern() {
  const Module = (function () {
    const privateVar1 = 2;
    const privateVar2 = 'Hello';
    const privateFunc1 = (() => 'Hello World')
    return {
      publicVar1: privateVar1,
      publicFunc1: privateFunc1,
      publicFunc2: (() => {
        console.log(privateVar2);
      })
    }
  })();

  log('Module pattern helps with encapsulating stuff, simulating public/private properties.');
}

function factoryPattern() {
  const factory = (function () {
    const obj1 = { a: 'a' };
    const obj2 = { b: 'b' };
    const obj3 = { c: 'c' };
    // @ts-ignore
    const service1 = new Person('Leon Yalin');
    const service2 = new Object('lalala');
    return {
      getObj(type: string) {
        switch (type) {
          case 'obj1': return obj1;
          case 'obj2': return obj2;
          case 'obj3': return obj3;
        }
      },
      service1,
      service2,
    }
  })();

  log('Factory pattern helps with creating different objects from one place.',
    'In NodeJS, Commonjs require() syntax cashes the module in the background, enabling singleton behavior out of the box',
    'In order to get multiple copies (non-singleton), we should export a function and then execute it in the imported file.');
}

function singletonPattern() {
  const singleton = (function () {
    let instance: object = null;
    function createInstance() {
      return new Object('Lalala');
    }
    return {
      getInstance: () => {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      }
    }
  })();

  log('Singleton pattern helps with keeping only one copy of an object.');
}

export default function creationalDesignPatterns() {
  delimeterMsg('CREATIONAL DESIGN PATTERNS');
  logF(constructorPattern);
  logF(modulePattern);
  logF(factoryPattern);
  logF(singletonPattern);
}