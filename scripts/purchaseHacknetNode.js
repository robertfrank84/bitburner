import {ExtendedLog} from "/scripts/lib/extendedLog";

/** @member {ExtendedLog} */
let el = null;

const SCRIPT_NAME = 'purchaseHacknetNode.js';

/** @param {NS} ns */
export async function main(ns) {
    // TODO: Helper that shows all possible flags in the terminal
    const flags = ns.flags([
        ['n', 25],  // max number of nodes
        ['w', 10000] // time to wait in ms
    ]);

    el = new ExtendedLog(ns, SCRIPT_NAME);

    /** @returns {number} */
    function myMoney() {
        return ns.getServerMoneyAvailable("home");
    }

    el.start();

    while (ns.hacknet.numNodes() <= flags.n) {

        // TODO: Check if all nodes are maxed out

        if (myMoney() > ns.hacknet.getPurchaseNodeCost()) {
            let nodeIndex = ns.hacknet.purchaseNode();
            el.log('Purchase hacknet node #' + nodeIndex);

            while (ns.hacknet.getLevelUpgradeCost(nodeIndex, 1) !== Infinity) {
                if (myMoney() > ns.hacknet.getLevelUpgradeCost(nodeIndex, 1)) {
                    ns.hacknet.upgradeLevel(nodeIndex, 1);
                } else {
                    await ns.sleep(flags.w);
                }
            }

            el.log('Hacknet node #' + nodeIndex + ' at max level!');

            while (ns.hacknet.getRamUpgradeCost(nodeIndex, 1) !== Infinity) {
                if (myMoney() > ns.hacknet.getRamUpgradeCost(nodeIndex, 1)) {
                    ns.hacknet.upgradeRam(nodeIndex, 1);
                } else {
                    await ns.sleep(flags.w);
                }
            }

            el.log('Hacknet node #' + nodeIndex + ' at max RAM!');

            while (ns.hacknet.getCoreUpgradeCost(nodeIndex, 1) !== Infinity) {
                if (myMoney() > ns.hacknet.getCoreUpgradeCost(nodeIndex, 1)) {
                    ns.hacknet.upgradeCore(nodeIndex, 1);
                } else {
                    await ns.sleep(flags.w);
                }
            }

            el.log('Hacknet node #' + nodeIndex + ' at max core!');
        }

        await ns.sleep(flags.w);
    }
}