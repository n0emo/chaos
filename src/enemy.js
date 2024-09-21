import { Rectangle } from "./shape.js"
import { Animation } from "./animation.js"
import { Explosion } from "./explosion.js"
import { Game } from "./game.js"
import { Weapon } from "./weapon.js"
import { generateParticles, Particle } from "./particle.js"
import { assets } from "./global.js"

export class Enemy {
    /** @type {Rectangle} */
    rect
    /** @type {number} */
    hp
    /** @type {Game} */
    game
    /** @type {EnemyMovement} */
    movement
    /** @type {?EnemyWeapon} */
    weapon
    /** @type {Animation} */
    animation

    /**
     * @param {Rectangle} rect
     * @param {Game} game
     * @param {EnemyMovement} movement
     * @param {?EnemyWeapon} weapon
     */
    constructor(rect, game, movement, weapon = null) {
        this.rect = rect
        this.velX = 0
        this.velY = 100
        this.moveTimer = 1
        this.hp = 2
        this.game = game
        this.movement = movement
        this.movement.enemy = this
        this.weapon = weapon
        if (this.weapon) {
            this.weapon.enemy = this
        }

        const images = [assets.enemy1Image, assets.enemy2Image]
        this.animation = new Animation(images, 1)
    }

    /** @type {boolean} */
    get isAlive() { return this.hp > 0 }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.movement.update(dt)
        this.weapon?.update(dt)
        this.animation.update(dt)
    }

    draw() {
        this.animation.draw(this.rect.posX, this.rect.posY)
        this.weapon?.draw()
    }

    /**
     * @param {number} damage
     */
    recieveDamage(damage) {
        this.hp -= damage
        if (this.hp < 0) {
            this.hp = 0
        }
    }

    /**
     * @param {Explosion[]} explosions
     * @param {Particle[]} particles
     */
    explode(explosions, particles) {
        const explosion = Explosion.medium(this.rect.centerX, this.rect.centerY)
        generateParticles(particles, this.rect.centerX, this.rect.centerY, "yellow", 200)
        explosions.push(explosion)
    }
}

export class EnemyMovement {
    /** @type {?Enemy} enemy */
    enemy

    constructor() {
        this.enemy = null

        if (this.constructor == EnemyMovement) {
            throw "Cannot instantiate abstract class"
        }
    }

    /**
     * @param {number} _dt
     */
    update(_dt) {
        throw "not implemented"
    }
}

export class OneDirectionalMovement extends EnemyMovement {
    /** @type {number} */
    velX
    /** @type {number} */
    velY
    /** @type {number} */
    moveTimer

    /**
     * @param {number} velX
     * @param {number} velY
     * @param {number} time
     */
    constructor(velX, velY, time) {
        super()
        this.velX = velX
        this.velY = velY
        this.moveTimer = time
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.moveTimer -= dt
        if (this.moveTimer <= 0) {
            this.moveTimer = 0
            return
        }

        if (this.enemy) {
            this.enemy.rect.posX += this.velX * dt
            this.enemy.rect.posY += this.velY * dt
        }
    }
}

export class EnemyWeapon {
    /** @type {?Enemy} */
    enemy
    /** @type {Weapon} */
    weapon
    /** @type {Game} */
    game

    /**
     * @param {Weapon} weapon
     * @param {Game} game
     */
    constructor(weapon, game) {
        this.weapon = weapon
        this.game = game
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.weapon.update(dt)
        if (this.enemy) {
            this.weapon.posX = this.enemy.rect.centerX
            this.weapon.posY = this.enemy.rect.centerY
        }
        this.weapon.shoot(this.game.bullets)
    }

    draw() {

    }
}
