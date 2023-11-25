import { fixName } from "../functions/utils";
import { ICollection } from "../interfaces/cluster.interface";
import { IDatabase } from "../interfaces/database.interface";
import { ClusterConfig } from "../interfaces/database_config";
import * as fs from 'fs';
import { MiltipleFileCollection } from "./collection";

export interface databaseParams  {
    name : string;
    parentPath : string;
    shouldGitIgnore? : true
}

/** A database object were documents in collections are stored in seperate files

 *@deprecated Consider using the new database api `SingleFileDatabase` 
 */
export class MultipleFileDatabase implements IDatabase {
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

    createCollection(config: ClusterConfig): ICollection {
        const colRef = new MiltipleFileCollection({
            name : config.name,
            path : `${this.path}`
        })

        return colRef;
    }

    deleteCollection(colName: string): boolean {
        throw new Error("Method not implemented.");
    }

    getCollection(colName: string): ICollection {
        const colRef = new MiltipleFileCollection({
            name : colName,
            path : `${this.path}`
        })

        return colRef;
    }



}