import { Circle } from "./shape.js"
import { Explosion } from "./explosion.js"
import { generateParticles, Particle } from "./particle.js"
import { renderer } from "./global.js"

const BULLET_LIFETIME = 5

/** @typedef {"player" | "enemy"} Tag */

export class Bullet {
    /** @type {Circle} */
    circle
    /** @type {number} */
    velX
    /** @type {number} */
    velY
    /** @type {Tag} */
    tag
    /** @type {number} */
    damage
    /** @type {number} */
    timer
    /** @type {HTMLImageElement} */
    image

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} velX
     * @param {number} velY
     * @param {Tag} tag
     * @param {number} damage
     * @param {HTMLImageElement} image
     **/
    constructor(posX, posY, velX, velY, tag, damage, image) {
        this.circle = new Circle(posX, posY, image.width / 2)
        this.velX = velX
        this.velY = velY
        this.tag = tag
        this.timer = BULLET_LIFETIME
        this.damage = damage
        this.image = image
    }

    reset() {
        this.timer = BULLET_LIFETIME
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.circle.posX += this.velX * dt
        this.circle.posY += this.velY * dt

        this.timer -= dt
        if (this.timer < 0) {
            this.timer = 0
        }
    }

    draw() {
        renderer.context.drawImage(
            this.image,
            this.circle.posX - this.circle.radius * 2,
            this.circle.posY - this.circle.radius * 2,
        )
    }

    get isAlive() {
        return this.timer > 0
    }

    /**
     * @param {Explosion[]} explosions
     * @param {Particle[]} particles
     */
    explode(explosions, particles) {
        const explosion = Explosion.small(this.circle.posX, this.circle.posY)
        generateParticles(particles, this.circle.posX, this.circle.posY, "yellow", 10)
        explosions.push(explosion)
    }
}
