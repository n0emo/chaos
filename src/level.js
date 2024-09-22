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
            //new Spawn(0, new FishingEvent()),
            //new Spawn(0.5, Enemy.basic(             60, 100, 0.5 )),
            //new Spawn(0.5, Enemy.basic(             80, 100, 0.75)),
            //new Spawn(0.5, Enemy.basic(WIDTH * 0.5 - 8, 100, 1   )),
            //new Spawn(0.5, Enemy.basic(     WIDTH - 80, 100, 0.75)),
            //new Spawn(2,   Enemy.basic(     WIDTH - 60, 100, 0.5 )),

            new Spawn(0, Enemy.shooterHoming(10, -16, 0, 20, 2)),
            new Spawn(0, Enemy.shooterHoming(30, -16, 0, 20, 2)),
            new Spawn(0, Enemy.shooterHoming(50, -16, 0, 20, 2)),
            new Spawn(0, Enemy.shooterHoming(70, -16, 0, 20, 2)),
            new Spawn(0, Enemy.shooterHoming(90, -16, 0, 20, 2)),
            new Spawn(0, Enemy.shooterHoming(110, -16, 0, 20, 2)),
            new Spawn(0, Enemy.shooterHoming(130, -16, 0, 20, 2)),
            new Spawn(0, new BulletCleanBonus(-50, -50, 50, 50)),
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
