import { renderer } from "./global.js"

export class Animation {
    /** @type {HTMLImageElement[]} */
    images
    /** @type {number} */
    speed
    /** @type {number} */
    time

    /**
     * @param {HTMLImageElement[]} images
     * @param {number} duration
     */
    constructor(images, duration) {
        this.images = images
        this.speed = images.length / duration
        this.time = 0
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        this.time += this.speed * dt
        if (this.time >= this.images.length) {
            this.time = 0
        }
    }

    /**
     * @param {number} posX
     * @param {number} posY
     */
    draw(posX, posY) {
        const image = this.images[Math.floor(this.time)]
        renderer.context.drawImage(image, posX, posY)
    }
}
