import { Database } from "./classes/database";
import { setUpShangwaDB, getDatabasesRootPath } from "./functions/create_db";
import { DatabaseConfig } from "./interfaces/database_config";
import * as fs from 'fs';

export interface DocumentData {
    id : string,
    jsonStr : string
}
    /** Sets up a database in your working directory. If you specify to gitIgnore the databases
 * then changes to the database don't affect your git repo
 * 
 * @returns a `Database` object
 * 
 * @param name - uniquely identifies the database
 * @param shouldGitIgnore - a flag for Shangwa DB to git ignore your database or not 
 */
export function createDatabase(config : DatabaseConfig) : Database {
    setUpShangwaDB()

    const db = new Database({
        name : config.name,
        parentPath : getDatabasesRootPath(),
        shouldGitIgnore : config.shouldGitIgnore
    })
    
    return db;
}

/** Attempts to get an already existting datbase with the name passed
 * to the function. If the database is not found null is returned;
 */
export function getExistingDatabase(name : string) : Database | undefined {

    const dbPath = `${getDatabasesRootPath}/${name}`
    const gitIgnoreedPath = `${getDatabasesRootPath}/.${name}`
    const exist = fs.existsSync(dbPath)
    const ignoredExists = fs.existsSync(gitIgnoreedPath)

    if (exist || ignoredExists) {
        if(exist) {
            return new Database({
                name : name,
                parentPath : getDatabasesRootPath()
            })
        } else {
            return new Database({
                name : name,
                parentPath : getDatabasesRootPath()
            })
        }
    } else {
        return undefined
    }
}


