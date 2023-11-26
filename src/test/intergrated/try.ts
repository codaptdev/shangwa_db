import { createDatabase, getExistingDatabase } from "../..";
import { JsonEntity } from "../../interfaces/json_entity.decorator";

@JsonEntity
class User {
    [x: string]: any;
    constructor(
        public username : string,
        public password : string
    ) {}
}

const db = getExistingDatabase('tadiwa');
const usersCol = db.getCollection('users');

console.log(usersCol.getDocData('1'));

usersCol.getDocWhere('name', 'tadiwa')

usersCol.getAllDocs