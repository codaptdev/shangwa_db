import { ICollection } from "./cluster.interface";
import { ClusterConfig } from "./database_config";

export interface IDatabase {


    name : string,
    path : string

    /** Creates a collection takes a `ClusterConfig` as a parameter
     * 
     * @returns a cluster object
     */
    createCollection(config : ClusterConfig) : ICollection

    /** Attempts to delete a collection
     * 
     * @returns true if operation was successful and returns false if it wasn't
     */
    deleteCollection(colName : string) : boolean

    /** Gets a collection and returns a collection object */
    getCollection(colName : string) : ICollection;
}