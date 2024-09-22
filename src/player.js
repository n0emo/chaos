import { Rectangle } from "./shape.js"
import { Game } from "./game.js"
import { Weapon, DoubleSimpleWeapon, LaserWeapon } from "./weapon.js"
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
    /** @type {number} */
    invulnerabilityTimer

    constructor() {
        this.rect = new Rectangle(0, 0, 50, 50)
        this.weapon = new LaserWeapon(0, 0, 0, -1, "player", 10)
        this.hp = 100
        this.invulnerabilityTimer = 0
    }

    /** @type {number} */
    get maxHp() { return 100 }

    /** @type {boolean} */
    get isAlive() { return this.hp > 0 }

    /** @type {boolean} */
    get isInvulnerable() { return this.invulnerabilityTimer > 0 }

    makeInvulnerable() {
        this.invulnerabilityTimer = 5
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
            this.weapon.shoot()
        }

        this.invulnerabilityTimer -= dt
        if (this.invulnerabilityTimer < 0) {
            this.invulnerabilityTimer = 0
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
