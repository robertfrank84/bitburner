import {ExtendedLog} from "/scripts/lib/extendedLog";
import {Network} from "/scripts/lib/network";
import {GetAccess} from "/scripts/lib/getAccess";

/** @member {ExtendedLog} */
let el = null;

/** @member {Network} */
let n = null;

let xs = null;

const SCRIPT_NAME = 'EZspread.js';
const VERSION = '2.2';

/** @param {NS} ns **/
export async function main(ns) {
    el = new ExtendedLog(ns, SCRIPT_NAME, VERSION);
    n = new Network(ns);
    xs = new GetAccess(ns);

    el.start();

    const hackScript = '/scripts/EZhack.js';
    const allScripts = ns.ls("home", "/scripts/");
    const targets = n.getAllServerData().filter(server => server.maxRam > 0 && !server.purchasedByPlayer);
    const numOfTargets = targets.length;
    let doneTargets = 0;

    while (doneTargets <= numOfTargets) {
        xs.getServerListAccess(targets); // works -- all targets nuked
        for ( let target of targets) {
            const serverName = target.hostname
            const maxThreads = Math.floor(target.maxRam / ns.getScriptRam(hackScript));

            // TODO: remove old script from target

            await ns.scp(allScripts, serverName);
            let runningScript = ns.exec(hackScript, serverName, maxThreads);

            if (runningScript !== 0) {
                ++doneTargets;
            } else {
                el.log( serverName + " wasn't hacked");
            }
        }
        el.separate('separate')
        await ns.sleep(180000);
    }
    el.end();
}
