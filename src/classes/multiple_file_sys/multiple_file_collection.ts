import { DocumentData, ICollection } from "../../interfaces/cluster.interface";
import * as fs from 'fs';
import { DocumentRef } from "../document_ref";
import { fixName } from "../../functions/utils";

export interface CollectionParams {
    path : string,
    name : string
}

/** Creates a collection where the documents are stored as single
 *  files
 * 
 * @deprecated Consider using `SingleFileCollections`
 *  */
export class MiltipleFileCollection implements ICollection {


    path: string;
    name: string;

    constructor(params : CollectionParams) {
        this.name = fixName(params.name)
        this.path = params.path;

        if(this.checkIfDirExists() == false ) {
            this.createDir()
        } else {
            console.log('Collection already exists');
        }
    }

    insertOne(docData: DocumentData): DocumentRef {
        throw Error('Method no implemented')
    }

    insertMany(jsonDocs: DocumentData[]): void {
        jsonDocs.forEach((doc) => {
            this.insertOne(doc);
        })
    }
    
    deleteDoc(id: string): void {
        const doc = this.getDoc(id)
        doc.deleteDoc();
    }

    getDoc(id: string): DocumentRef {
        const docPath = this.getDocPath(id);
        return new DocumentRef(docPath);
    }

    getDocData(id: string): string {
        const doc = this.getDoc(id);

        return doc.getDocData();
    }

    updateDoc(id: string, newData: string): DocumentRef {
        const doc = this.getDoc(id);
        doc.setDoc(newData);
        return doc;
    }

    getAllDocs(): DocumentRef[] {
        throw new Error("Method not implemented.");
    }


    private getDocPath(id : string) : string {
        return `${this.path}/${id}`
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
    

}