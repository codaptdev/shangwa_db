import { fixName } from "../../functions/utils";
import { ICollection } from "../../interfaces/cluster.interface";
import { IDatabase } from "../../interfaces/database.interface";
import { ClusterConfig } from "../../interfaces/database_config";
import * as fs from 'fs';
import { MiltipleFileCollection } from "../multiple_file_sys/multiple_file_collection";
import { SingleFileCollection } from "./single_file_collection";

export interface databaseParams  {
    name : string;
    parentPath : string;
    shouldGitIgnore? : boolean
}

/** A database object were documents in collections are stored in one single file */
export class SingleFileDatabase {
    name: string;
    path: string;

    constructor(params : databaseParams) {
        this.name = params.name
        const fixedName = fixName(this.name)
        this.path =   `${params.parentPath}/${fixedName}`;

        // create dir if it doesn't exist
        if (!this.checkIfDirExists()) {
            this.createDir();
        }else {
            console.log('Directory Already Exisits');
        }
    }


    /** Checks if the database dir already exists 
     * 
     * @return True if the directory exists
    */
    private checkIfDirExists() : boolean {
        return fs.existsSync(this.path);
    }

    /** Creates a directory for the database to live in */
    private createDir() : void {
        const dir = fs.mkdir(this.path, (err) => {
            if (err != null) {
                console.log(err);
            } else {
                console.log('Directory Made!');
                
            }
        })
    }

    /** Creates a new collection */
    createCollection(config: ClusterConfig): SingleFileCollection {
        const colRef = new SingleFileCollection({
            name : config.name,
            path : `${this.path}`
        })

        return colRef;
    }

    /** Returns an existing collection
     * if the collection is not found an error is thrown
     */
    getCollection(name : string) : SingleFileCollection {
        return new SingleFileCollection({
            name : name,
            path : `${this.path}`
        }, true)
    }

    deleteCollection(colName: string): void {
        throw new Error("Method not implemented.");
    }

}