import { Bullet } from "./bullet.js"
import { Rectangle } from "./shape.js"
import { Game } from "./game.js"
import { pool, renderer, state } from "./global.js"

export class Player {
    /** @type {Rectangle} */
    rect
    /** @type {Game} */
    game

    /**
     * @param {Game} game
     */
    constructor(game) {
        this.rect = new Rectangle(0, 0, 50, 50)
        this.game = game
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.rect.centerX = state.mouseX
        this.rect.centerY = state.mouseY

        if (state.isMousePressed) {
            const bullet = pool.createBullet(
                this.rect.centerX,
                this.rect.top,
                0,
                -500,
                "player"
            )
            this.game.spawnBullet(bullet)
        }
    }

    draw() {
        renderer.fillRectangleRec(this.rect, "#E03030")
    }
}
