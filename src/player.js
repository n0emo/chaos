import { Rectangle } from "./shape.js"
import { Game, GAME_OVER } from "./game.js"
import { Weapon, LaserWeapon, BallWeapon, ShotgunWeapon } from "./weapon.js"
import { game, state } from "./global.js"
import { Animation } from "./animation.js"
import { assets } from "./assets.js"
import { playSound } from "./audio.js"

/** @typedef {"drink" | "move" | "happy" | "idle"} PlayerState */

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
    moveAnimation
    /** @type {Animation} */
    happyAnimation
    /** @type {Animation} */
    idleAnimation

    /** @type {Animation} */
    currentAnimation

    /** @type {PlayerState} */
    state

    /** @type {number} */
    moveTimer

    /** @type {number} */
    level

    constructor() {
        this.rect = new Rectangle(0, 0, 16, 16)
        this.weapon = new BallWeapon(
            0, 0, 0, -1, 1, 1, 100, "player",
            "imageBulletSmallBallRed", "audioLaser2",
            1, 0, 0
        )

        this.hp = 500
        this.invulnerabilityTimer = 0

        this.drinkAnimation = new Animation([
            assets.imagePlayerDrink1,
            assets.imagePlayerDrink2,
            assets.imagePlayerDrink3,
            assets.imagePlayerDrink4,
            assets.imagePlayerDrink5,
        ], 3)

        this.moveAnimation = new Animation([
            assets.imagePlayerMove1,
            assets.imagePlayerMove2,
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
        this.level = 1
    }

    /** @type {number} */
    get maxHp() { return 500 }

    /** @type {boolean} */
    get isAlive() { return this.hp > 0 }

    /** @type {boolean} */
    get isInvulnerable() { return this.invulnerabilityTimer > 0 }

    makeInvulnerable() {
        this.invulnerabilityTimer = 5
    }

    upgradeWeapon() {
        if (this.level === 1) {
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    this.weapon = new BallWeapon(
                        this.rect.posX, this.rect.posY, 0, -1,
                        0.75, 2, 100, "player",
                        "imageBulletMiddleBallRed", "audioBlaster",
                        2, 2, 1
                    )
                    break
                case 1:
                    this.weapon = new ShotgunWeapon(
                        this.rect.posX, this.rect.posY,
                        0, -1, 1.5, 1, 80, "player",
                        "imageBulletMiddleBallPurple", "audioTok",
                        10, Math.PI / 6, Math.PI / 12
                    )
                    break
                case 2:
                    this.weapon = new LaserWeapon(
                        this.rect.posX, this.rect.posY,
                        // @ts-ignore
                        0, -1, 1.2, 3, "player", null, "audioGrowl", 4
                    )
                    break
                default:
                    throw "unreachable"
            }
        } else {
            if (this.weapon instanceof BallWeapon) {
                this.weapon.speed *= 1.15
                this.weapon.timeToReload *= 0.92
                this.weapon.damage *= 1.05
                this.weapon.bulletAmount = this.level + 1
                this.weapon.spread *= 1.2
                this.weapon.offset *= 1.2
            } else if (this.weapon instanceof ShotgunWeapon) {
                this.weapon.speed *= 1.1
                this.weapon.timeToReload *= 0.945
                this.weapon.damage *= 1.1
                this.weapon.bulletAmount = this.level + 8
                this.weapon.spread *= 1.5
                this.weapon.variation *= 1.3
            } else if (this.weapon instanceof LaserWeapon) {
                this.weapon.timeToReload *= 0.97
                this.weapon.damage *= 1.25
                this.weapon.size *= 1.4
            }
        }

        this.level++
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        const dx = Math.abs(this.rect.centerX - state.mouseX)
        const dy = Math.abs(this.rect.centerY - state.mouseY)
        const d = Math.max(dx, dy)
        const threshold = 1

        this.moveTimer -= dt
        if (this.moveTimer < 0) {
            this.moveTimer = 0
        }

        if (this.state == "idle" && d > threshold) {
            this.state = "move"
            this.moveTimer = 0.5
        } else if (this.state == "move" && d <= threshold && this.moveTimer <= 0) {
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
            case "move":
                this.currentAnimation = this.moveAnimation
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
            playSound(assets.audioDeath)
            game.state = GAME_OVER
        }
    }

}
