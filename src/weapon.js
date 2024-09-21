import { Bullet } from "./bullet.js"
import { pool } from "./global.js"

/**
 * @typedef {import("./bullet.js").Tag} Tag
 */

export class Weapon {
    /** @type {number} */
    posX
    /** @type {number} */
    posY
    /** @type {number} */
    directionX
    /** @type {number} */
    directionY
    /** @type {Tag} */
    tag

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} directionX
     * @param {number} directionY
     * @param {Tag} tag
     */
    constructor(posX, posY, directionX, directionY, tag) {
        this.posX = posX
        this.posY = posY
        this.directionX = directionX
        this.directionY = directionY
        this.tag = tag

        if (this.constructor == Weapon) {
            throw "Cannon instantiate abstract class"
        }
    }

    /** @type {number} */
    get damage() {
        throw "not implemented"
    }

    /**
     * @param {number} _dt
     */
    update(_dt) {
        throw "not implemented"
    }

    /** @param {Bullet[]} _bullets */
    shoot(_bullets) {
        throw "not implemented"
    }
}

const SIMPLE_WEAPON_LENGTH = 10
const SIMPLE_WEAPON_RELOAD = 0.5

export class SimpleWeapon extends Weapon {
    /** @type {number} */
    reloadTimer

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} directionX
     * @param {number} directionY
     * @param {Tag} tag
     */
    constructor(posX, posY, directionX, directionY, tag) {
        super(posX, posY, directionX, directionY, tag)
        this.reloadTimer = 0
    }

    get damage() {
        return 1
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.reloadTimer -= dt
        if (this.reloadTimer < 0) {
            this.reloadTimer = 0
        }
    }

    /** @param {Bullet[]} bullets */
    shoot(bullets) {
        if (this.reloadTimer > 0) {
            return
        }

        this.reloadTimer = SIMPLE_WEAPON_RELOAD

        const x = this.posX + this.directionX * SIMPLE_WEAPON_LENGTH
        const y = this.posY + this.directionY * SIMPLE_WEAPON_LENGTH
        const speed = 500
        const bullet = pool.createBullet(
            x,
            y,
            this.directionX * speed,
            this.directionY * speed,
            this.tag
        )
        bullets.push(bullet)
    }
}


export class DoubleSimpleWeapon extends Weapon {
    /** @type {number} */
    reloadTimer
    /** @type {number} */
    spread

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} directionX
     * @param {number} directionY
     * @param {Tag} tag
     * @param {number} spread
     */
    constructor(posX, posY, directionX, directionY, tag, spread) {
        super(posX, posY, directionX, directionY, tag)
        this.reloadTimer = 0
        this.spread = spread
    }

    get damage() {
        return 1
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.reloadTimer -= dt
        if (this.reloadTimer < 0) {
            this.reloadTimer = 0
        }
    }

    /** @param {Bullet[]} bullets */
    shoot(bullets) {
        if (this.reloadTimer > 0) {
            return
        }

        this.reloadTimer = SIMPLE_WEAPON_RELOAD

        const x = this.posX + this.directionX * SIMPLE_WEAPON_LENGTH
        const y = this.posY + this.directionY * SIMPLE_WEAPON_LENGTH
        const perX = -this.directionY * this.spread
        const perY =  this.directionX * this.spread
        const speed = 500

        bullets.push( pool.createBullet(
            x + perX,
            y + perY,
            this.directionX * speed,
            this.directionY * speed,
            this.tag
        ))

        bullets.push( pool.createBullet(
            x - perX,
            y - perY,
            this.directionX * speed,
            this.directionY * speed,
            this.tag
        ))
    }
}
