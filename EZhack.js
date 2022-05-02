/** @param {NS} ns */
export async function main(ns) {
    // taget server to hack
    const target = ns.args[0] || 'joesguns';
    const moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    const securityThresh = ns.getServerMinSecurityLevel(target) + 2;

    ns.nuke(target);

    // Infinite loop that continously hacks/grows/weakens the target server
    while (true) {
        const serverMoney = Math.round(ns.getServerMoneyAvailable(target) * 100) / 100;
        const percent = Math.round(((serverMoney / moneyThresh) * 100) * 100) / 100;

        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (serverMoney < moneyThresh) {
            ns.print(percent , "% - " , serverMoney , "/" , moneyThresh , " (Money on server/max Money)");
            await ns.grow(target);
        } else {
            // Otherwise, hack it
            await ns.hack(target);
        }
    }
}