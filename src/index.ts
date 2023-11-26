/**
 * 
 * By Tadiwanashe Shangwa with 🧡
 * 
 * This file contains the methods, classes and variables that are imported by the user 
 * of this package when they require it!
 */


import { DatabaseNotFound } from "./classes/exceptions";
import { SingleFileDatabase } from "./classes/single_file_sys/single_file_database";
import { setUpShangwaDB, getDatabasesRootPath } from "./functions/create_db";
import { DatabaseConfig } from "./interfaces/database_config";
import * as fs from 'fs';

/** Represents the meta deta for a document */
export interface DocumentData {
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
export function createDatabase(config : DatabaseConfig) : SingleFileDatabase {
    setUpShangwaDB()

    const db = new SingleFileDatabase({
        name : config.name,
        parentPath : getDatabasesRootPath(),
        shouldGitIgnore : config.shouldGitIgnore
    })
    
    return db;
}

/** Attempts to get an already existting datbase with the name passed
 * to the function. If the database is not found null is returned;
 */
export function getExistingDatabase(name : string) : SingleFileDatabase {

    const dbPath = `${getDatabasesRootPath()}/${name}`
    const exist = fs.existsSync(dbPath)

    // If database doesn't exists throw error
    if (!exist) {
        throw new DatabaseNotFound(name)
    }

    return new SingleFileDatabase({
        name : name,
        parentPath : getDatabasesRootPath(),
        shouldGitIgnore : true
    })
}
