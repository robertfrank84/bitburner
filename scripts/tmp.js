import {ExtendedLog} from "/scripts/lib/extendedLog";
import {Network} from "/scripts/lib/network";
import {GetAccess} from "/scripts/lib/getAccess";

/** @member {ExtendedLog} */
let el = null;

/** @member {Network} */
let n = null;

/** @member {GetAccess} */
let xs = null;

const SCRIPT_NAME = 'tmp.js';
const FILE_VERSION = '1';

/** @param {NS} ns */
export async function main(ns) {
    el = new ExtendedLog(ns, SCRIPT_NAME, FILE_VERSION);
    n = new Network(ns);
    xs = new GetAccess(ns);

    el.start();

    // el.log('hostnames: ', n.getKnownServers());
    el.log(xs.getAvailablePrograms().length)

    el.log(n.getServerByHostname('the-hub'));
    // el.log(n.getServerByHostname('home'));
    // el.logRaw(ns.getPlayer());
    // el.logRaw(btoa(Date.now().toString()));
    // el.logRaw(Date.now().toString());
    el.end();
    ns.toast(JSON.stringify('Tor: ' + ns.getPlayer().tor), 'success', 5000);
}
