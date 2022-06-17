export class HelperFunctions {
    /** @type {NS} */
    #ns;

    constructor(ns) {
        this.#ns = ns;
    }

    /**
     * Returns the array after removing duplicates
     * @param array
     * @return array
     */
    uniqueItems = (array) => {
        let a = array;
        for(let i = 0; i < a.length; ++i) {
            for(let j = i + 1 ; j < a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    }
}
