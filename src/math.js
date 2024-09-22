import { Circle, Rectangle } from "./shape.js";

/**
 * @param {number} num
 * @param {number} min
 * @param {number} max
 */
export function clamp(num, min, max) {
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

