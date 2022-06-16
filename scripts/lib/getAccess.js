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
            if (this.#ns.fileExists(program.name)) {
                availablePrograms.push(program);
            }
        })
        return availablePrograms;
    }

    /**
     * @param {string} target
     */
    getAccess = (target) => {
        const availablePrograms = this.getAvailablePrograms();
        availablePrograms.forEach(program => {
            program.execute(this.#ns, target);
        });
        this.#ns.nuke(target);

        return 'Root Access granted for [' + target + ']';
    }

    /**
     * @param {Server} server
     */
    getServerAccess = (server) => {
        return this.getAccess(server.hostname);
    }

    /**
     * @param {Server[]} servers
     */
    getServerListAccess = (servers) => {
        let successMsg = '';
        for (let server of servers) {
            successMsg += this.getServerAccess(server) + ', ';
        }
        return successMsg;
    }
}