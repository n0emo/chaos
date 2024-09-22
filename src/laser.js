import { HEIGHT } from "./constants.js"
import { renderer } from "./global.js"
import { Rectangle } from "./shape.js"

/** @typedef {import("./bullet.js").Tag} Tag */

export class Ray {
    /** @type {Rectangle} */
    rect
    /** @type {number} */
    damage
    /** @type {Tag} */
    tag

    /**
    * @param {number} startX
    * @param {number} startY
    * @param {"up" | "down"} direction
    * @param {number} size
    * @param {number} damage
    * @param {Tag} tag
    */
    constructor(startX, startY, direction, size, damage, tag) {
        this.rect = new Rectangle(0, 0, 0, 0)
        this.rect.width = size
        this.rect.centerX = startX

        if (direction == "up") {
            this.rect.top = -HEIGHT
            this.rect.bottom = startY
        } else {
            this.rect.top = startY
            this.rect.bottom = HEIGHT
        }

        this.damage = damage
        this.tag = tag
    }
}

export class RayAnimation {
    /** @type {Ray} */
    ray
    /** @type {number} */
    timer
    /** @type {number} */
    waitTimer
    /** @type {number} */
    speed

    /**
     * @param {Ray} ray
     * @param {number} lifetime
     */
    constructor(ray, lifetime) {
        this.ray = ray
        this.timer = lifetime * 0.5
        this.waitTimer = lifetime * 0.5
        this.speed = ray.rect.width / lifetime * 2
    }

    get isAlive() { return this.timer > 0 }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.waitTimer -= dt
        if (this.waitTimer <= 0) {
            this.waitTimer = 0
        } else {
            return
        }

        this.timer -= dt
        if (this.timer <= 0) {
            this.timer = 0
        }

        this.ray.rect.width -= this.speed * dt
        this.ray.rect.posX += this.speed * 0.5 * dt
    }

    draw() {
        renderer.fillRectangleRec(this.ray.rect, "orange")
    }
}
