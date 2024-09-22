import { Enemy, } from "./enemy.js"
import { game } from "./global.js"
import { AdsEvent, ChinaEvent, Event, FishingEvent } from "./event.js"
import { WIDTH } from "./constants.js"
import { Bonus, BulletCleanBonus, HealingBonus, InvulnerabilityBonus } from "./bonus.js"

/** @typedef {Enemy | Event | Bonus} Thing */

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

export class Level {
    /** @type {Spawn[]} */
    spawns

    /** @type {number} */
    timer

    constructor() {
        this.spawns = [
            new Spawn(0, Enemy.small(             30, 1)),
            new Spawn(1, Enemy.small(WIDTH - 30 - 16, 1)),

            new Spawn(0, Enemy.middle(             60, 1)),
            new Spawn(1, Enemy.middle(WIDTH - 60 - 16, 1)),

            new Spawn(0, new AdsEvent()),

            new Spawn(0, Enemy.big(             90, 1)),
            new Spawn(1, Enemy.big(WIDTH - 90 - 16, 1)),

            new Spawn(0, Enemy.bomj(             120,  0.7, 0.7, 2)),
            new Spawn(1, Enemy.bomj(WIDTH - 120 - 16, -0.7, 0.7, 2)),

            new Spawn(0.3, Enemy.caesar(       -16, 35,  1, 0)),
            new Spawn(  3, Enemy.caesar(WIDTH + 16, 50, -1, 0)),

            new Spawn(0, new FishingEvent()),
        ].reverse()

        this.timer = 0
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.timer -= dt

        if (this.timer <= 0) {
            this.timer = 0
            while (this.spawns.length > 0 && this.timer === 0) {
                const spawn = this.spawns.pop()

                if (spawn) {
                    const thing = spawn.thing

                    if (thing instanceof Enemy) {
                        game.enemies.push(thing)
                        this.timer = spawn.time

                    } else if (thing instanceof Event) {
                        game.event = thing

                    } else if (thing instanceof Bonus) {
                        game.bonuses.push(thing)

                    } else {
                        throw "Unknown thing"
                    }
                }
            }
        }
    }
}
