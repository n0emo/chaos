import { renderer } from "./global.js"

export class EventState {
    mouseX
    mouseY
    isMouseDown
    isMousePressed
    pressedKeys
    downKeys

    /** @param {HTMLCanvasElement} canvas */
    constructor(canvas) {
        this.mouseX = 0
        this.mouseY = 0
        this.isMouseDown = false
        this.isMousePressed = false

        this.pressedKeys = {}
        this.downKeys = {}

        canvas.addEventListener("mousemove", (e) => {
            const r = canvas.getBoundingClientRect()
            this.mouseX = (e.clientX - r.x) / renderer.factor
            this.mouseY = (e.clientY - r.y) / renderer.factor
        })

        canvas.addEventListener("mousedown", (_) => {
            this.isMouseDown = true
            this.isMousePressed = true
        })

        canvas.addEventListener("mouseup", (_) => {
            this.isMouseDown = false
        })

        window.addEventListener("keypress", (e) => {
            this.pressedKeys[e.code] = true
            this.downKeys[e.code] = true
        })

        window.addEventListener("keyup", (e) => {
            this.pressedKeys[e.code] = false
            this.downKeys[e.code] = false
        })

        window.addEventListener("resize", (e) => {
            renderer.updateCanvas()
        })
    }

    update() {
        this.isMousePressed = false
        this.pressedKeys = {}
    }

    /**
     * @param {string} code
     * @returns {boolean}
     */
    isKeyDown(code) {
        return Boolean(this.downKeys[code])
    }

    /**
     * @param {string} code
     * @returns {boolean}
     */
    isKeyPressed(code) {
        return Boolean(this.pressedKeys[code])
    }
}
