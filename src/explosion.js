import { renderer } from "./global.js"
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
