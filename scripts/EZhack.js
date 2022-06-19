import {ExtendedLog} from "/scripts/lib/extendedLog";

/** @member {ExtendedLog} */
let el = null;

const SCRIPT_NAME = 'EZhack.js';
const VERSION = '1.1';

/** @param {NS} ns */
export async function main(ns) {
    el = new ExtendedLog(ns, SCRIPT_NAME, VERSION);

    // taget server to hack
    const target = ns.args[0] || 'the-hub';
    const moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    const securityThresh = ns.getServerMinSecurityLevel(target) + 2;

    el.start();

    // Infinite loop that continously hacks/grows/weakens the target server
    while (true) {
        const serverMoney = Math.round(ns.getServerMoneyAvailable(target) * 100) / 100;
        const percent = Math.round(((serverMoney / moneyThresh) * 100) * 100) / 100;

        if (ns.getServerSecurityLevel(target) > securityThresh) {
            let weakenBy = await ns.weaken(target);
            el.log('Security level lowered by: ' + weakenBy);
        } else if (serverMoney < moneyThresh) {
            el.log(percent + "% - " + ns.nFormat(serverMoney, '($0.00a)') + "/" + ns.nFormat(moneyThresh, '($0.00a)') + " (Money/max Money)");
            await ns.grow(target);
        } else {
            // Otherwise, hack it
            let loot = await ns.hack(target);
            el.log('Money available: ' + ns.nFormat(serverMoney, '($0.00a)'));
            el.log('got ' + ns.nFormat(loot, '($0.00a)'));
        }
    }
}
