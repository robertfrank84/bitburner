import {HelperFunctions} from "/scripts/lib/tools/helperFunctions";

export class Network {
    /** @type {NS} */
    #ns;

    /** @type {HelperFunctions} */
    #hf;

    constructor(ns) {
        this.#ns = ns;
        this.#hf = new HelperFunctions(this.#ns);
    }


    listAllServers = (hostname = 'home') => {
        return this.#searchServers(hostname);
    }


    /**
     * @param {string} hostname
     * @return {string[]}
     */
    #searchServers = (hostname = 'home') => {
        let allServers = this.#ns.scan(hostname);
        let additionalServer = [];
        // const layers = 3;

        for(let i = 0; i < allServers.length; i++){
            additionalServer = this.#ns.scan(allServers[i]);
            allServers = this.#hf.uniqueItems(allServers.concat(additionalServer));
        }

        return allServers;
    }
}
