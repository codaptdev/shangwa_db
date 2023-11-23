import { Database } from "../classes/database";
import { DatabaseConfig } from "../interfaces/database_config";
import { JsonEntity} from "../interfaces/json_entity.decorator";
import * as fs from 'fs';
import {resolve} from 'path'
import { baseExists } from "./utils";
import { IDatabase } from "../interfaces/database.interface";

export function getBaseDir() : string {
    return resolve('./');
}

const baseFolderName = 'local';

/** Sets up the shangwa db directory */
export function initializeDir() {

    const base = getBaseDir()
    const finalPath = `${base}/${baseFolderName}`;

    fs.mkdirSync(finalPath);


}

export function initializeDBDir() {
    const base = getBaseDir()
    const finalPath = `${base}/${baseFolderName}/databases`;

    fs.mkdirSync(finalPath);
    
}


export function getDatabasesRootPath() : string {
    const base = getBaseDir()
    const finalPath = `${base}/${baseFolderName}/databases`;
    return finalPath;
}

export function shangwaDExists() : boolean {
    const base = getBaseDir()
    const finalPath = `${base}/${baseFolderName}`;

    return baseExists(finalPath);
}

export function setUpShangwaDB() {
    if(!shangwaDExists()) {
        initializeDir()
        initializeDBDir()
    }
}

