import { Enemy, } from "./enemy.js"
import { game } from "./global.js"
import { AdsEvent, ChinaEvent, Event, FishingEvent } from "./event.js"
import { WIDTH } from "./constants.js"
import { Bonus, BulletCleanBonus, HealingBonus, InvulnerabilityBonus, WeaponUpgradeBonus } from "./bonus.js"
import { assets } from "./assets.js"

/** @typedef {Enemy
 *          | Event
 *          | Bonus
 *          | HTMLImageElement
 *          | WaitForAllEnemiesKilled
 *          } Thing */

export class Spawn {
    /** @type {number} */
    time
    /** @type {Thing} */
    thing

    /**
     * @param {number} time
     * @param {Thing} thing
     */
    constructor(time, thing) {
        this.time = time
        this.thing = thing
    }
}

export class WaitForAllEnemiesKilled {}

export class Level {
    /** @type {Spawn[]} */
    spawns
    /** @type {number} */
    timer
    waitingForEnemiesKilled

    constructor() {
        this.waitingForEnemiesKilled = false
        this.timer = 0
        this.spawns = [
            new Spawn(0, Enemy.small(             30, 1)),
            new Spawn(2, Enemy.small(WIDTH - 30 - 16, 1)),

            //new Spawn(0, Enemy.middle(             60, 1)),
            //new Spawn(1, Enemy.middle(WIDTH - 60 - 16, 1)),

            //new Spawn(0, new AdsEvent()),

            //new Spawn(0, Enemy.big(             90, 1)),
            //new Spawn(1, Enemy.big(WIDTH - 90 - 16, 1)),

            //new Spawn(0, Enemy.bomj(             120,  0.7, 0.7, 2)),
            //new Spawn(1, Enemy.bomj(WIDTH - 120 - 16, -0.7, 0.7, 2)),

            //new Spawn(0.3, Enemy.caesar(       -16, 35,  1, 0)),
            //new Spawn(  3, Enemy.caesar(WIDTH + 16, 50, -1, 0)),

            //new Spawn(0, new FishingEvent()),
            new Spawn(1, new WaitForAllEnemiesKilled()),

            new Spawn(2, new ChinaEvent()),

            new Spawn(0, new HealingBonus(50, -16, 0, 20)),
            new Spawn(0, new InvulnerabilityBonus(80, -16, 0, 20)),
            new Spawn(0, new BulletCleanBonus(110, -16, 0, 20)),
            new Spawn(0, new WeaponUpgradeBonus(140, -16, 0, 20)),

            new Spawn(0, assets.imageLevel1_2),
            new Spawn(5, assets.imageLevel2),
            new Spawn(0, assets.imageLevel2_3),
            new Spawn(0, assets.imageLevel3),
            new Spawn(0, assets.imageLevel3),
        ].reverse()
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.timer -= dt

        if (this.waitingForEnemiesKilled) {
            if (game.enemies.length === 0) {
                this.waitingForEnemiesKilled = false
            } else {
                return
            }
        }

        if (this.timer <= 0) {
            this.timer = 0
            while (this.spawns.length > 0 && this.timer === 0) {
                const spawn = this.spawns.pop()

                if (spawn) {
                    const thing = spawn.thing
                    this.timer = spawn.time

                    if (thing instanceof Enemy) {
                        game.enemies.push(thing)

                    } else if (thing instanceof Event) {
                        game.event = thing

                    } else if (thing instanceof Bonus) {
                        game.bonuses.push(thing)

                    } else if (thing instanceof HTMLImageElement) {
                        game.background.queue.push(thing)

                    } else if (thing instanceof WaitForAllEnemiesKilled) {
                        this.waitingForEnemiesKilled = true
                        console.log("xd")

                    } else {
                        throw "Unknown thing"
                    }
                }
            }
        }
    }
}
