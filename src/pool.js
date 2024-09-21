import { Bullet } from "./bullet.js"

/** @typedef {import("./bullet.js").Tag} Tag */

export class Pool {
    /** @private @type {Bullet[]} */
    deadBullets

    constructor() {
        this.deadBullets = []
        this.aliveBullets = []
    }

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} velX
     * @param {number} velY
     * @param {Tag} tag
     * @param {number} damage
     **/
    createBullet(posX, posY, velX, velY, tag, damage) {
        let bullet = this.deadBullets.pop()
        if (!bullet) {
            return new Bullet(posX, posY, velX, velY, tag, damage)
        }

        bullet.reset()
        bullet.circle.posX = posX
        bullet.circle.posY = posY
        bullet.velX = velX
        bullet.velY = velY
        bullet.tag = tag
        bullet.damage = damage

        return bullet
    }

    /**
     * @param {Bullet} bullet
     */
    releaseBullet(bullet) {
        this.deadBullets.push(bullet)
    }
}
