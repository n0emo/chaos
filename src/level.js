import { Enemy, } from "./enemy.js"
import { game } from "./global.js"
import { AdsEvent, ChinaEvent, Event, FishingEvent } from "./event.js"
import { HEIGHT, WIDTH } from "./constants.js"
import { Bonus, BulletCleanBonus, HealingBonus, InvulnerabilityBonus, WeaponUpgradeBonus } from "./bonus.js"
import { assets } from "./assets.js"
import { playSound } from "./audio.js"

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
            new Spawn(0.5, Enemy.small(50, 1)),
            new Spawn(0.5, Enemy.small(100, 1.5)),
            new Spawn(0.5, Enemy.small(120, 2)),

            new Spawn(1, new AdsEvent()),

            new Spawn(0.5, Enemy.small(WIDTH - 16 - 50, 1)),
            new Spawn(0.5, Enemy.small(WIDTH - 16 - 100, 1.5)),
            new Spawn(4,   Enemy.small(WIDTH - 16 - 120, 2)),

            new Spawn(1, new WaitForAllEnemiesKilled()),

            new Spawn(4, new WeaponUpgradeBonus(120, -16, 0, 50)),

            new Spawn(0.5, Enemy.middle(50, 1)),
            new Spawn(0.5, Enemy.middle(120, 1.5)),

            new Spawn(0.5, Enemy.middle(WIDTH - 16 - 50, 1)),
            new Spawn(2, Enemy.middle(WIDTH - 16 - 120, 1.5)),

            new Spawn(1, new FishingEvent()),

            new Spawn(0.5, Enemy.small(50, 1)),
            new Spawn(0.5, Enemy.small(70, 1.5)),
            new Spawn(0.5, Enemy.small(90, 2)),
            new Spawn(0.1, new ChinaEvent()),
            new Spawn(0.5, Enemy.small(110, 2)),


            new Spawn(0.5, Enemy.small(WIDTH - 16 - 50, 1)),
            new Spawn(0.5, Enemy.small(WIDTH - 16 - 70, 1.5)),
            new Spawn(0.5, Enemy.small(WIDTH - 16 - 90, 2)),
            new Spawn(0.5, Enemy.small(WIDTH - 16 - 110, 2)),

            new Spawn(1, new HealingBonus(200, -16, 0, 50)),
            new Spawn(1, new WeaponUpgradeBonus(250, -16, 0, 90)),

            new Spawn(0.5, Enemy.big(WIDTH * 0.5 - 8, 1)),
            new Spawn(0.5, Enemy.middle(WIDTH * 0.5 - 8 - 50, 1.5)),
            new Spawn(0.5, Enemy.middle(WIDTH * 0.5 - 8 - 50, 1.5)),

            new Spawn(0.5, new WaitForAllEnemiesKilled()),

            new Spawn(1, Enemy.bomj(20, 0.7, 0.7, 2)),

            new Spawn(0.1, new AdsEvent()),

            new Spawn(0.1, Enemy.middle(30,  0.5)),
            new Spawn(0.1, Enemy.middle(50,  0.6)),
            new Spawn(0.1, Enemy.middle(70,  0.7)),
            new Spawn(0.1, Enemy.middle(90,  0.8)),
            new Spawn(0.1, Enemy.middle(110, 0.9)),
            new Spawn(0.1, Enemy.middle(130, 1.0)),
            new Spawn(0.1, Enemy.middle(150, 1.1)),
            new Spawn(0.1, Enemy.middle(180, 1.2)),
            new Spawn(0.1, Enemy.middle(210, 1.3)),

            new Spawn(0.1, new FishingEvent()),
            new Spawn(1, Enemy.bomj(20, 0.4, 0.9, 2)),
            new Spawn(1, Enemy.bomj(WIDTH - 50, -0.4, 0.9, 2.5)),

            new Spawn(0.5, Enemy.big(40, 2)),

            new Spawn(0.1, new BulletCleanBonus(-16, 120, 100, 0)),

            new Spawn(0.3, Enemy.big(90, 2)),
            new Spawn(0.3, Enemy.big(120, 1)),
            new Spawn(0.3, Enemy.big(140, 2.5)),

            new Spawn(0.1, new WaitForAllEnemiesKilled())


        ].reverse()
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        if (this.waitingForEnemiesKilled) {
            if (game.enemies.length === 0) {
                this.waitingForEnemiesKilled = false
            } else {
                return
            }
        }

        this.timer -= dt

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
                        playSound(thing.sound)

                    } else if (thing instanceof Bonus) {
                        game.bonuses.push(thing)

                    } else if (thing instanceof HTMLImageElement) {
                        game.background.queue.push(thing)

                    } else if (thing instanceof WaitForAllEnemiesKilled) {
                        this.waitingForEnemiesKilled = true

                    } else {
                        throw "Unknown thing"
                    }
                }
            }
        }
    }
}
