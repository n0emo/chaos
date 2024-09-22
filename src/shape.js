/** @typedef {Rectangle | Circle} Shape */

export class Rectangle {
    /** @type {number} */
    posX
    /** @type {number} */
    posY
    /** @type {number} */
    width
    /** @type {number} */
    height

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} width
     * @param {number} height
     */
    constructor(posX, posY, width, height) {
        this.posX = posX
        this.posY = posY
        this.width = width
        this.height = height
    }

    /** @type {number} */
    get centerX() { return this.posX + this.width * 0.5 }

    /** @type {number} */
    set centerX(x) { this.posX = x - this.width * 0.5 }

    /** @type {number} */
    get centerY() { return this.posY + this.height * 0.5 }

    /** @type {number} */
    set centerY(y) { this.posY = y - this.height * 0.5 }

    /** @type {number} */
    get left() { return this.posX }

    /** @type {number} */
    set left(x) {
        // TODO
        const dx = x - this.posX
        this.posX += dx
        this.width += dx
    }

    /** @type {number} */
    get right() { return this.posX + this.width }

    /** @type {number} */
    set right(x) {
        // TODO
        this.width += x - (this.posX - this.width)
    }

    /** @type {number} */
    get top() { return this.posY }

    /** @type {number} */
    set top(y) {
        if(y > this.posY + this.height) {
            this.height = y - (this.posY + this.height)
            this.posY = y
        } else {
            this.height += this.posY - y
            this.posY = y
        }
    }

    /** @type {number} */
    get bottom() { return this.posY + this.height }

    /** @type {number} */
    set bottom(y) {
        const dy = y - this.posY
        if (dy > 0) {
            this.height += y - (this.posY + this.height)
        } else {
            this.posY += dy
            this.height -= dy
        }
    }
}

export class Circle {
    /** @type {number} */
    posX
    /** @type {number} */
    posY
    /** @type {number} */
    radius

    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} radius
     */
    constructor(posX, posY, radius) {
        this.posX = posX
        this.posY = posY
        this.radius = radius
    }
}
