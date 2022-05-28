export class ExtendedLog {
    /** @type {NS} */
    #ns;

    /** @type {string} */
    #scriptName;

    /** @type {number} */
    #standardLogWidth = 51;

    constructor(ns, scriptName) {
        this.#ns = ns;
        this.#scriptName = scriptName;

        this.#ns.disableLog('ALL');
    }

    start = () => {
        this.#logStart();
    }

    /**
     * @param {string} [msg]
     */
    log = (msg = '') => {
        const date = new Date();
        this.#ns.printf('║ %1$s: %2$s',date.toLocaleTimeString('de-DE') , msg);
    }

    #logStart = () => {
        let leftOfScriptName = Math.ceil((this.#standardLogWidth - this.#scriptName.length) / 2) - 1;
        let rightOfScriptName = Math.floor((this.#standardLogWidth - this.#scriptName.length) / 2) - 1;

        this.#ns.printf(
            '╔'.padEnd(leftOfScriptName, '═') +
            '⟬' +
            this.#scriptName +
            '⟭' +
            '╗'.padStart(rightOfScriptName, '═')
        );
    }
}