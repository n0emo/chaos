import { Rectangle } from "./shape.js"
import { Game } from "./game.js"
import { Weapon, DoubleSimpleWeapon } from "./weapon.js"
import { renderer, state } from "./global.js"

export class Player {
    /** @type {Rectangle} */
    rect
    /** @type {Weapon} */
    weapon
    /** @type {Game} */
    game
    /** @type {number} */
    hp

    constructor() {
        this.rect = new Rectangle(0, 0, 50, 50)
        this.weapon = new DoubleSimpleWeapon(
            this.rect.centerX,
            this.rect.centerY,
            0, -1, "player", 15
        )
        this.hp = 100
    }

    /** @type {number} */
    get maxHp() { return 100 }

    /** @type {boolean} */
    get isAlive() { return this.hp > 0 }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.rect.centerX = state.mouseX
        this.rect.centerY = state.mouseY

        this.weapon.posX = this.rect.centerX
        this.weapon.posY = this.rect.centerY
        this.weapon.update(dt)

        if (state.isMouseDown) {
            this.weapon.shoot()
        }
    }

    draw() {
        renderer.fillRectangleRec(this.rect, "#E03030")
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

}
