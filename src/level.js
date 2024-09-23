import { Enemy, } from "./enemy.js"
import { game } from "./global.js"
import { AdsEvent, ChinaEvent, Event, FishingEvent } from "./event.js"
import { HEIGHT, WIDTH } from "./constants.js"
import { Bonus, BulletCleanBonus, HealingBonus, InvulnerabilityBonus, WeaponUpgradeBonus } from "./bonus.js"
import { assets } from "./assets.js"
import { playSound } from "./audio.js"
import { GAME_WIN } from "./game.js"

/** @typedef {Enemy
 *          | Event
 *          | Bonus
 *          | HTMLImageElement
 *          | WaitForAllEnemiesKilled
 *          | WinCondition
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

export class WinCondition {}

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

            new Spawn(0.4, new WeaponUpgradeBonus(20, 20, 40, 40)),

            new Spawn(0.1, new FishingEvent()),
            new Spawn(1, Enemy.bomj(20, 0.4, 0.9, 2)),
            new Spawn(1, Enemy.bomj(WIDTH - 50, -0.4, 0.9, 2.5)),

            new Spawn(0.5, Enemy.big(40, 1)),

            new Spawn(0.1, new BulletCleanBonus(-16, 120, 100, 0)),

            new Spawn(0.3, Enemy.big(90, 1)),
            new Spawn(0.3, Enemy.big(120, 0.5)),
            new Spawn(0.3, Enemy.big(140, 1.5)),

            new Spawn(0.1, new WaitForAllEnemiesKilled()),

            new Spawn(2, new HealingBonus(WIDTH * 0.5 - 6, -16, 0, 50)),
            new Spawn(0.1, new AdsEvent()),

            new Spawn(1, Enemy.bomj(20, 0.4, 0.9, 1)),
            new Spawn(1, Enemy.bomj(WIDTH - 50, -0.4, 0.9, 1.5)),

            new Spawn(0, assets.imageLevel1_2),
            new Spawn(0, assets.imageLevel2),
            new Spawn(1, new WaitForAllEnemiesKilled()),

            new Spawn(0, new AdsEvent()),
            new Spawn(0, new HealingBonus(40, -16, 0, 60)),
            new Spawn(0.1, new WeaponUpgradeBonus(-16,  70, 90, 0)),
            new Spawn(0.1, new WeaponUpgradeBonus(-16,  90, 90, 0)),
            new Spawn(2, new WeaponUpgradeBonus(-16, 110, 90, 0)),
            new Spawn(0, new FishingEvent()),

            new Spawn(1, Enemy.lightCat(50)),
            new Spawn(1, new ChinaEvent()),
            new Spawn(1, Enemy.lightCat(WIDTH - 50 - 16)),
            new Spawn(3, new FishingEvent()),

            new Spawn(0.1, Enemy.lightCat(20)),
            new Spawn(0.1, Enemy.lightCat(40)),
            new Spawn(0.1, Enemy.lightCat(60)),
            new Spawn(0.1, Enemy.lightCat(80)),
            new Spawn(0.1, new InvulnerabilityBonus(WIDTH * 0.5 - 8, -16, 0, 90)),
            new Spawn(0.1, Enemy.lightCat(100)),
            new Spawn(0.1, Enemy.lightCat(120)),
            new Spawn(0.1, Enemy.lightCat(140)),
            new Spawn(0.1, Enemy.lightCat(160)),

            new Spawn(1, new ChinaEvent()),

            new Spawn(1, Enemy.dj(-16, 26, 100)),
            new Spawn(0.1, Enemy.small(90, 1)),
            new Spawn(0.1, Enemy.lightCat(160)),
            new Spawn(0.1, Enemy.small(10, 1)),
            new Spawn(0.2, Enemy.bomj(0, 0.5, 0.8, 1)),
            new Spawn(0, Enemy.big(150, 0.5)),
            new Spawn(0, Enemy.big(110, 0.5)),
            new Spawn(0, Enemy.big(10, 0.5)),
            new Spawn(0.1, Enemy.small(145, 1)),
            new Spawn(0, Enemy.big(70, 0.5)),
            new Spawn(0, Enemy.big(30, 0.5)),
            new Spawn(0.5, Enemy.lightCat(30)),
            new Spawn(0.5, Enemy.lightCat(90)),
            new Spawn(0.2, Enemy.bomj(100, 0, 0.8, 1)),
            new Spawn(0.5, Enemy.lightCat(120)),
            new Spawn(0.1, Enemy.small(10, 1)),
            new Spawn(0.5, Enemy.lightCat(120)),
            new Spawn(0.7, new FishingEvent()),
            new Spawn(0.5, new WeaponUpgradeBonus(50, -16, 40, 20)),
            new Spawn(1, new WaitForAllEnemiesKilled()),

            new Spawn(0, Enemy.soldier(40, -16, 0, 100, 0.5)),
            new Spawn(0, Enemy.soldier(80, -16, 0, 100, 0.5)),
            new Spawn(0, Enemy.soldier(120, -16, 0, 100, 0.5)),

            new Spawn(1, new WaitForAllEnemiesKilled()),

            new Spawn(0.1, new HealingBonus(60, -16, 0, 60)),
            new Spawn(5, new HealingBonus(140, -16, 0, 60)),

            new Spawn(0, Enemy.big(150, 0.5)),
            new Spawn(0, Enemy.big(110, 0.5)),
            new Spawn(0, Enemy.big(10, 0.5)),
            new Spawn(0.1, Enemy.small(145, 1)),
            new Spawn(0, Enemy.big(70, 0.5)),
            new Spawn(0, Enemy.big(30, 0.5)),
            new Spawn(0.5, Enemy.lightCat(30)),
            new Spawn(0.1, Enemy.middle(30,  0.5)),
            new Spawn(0.1, Enemy.middle(50,  0.6)),
            new Spawn(0.1, Enemy.middle(70,  0.7)),
            new Spawn(0.1, Enemy.middle(90,  0.8)),
            new Spawn(0.1, Enemy.middle(110, 0.9)),
            new Spawn(0.1, Enemy.middle(130, 1.0)),
            new Spawn(0.1, Enemy.middle(150, 1.1)),
            new Spawn(0.1, Enemy.middle(180, 1.2)),
            new Spawn(0.1, Enemy.middle(210, 1.3)),
            new Spawn(0, Enemy.soldier(80, -16, 0, 100, 0.5)),
            new Spawn(0, Enemy.soldier(120, -16, 0, 100, 0.5)),
            new Spawn(0, Enemy.soldier(150, -16, 0, 100, 0.5)),

            new Spawn(1, new WaitForAllEnemiesKilled()),
            new Spawn(0, new WinCondition()),

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

                    } else if (thing instanceof WinCondition) {
                        game.state = GAME_WIN

                    } else {
                        throw "Unknown thing"
                    }
                }
            }
        }
    }
}
