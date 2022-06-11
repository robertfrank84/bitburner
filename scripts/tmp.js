import {ExtendedLog} from "/scripts/lib/extendedLog";
import {Network} from "/scripts/lib/network";

/** @member {ExtendedLog} */
let el = null;

/** @member {Network} */
let n = null;

const SCRIPT_NAME = 'tmp.js';

/** @param {NS} ns */
export async function main(ns) {
    el = new ExtendedLog(ns, SCRIPT_NAME);
    n = new Network(ns);

    el.start();

    el.log(n.listAllServers('home'));

}
