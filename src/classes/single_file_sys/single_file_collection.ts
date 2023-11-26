import { fixName } from "../../functions/utils";
import { DocumentData, ICollection } from "../../interfaces/cluster.interface";
import { CollectionParams } from "../multiple_file_sys/multiple_file_collection";
import { DocumentRef, SingleFileDocRef } from "../document_ref";
import * as fs from 'fs';
import { CollectionNotFound } from "../exceptions";


 
/** Creates a Collection where all documents are stored in one file! */
export class SingleFileCollection  {

    /** The path directory to the collection.json file */
    path: string;

    /** The name that identifies a collection */
    name: string;

    private collectionFilePath : string ;
    private collectionFileName : string;

    constructor(params : CollectionParams, isExisting : boolean = false) {
        this.name = fixName(params.name);
        this.path = `${params.path}/${this.name}`;
        this.collectionFileName = `${this.name}.collection.json`
        this.collectionFilePath = `${this.path}/${this.collectionFileName}`

        // Collection already exists
        if(isExisting) {
            if(!this.collectionExists()) {

                // If collection doesn;t existing throw an error
                throw new CollectionNotFound(this.name)
            }
        } else {

            if(!this.collectionExists()) {
                this.createColBaseDir()
                
                // creates a collection.json file if it doesn't exist
                if(!this.collectionFileExists()) {
                    this.createCollectionFile()
                }
            }
        }

    }

    /** Inserts a doc represented as a Javascript Object into the collection */
    insertDoc(doc : any) : SingleFileDocRef{
        const colAsFile = fs.readFileSync(this.collectionFilePath, 'utf-8');
        const colAsJson = this.getAllDocs();
        const docId =  colAsJson.length.toString();
        const docIndex  = colAsJson.length;
        doc['id'] = docIndex

        colAsJson.push(doc);

        this.commitChanges(colAsJson)

        return new SingleFileDocRef({
            id : docId,
            index : docIndex,
            collectionPath: this.collectionFilePath
        })
    }

    /** inserts a document into the collection file passed as a `DocumentData` object 
     * 
     * @deprecated use `insertDoc` instead
    */

    insertOne(docData: DocumentData): SingleFileDocRef {
        const colAsJson = this.getAllDocs();
        const docId =  colAsJson.length.toString();
        const docIndex  = colAsJson.length;

        // The json string passed as parameter as a js object
        const docAsObj = JSON.parse(docData.jsonStr);
        docAsObj['id'] = docId;

        colAsJson.push(docAsObj);

        this.commitChanges(colAsJson)

        return new SingleFileDocRef({
            id : docId,
            index : docIndex,
            collectionPath: this.collectionFilePath
        })

    }

    /** Overwrites the coollection json file with new data */
    private commitChanges(changes : any) : void {
        fs.writeFileSync( this.collectionFilePath, JSON.stringify(changes))
    }

    /** Inserts many documents into the collection file
     * 
     * @deprecated use `insertDocs` instead
     */
    insertMany(jsonDocs: DocumentData[]): void {
        jsonDocs.forEach((doc) => {
            this.insertOne(doc)
        })
    }

    /** Inserts an array of docs into the store! */
    insertDocs(docs : any[]) : void {
        docs.forEach((doc) => {
            this.insertDoc(doc)
        })
    }

    /** Deletes a document from the store with the specified ID! */
    deleteDoc(id: string): void {
        const docs = this.getAllDocs();

        const filteredDocs = docs.filter((doc, index) => {
            // only return docs that are not equal to the passed id of the doc to be deleted
            return doc['id'] !== id
        })

        this.commitChanges(filteredDocs);
    }

    /** Deletes a document from the store using the where clause ! */
    deleteWhereDoc<T>(key: string, equalsTo : T): void {
        const docs = this.getAllDocs();

        const filteredDocs = docs.filter((doc, index) => {
            // only return docs that are not equal to the passed id of the doc to be deleted
            return doc[key] !== equalsTo
        })

        this.commitChanges(filteredDocs);
    }

    /** Returns a doc ref object if the document is found else it will return 
     * undefined
     */
    getDocWithId(id: string): SingleFileDocRef | undefined {
        const colAsFile = this.getCollectionFileData();
        const colAsArr = JSON.parse(colAsFile) as any[];
        let foundAt : number = -1;

        colAsArr.forEach((doc, index) => {
            if(doc['id'] === id) {
                foundAt = index;
            }
        })

        const doc = new SingleFileDocRef({
            id : id,
            index: foundAt,
            collectionPath : this.collectionFilePath
        })

        // If found at is equal to -1 then the document with 
        // the given ID was not found!
        
        return foundAt == -1 ? undefined : doc
    }

    getDocWhere<T>(key: string, equalTo: T) : any {
        const docs = this.getAllDocs();
        let foundAt = -1;

        docs.forEach((doc, index) => {
            if(doc[key] === equalTo) {
                foundAt = index;
            }
        })

        return docs.at(foundAt);
    }

    /** Returns the data as json of the document or undefined
     * if the document doesn't exist
     */
    getDocData(id: string): any | undefined {
        const doc = this.getDocWithId(id);
        return doc == undefined ? undefined : doc.getDocData();
    }

    updateDoc(id: string, newData: string): DocumentRef {
        throw new Error("Method not implemented.");
    }

    /** Returns  All the docs in a collection*/
    getAllDocs(): any[]{

        const colAsFile = this.getCollectionFileData();
        const colAsJson = JSON.parse(colAsFile) as any[];
        return colAsJson;
    }


    /** Return true if the collection exists and false if the collection
     * doesn't exist
     */
    private collectionExists() : boolean{
        return fs.existsSync(this.path);
    }

    /** Returns the contents of the collection.json file as utf-8 encoded string */
    private getCollectionFileData() : string {
        return fs.readFileSync(this.collectionFilePath, 'utf-8');
    }

    /** Creates a directoy where the collection.json file will be stored */
    private createColBaseDir() : void {
        const dir = fs.mkdir(this.path, (err) => {
            if (err != null) {
                console.log(err);
            } else {
                console.log('Cluster Directory was made!');
                
            }
        })
    }

    /** Returns true if the collection.json file for the collection exists */
    private collectionFileExists() : boolean{
        return fs.existsSync(this.collectionFilePath);
    }

    /** Creates a new empty collection file */
    private createCollectionFile() : void {
        fs.writeFileSync(this.collectionFilePath, '[]')
    }

}