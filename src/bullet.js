import { Circle } from "./shape.js"
import { Explosion } from "./explosion.js"
import { generateParticles, Particle } from "./particle.js"
import { pool, renderer } from "./global.js"

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

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} velX
     * @param {number} velY
     * @param {Tag} tag
     * @param {number} damage
     **/
    constructor(posX, posY, velX, velY, tag, damage) {
        this.circle = new Circle(posX, posY, 10)
        this.velX = velX
        this.velY = velY
        this.tag = tag
        this.timer = BULLET_LIFETIME
        this.damage = damage
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
        renderer.fillCircleCirc(this.circle, "red")
    }

    get isAlive() {
        return this.timer > 0
    }

    /**
     * @param {Explosion[]} explosions
     * @param {Particle[]} particles
     */
    explode(explosions, particles) {
        const explosion = pool.createExplosion(0.1, this.circle.posX, this.circle.posY, 200)
        generateParticles(particles, this.circle.posX, this.circle.posY, "yellow", 10)
        explosions.push(explosion)
    }
}
