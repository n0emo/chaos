import { Rectangle } from "./shape.js"
import { Game } from "./game.js"
import { Weapon, LaserWeapon } from "./weapon.js"
import { assets, state } from "./global.js"
import { Animation } from "./animation.js"

/** @typedef {"drink" | "go" | "happy" | "idle"} PlayerState */

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

    /** @type {Animation} */
    drinkAnimation
    /** @type {Animation} */
    goAnimation
    /** @type {Animation} */
    happyAnimation
    /** @type {Animation} */
    idleAnimation

    /** @type {Animation} */
    currentAnimation

    /** @type {PlayerState} */
    state

    /** @type {number} */
    goTimer

    constructor() {
        this.rect = new Rectangle(0, 0, 16, 16)
        this.weapon = new LaserWeapon(0, 0, 0, -1, "player", 10)
        this.hp = 100
        this.invulnerabilityTimer = 0

        this.drinkAnimation = new Animation([
            assets.imagePlayerDrink1,
            assets.imagePlayerDrink2,
            assets.imagePlayerDrink3,
            assets.imagePlayerDrink4,
            assets.imagePlayerDrink5,
        ], 3)

        this.goAnimation = new Animation([
            assets.imagePlayerGo1,
            assets.imagePlayerGo2,
        ], 0.25)

        this.drinkAnimation = new Animation([
            assets.imagePlayerHappy1,
            assets.imagePlayerHappy2,
            assets.imagePlayerHappy3,
            assets.imagePlayerHappy4,
            assets.imagePlayerHappy5,
            assets.imagePlayerHappy6,
        ], 3)

        this.idleAnimation = new Animation([
            assets.imagePlayerIdle1,
            assets.imagePlayerIdle2,
            assets.imagePlayerIdle3,
        ], 1.5)

        this.state = "idle"
        this.currentAnimation = this.idleAnimation
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
        const dx = Math.abs(this.rect.centerX - state.mouseX)
        const dy = Math.abs(this.rect.centerY - state.mouseY)
        const d = Math.max(dx, dy)
        const threshold = 1

        this.goTimer -= dt
        if (this.goTimer < 0) {
            this.goTimer = 0
        }

        if (this.state == "idle" && d > threshold) {
            this.state = "go"
            this.goTimer = 0.5
        } else if (this.state == "go" && d <= threshold && this.goTimer <= 0) {
            this.state = "idle"
        }

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

        switch (this.state) {
            case "drink":
                this.currentAnimation = this.drinkAnimation
                break
            case "go":
                this.currentAnimation = this.goAnimation
                break
            case "happy":
                this.currentAnimation = this.happyAnimation
                break
            case "idle":
                this.currentAnimation = this.idleAnimation
                break
        }

        this.currentAnimation.update(dt)
    }

    draw() {
        this.currentAnimation.draw(this.rect.posX, this.rect.posY)
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
