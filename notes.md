import { generate } from 'json2typescript';

const schema = {
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" }
  }
};

const interfaces = generate(schema);
const Person = interfaces.Person;

const json = `{"name": "John Doe", "age": 30}`;
const person = JSON.parse(json) as Person; // person is now a strongly typed Person object
