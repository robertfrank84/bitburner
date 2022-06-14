import {HelperFunctions} from "/scripts/lib/tools/helperFunctions";

export class Network {
    /** @type {NS} */
    #ns;

    /** @type {HelperFunctions} */
    #hf;

    /** @type {[]} Array with all the server names */
    #knownServers = [];

    constructor(ns) {
        this.#ns = ns;
        this.#hf = new HelperFunctions(this.#ns);
        this.searchAllServers();
    }

    /**
     * @return {string[]}
     */
    getKnownServers() {
        return this.#knownServers;
    }

    /**
     * @param {string} hostname
     * @return {string[]}
     */
    searchAllServers = (hostname = 'home') => {
        this.#knownServers = this.#ns.scan(hostname);
        let additionalServer = [];

        // TODO: condition shouldn't be changed from within the loop
        for(let i = 0; i < this.#knownServers.length; i++){
            additionalServer = this.#ns.scan(this.#knownServers[i]);
            this.#knownServers = this.#hf.uniqueItems(this.#knownServers.concat(additionalServer));
        }
    }

    /**
     * @param {string} hostname
     * @return {Server|null}
     */
    getServerByHostname = (hostname= 'home') => {
        return this.#ns.getServer(hostname);
    }

}
