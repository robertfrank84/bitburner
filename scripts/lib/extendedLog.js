export class ExtendedLog {
    /** @type {NS} */
    #ns;

    /** @type {string} */
    #scriptName;

    /** @type {number} */
    #standardLogWidth = 51;

    /** @type {number} */
    #standardMsgWidth = this.#standardLogWidth - 13;

    constructor(ns, scriptName) {
        this.#ns = ns;
        this.#scriptName = scriptName;

        this.#ns.disableLog('ALL');
    }

    start = () => {
        this.#logStart();
    }

    /**
     * @param {(string|array|object|number|boolean)} msg
     */
    // TODO: remove array brackets and string apostrophes
    log = (...msg) => {
        const msgArr = [...msg];
        const date = new Date();
        const textArr = this.#lineBreak(JSON.stringify(msgArr));
        let lineFiller = 0;

        for (let i = 0; i < textArr.length; i++) {
            lineFiller = this.#standardLogWidth - 12 - textArr[i].length;

            if (i === 0) {
                this.#ns.printf(
                    '║ %1$s: %2$s' + '║'.padStart(lineFiller, ' '),
                    date.toLocaleTimeString('de-DE'),
                    textArr[i]
                );
            } else {
                this.#ns.printf(
                    '║'.padEnd(12, ' ') +
                    textArr[i] +
                    '║'.padStart(lineFiller, ' ')
                );
            }
        }
    }

    #logStart = () => {
        //TODO: #scriptName to long
        let leftOfScriptName = Math.ceil((this.#standardLogWidth - this.#scriptName.length) / 2) - 2;
        let rightOfScriptName = Math.floor((this.#standardLogWidth - this.#scriptName.length) / 2) - 2;

        this.#ns.printf(
            '╔'.padEnd(leftOfScriptName, '═') +
            '╡ ' +
            this.#scriptName +
            ' ╞' +
            '╗'.padStart(rightOfScriptName, '═')
        );
    }

    /**
     *
     * @param {string} msg
     * @returns {[]}
     */
    #lineBreak = (msg) => {
        let lines = [];
        let i = 0;

        lines.push(msg);

        if (this.#standardMsgWidth <= 0) throw this.#ns.printf('#standardMsgWidth must NOT be lower than 1');

        while (msg.length >= this.#standardMsgWidth * i + 1) {
            if (lines[i].charAt(this.#standardMsgWidth - 1) === ' ') {
                lines.push(msg.slice(this.#standardMsgWidth * i, this.#standardMsgWidth * i + this.#standardMsgWidth - 1).trim());
            } else {
                if (lines[i].charAt(this.#standardMsgWidth) === ' ') {
                    lines.push(msg.slice(this.#standardMsgWidth * i, this.#standardMsgWidth * i + this.#standardMsgWidth));
                } else {
                    if (msg.slice(this.#standardMsgWidth * i, this.#standardMsgWidth * i + this.#standardMsgWidth).length <= this.#standardMsgWidth) {
                        lines.push(msg.slice(this.#standardMsgWidth * i, this.#standardMsgWidth * i + this.#standardMsgWidth).trim());
                    } else {
                        lines.push(msg.slice(this.#standardMsgWidth * i, this.#standardMsgWidth * i + this.#standardMsgWidth).concat('-').trim());
                    }
                }
            }
            i++;
        }
        lines.shift();
        return lines;
    }
}
