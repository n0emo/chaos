import { Player } from "./player.js"
import { Bullet } from "./bullet.js"
import { Enemy } from "./enemy.js"
import { Explosion } from "./explosion.js"
import { Circle, Rectangle, areRectangleCircleCollide, areRectanglesCollide } from "./shape.js"
import { Level } from "./level.js"
import { Particle } from "./particle.js"
import { pool, renderer, state } from "./global.js"

export class Game {
    /** @type {Player} */
    player
    /** @type {Bullet[]} */
    bullets
    /** @type {Enemy[]} */
    enemies
    /** @type {Level} */
    level
    /** @type {Explosion[]} */
    explosions
    /** @type {Particle[]} */
    particles

    constructor() {
        this.bullets = []
        this.player = new Player(this)
        this.enemies = []
        this.level = new Level(this)
        this.explosions = []
        this.particles = []
    }

    /**
     * @returns Game
     */
    static load() {
        const game = new Game()
        // TODO
        return game
    }

    save() {
        // TODO
    }

    run() {
        let lastLoopTime = Date.now()
        const fpses = new Array(100).fill(0)
        let fpsIndex = 0

        const mainLoop = () => {
            const nextLoopTime = Date.now()
            const dt = (nextLoopTime - lastLoopTime) * 0.001
            lastLoopTime = nextLoopTime

            this.update(dt)
            this.draw()

            state.update()

            fpses[fpsIndex] = 1 / dt
            fpsIndex++
            if (fpsIndex >= fpses.length) {
                fpsIndex = 0
            }

            const fps = fpses.reduce((a, b) => a + b) / fpses.length

            renderer.drawText(`FPS: ${Math.floor(fps)}`, 10, 50, 48, "white")

            this.save()
            window.requestAnimationFrame(mainLoop)
        }

        window.requestAnimationFrame(mainLoop)
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.level.update(dt)

        this.player.update(dt)

        for (const bullet of this.bullets) {
            bullet.update(dt)
        }

        for (const enemy of this.enemies) {
            enemy.update(dt)
        }

        let i = this.particles.length
        while (i--) {
            const particle = this.particles[i]
            particle.update(dt)
            if (!particle.isAlive) {
                pool.releaseParticle(particle)
                this.particles.splice(i, 1)
            }
        }

        i = this.explosions.length
        while (i--) {
            const explosion = this.explosions[i]
            explosion.update(dt)
            if (explosion.isEnd) {
                pool.releaseExplosion(explosion)
                this.explosions.splice(i, 1)
            }
        }

        i = this.enemies.length
        while (i--) {
            const enemy = this.enemies[i]
            let remove = false
            for (let j = 0; j < this.bullets.length; j++) {
                const bullet = this.bullets[j]
                const collide = areRectangleCircleCollide(enemy.rect, bullet.circle)
                const foreign = bullet.tag != "enemy"
                if (collide && foreign) {
                    remove = enemy.recieveDamage(bullet.damage)
                    this.bullets.splice(j, 1)
                    bullet.explode(this.explosions, this.particles)
                    if (remove) {
                        break
                    }
                }
            }

            if (remove) {
                enemy.explode(this.explosions, this.particles)
                this.enemies.splice(i, 1)
            }
        }

        i = this.bullets.length
        while (i--) {
            if (!this.bullets[i].isAlive) {
                pool.releaseBullet(this.bullets[i])
                this.bullets.splice(i, 1)
            }
        }
    }

    draw() {
        renderer.clearBackground("#181840")

        this.player.draw()

        for (const enemy of this.enemies) {
            enemy.draw()
        }

        for (const bullet of this.bullets) {
            bullet.draw()
        }

        for (const explosion of this.explosions) {
            explosion.draw()
        }

        for (const particle of this.particles) {
            particle.draw()
        }
    }
}

