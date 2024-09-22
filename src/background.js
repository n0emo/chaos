import { HEIGHT } from "./constants.js"
import { renderer } from "./global.js"

const BACKGROUND_SPEED = 100

export class Background {
    /** @type {BackgroundImage[]} */
    current
    /** @type {HTMLImageElement[]} */
    queue

    /**
     * @param {HTMLImageElement} initialImage
     */
    constructor(initialImage) {
        this.current = []
        this.queue = [initialImage]
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        for (const bg of this.current) {
            bg.posY += BACKGROUND_SPEED * dt
        }

        while (this.current.length === 0 || this.current[this.current.length - 1].posY > 0) {
            let image = this.queue[0]
            const offsetY = this.current[this.current.length - 1]?.posY ?? HEIGHT
            if (image) {
                this.queue.splice(0, 1)
            } else {
                image = this.current[0].image
            }

            const posY = offsetY - image.height
            this.current.push(new BackgroundImage(image, posY))
        }

        let i = this.current.length
        while (i--) {
            if (this.current[i].posY > HEIGHT) {
                this.current.splice(i, 1)
            }
        }
    }

    draw() {
        for (const bg of this.current) {
            renderer.context.drawImage(bg.image, 0, bg.posY)
        }
    }
}

class BackgroundImage {
    /** @type {HTMLImageElement} */
    image
    /** @type {number} */
    posY

    /**
     * @param {HTMLImageElement} image
     * @param {number} posY
     */
    constructor(image, posY) {
        this.image = image
        this.posY = posY
    }

}
