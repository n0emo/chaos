import { Player } from "./player.js"
import { Bullet } from "./bullet.js"
import { pool, renderer, state } from "./global.js"

export class Game {
    /** @private @type {Player} */
    player
    /** @private @type {Bullet[]} */
    bullets

    constructor() {
        this.bullets = []
        this.player = new Player(this)
    }

    run() {
        let lastLoopTime = Date.now()

        const mainLoop = () => {
            const nextLoopTime = Date.now()
            const dt = (nextLoopTime - lastLoopTime) * 0.001
            lastLoopTime = nextLoopTime

            this.update(dt)
            this.draw()

            state.update()
            window.requestAnimationFrame(mainLoop)
        }

        window.requestAnimationFrame(mainLoop)
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.player.update(dt)
        for (const bullet of this.bullets) {
            bullet.update(dt)
        }

        let i = this.bullets.length
        while(i--) {
            if (!this.bullets[i].isAlive) {
                pool.releaseBullet(this.bullets[i])
                this.bullets.splice(i, 1)
            }
        }
    }

    draw() {
        renderer.clearBackground("#181840")

        this.player.draw()
        for (const bullet of this.bullets) {
            bullet.draw()
        }
    }

    /**
     * @param {Bullet} bullet 
     */
    spawnBullet(bullet) {
        this.bullets.push(bullet)
    }
}
