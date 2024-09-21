import { pool, renderer } from "./global.js"

export class Particle {
    /** @type {number} */
    posX
    /** @type {number} */
    posY
    /** @type {number} */
    velX
    /** @type {number} */
    velY
    /** @type {string} */
    color
    /** @type {number} */
    timer

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} velX
     * @param {number} velY
     * @param {string} color
     * @param {number} lifetime
     */
    constructor(posX, posY, velX, velY, color, lifetime) {
        this.posX = posX
        this.posY = posY
        this.velX = velX
        this.velY = velY
        this.color = color
        this.timer = lifetime
    }

    /** @type {boolean} */
    get isAlive() { return this.timer > 0 }

    /**
     * @param {number} dt
     */
    update(dt) {
        const newX = this.posX + this.velX * dt
        if (newX < 0 || newX > renderer.canvas.width) {
            this.velX *= -1
        }
        this.posX += this.velX * dt

        const newY = this.posY + this.velY * dt
        if (newY < 0 || newY > renderer.canvas.height) {
            this.velY *= -1
        }
        this.posY += this.velY * dt

        this.timer -= dt
    }

    draw() {
        renderer.fillRectangle(this.posX - 2, this.posY - 2, 4, 4, this.color)
    }
}

/**
 * @param {Particle[]} particles
 * @param {number} posX
 * @param {number} posY
 * @param {string} color
 * @param {number} amount
 */
export function generateParticles(particles, posX, posY, color, amount) {
    for(let i = 0; i < amount; i++) {
        const angle = Math.PI * 2 * Math.random()
        const speed = 100 + 400 * Math.random()
        const lifetime = 0.3 + 4.7 * Math.random()
        const particle = pool.createParticle(
            posX, posY,
            Math.cos(angle) * speed, Math.sin(angle) * speed,
            color, lifetime
        )

        particles.push(particle)
    }
}
