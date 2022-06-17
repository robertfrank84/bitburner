import {ExtendedLog} from "/scripts/lib/extendedLog";
import {Network} from "/scripts/lib/network";
import {GetAccess} from "/scripts/lib/getAccess";

/** @member {ExtendedLog} */
let el = null;

/** @member {Network} */
let n = null;

let xs = null;

const SCRIPT_NAME = 'EZspread.js';
const VERSION = '2';

/** @param {NS} ns **/
export async function main(ns) {
    el = new ExtendedLog(ns, SCRIPT_NAME, VERSION);
    n = new Network(ns);
    xs = new GetAccess(ns);

    el.start();

    const hackScript = '/scripts/EZhack.js';
    const target = 'joesguns';

    const allScripts = ns.ls("home", "/scripts/");

    // Array of servers [name, closed ports, ram]
    // const servers = [
    //     ["sigma-cosmetics", 0, 15],
    //     ["joesguns", 0, 16],
    //     ["nectar-net", 0, 16],
    //     ["hong-fang-tea", 0, 16],
    //     ["harakiri-sushi", 0, 16],
    //     ["n00dles", 1, 4],
    //     ["CSEC", 1, 8],
    //     ["neo-net", 1, 32],
    //     ["zer0", 1, 32],
    //     ["max-hardware", 1, 32],
    //     ["iron-gym", 1, 32]
    // ];

    const servers = n.getAllServerData().filter(server => server.maxRam > 0 && !server.purchasedByPlayer);
    el.log(xs.getAvailablePrograms());
    //el.log(xs.getAccess('phantasy'));
    el.log(xs.getServerListAccess(servers)) // works
    // TODO: add required Skill check
    // TODO: copy scripts and execute them


    /*for (let i = 0; i < servers.length; ++i) {
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
    }*/
}
