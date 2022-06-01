/** @param {NS} ns **/
export async function main(ns) {
    const hackScript = ns.args[0] || '/scripts/EZhack.js';
    const target = ns.args[1] || 'joesguns';

    const allScripts = ns.ls("home", "/scripts/");

    // Array of servers [name, closed ports, ram]
    const servers = [
        ["sigma-cosmetics", 0, 16],
        ["joesguns", 0, 16],
        ["nectar-net", 0, 16],
        ["hong-fang-tea", 0, 16],
        ["harakiri-sushi", 0, 16],
        ["n00dles", 1, 4],
        ["CSEC", 1, 8],
        ["neo-net", 1, 32],
        ["zer0", 1, 32],
        ["max-hardware", 1, 32],
        ["iron-gym", 1, 32]
    ];


    for (let i = 0; i < servers.length; ++i) {
        const serverName = servers[i][0];
        const maxThreads = Math.floor(servers[i][2] / ns.getScriptRam(hackScript));

        switch (servers[i][1]) {
            case 0 :
                await ns.scp(allScripts, serverName);
                ns.nuke(serverName);
                ns.exec(hackScript, serverName, maxThreads, target);
                break;
            case 1 :
                while (!ns.fileExists("BruteSSH.exe")) {
                    await ns.sleep(60000);
                }

                await ns.scp(allScripts, serverName);
                ns.brutessh(serverName);
                ns.nuke(serverName);
                ns.exec(hackScript, serverName, maxThreads, target);
                break;
        }
    }
}