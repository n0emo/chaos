import { Rectangle } from "./shape.js"
import { Animation } from "./animation.js"
import { Explosion } from "./explosion.js"
import { BallWeapon, LaserWeapon, ShotgunWeapon, Weapon } from "./weapon.js"
import { generateParticles, Particle } from "./particle.js"
import { game } from "./global.js"
import { HEIGHT, WIDTH } from "./constants.js"
import { assets } from "./assets.js"

/** @typedef {import("./weapon.js").ImageAsset} ImageName */

/** @type {ImageName[]} */
const SMALL_BALLS = [
    "imageBulletSmallBallPurple",
    "imageBulletSmallBallRed",
    "imageBulletSmallBallBlue",
]

/** @type {ImageName[]} */
const MIDDLE_BALLS = [
    "imageBulletMiddleBallPurple",
    "imageBulletMiddleBallRed",
    "imageBulletMiddleBallBlue",
]

/** @type {ImageName[]} */
const BIG_BALLS = [
    "imageBulletBigBallPurple",
    "imageBulletBigBallRed",
]

/** @type {ImageName[]} */
const SERIOUS_BALLS = [
    "imageBulletSeriousBallPurple",
    "imageBulletSeriousBallRed",
]

/** @type {ImageName[]} */
const COWS = [
    "imageBulletCowPurple",
    "imageBulletCowRed",
    "imageBulletCowBlue",
    "imageBulletCowGreen",
]

/** @type {ImageName[]} */
const NOTES = [
    "imageBulletMusicalNotePurple",
    "imageBulletMusicalNoteRed",
    "imageBulletMusicalNoteBlue",
    "imageBulletMusicalNoteGreen",
]

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
     * @param {number} hp
     * @param {Animation} animation
     * @param {EnemyMovement} movement
     * @param {?EnemyWeapon} weapon
     */
    constructor(rect, hp, animation, movement, weapon = null) {
        this.rect = rect
        this.velX = 0
        this.velY = 100
        this.moveTimer = 1
        this.hp = hp
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

        return new Enemy(rect, 1, animation, movement)
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
        const bulletImageName = SMALL_BALLS[Math.floor(Math.random() * SMALL_BALLS.length)]
        const weapon = new EnemyWeapon(new BallWeapon(
            posX, -16,
            0, 1, 1, 1, 80, "enemy",
            bulletImageName, "audioLaser2",
            1, 0, 0
        ))

        return new Enemy(rect, 2, animation, movement, weapon)
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
        const bulletImageName = MIDDLE_BALLS[Math.floor(Math.random() * MIDDLE_BALLS.length)]
        const weapon = new HomingEnemyWeapon(new BallWeapon(
            posX, -16, 0, 1,
            0.6, 2, 120, "enemy",
            bulletImageName, "audioBlaster",
            2, 10, 1
        ))

        return new Enemy(rect, 3, animation, movement, weapon)
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
        const bulletImageName = COWS[Math.floor(Math.random() * COWS.length)]
        const weapon = new HomingEnemyWeapon(new BallWeapon(
            posX, -16, 0, 1,
            1.2, 10, 85, "enemy",
            bulletImageName, "audioBarf",
            1, 0, 0 
        ))

        return new Enemy(rect, 2, animation, movement, weapon)
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
        const weapon = new HomingEnemyWeapon(new LaserWeapon(
            posX, posY, 0, 1, 0.85, 5, "enemy",
            // @ts-ignore
            null, "audioWeird", 5
        ))

        return new Enemy(rect, 5, animation, movement, weapon)
    }

    /**
     * @param {number} posX
     * @returns Enemy
     */
    static lightCat(posX) {
        const rect = new Rectangle(posX, -16, 16, 16)
        const speed = 100
        const movement = new EndlessMovement(0, speed)
        const animation = new Animation([
            assets.imageEnemyCatlight1,
            assets.imageEnemyCatlight2,],
            1.5)
        const bulletImageName = SERIOUS_BALLS[Math.floor(Math.random() * SERIOUS_BALLS.length)]
        const weapon = new HomingEnemyWeapon(new BallWeapon(
            posX, -16, 0, 1, 2, 2, 150, "enemy",
            bulletImageName, "audioSydney",
            5, 2, 2
        ))
        return new Enemy(rect, 3, animation, movement, weapon)
    }

    /**
     * @param {number} posX
     * @returns Enemy
     */
    static darkCat(posX) {
        const rect = new Rectangle(posX, -16, 16, 16)
        const speed = 100
        const movement = new EndlessMovement(0, speed)
        const animation = new Animation([
            assets.imageEnemyCatdark1,
            assets.imageEnemyCatdark2,],
            1.5)
        const bulletImageName = BIG_BALLS[Math.floor(Math.random() * BIG_BALLS.length)]
        const weapon = new HomingEnemyWeapon(new ShotgunWeapon(
            posX, -16, 0, 1, 2, 2, 150, "enemy",
            bulletImageName, "audioSydney",
            10, 2, Math.PI / 3
        ))
        return new Enemy(rect, 3, animation, movement, weapon)
    }

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} speed
     * @returns Enemy
     */
    static dj(posX, posY, speed) {
        const rect = new Rectangle(posX, posY, 16, 16)
        const movement = new EndlessMovement(speed, 0)
        const animation = new Animation([
            assets.imageEnemyDJ1,
            assets.imageEnemyDJ2,
            assets.imageEnemyDJ3,
            assets.imageEnemyDJ4,],
            1)
        const bulletImageName = NOTES[Math.floor(Math.random() * NOTES.length)]
        const weapon = new EnemyWeapon(new ShotgunWeapon(
            posX, posY, 0, 1, 1, 1, 30, "enemy",
            bulletImageName, "audioKick",
            5, Math.PI / 4, Math.PI / 6
        ))

        return new Enemy(rect, 15, animation, movement, weapon)
    }

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} velX
     * @param {number} velY
     * @param {number} time
     * @returns Enemy
     */
    static soldier(posX, posY, velX, velY, time) {
        const rect = new Rectangle(posX, posY, 16, 16)
        const movement = new OneDirectionalMovement(velX, velY, time)
        const animation = new Animation([
            assets.imageEnemySolder1,
            assets.imageEnemySolder2,],
            1)
        const bulletImageName = COWS[Math.floor(Math.random() * COWS.length)]
        const weapon = new HomingEnemyWeapon(new ShotgunWeapon(
            posX, posY,
            0, 1, 1, 5, 200, "enemy",
            bulletImageName, "audioDonk",
            10, Math.PI / 12, Math.PI / 16
        ))

        return new Enemy(rect, 20, animation, movement, weapon)
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
