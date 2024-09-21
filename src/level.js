import { Game } from "./game.js"
import { Enemy } from "./enemy.js"
import { Rectangle } from "./shape.js"

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
    /** @type {Game} */
    game

    /** @type {EnemySpawn[]} */
    enemiesToSpawn

    eventsToSpawn

    /** @type {number} */
    enemyTimer
    /** @type {number} */
    eventTimer

    /**
     * @param {Game} game
     */
    constructor(game) {
        this.game = game

        this.enemiesToSpawn = [
            new EnemySpawn(0, new Enemy(new Rectangle(100, 0, 50, 50))),
            new EnemySpawn(1, new Enemy(new Rectangle(200, 0, 50, 50))),
            new EnemySpawn(3, new Enemy(new Rectangle(300, 0, 50, 50))),
            new EnemySpawn(0, new Enemy(new Rectangle(400, 0, 50, 50))),
            new EnemySpawn(1, new Enemy(new Rectangle(500, 0, 50, 50))),
            new EnemySpawn(1, new Enemy(new Rectangle(600, 0, 50, 50))),
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
                    this.game.enemies.push(spawn.enemy)
                    this.enemyTimer = spawn.time
                }
            }
        }
    }
}
