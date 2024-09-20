export class EventState {
    #mouseX
    #mouseY
    #isMouseDown
    #isMousePressed

    /** @param {HTMLCanvasElement} canvas */
    constructor(canvas) {
        this.#mouseX = 0
        this.#mouseY = 0
        this.#isMouseDown = false
        this.#isMousePressed = false

        canvas.addEventListener("mousemove", (e) => {
            const r = canvas.getBoundingClientRect()
            this.#mouseX = e.clientX - r.x
            this.#mouseY = e.clientY - r.y
        })

        canvas.addEventListener("mousedown", (_) => {
            this.#isMouseDown = true
            this.#isMousePressed = true
        })

        canvas.addEventListener("mouseup", (_) => {
            this.#isMouseDown = false
        })
    }

    get mouseX() {
        return this.#mouseX
    }

    get mouseY() {
        return this.#mouseY
    }

    get isMouseDown() {
        return this.#isMouseDown
    }

    get isMousePressed() {
        return this.#isMousePressed
    }

    update() {
        this.#isMousePressed = false
    }
}
