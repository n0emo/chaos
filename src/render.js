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
        this.context.canvas.style.width  = `100%`
        this.context.canvas.style.height = `100%`
        this.context.canvas.style.display = "flex"
        const rect = this.context.canvas.getBoundingClientRect()
        const factorW = Math.max(rect.width  / WIDTH,  1)
        const factorH = Math.max(rect.height / HEIGHT, 1)
        const factor = Math.min(factorW, factorH, 10)
        this.context.canvas.style.width  = ""
        this.context.canvas.style.height = ""
        this.context.canvas.width  = WIDTH  * factor
        this.context.canvas.height = HEIGHT * factor
        this.context.scale(factor, factor)
        this.factor = factor
        this.context.imageSmoothingEnabled = false
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
     * @param {number} posX
     * @param {number} posY
     * @param {number} radius
     * @param {string} color
     */
    fillCircle(posX, posY, radius, color) {
        this.context.fillStyle = color
        this.context.beginPath()
        this.context.arc(posX, posY, radius, 0, 2 * Math.PI)
        this.context.fill()
    }

    /**
     * @param {Circle} circ
     * @param {string} color
     */
    fillCircleCirc(circ, color) {
        this.fillCircle(circ.posX, circ.posY, circ.radius, color)
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

    /**
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @param {number} width
     * @param {string} color
     */
    drawLine(startX, startY, endX, endY, width, color) {
        this.context.lineWidth = width
        this.context.strokeStyle = color
        this.context.beginPath()
        this.context.moveTo(startX, startY)
        this.context.lineTo(endX, endY)
        this.context.stroke()

    }
}
