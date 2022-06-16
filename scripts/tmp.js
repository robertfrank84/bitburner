import {ExtendedLog} from "/scripts/lib/extendedLog";
import {Network} from "/scripts/lib/network";

/** @member {ExtendedLog} */
let el = null;

/** @member {Network} */
let n = null;

const SCRIPT_NAME = 'tmp.js';
const FILE_VERSION = '1';

/** @param {NS} ns */
export async function main(ns) {
    el = new ExtendedLog(ns, SCRIPT_NAME, FILE_VERSION);
    n = new Network(ns);

    el.start();

    // el.log('hostnames: ', n.getKnownServers());

    el.log(n.getServerByHostname('zer0'));
    // el.log(ns.getPlayer());
    // ns.print(n.getAllServerData());
    el.end();
}
