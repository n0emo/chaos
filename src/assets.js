/**
 * @param {string} url
 * @returns {Promise<HTMLImageElement>}
 */
async function loadImage(url) {
    const image = new Image()
    image.src = url
    return await new Promise((resolve, reject) => {
        image.onload = () => resolve(image)
        image.onerror = reject
    })
}

export class Assets {
    /** @type {HTMLImageElement} */
    imageEnemyBasic01
    /** @type {HTMLImageElement} */
    imageEnemyBasic02
    /** @type {HTMLImageElement} */
    imageEnemyShooter01
    /** @type {HTMLImageElement} */
    imageEnemyShooter02
    /** @type {HTMLImageElement} */
    imageEnemyHoming01
    /** @type {HTMLImageElement} */
    imageEnemyHoming02

    /**
     * @returns Assets
     */
    static async load() {
        const [
            imageEnemyBasic01,
            imageEnemyBasic02,
            imageEnemyShooter01,
            imageEnemyShooter02,
            imageEnemyHoming01,
            imageEnemyHoming02,
        ] = await Promise.all([
            loadImage("assets/sprites/enemy-basic-01.png"),
            loadImage("assets/sprites/enemy-basic-02.png"),
            loadImage("assets/sprites/enemy-shooter-01.png"),
            loadImage("assets/sprites/enemy-shooter-02.png"),
            loadImage("assets/sprites/enemy-homing-01.png"),
            loadImage("assets/sprites/enemy-homing-02.png"),
        ])

        return {
            imageEnemyBasic01,
            imageEnemyBasic02,
            imageEnemyShooter01,
            imageEnemyShooter02,
            imageEnemyHoming01,
            imageEnemyHoming02,
        }
    }
}
