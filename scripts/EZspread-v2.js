import {ExtendedLog} from "/scripts/lib/extendedLog";
import {Network} from "/scripts/lib/network";
import {GetAccess} from "/scripts/lib/getAccess";

/** @member {ExtendedLog} */
let el = null;

/** @member {Network} */
let n = null;

let xs = null;

const SCRIPT_NAME = 'EZspread.js';
const VERSION = '2.3';

/** @param {NS} ns **/
export async function main(ns) {
    el = new ExtendedLog(ns, SCRIPT_NAME, VERSION);
    n = new Network(ns);
    xs = new GetAccess(ns);

    el.start();

    const hackScript = '/scripts/EZhack.js';
    const allScripts = ns.ls("home", "/scripts/");
    let targets;
    let numOfTargets;
    let doneTargets;

    do {
        targets = n.getAllServerData().filter(server => server.maxRam > 0 && !server.purchasedByPlayer);
        numOfTargets = targets.length;
        doneTargets = 0;
        xs.getServerListAccess(targets); // nuke targets
        for (let target of targets) {
            if (target.numOpenPortsRequired <= xs.getAvailablePrograms().length) {
                const serverName = target.hostname
                const maxThreads = Math.floor(target.maxRam / ns.getScriptRam(hackScript));

                // checks if target has script running
                if (target.ramUsed > 0) {
                    ns.killall(serverName);
                    ns.rm(hackScript, serverName);
                }

                await ns.scp(allScripts, serverName);
                let runningScript = ns.exec(hackScript, serverName, maxThreads);

                if (runningScript !== 0) {
                    ++doneTargets;
                    el.log( serverName + " hacked, " + doneTargets + "/" + numOfTargets);
                } else {
                    el.log( serverName + " wasn't hacked");
                }
            } else {
                el.log('still programs missing ...');
            }
        }
        if (doneTargets < numOfTargets) {
            el.separate('separate')
            await ns.sleep(10000);
        }
    } while (doneTargets < numOfTargets);
    el.end();
}
