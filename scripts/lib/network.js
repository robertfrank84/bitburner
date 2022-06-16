import {HelperFunctions} from "/scripts/lib/tools/helperFunctions";

export class Network {
    /** @type {NS} */
    #ns;

    /** @type {HelperFunctions} */
    #hf;

    /**
     * @type {object}
     */
    #knownServers = {
        home: 0
    };

    constructor(ns) {
        this.#ns = ns;
        this.#hf = new HelperFunctions(this.#ns);
        this.searchAllServers();
    }

    /**
     * @return {string[]}
     */
    getKnownServers() {
        return Object.keys(this.#knownServers);
    }

    /**
     * searchAllServers scans for all hostnames an saves them as an object in this.#knownServers
     */
    searchAllServers = () => {
        // reset this.#knownServers to generate a new list
        this.#knownServers = {
            home: 0
        }

        while (true) {
            let target = null;
            let newHostnames = [];

            // Search in this.#knownServers for a NEW target to scan, that wasn't used before
            for (let i = 0; i < Object.keys(this.#knownServers).length; i++) {
                if (Object.values(this.#knownServers)[i] === 0) {
                    target = Object.keys(this.#knownServers)[i];
                    break;
                }
            }

            // While-Loop breaks if no value in this.#knownServers is 0 anymore
            if (target === null) {
                break;
            }

            // scan with target as the host and mark target as 'used'(1) in this.#knownServers
            newHostnames = this.#ns.scan(target);
            this.#knownServers[target] = 1;

            // add every host in newHostnames to this.#knownServers, if it doesn't exist already
            newHostnames.forEach((host) => {
                if (this.#knownServers[host] !== 1) {
                    this.#knownServers[host] = 0;
                }
            });
        }
    }

    /**
     * Get all information about a server by hostname
     * @param {string} hostname
     * @return {Server|null}
     */
    getServerByHostname = (hostname= 'home') => {
        return this.#ns.getServer(hostname);
    }

    /**
     * @return {[]} All properties of all servers
     */
    getAllServerData = () => {
        let allServerData = [];
        for(let hostname in this.#knownServers) {
            let serverData = this.getServerByHostname(hostname);
            if (serverData !== null) {
                allServerData.push(serverData);
            }
        }
        return allServerData;
    }
}
