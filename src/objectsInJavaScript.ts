import { delimeterMsg } from "./utils";
import { log } from "util";

function createingNewObjects() {
  const obj = {};
  const obj2 = Object.create(Object.prototype);
  const obj3 = new Object();
}

function accessingAttributes() {
  const obj = { a: 'a' };

  // dot notation
  obj.a = 'b';
  const dotNotation = obj.a;

  // bracket notation
  obj['a'] = 'a';
  const bracketNotation = obj['a'];
}

function defineProperty() {
  const obj = {};
  Object.defineProperty(obj, 'toString', {
    value: function () { return 'Hello world' },
    writable: true, // for creating consts
    enumerable: false, // controlling apprearance when using in a for "loop" or Object.keys()
    configurable: true, // once set to fals, can't change the define property again.
  });
}

function inheritance() {
   
}

export default function objectsInJavaScript() {
  delimeterMsg('OBJECTS IN JAVASCRIPT');

  log('Creating new objects');
  createingNewObjects();
}