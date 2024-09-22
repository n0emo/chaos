import { state } from "./global.js"
import { WIDTH, HEIGHT } from "./constants.js"
import { Rectangle } from "./shape.js"

const PADDING = 20 
const EVENT_RECT = new Rectangle(20, 20, WIDTH - 20, HEIGHT - 20)

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
        throw "Not implemented"
    }
}
