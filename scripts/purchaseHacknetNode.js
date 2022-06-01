/** @param {NS} ns **/
export async function main(ns) {
    function myMoney() {
        return ns.getServerMoneyAvailable("home");
    }

    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("sleep");

    while (true) {

        // TODO: Check if all nodes are maxed out

        if (myMoney() > ns.hacknet.getPurchaseNodeCost()) {
            let nodeIndex = ns.hacknet.purchaseNode();
            ns.tprint("Purchase hacknet Node #" + nodeIndex);

            while (ns.hacknet.getLevelUpgradeCost(nodeIndex, 1) !== "Infinity") {
                if (myMoney() > ns.hacknet.getLevelUpgradeCost(nodeIndex, 1)) {
                    ns.hacknet.upgradeLevel(nodeIndex, 1);
                } else {
                    await ns.sleep(10000);
                }
            }

            ns.print("Hacknet node #" + nodeIndex + " at max level!");

            while (ns.hacknet.getRamUpgradeCost(nodeIndex, 1) !== "Infinity") {
                if (myMoney() > ns.hacknet.getRamUpgradeCost(nodeIndex, 1)) {
                    ns.hacknet.upgradeRam(nodeIndex, 1);
                } else {
                    await ns.sleep(10000);
                }
            }

            ns.print("Hacknet node #" + nodeIndex + " at max RAM!");

            while (ns.hacknet.getCoreUpgradeCost(nodeIndex, 1) !== "Infinity") {
                if (myMoney() > ns.hacknet.getCoreUpgradeCost(nodeIndex, 1)) {
                    ns.hacknet.upgradeCore(nodeIndex, 1);
                } else {
                    await ns.sleep(10000);
                }
            }

            ns.print("Hacknet node #" + nodeIndex + " at max core!");
        }

        await ns.sleep(30000);
    }
}