import { Circle, Rectangle } from "./shape.js"

export class Renderer {
    /** @private @type {HTMLCanvasElement} */
    canvas
    /** @private @type {CanvasRenderingContext2D} */
    context

    /**
     * @param {HTMLCanvasElement} canvas
     * */
    constructor(canvas) {
        this.canvas = canvas

        const context = canvas.getContext("2d")
        if (!context) {
            throw new Error("Error getting context")
        }
        this.context = context
    }

    /**
     * @param {string} color
     * */
    clearBackground(color) {
        this.context.fillStyle = color
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
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

    drawText(text, posX, posY, fontSize, color) {
        this.context.fillStyle = color
        this.context.font = `${fontSize}px sans`
        this.context.fillText(text, posX, posY)
    }
}
