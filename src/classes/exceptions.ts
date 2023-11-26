/** An exception that is raised when a document is not found */
export class DatabaseNotFound implements Error {

    name: string = 'Database not found'
    message: string;
    stack?: string | undefined;

    constructor(name : string) {
        this.message = `The database "${name}" doesn't exist"`
    }

}

export class CollectionNotFound implements Error {
    name: string = 'Collection Not Found';
    message: string;
    stack?: string | undefined;

    constructor(name : string) {
        this.message = `The collection '${name}' was not found`;
    }


}