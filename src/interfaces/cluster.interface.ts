import { DocumentData } from "..";
import { DocumentRef } from "../classes/document_ref";



/** Acts as an interface for a cluster */
export interface ICollection {

    path : string;
    name : string

    
    insertOne(docData : DocumentData) : DocumentRef;

    /** Inserts many documents */
    insertMany(jsonDocs : DocumentData[]) : void;

    /** Deletes a document */
    deleteDoc(id : string) : void;

    /** Returns a refference to a document */
    getDoc(id : string) : DocumentRef;

    /** Returns the data of a document */
    getDocData(id : string) : string;


    updateDoc(id : string, newData : string) : DocumentRef
    getAllDocs() : DocumentRef[]

}

export { DocumentData };

