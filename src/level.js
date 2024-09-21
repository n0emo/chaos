import { Enemy, } from "./enemy.js"
import { game, renderer } from "./global.js"

export class EnemySpawn {
    /** @type {number} */
    time
    /** @type {Enemy} */
    enemy

    /**
     * @param {number} time
     * @param {Enemy} enemy
     */
    constructor(time, enemy) {
        this.time = time
        this.enemy = enemy
    }
}

export class Level {
    /** @type {EnemySpawn[]} */
    enemiesToSpawn

    eventsToSpawn

    /** @type {number} */
    enemyTimer
    /** @type {number} */
    eventTimer

    constructor() {
        const width  = renderer.context.canvas.width
        const height = renderer.context.canvas.height

        this.enemiesToSpawn = [
            new EnemySpawn(0.5, Enemy.basic(             100, 200, 0.5 )),
            new EnemySpawn(0.5, Enemy.basic(             200, 200, 0.75)),
            new EnemySpawn(0.5, Enemy.basic(width * 0.5 - 25, 200, 1   )),
            new EnemySpawn(0.5, Enemy.basic(     width - 250, 200, 0.75)),
            new EnemySpawn(2,   Enemy.basic(     width - 150, 200, 0.5 )),

            new EnemySpawn(1,   Enemy.shooterSimple(       -50,  200,  300, 0)),
            new EnemySpawn(1,   Enemy.shooterSimple(width + 50,  200, -300, 0)),
            new EnemySpawn(1,   Enemy.shooterSimple(       -50,  300,  300, 0)),
            new EnemySpawn(2,   Enemy.shooterSimple(width + 50,  300, -300, 0)),

            new EnemySpawn(0.5, Enemy.shooterHoming(       -50, -50,  150, 150, 1  )),
            new EnemySpawn(0.5, Enemy.shooterHoming(     width, -50, -150, 150, 1  )),
            new EnemySpawn(0.5, Enemy.shooterHoming(        20, -50,  150, 150, 1.5)),
            new EnemySpawn(0.5, Enemy.shooterHoming(width - 70, -50, -150, 150, 1.5)),
        ].reverse()

        this.eventsToSpawn = []
        this.enemyTimer = 0
        this.eventTimer = 0
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.enemyTimer -= dt

        if (this.enemyTimer <= 0) {
            this.enemyTimer = 0
            while (this.enemiesToSpawn.length > 0 && this.enemyTimer === 0) {
                const spawn = this.enemiesToSpawn.pop()
                if (spawn) {
                    game.enemies.push(spawn.enemy)
                    this.enemyTimer = spawn.time
                }
            }
        }
    }
}
