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
        this.rect = new Rectangle(posX, posY, 8, 8)
        this.velX = velX
        this.velY = velY
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
        renderer.fillRectangleRec(this.rect, "#00FF00")
    }
}

export class HealingBonus extends Bonus {
    pickup() {
        game.player.hp += 10
        if (game.player.hp > game.player.maxHp) {
            game.player.hp = game.player.maxHp
        }
    }
}

export class InvulnerabilityBonus extends Bonus {
    pickup() {
        game.player.makeInvulnerable()
    }
}

export class BulletCleanBonus extends Bonus {
    pickup() {
        const posX = game.player.rect.posX
        const posY = game.player.rect.posY
        game.startCleaner(posX, posY)
    }
}

export class WeaponUpgradeBonus extends Bonus {

}
