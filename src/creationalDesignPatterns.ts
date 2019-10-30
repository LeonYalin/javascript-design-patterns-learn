import { delimeterMsg, logF, log } from "./utils";

function constructorPattern() {
  function Person(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  Person.prototype.toString = function () {
    return `Person[name=${this.name}, age=${this.age}]`;
  }

  // @ts-ignore
  const person = new Person('Leon Yalin', 33);
}

function modulePattern() {
  const Module = function () {
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
  }
}

function factoryPattern() {
  const factory = function () {
    const obj1 = { a: 'a' };
    const obj2 = { b: 'b' };
    const obj3 = { c: 'c' };
    return {
      getObj(type: string) {
        switch (type) {
          case 'obj1': return obj1;
          case 'obj2': return obj2;
          case 'obj3': return obj3;
        }
      }
    }
  }

  log('In NodeJS, Commonjs require() syntax cashes the module in the backgound, enabling singletone out-of-the-box');
}

function singletonPattern() {
  const singleton = function () {
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
  }
}

export default function creationalDesignPatterns() {
  delimeterMsg('CREATIONAL DESIGN PATTERNS');
  logF(constructorPattern);
  logF(modulePattern);
  logF(factoryPattern);
  logF(singletonPattern);
}