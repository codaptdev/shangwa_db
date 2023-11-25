export interface DatabaseConfig {
    name : string,
    shouldGitIgnore : boolean,

    /** Time added to each operation to simulate the delay of network calls
     * 
     * `0` by default which means there is no delay added
     */
    simulatedDelayTime : number 
}

export interface ClusterConfig {
    name : string
}