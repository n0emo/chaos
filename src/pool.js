import { Bullet } from "./bullet.js"
import { Explosion } from "./explosion.js"

/** @typedef {import("./bullet.js").Tag} Tag */

export class Pool {
    /** @private @type {Bullet[]} */
    deadBullets
    /** @private @type {Explosion[]} */
    deadExplosions

    constructor() {
        this.deadBullets = []
        this.deadExplosions = []
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
        const bullet = this.deadBullets.pop()
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

    /**
     * @param {number} lifetime
     * @param {number} posX
     * @param {number} posY
     * @param {number} speed
     */
    createExplosion(lifetime, posX, posY, speed) {
        const explosion = this.deadExplosions.pop()
        if (!explosion) {
            return new Explosion(lifetime, posX, posY, speed)
        }

        explosion.timer = lifetime
        explosion.circ.posX = posX
        explosion.circ.posY = posY
        explosion.circ.radius = 1
        explosion.speed = speed

        return explosion
    }

    /**
     * @param {Explosion} explosion
     */
    releaseExplosion(explosion) {
        this.deadExplosions.push(explosion)
    }
}
