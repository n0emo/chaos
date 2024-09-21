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

    /**
     * @param {Game} game
     */
    constructor(game) {
        this.rect = new Rectangle(0, 0, 50, 50)
        this.game = game
        this.weapon = new DoubleSimpleWeapon(
            this.rect.centerX,
            this.rect.centerY,
            0, -1, "player", 15
        )
    }

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
            this.weapon.shoot(this.game.bullets)
        }
    }

    draw() {
        renderer.fillRectangleRec(this.rect, "#E03030")
    }
}
