import { pool, renderer } from "./global.js"
import { Circle } from "./shape.js"

export class Explosion {
    /** @type {number} */
    timer
    /** @type {Circle} */
    circ
    /** @type {number} */
    speed

    /**
     * @param {number} lifetime
     * @param {number} posX
     * @param {number} posY
     * @param {number} speed
     */
    constructor(lifetime, posX, posY, speed) {
        this.timer = lifetime
        this.circ = new Circle(posX, posY, 1)
        this.speed = speed
    }

    /**
     * @param {number} posX
     * @param {number} posY
     * @returns Explosion
     */
    static small(posX, posY) {
        return pool.createExplosion(0.1, posX, posY, 100)
    }

    /**
     * @param {number} posX
     * @param {number} posY
     * @returns Explosion
     */
    static medium(posX, posY) {
        return pool.createExplosion(0.3, posX, posY, 200)
    }

    /**
     * @param {number} posX
     * @param {number} posY
     * @returns Explosion
     */
    static big(posX, posY) {
        return pool.createExplosion(0.7, posX, posY, 500)
    }

    /** @type {boolean} */
    get isEnd() { return this.timer <= 0 }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.timer -= dt
        if (this.timer < 0) {
            this.timer = 0
            return
        }

        this.circ.radius += this.speed * dt
    }

    draw() {
        renderer.fillCircleCirc(this.circ, "orange")
    }
}
