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

fixName('Shangwa DB')