import { renderer, state } from "./global.js"
import { WIDTH, HEIGHT } from "./constants.js"
import { Circle, Rectangle } from "./shape.js"
import { areCirclesCollide } from "./math.js"

const PADDING = 30
const EVENT_RECT = new Rectangle(
    PADDING,
    PADDING,
    WIDTH - PADDING * 2,
    HEIGHT - PADDING * 2,
)

/**
 * @abstract
 */
export class Event {
    constructor() {
        if (this.constructor == Event) {
            throw "Cannot instantiate abstract class"
        }
    }

    /**
     * @abstract
     * @type {boolean}
     */
    get isPauses() {
        throw "Not implemented"
    }

    /**
     * @abstract
     * @type {boolean}
     */
    get isEnd() {
        throw "Not implemented"
    }

    /**
     * @abstract
     * @param {number} dt
     */
    update(dt) {
        throw "Not implemented"
    }

    /**
     * @abstract
     */
    draw() {
        throw "Not implemented"
    }
}

export class AdsEvent extends Event {
    /** @type {boolean} */
    #isEnd

    constructor() {
        super()

        this.#isEnd = false
    }

    /** @type {boolean} */
    get isPauses() { return false }

    /** @type {boolean} */
    get isEnd() { return this.#isEnd }

    /**
     * @param {number} dt
     */
    update(dt) {
        if (state.isKeyPressed("Space")) {
            this.#isEnd = true
        }
    }

    draw() {
        renderer.fillRectangleRec(EVENT_RECT, "#909090") // TODO
    }
}

export class ChinaEvent extends Event {
    /** @type {boolean} */
    #isEnd
    /** @type {number} */
    timer

    constructor() {
        super()

        this.#isEnd = false
        this.timer = 0.5
    }

    /** @type {boolean} */
    get isPauses() { return true }

    /** @type {boolean} */
    get isEnd() { return this.#isEnd }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.timer -= dt
        if (this.timer < 0) {
            this.timer = 0
        }

        if (state.isKeyPressed("Space")) {
            this.#isEnd = true
            const dSocialRatingCredit = this.timer <= 0 ? 100 : -100
            console.log(`Social rating credit change: ${dSocialRatingCredit}`)
        }
    }

    draw() {
        renderer.fillRectangleRec(EVENT_RECT, "#FF9090") // TODO
    }
}

export class FishingEvent extends Event {
    /** @type {boolean} */
    #isEnd
    /** @type {number} */
    timer
    /** @type {Circle} */
    fishCirc
    /** @type {number} */
    startX
    /** @type {number} */
    startY
    /** @type {number} */
    targetX
    /** @type {number} */
    targetY
    /** @type {Circle} */
    fishingRodCirc
    /** @type {number} */
    interpolator
    /** @type {number} */
    fishTimeToTravel

    constructor() {
        super()

        this.#isEnd = false
        this.timer = 3
        this.fishingRodCirc = new Circle(EVENT_RECT.centerX, EVENT_RECT.centerY, 20)
        this.fishTimeToTravel = 1.5

        const angle = Math.random() * Math.PI / 3 - Math.PI / 6
        const direction = Math.random() < 0.5 ? 1 : -1
        const spread = 100
        this.startX  = EVENT_RECT.centerX - spread * Math.cos(angle) * direction
        this.startY  = EVENT_RECT.centerY - spread * Math.sin(angle) * direction
        this.targetX = EVENT_RECT.centerX + spread * Math.cos(angle) * direction
        this.targetY = EVENT_RECT.centerY + spread * Math.sin(angle) * direction
        this.interpolator = 0

        this.fishCirc = new Circle(this.startX, this.startY, 8)
    }

    /** @type {boolean} */
    get isPauses() { return true }

    /** @type {boolean} */
    get isEnd() { return this.#isEnd }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.timer -= dt
        if (this.timer < 0) {
            this.#isEnd = true
            // TODO
        }

        if (state.isKeyPressed("Space")) {
            this.#isEnd = true
            console.log("Catch: ", areCirclesCollide(this.fishingRodCirc, this.fishCirc))
            // TODO
        }

        this.interpolator += dt

        const t = this.interpolator / this.fishTimeToTravel
        this.fishCirc.posX = FishingEvent.interpolate( this.startX, this.targetX, t)
        this.fishCirc.posY = FishingEvent.interpolate( this.startY, this.targetY, t)

        if (this.interpolator >= this.fishTimeToTravel) {
            this.interpolator = 0;
            [this.startX, this.targetX] = [this.targetX, this.startX];
            [this.startY, this.targetY] = [this.targetY, this.startY];
        }
    }

    draw() {
        renderer.fillRectangleRec(EVENT_RECT, "#3070E0") // TODO
        renderer.fillCircleCirc(this.fishCirc, "#1010FF")
        const color = areCirclesCollide(this.fishCirc, this.fishingRodCirc) 
            ? "#10FF10" 
            : "#606060"
        renderer.fillCircleCirc(this.fishingRodCirc, color)
        renderer.fillCircle(this.startX, this.startY, 5, "#FFFF00")
        renderer.fillCircle(this.targetX, this.targetY, 5, "#FF00FF")
    }

    /**
     * @param {number} a
     * @param {number} b
     * @param {number} t
     * @returns {number}
     */
    static interpolate(a, b, t) {
        return a * (1 - t) + b * t
    }
}
