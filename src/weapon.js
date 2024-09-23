import { Assets, assets } from "./assets.js"
import { playSound } from "./audio.js"
import { game, pool } from "./global.js"
import { Ray, RayAnimation } from "./laser.js"

/**
 * @typedef {import("./bullet.js").Tag} Tag
 * @typedef {{[K in keyof Assets]: Assets[K] extends HTMLImageElement ? K : never}[keyof Assets]} ImageAsset
 * @typedef {{[K in keyof Assets]: Assets[K] extends HTMLAudioElement ? K : never}[keyof Assets]} AudioAsset
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
    /** @type {number} */
    timeToReload
    /** @type {number} */
    damage
    /** @type {Tag} */
    tag
    /** @type {ImageAsset} */
    bulletImageName
    /** @type {AudioAsset} */
    sound

    /** @type {number} */
    reloadTimer


    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} directionX
     * @param {number} directionY
     * @param {number} timeToReload
     * @param {number} damage
     * @param {Tag} tag
     * @param {ImageAsset} bulletImageName
     * @param {AudioAsset} sound
     */
    constructor(
        posX, posY,
        directionX, directionY,
        timeToReload, damage,
        tag, bulletImageName, sound
    ) {
        if (this.constructor == Weapon) {
            throw "Cannon instantiate abstract class"
        }

        this.posX = posX
        this.posY = posY
        this.directionX = directionX
        this.directionY = directionY
        this.timeToReload = timeToReload
        this.damage = damage
        this.tag = tag
        this.bulletImageName = bulletImageName
        this.sound = sound
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

    shoot() {
        throw "not implemented"
    }
}

export class BallWeapon extends Weapon {
    /** @type {number} */
    bulletAmount
    /** @type {number} */
    spread
    /** @type {number} */
    offset
    /** @type {number} */
    speed

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} directionX
     * @param {number} directionY
     * @param {number} timeToReload
     * @param {number} damage
     * @param {number} speed
     * @param {number} bulletAmount
     * @param {Tag} tag
     * @param {ImageAsset} bulletImageName
     * @param {AudioAsset} sound
     * @param {number} spread
     * @param {number} offset
     */
    constructor(
        posX, posY,
        directionX, directionY,
        timeToReload, damage,
        speed, tag,
        bulletImageName, sound,
        bulletAmount,
        spread, offset
    ) {
        super(posX, posY, directionX, directionY, timeToReload, damage, tag, bulletImageName, sound)
        this.reloadTimer = 0
        this.bulletAmount = bulletAmount
        this.spread = spread
        this.offset = offset
        this.speed = speed
    }

    shoot() {
        if (this.reloadTimer > 0) {
            return
        }

        this.reloadTimer = this.timeToReload
        playSound(assets[this.sound])

        const rem = this.bulletAmount % 2

        const dx = this.directionX * this.speed
        const dy = this.directionY * this.speed
        const image = assets[this.bulletImageName]

        for (let i = 0; i < Math.floor(this.bulletAmount / 2); i++) {
            const ox = this.spread * (i + rem + 0.5)
            const oy = this.offset * (this.bulletAmount * 0.5 - i - 1)

            game.bullets.push(pool.createBullet(
                this.posX + ox, this.posY - oy,
                dx, dy, this.tag, this.damage, image
            ))

            game.bullets.push(pool.createBullet(
                this.posX - ox, this.posY - oy,
                dx, dy, this.tag, this.damage, image
            ))
        }

        if (rem == 1) {
            game.bullets.push(pool.createBullet(
                this.posX, this.posY - this.offset * (this.bulletAmount * 0.5),
                dx, dy, this.tag, this.damage, image
            ))
        }
    }
}

export class ShotgunWeapon extends Weapon {
    /** @type {number} */
    bulletAmount
    /** @type {number} */
    spread
    /** @type {number} */
    variation
    /** @type {number} */
    speed

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} directionX
     * @param {number} directionY
     * @param {number} timeToReload
     * @param {number} damage
     * @param {number} speed
     * @param {Tag} tag
     * @param {ImageAsset} bulletImageName
     * @param {AudioAsset} sound
     * @param {number} bulletAmount
     * @param {number} spread
     * @param {number} variation
     */
    constructor(
        posX, posY,
        directionX, directionY,
        timeToReload, damage,
        speed, tag,
        bulletImageName, sound,
        bulletAmount,
        spread, variation
    ) {
        super(posX, posY, directionX, directionY, timeToReload, damage, tag, bulletImageName, sound)
        this.reloadTimer = 0
        this.bulletAmount = bulletAmount
        this.spread = spread
        this.variation = variation
        this.speed = speed
    }

    shoot() {
        if (this.reloadTimer > 0) {
            return
        }

        this.reloadTimer = this.timeToReload
        playSound(assets[this.sound])

        for (let i = 0; i < this.bulletAmount; i++) {
            const angle = Math.atan2(this.directionX, this.directionY)
                        + (Math.random() - 0.5) * this.variation
            const speed = this.speed + (Math.random() - 0.5 ) * this.variation * 50
            const dx = Math.sin(angle) * speed
            const dy = Math.cos(angle) * speed
            game.bullets.push(pool.createBullet(
                this.posX, this.posY, dx, dy,
                this.tag, this.damage, assets[this.bulletImageName]

            ))
        }
    }

}

export class LaserWeapon extends Weapon {
    /** @type {number} */
    size
    /** @type {number} */
    reloadTimer

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} directionX
     * @param {number} directionY
     * @param {number} timeToReload
     * @param {number} damage
     * @param {Tag} tag
     * @param {ImageAsset} bulletImageName
     * @param {AudioAsset} sound
     * @param {number} size
     */
    constructor(
        posX, posY, directionX, directionY,
        timeToReload, damage, tag,
        bulletImageName, sound, size
    ) {
        super(posX, posY, directionX, directionY, timeToReload, damage, tag, bulletImageName, sound)
        this.size = size
        this.reloadTimer = 0
    }

    shoot() {
        if (this.reloadTimer > 0) {
            return
        }

        playSound(assets[this.sound])
        const direction = this.directionY <= 0 ? "up" : "down"
        const ray = new Ray(this.posX, this.posY, direction, this.size, this.damage, this.tag)
        const rayAnimation = new RayAnimation(ray, 0.2)
        game.rays.push(ray)
        game.rayAnimations.push(rayAnimation)
        this.reloadTimer = this.timeToReload
    }
}
