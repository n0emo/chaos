import { Player } from "./player.js"
import { Bullet } from "./bullet.js"
import { Enemy } from "./enemy.js"
import { Explosion } from "./explosion.js"
import { Circle } from "./shape.js"
import { areCirclesCollide, areRectangleCircleCollide, areRectanglesCollide } from "./math.js"
import { Level } from "./level.js"
import { Particle } from "./particle.js"
import { pool, renderer, state } from "./global.js"
import { Event } from "./event.js"
import { HEIGHT, WIDTH } from "./constants.js"
import { Bonus } from "./bonus.js"
import { Ray, RayAnimation } from "./laser.js" 
import { Background } from "./background.js"
import { assets } from "./assets.js"

const GAME_MENU = 0
const GAME_GAME = 1
const GAME_PAUSE = 2
const GAME_SCORE_SCREEN = 3

const PUNISHMENTS = [
    "imageBulletBigBallBlue",
    "imageBulletBigBallGreen",
    "imageBulletBigBallPurple",
    "imageBulletBigBallRed",
    "imageBulletCowBlue",
    "imageBulletCowGreen",
    "imageBulletCowPurple",
    "imageBulletCowRed",
    "imageBulletMiddleBallBlue",
    "imageBulletMiddleBallGreen",
    "imageBulletMiddleBallPurple",
    "imageBulletMiddleBallRed",
    "imageBulletMusicalNoteBlue",
    "imageBulletMusicalNoteGreen",
    "imageBulletMusicalNotePurple",
    "imageBulletMusicalNoteRed",
    "imageBulletSeriousBallBlue",
    "imageBulletSeriousBallGreen",
    "imageBulletSeriousBallPurple",
    "imageBulletSeriousBallRed",
    "imageBulletSmallBallBlue",
    "imageBulletSmallBallGreen",
    "imageBulletSmallBallPurple",
    "imageBulletSmallBallRed",
]

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
    /** @type {Ray[]} */
    rays
    /** @type {RayAnimation[]} */
    rayAnimations
    /** @type {Bonus[]} */
    bonuses
    /** @type {Particle[]} */
    particles
    /** @type {?Event} */
    event
    /** @type {GameState} */
    state
    /** @type {?Circle} */
    cleaner
    /** @type {number} */
    cleanerTimer
    /** @type {number} */
    pressEnterTime
    /** @type {Background} */
    background
    /** @type {?HTMLAudioElement} */
    currentMusic
    /** @type {boolean} */
    musicStarted

    constructor() {
        this.bullets = []
        this.player = new Player()
        this.enemies = []
        this.level = new Level()
        this.explosions = []
        this.rays = []
        this.rayAnimations = []
        this.bonuses = []
        this.particles = []
        this.event = null
        this.state = GAME_MENU
        this.cleaner = null
        this.cleanerTimer = 0
        this.pressEnterTime = 0
        this.background = new Background(assets.imageLevel1)
        this.musicStarted = false
        this.startMusic().catch((e) => {})
    }

    async startMusic() {
        if (!this.musicStarted) {
            await this.playMusic(assets.audioMenuTheme)
            this.musicStarted = true
        }
    }

    /**
     * @param {HTMLAudioElement} music
     * @returns {Promise<void>}
     */
    playMusic(music) {
        this.currentMusic?.pause()
        this.currentMusic = music
        this.currentMusic.currentTime = 0
        this.currentMusic.volume = 0.35
        this.currentMusic.preload = 'auto'
        this.currentMusic.loop = true
        return this.currentMusic.play()
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
        this.pressEnterTime += dt
        if (state.isKeyPressed("Enter")) {
            this.state = GAME_GAME
            this.playMusic(assets.audioMainTheme).catch((e) => {})
        }
    }

    /**
     * @param {number} dt
     */
    updateGameLogic(dt) {
        this.background.update(dt)
        this.level.update(dt)
        this.player.update(dt)
        this.updateEnemies(dt)
        this.updateBonuses(dt)
        this.updateCleaner(dt)
        this.updateBullets(dt)
        this.updateLasers(dt)
        this.updateExplosions(dt)
        this.updateParticles(dt)
    }

    /**
     * @param {number} dt
     */
    updateEnemies(dt) {
        let i = this.enemies.length
        while (i--) {
            const enemy = this.enemies[i]
            enemy.update(dt)
            if (!enemy.isAlive) {
                enemy.explode(this.explosions, this.particles)
                this.enemies.splice(i, 1)
            }
        }
    }

    /**
     * @param {number} dt
     */
    updateCleaner(dt) {
        this.cleanerTimer -= dt
        if (this.cleanerTimer <= 0) {
            this.cleanerTimer = 0
            this.cleaner = null
        }

        if (!this.cleaner) {
            return
        }

        this.cleaner.radius += 250 * dt
    }

    /**
     * @param {number} dt
     */
    updateBullets(dt) {
        // TODO: refactor
        let i = this.bullets.length
        while (i--) {
            const bullet = this.bullets[i]

            if (!bullet.isAlive) {
                pool.releaseBullet(this.bullets[i])
                this.bullets.splice(i, 1)
                continue
            }

            bullet.update(dt)

            let hit = false

            switch (bullet.tag) {
                case "player":
                    for (const enemy of this.enemies) {
                        if (areRectangleCircleCollide(enemy.rect, bullet.circle)) {
                            enemy.recieveDamage(bullet.damage)
                            hit = true
                            break
                        }
                    }
                break

                case "enemy":
                    const cleanerCollide = this.cleaner && areCirclesCollide(this.cleaner, bullet.circle)
                    if (cleanerCollide) {
                        hit = true
                        break
                    }

                    const playerCollide = areRectangleCircleCollide(this.player.rect, bullet.circle)
                    if (playerCollide && !this.player.isInvulnerable) {
                        this.player.recieveDamage(bullet.damage)
                        hit = true
                        break
                    }
                    break
            }

            if (hit) {
                this.bullets.splice(i, 1)
                bullet.explode(this.explosions, this.particles)
            }
        }
    }

    /**
     * @param {number} dt
     */
    updateLasers(dt) {
        let ray
        while (ray = this.rays.pop()) {
            switch (ray.tag) {
                case "enemy":
                    if (areRectanglesCollide(ray.rect, this.player.rect)) {
                        this.player.recieveDamage(ray.damage)
                    }
                    break

                case "player":
                    for (const enemy of this.enemies) {
                        if (areRectanglesCollide(ray.rect, enemy.rect)) {
                            enemy.recieveDamage(ray.damage)
                        }
                    }
                    break
            }
        }

        let i = this.rayAnimations.length
        while (i--) {
            const animation = this.rayAnimations[i]
            animation.update(dt)
            if (!animation.isAlive) {
                this.rayAnimations.splice(i, 1)
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
        renderer.context.drawImage(assets.imageMenu, 0, 0, WIDTH, HEIGHT)
        const textPosY = Math.sin(this.pressEnterTime * Math.PI * 0.5) * 20 - 10
        renderer.context.drawImage(assets.imagePressEnterToStart, 0, textPosY, WIDTH, HEIGHT)
    }

    drawGameLogic() {
        this.background.draw()

        if (this.cleaner) {
            renderer.fillCircleCirc(this.cleaner, "#202020")
        }

        for (const bonus of this.bonuses) {
            bonus.draw()
        }

        for (const bullet of this.bullets) {
            bullet.draw()
        }

        for (const ray of this.rayAnimations) {
            ray.draw()
        }

        for (const explosion of this.explosions) {
            explosion.draw()
        }

        for (const particle of this.particles) {
            particle.draw()
        }

        this.player.draw()

        for (const enemy of this.enemies) {
            enemy.draw()
        }

        this.event?.draw()

        renderer.drawText(
            `HP: ${this.player.hp}/${this.player.maxHp}`,
            10, HEIGHT - 10, 10, "white"
        )
    }

    drawPause() {
        renderer.context.drawImage(assets.imagePause, 35, 50)
    }

    /**
     * @param {number} posX
     * @param {number} posY
     */
    startCleaner(posX, posY) {
        this.cleanerTimer = 0.5
        this.cleaner = new Circle(posX, posY, 1)
    }

    punishPlayer() {
        const posX = WIDTH  - this.player.rect.posX
        const posY = HEIGHT - this.player.rect.posY

        for (let i = 0; i < 300; i++) {
            const angle = Math.random() * 2 * Math.PI
            const speed = 500 - 400 * Math.random()
            const velX = Math.cos(angle) * speed
            const velY = Math.sin(angle) * speed
            const image = assets[PUNISHMENTS[Math.floor(Math.random() * PUNISHMENTS.length)]]
            this.bullets.push(pool.createBullet( posX, posY, velX, velY, "enemy", 1, image))
        }
    }
}

