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
    set left(x) { this.posX = x }

    /** @type {number} */
    get right() { return this.posX + this.width }

    /** @type {number} */
    set right(x) { this.posX = x - this.width }

    /** @type {number} */
    get top() { return this.posY }

    /** @type {number} */
    set top(y) { this.posY = y }

    /** @type {number} */
    get bottom() { return this.posY + this.height }

    /** @type {number} */
    set bottom(y) { this.posY = y - this.height }
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

/**
 * @param {number} num
 * @param {number} min
 * @param {number} max
 */
function clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

/**
 * @param {Rectangle} rectA
 * @param {Rectangle} rectB
 * @returns {boolean}
 */
export function areRectanglesCollide(rectA, rectB) {
    return rectA.posX < rectB.posX + rectB.width &&
           rectA.posX + rectA.width > rectB.posX &&
           rectA.posY < rectB.posY + rectB.height &&
           rectA.posY + rectA.height > rectB.posY
}

/**
 * @param {Rectangle} rect
 * @param {Circle} circle
 * @returns {boolean}
 */
export function areRectangleCircleCollide(rect, circle) {
    const closestX = clamp(circle.posX, rect.left, rect.right);
    const closestY = clamp(circle.posY, rect.top,  rect.bottom);

    const distanceX = circle.posX - closestX;
    const distanceY = circle.posY - closestY;

    const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
    return distanceSquared < (circle.radius * circle.radius);
}

/**
 * @param {Circle} circleA
 * @param {Circle} circleB
 * @returns {boolean}
 */
export function areCirclesCollide(circleA, circleB) {
    const dx = circleA.posX - circleB.posX
    const dy = circleA.posY - circleB.posY
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < (circleA.radius + circleB.radius)
}
