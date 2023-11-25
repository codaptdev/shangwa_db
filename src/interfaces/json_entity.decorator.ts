import { v4 as uuidv4 } from 'uuid';

export type Constructor = { new(...args: any[]): {} }

export function JsonEntity<T extends Constructor>(baseClass: T) {

  // Define the toJson method on the prototype of the class
  baseClass.prototype.toDb = function () {
    const props = this.getProps();
    const json: { [key: string]: any } = {};
    for (const prop of props) {
      json[prop] = this[prop];
    }
    return JSON.stringify(json);
  };

  // Define the getProps method on the prototype of the class
  baseClass.prototype.getProps = function () {
    return Object.getOwnPropertyNames(this);
  };

  // generates a uuid for that object
  baseClass.prototype.uuid = () => uuidv4();

  // Return the decorated class
  return baseClass;
}