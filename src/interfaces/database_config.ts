export interface DatabaseConfig {
    name : string,
    shouldGitIgnore : true,

    /** Time added to each operation to simulate the delay of network calls
     * 
     * `0` by default which means there is no delay added
     */
    simulatedDelayTime : 0
}

export interface ClusterConfig {
    name : string
}