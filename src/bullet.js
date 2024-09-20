import { renderer } from "./global.js"

export class Bullet {
    /** @type {number} */
    posX
    /** @type {number} */
    posY
    /** @type {number} */
    velX
    /** @type {number} */
    velY
    /** @type {number} */
    timer

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} velX
     * @param {number} velY
     **/
    constructor(posX, posY, velX, velY) {
        this.posX = posX
        this.posY = posY
        this.velX = velX
        this.velY = velY
        this.timer = 1
    }

    reset() {
        this.timer = 1
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.posX += this.velX * dt
        this.posY += this.velY * dt

        this.timer -= dt
        if (this.timer < 0) {
            this.timer = 0
        }
    }

    draw() {
        renderer.fillRectangle(this.posX, this.posY, 10, 10, "red")
    }

    get isAlive() {
        return this.timer > 0
    }
}
