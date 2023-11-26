import * as fs from 'fs';
import {resolve} from 'path'
import { baseExists } from "./utils";

/** Returns the root working directory of the node project */
export function getRootWorkingDir() : string {
    return resolve('./');
}

/** The name of the folder where all the databases and clusters will be stored */
const baseFolderName =   '.local';


/** Sets up the ./local db directory */
function createLocalDir() {
    const base = getRootWorkingDir()
    const finalPath =  `${base}/${baseFolderName}`;

    fs.mkdirSync(finalPath);

}

/** Creates a directory called databases where all the databases will be stored
 * 
 * @example
 * 
 * ./local
 *      |
 *      -- database
 */
function createDatabasesDir() {

    const base = getRootWorkingDir()
    const finalPath = `${base}/${baseFolderName}/databases`;

    fs.mkdirSync(finalPath);
    
}

/** Gets the path for the folder where databases will be stored */
export function getDatabasesDirPath() : string {
    const base = getRootWorkingDir()
    const finalPath = `${base}/${baseFolderName}/databases`;
    return finalPath;
}

/** Returns true if the .local directory exists and returns false if it doesn't exist */
export function localDirExists() : boolean {
    const base = getRootWorkingDir()
    const finalPath = `${base}/${baseFolderName}`;

    return baseExists(finalPath);
}


/** Sets up the directory structure for the local database store */
export function setUpLocalStore() {

    // Check if the local directory exists
    if(!localDirExists()) {
        createLocalDir()
    
        // create databases folder
        createDatabasesDir()
    }
}

