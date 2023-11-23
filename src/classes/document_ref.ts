import * as fs from 'fs';

/** Document Referrence Object */
export class DocumentRef {
    
    path : string

    /** Creates an instance of document reference object
     * 
     * If it doesn't exists an empty document will be created
     */

    constructor(path : string) {
        this.path = `${path}.json`;

        // If doc doesn't exist create it
        if (!this.docExists()) {
            this.createDoc()
        } else {
            // do nothing to avoid overwritting the file
        }
    }

    /** @returns `true` if the document already exists  */
    public docExists() : boolean {
        return fs.existsSync(this.path)
    }

    /** Returns a json string of the doc */
    getDocAsJson() : any {
        return JSON.parse(this.readDoc())
    }

    /** Read the file pointed by `this.path` */
    private readDoc() : string  {
        const file = fs.readFileSync(this.path)
        return file.toString();
    }

    /** Returns the doc as json */
    getDocData() : string {
        return this.readDoc();
    }

    setDoc(newJson : string) {
        fs.writeFileSync(this.path, newJson)
    }

    deleteDoc() {
        fs.unlinkSync(this.path)
    }

    private createDoc() {
        fs.writeFileSync(this.path, '');
    }

    /** Creates a document and sets data to it */
    public static withData(path : string, jsonStr : string) : DocumentRef {
        const doc = new DocumentRef(path);
        doc.setDoc(jsonStr);

        return doc;
    }   
}