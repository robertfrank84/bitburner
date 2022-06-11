/** @param {NS} ns **/
export async function main(ns) {
    const flags = ns.flags([
        ['r', 4], // ram multiplier
        ['target', 'joesguns'], // target server
        ['help', false] // tprints all flags if true
    ]);

    if (flags.help) {
        ns.tprint('Possible flags for this script are:');
        ns.tprint('-r: RAM multiplier. Has to be power of 2');
        ns.tprint('--target: name of the targeted server');
        ns.tprint('--help: flag helper');
        return;
    }

    const target = flags.target;
    const ram = flags.r * 1024;

    const allScripts = ns.ls("home", "/scripts/");
    const hackScript = "/scripts/EZhack.js";
    const maxThreads = Math.floor(ram / ns.getScriptRam(hackScript));

    let i = 0;

    ns.disableLog("disableLog");
    ns.disableLog("enableLog");
    ns.disableLog("scan");
    ns.disableLog("getServerMoneyAvailable");

    // let showArr = true;

    while (i < ns.getPurchasedServerLimit()) {

        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {

            let myServer = ns.getPurchasedServers();

            let deathstarsArr = [];

            for (let j = 0; j < myServer.length; j++) {
                deathstarsArr.push(myServer[j].split("-"));
            }

            // deathstarsArr = deathstarsArr.sort((a, b) => a[2] - b[2]);

            // if (showArr) {
            // 	ns.print(deathstarsArr.toString());
            // 	showArr = false;
            // }
            ns.print(i);
            ns.print(!(deathstarsArr.find(el => el[2] === i)));

            if (!(deathstarsArr.find(el => el[2] === i))) {

                let hostname = ns.purchaseServer("Deathstar-" + ram + "gb-" + i, ram);

                if (!await ns.scp(allScripts, hostname)) {
                    ns.alert("Script couldn't be copied to server " + hostname);
                    break;
                }

                if (!ns.exec(hackScript, hostname, maxThreads, target)) {
                    ns.alert("Script couldn't be executed on " + hostname);
                    break;
                }
            }

            i++;
            ns.disableLog("sleep");
            await ns.sleep(100);
            ns.enableLog("sleep");

        } else {
            ns.print("waiting for getting $" + ns.getPurchasedServerCost(ram));
            await ns.sleep(30000);
        }
    }
    ns.tprint("Server limit reached.");
}