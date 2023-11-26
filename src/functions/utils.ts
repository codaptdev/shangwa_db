import * as fs from 'fs'; 
import { getRootWorkingDir } from './db_creation_utils';

/** Converts a string into snake case  */
export function fixName(name : string) {
    let outStr = '';
    
    name = name.toLowerCase();

    for(let i = 0; i < name.length; i++) {
        if(name.charAt(i) == ' ')  { // space char
            outStr += '_'
        } else {
            outStr += name.charAt(i)
        }
    }

    return outStr;
}

export function baseExists(path : string) : boolean {
    return fs.existsSync(path)
}

fixName('Shangwa DB')