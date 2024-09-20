import { Bullet } from "./bullet.js"

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
     **/
    createBullet(posX, posY, velX, velY) {
        let bullet = this.deadBullets.pop()
        if (!bullet) {
            return new Bullet(posX, posY, velX, velY)
        }

        bullet.reset()
        bullet.posX = posX
        bullet.posY = posY
        bullet.velX = velX
        bullet.velY = velY

        return bullet
    }

    /**
     * @param {Bullet} bullet
     */
    releaseBullet(bullet) {
        this.deadBullets.push(bullet)
    }
}
