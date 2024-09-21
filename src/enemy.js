import { renderer } from "./global.js"
import { Rectangle } from "./shape.js"

export class Enemy {
    /** @type {Rectangle} */
    rect
    /** @type {number} */
    velX
    /** @type {number} */
    velY
    /** @type {number} */
    moveTimer

    /**
     * @param {Rectangle} rect
     */
    constructor(rect) {
        this.rect = rect
        this.velX = 0
        this.velY = 100
        this.moveTimer = 1
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.moveTimer -= dt
        if (this.moveTimer <= 0) {
            this.moveTimer = 0
            return
        }

        this.rect.posX += this.velX * dt
        this.rect.posY += this.velY * dt
    }

    draw() {
        renderer.fillRectangleRec(this.rect, "#A0A050")
    }
}
