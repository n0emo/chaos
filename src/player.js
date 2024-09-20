import { Bullet } from "./bullet.js"
import { Game } from "./game.js"
import { pool, renderer, state } from "./global.js"

export class Player {
    /** @type {number} */
    x
    /** @type {number} */
    y
    /** @type {Game} */
    game

    /**
     * @param {Game} game
     */
    constructor(game) {
        this.x = 0
        this.y = 0
        this.game = game
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.x = state.mouseX
        this.y = state.mouseY

        if (state.isMousePressed) {
            const bullet = pool.createBullet(this.x, this.y, 0, -500)
            this.game.spawnBullet(bullet)
        }
    }

    draw() {
        renderer.fillRectangle(state.mouseX - 25, state.mouseY - 25, 50, 50, "#E03030")
    }
}
