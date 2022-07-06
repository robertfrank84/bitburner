export class GetAccess {
    /** @type {NS} */
    #ns;

    #programs = [
        {
            name: 'BruteSSH.exe',
            execute: (ns, target) => {
                ns.brutessh(target);
            }
        },
        {
            name: 'FTPCrack.exe',
            execute: (ns, target) => {
                ns.ftpcrack(target);
            }
        },
        {
            name: 'relaySMTP.exe',
            execute: (ns, target) => {
                ns.relaysmtp(target)
            }
        },
        {
            name: 'HTTPWorm.exe',
            execute: (ns, target) => {
                ns.httpworm(target)
            }
        },
        {
            name: 'SQLInject.exe',
            execute: (ns, target) => {
                ns.sqlinject(target)
            }
        }
    ];

    constructor(ns) {
        this.#ns = ns;
    }

    /**
     * Checks which program is already owned
     * @return {[]}
     */
    getAvailablePrograms = () => {
        let availablePrograms = [];
        this.#programs.forEach(program => {
            if (this.#ns.fileExists(program.name, 'home')) {
                availablePrograms.push(program);
            }
        })
        return availablePrograms;
    }

    /**
     * @param {string} target
     * @param {int} neededOpenPorts
     * @return {string} Success message
     */
    getAccess = (target, neededOpenPorts) => {
        const availablePrograms = this.getAvailablePrograms();
        availablePrograms.forEach(program => {
            program.execute(this.#ns, target);
        });

        if (neededOpenPorts <= availablePrograms.length) {
            this.#ns.nuke(target);

            return target;
        } else {
            return 'skipped nuking ' + target
        }

    }

    /**
     * @param {Object} server
     * @param {string} server.hostname
     * @param {int} server.numOpenPortsRequired
     * @return {string} Success message
     */
    getServerAccess = (server) => {
        return this.getAccess(server.hostname, server.numOpenPortsRequired);
    }

    /**
     * @param {[]} servers
     * @return {string} String of success messages
     */
    getServerListAccess = (servers) => {
        let successMsg = '';
        let iterations = servers.length;

        for (let server of servers) {
            if (--iterations) {
                successMsg += this.getServerAccess(server) + ', ';
            } else {
                successMsg += this.getServerAccess(server);
            }
        }
        return successMsg;
    }
}
