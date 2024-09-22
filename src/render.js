import { HEIGHT, WIDTH } from "./constants.js"
import { Circle, Rectangle } from "./shape.js"

export class Renderer {
    /** @type {CanvasRenderingContext2D} */
    context
    /** @type {number} */
    factor

    /**
     * @param {HTMLCanvasElement} canvas
     * */
    constructor(canvas) {
        const context = canvas.getContext("2d")
        if (!context) {
            throw new Error("Error getting context")
        }
        this.context = context

        this.updateCanvas()
    }

    /** @type {number} */
    get width() { return this.context.canvas.width }

    /** @type {number} */
    get height() { return this.context.canvas.height }

    updateCanvas() {
        this.context.canvas.style.width = "100%"
        const factor = Math.max(this.context.canvas.clientWidth / WIDTH, 1)
        this.context.canvas.width = WIDTH * factor
        this.context.canvas.height = HEIGHT * factor
        this.context.scale(factor, factor)
        this.factor = factor
    }

    /**
     * @param {string} color
     * */
    clearBackground(color) {
        this.context.fillStyle = color
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    }

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} width
     * @param {number} height
     * @param {string} color
     */
    fillRectangle(posX, posY, width, height, color) {
        this.context.fillStyle = color
        this.context.fillRect(posX, posY, width, height)
    }

    /**
     * @param {Rectangle} rec
     * @param {string} color
     */
    fillRectangleRec(rec, color) {
        this.fillRectangle(rec.posX, rec.posY, rec.width, rec.height, color)
    }

    /**
     * @param {Circle} circ
     * @param {string} color
     */
    fillCircleCirc(circ, color) {
        this.context.fillStyle = color
        this.context.beginPath()
        this.context.arc(circ.posX, circ.posY, circ.radius, 0, 2 * Math.PI)
        this.context.fill()

    }

    /**
     * @param {string} text
     * @param {number} posX
     * @param {number} posY
     * @param {number} fontSize
     * @param {string} color
     */
    drawText(text, posX, posY, fontSize, color) {
        this.context.fillStyle = color
        this.context.font = `${fontSize}px sans`
        this.context.fillText(text, posX, posY)
    }
}
