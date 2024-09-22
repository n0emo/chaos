import { Rectangle } from "./shape.js"
import { Animation } from "./animation.js"
import { Explosion } from "./explosion.js"
import { DoubleSimpleWeapon, LaserWeapon, SimpleWeapon, Weapon } from "./weapon.js"
import { generateParticles, Particle } from "./particle.js"
import { assets, game } from "./global.js"
import { HEIGHT, WIDTH } from "./constants.js"

export class Enemy {
    /** @type {Rectangle} */
    rect
    /** @type {number} */
    hp
    /** @type {EnemyMovement} */
    movement
    /** @type {?EnemyWeapon} */
    weapon
    /** @type {Animation} */
    animation

    /**
     * @param {Rectangle} rect
     * @param {Animation} animation
     * @param {EnemyMovement} movement
     * @param {?EnemyWeapon} weapon
     */
    constructor(rect, animation, movement, weapon = null) {
        this.rect = rect
        this.velX = 0
        this.velY = 100
        this.moveTimer = 1
        this.hp = 2
        this.movement = movement
        this.movement.enemy = this
        this.weapon = weapon
        if (this.weapon) {
            this.weapon.enemy = this
        }

        this.animation = animation
    }

    /**
     * @param {number} posX
     * @param {number} time
     * @returns Enemy
     */
    static small(posX, time) {
        const rect = new Rectangle(posX, -16, 16, 16)
        const movement = new OneDirectionalMovement(0, 30, time)
        const animation = new Animation([
            assets.imageEnemySmall1,
            assets.imageEnemySmall2,],
            0.5)

        return new Enemy(rect, animation, movement)
    }

    /**
     * @param {number} posX
     * @param {number} time
     * @returns Enemy
     */
    static middle(posX, time) {
        const rect = new Rectangle(posX, -16, 16, 16)
        const movement = new OneDirectionalMovement(0, 50, time)
        const animation = new Animation([
            assets.imageEnemyMiddle1,
            assets.imageEnemyMiddle2,],
            0.5)
        const weapon = new EnemyWeapon(
            new SimpleWeapon(posX, -16, 0, 1, "enemy")
        )

        return new Enemy(rect, animation, movement, weapon)
    }

    /**
     * @param {number} posX
     * @param {number} time
     * @returns Enemy
     */
    static big(posX, time) {
        const rect = new Rectangle(posX, -16, 16, 16)
        const movement = new OneDirectionalMovement(0, 80, time)
        const animation = new Animation([
            assets.imageEnemyBig1,
            assets.imageEnemyBig2,],
            0.5)
        const weapon = new HomingEnemyWeapon(
            new DoubleSimpleWeapon(posX, -16, 0, 1, "enemy", 6)
        )

        return new Enemy(rect, animation, movement, weapon)
    }

    /**
     * @param {number} posX
     * @param {number} dirX
     * @param {number} dirY
     * @param {number} time
     * @returns Enemy
     */
    static bomj(posX, dirX, dirY, time) {
        const rect = new Rectangle(posX, -16, 16, 16)
        const speed = 50
        const movement = new OneDirectionalMovement(
            dirX * speed, dirY * speed, time
        )
        const animation = new Animation([
            assets.imageEnemyBomj1,
            assets.imageEnemyBomj2,],
            0.5)
        const weapon = new HomingEnemyWeapon(
            new SimpleWeapon(posX, -16, 0, 1, "enemy")
        )

        return new Enemy(rect, animation, movement, weapon)
    }

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} dirX
     * @param {number} dirY
     * @returns Enemy
     */
    static caesar(posX, posY, dirX, dirY) {
        const rect = new Rectangle(posX, posY, 16, 16)
        const speed = 80
        const movement = new EndlessMovement(
            dirX * speed, dirY * speed
        )
        const animation = new Animation([assets.imageEnemySalat1], 1)
        const weapon = new HomingEnemyWeapon(
            new LaserWeapon(posX, posY, 0, 1, "enemy", 5)
        )

        return new Enemy(rect, animation, movement, weapon)
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

class EndlessMovement extends EnemyMovement {
    /** @type {number} */
    velX
    /** @type {number} */
    velY

    /**
     * @param {number} velX
     * @param {number} velY
     */
    constructor(velX, velY) {
        super()
        this.velX = velX
        this.velY = velY
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        if (this.enemy) {
            let x = this.enemy.rect.posX + this.velX * dt
            let y = this.enemy.rect.posY + this.velY * dt

            if (x < 0 && this.velX < 0 || x > WIDTH && this.velX > 0) {
                x -= this.velX * dt * 2
                this.velX *= -1
            }

            if (y < 0 && this.velY < 0 || y > HEIGHT && this.velY > 0) {
                y -= this.velY * dt * 2
                this.velY *= -1
            }

            this.enemy.rect.posX = x
            this.enemy.rect.posY = y
        }
    }
}

export class EnemyWeapon {
    /** @type {?Enemy} */
    enemy
    /** @type {Weapon} */
    weapon

    /**
     * @param {Weapon} weapon
     */
    constructor(weapon) {
        this.weapon = weapon
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
        this.weapon.shoot()
    }

    draw() {

    }
}

export class HomingEnemyWeapon extends EnemyWeapon {
    /**
     * @param {Weapon} weapon
     */
    constructor(weapon) {
        super(weapon)
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        super.update(dt)

        if (!this.enemy) {
            return
        }

        const directionX = game.player.rect.centerX - this.enemy.rect.centerX
        const directionY = game.player.rect.centerY - this.enemy.rect.centerY
        const distance = Math.sqrt(directionX * directionX + directionY * directionY)

        this.weapon.directionX = directionX / distance
        this.weapon.directionY = directionY / distance
    }
}
