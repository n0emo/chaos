import { assets } from "./assets.js"
import { game, renderer } from "./global.js"
import { Rectangle } from "./shape.js"
/**
 * @abstract
 */
export class Bonus {
    /** @type {Rectangle} */
    rect
    /** @type {number} */
    velX
    /** @type {number} */
    velY

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} velX
     * @param {number} velY
     */
    constructor(posX, posY, velX, velY) {
        this.rect = new Rectangle(posX, posY, 16, 16)
        this.velX = velX
        this.velY = velY
    }

    /**
     * @abstract
     * @type {HTMLImageElement}
     */
    get image() {
        throw "Not implemented"
    }

    /**
     * @abstract
     */
    pickup() {
        throw "Not implemented"
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.rect.posX += this.velX * dt
        this.rect.posY += this.velY * dt
    }

    draw() {
        renderer.context.drawImage(this.image, this.rect.posX, this.rect.posY)
    }
}

export class HealingBonus extends Bonus {
    /**
     * @type {HTMLImageElement}
     */
    get image() {
        return assets.imageIconHealing
    }

    pickup() {
        game.player.hp += 10
        if (game.player.hp > game.player.maxHp) {
            game.player.hp = game.player.maxHp
        }
    }
}

export class InvulnerabilityBonus extends Bonus {
    /**
     * @type {HTMLImageElement}
     */
    get image() {
        return assets.imageIconInvulnerability
    }

    pickup() {
        game.player.makeInvulnerable()
    }
}

export class BulletCleanBonus extends Bonus {
    /**
     * @type {HTMLImageElement}
     */
    get image() {
        return assets.imageIconCleaner
    }

    pickup() {
        const posX = game.player.rect.posX
        const posY = game.player.rect.posY
        game.startCleaner(posX, posY)
    }
}

export class WeaponUpgradeBonus extends Bonus {
    /**
     * @type {HTMLImageElement}
     */
    get image() {
        return assets.imageIconUpgrade
    }
}
