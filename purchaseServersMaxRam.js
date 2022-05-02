/** @param {NS} ns **/
export async function main(ns) {
    const target = ns.args[0] || 'joesguns';
    // let ram = ns.getPurchasedServerMaxRam(); // return: 1048576
    // ns.print(ram + "GB RAM cost $" + ns.getPurchasedServerCost(ram)); // $57.671.680.000
    const ram = ns.args[1] || 4096;
    const hackScript = "EZhack.js";
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

                if (!await ns.scp(hackScript, hostname)) {
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
    ns.print("Server limit reached.");
}