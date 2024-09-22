import { Player } from "./player.js"
import { Bullet } from "./bullet.js"
import { Enemy } from "./enemy.js"
import { Explosion } from "./explosion.js"
import { areRectangleCircleCollide, areRectanglesCollide } from "./shape.js"
import { Level } from "./level.js"
import { Particle } from "./particle.js"
import { pool, renderer, state } from "./global.js"
import { Event } from "./event.js"
import { HEIGHT } from "./constants.js"
import { Bonus } from "./bonus.js"

const GAME_MENU = 0
const GAME_GAME = 1
const GAME_PAUSE = 2
const GAME_SCORE_SCREEN = 3

/** @typedef {GAME_MENU | GAME_GAME | GAME_PAUSE | GAME_SCORE_SCREEN} GameState */

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
    /** @type {Bonus[]} */
    bonuses
    /** @type {Particle[]} */
    particles
    /** @type {?Event} */
    event
    /** @type {GameState} */
    state

    constructor() {
        this.bullets = []
        this.player = new Player()
        this.enemies = []
        this.level = new Level()
        this.explosions = []
        this.bonuses = []
        this.particles = []
        this.event = null
        this.state = GAME_GAME
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

            renderer.drawText(`FPS: ${Math.floor(fps)}`, 10, 10, 10, "white")

            this.save()
            window.requestAnimationFrame(mainLoop)
        }

        window.requestAnimationFrame(mainLoop)
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        switch (this.state) {
            case GAME_MENU:
                this.updateMenu(dt)
                break

            case GAME_GAME:
                if (state.isKeyPressed("Escape")) {
                    this.state = GAME_PAUSE
                    return
                }

                this.event?.update(dt)
                if (this.event?.isEnd ?? false) {
                    this.event = null
                }

                if (this.event == null || !this.event.isPauses) {
                    this.updateGameLogic(dt)
                }
                break

            case GAME_PAUSE:
                if (state.isKeyPressed("Escape")) {
                    this.state = GAME_GAME
                    return
                }
                break
        }
    }

    /**
     * @param {number} dt
     */
    updateMenu(dt) {
        if (state.isKeyPressed("Enter")) {
            this.state = GAME_GAME
        }
    }

    /**
     * @param {number} dt
     */
    updateGameLogic(dt) {
        this.level.update(dt)
        this.player.update(dt)
        this.updateEnemies(dt)
        this.updateBonuses(dt)
        this.updateBullets(dt)
        this.updateExplosions(dt)
        this.updateParticles(dt)
    }

    /**
     * @param {number} dt
     */
    updateEnemies(dt) {
        for (const enemy of this.enemies) {
            enemy.update(dt)
        }
    }

    /**
     * @param {number} dt
     */
    updateBullets(dt) {
        let i = this.bullets.length
        while (i--) {
            const bullet = this.bullets[i]
            bullet.update(dt)
            let j = this.enemies.length
            let hit = false
            while (j--) {
                const enemy = this.enemies[j]
                const collide = areRectangleCircleCollide(enemy.rect, bullet.circle)
                const foreign = bullet.tag != "enemy"
                if (collide && foreign) {
                    enemy.recieveDamage(bullet.damage)
                    hit = true

                    if (!enemy.isAlive) {
                        enemy.explode(this.explosions, this.particles)
                        this.enemies.splice(j, 1)
                    }
                    break
                }
            }


            const collide = areRectangleCircleCollide(this.player.rect, bullet.circle)
            const enemys = bullet.tag === "enemy"
            if (collide && enemys && !hit && !this.player.isInvulnerable) {
                this.player.recieveDamage(bullet.damage)
                hit = true
            }

            if (hit) {
                this.bullets.splice(i, 1)
                bullet.explode(this.explosions, this.particles)
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

    /**
     * @param {number} dt
     */
    updateExplosions(dt) {
        let i = this.explosions.length
        while (i--) {
            const explosion = this.explosions[i]
            explosion.update(dt)
            if (explosion.isEnd) {
                pool.releaseExplosion(explosion)
                this.explosions.splice(i, 1)
            }
        }
    }

    /**
     * @param {number} dt
     */
    updateBonuses(dt) {
        let i = this.bonuses.length
        while (i--) {
            const bonus = this.bonuses[i]
            bonus.update(dt)
            if (areRectanglesCollide(this.player.rect, bonus.rect)) {
                bonus.pickup()
                this.bonuses.splice(i, 1)
            }
        }
    }

    /**
     * @param {number} dt
     */
    updateParticles(dt) {
        while (this.particles.length > 10000) {
            this.particles.splice(0, 1)
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
    }

    draw() {
        switch (this.state) {
            case GAME_MENU:
                this.drawMenu()
                break
            case GAME_GAME:
                this.drawGameLogic()
                break
            case GAME_PAUSE:
                this.drawGameLogic()
                this.drawPause()
                break
        }
    }

    drawMenu() {
        renderer.clearBackground("#181818")
        renderer.drawText("Excuse me, what?", 10, 30, 20, "#FFFFFF")
        renderer.drawText("Press enter to start", 10, 60, 20, "#FFFFFF")
    }

    drawGameLogic() {
        renderer.clearBackground("#181840")

        this.player.draw()

        for (const enemy of this.enemies) {
            enemy.draw()
        }

        for (const bonus of this.bonuses) {
            bonus.draw()
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

        this.event?.draw()

        renderer.drawText(
            `HP: ${this.player.hp}/${this.player.maxHp}`,
            10, HEIGHT - 10,
            10, "white"
        )
    }

    drawPause() {
        renderer.drawText("PAUSE", 50, 50, 50, "#FFFFFF")
    }
}

