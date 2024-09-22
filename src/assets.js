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

    /** @type {HTMLImageElement} */
    imagePlayerDrink1
    /** @type {HTMLImageElement} */
    imagePlayerDrink2
    /** @type {HTMLImageElement} */
    imagePlayerDrink3
    /** @type {HTMLImageElement} */
    imagePlayerDrink4
    /** @type {HTMLImageElement} */
    imagePlayerDrink5

    /** @type {HTMLImageElement} */
    imagePlayerGo1
    /** @type {HTMLImageElement} */
    imagePlayerGo2

    /** @type {HTMLImageElement} */
    imagePlayerHappy1
    /** @type {HTMLImageElement} */
    imagePlayerHappy2
    /** @type {HTMLImageElement} */
    imagePlayerHappy3
    /** @type {HTMLImageElement} */
    imagePlayerHappy4
    /** @type {HTMLImageElement} */
    imagePlayerHappy5
    /** @type {HTMLImageElement} */
    imagePlayerHappy6

    /** @type {HTMLImageElement} */
    imagePlayerIdle1
    /** @type {HTMLImageElement} */
    imagePlayerIdle2
    /** @type {HTMLImageElement} */
    imagePlayerIdle3

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
            imagePlayerDrink1,
            imagePlayerDrink2,
            imagePlayerDrink3,
            imagePlayerDrink4,
            imagePlayerDrink5,
            imagePlayerGo1,
            imagePlayerGo2,
            imagePlayerHappy1,
            imagePlayerHappy2,
            imagePlayerHappy3,
            imagePlayerHappy4,
            imagePlayerHappy5,
            imagePlayerHappy6,
            imagePlayerIdle1,
            imagePlayerIdle2,
            imagePlayerIdle3,
        ] = await Promise.all([
            loadImage("assets/sprites/enemy-basic-01.png"),
            loadImage("assets/sprites/enemy-basic-02.png"),
            loadImage("assets/sprites/enemy-shooter-01.png"),
            loadImage("assets/sprites/enemy-shooter-02.png"),
            loadImage("assets/sprites/enemy-homing-01.png"),
            loadImage("assets/sprites/enemy-homing-02.png"),
            loadImage("assets/sprites/player-drink-1.png"),
            loadImage("assets/sprites/player-drink-2.png"),
            loadImage("assets/sprites/player-drink-3.png"),
            loadImage("assets/sprites/player-drink-4.png"),
            loadImage("assets/sprites/player-drink-5.png"),
            loadImage("assets/sprites/player-go-1.png"),
            loadImage("assets/sprites/player-go-2.png"),
            loadImage("assets/sprites/player-happy-1.png"),
            loadImage("assets/sprites/player-happy-2.png"),
            loadImage("assets/sprites/player-happy-3.png"),
            loadImage("assets/sprites/player-happy-4.png"),
            loadImage("assets/sprites/player-happy-5.png"),
            loadImage("assets/sprites/player-happy-6.png"),
            loadImage("assets/sprites/player-idle-1.png"),
            loadImage("assets/sprites/player-idle-2.png"),
            loadImage("assets/sprites/player-idle-3.png"),
        ])

        return {
            imageEnemyBasic01,
            imageEnemyBasic02,
            imageEnemyShooter01,
            imageEnemyShooter02,
            imageEnemyHoming01,
            imageEnemyHoming02,
            imagePlayerDrink1,
            imagePlayerDrink2,
            imagePlayerDrink3,
            imagePlayerDrink4,
            imagePlayerDrink5,
            imagePlayerGo1,
            imagePlayerGo2,
            imagePlayerHappy1,
            imagePlayerHappy2,
            imagePlayerHappy3,
            imagePlayerHappy4,
            imagePlayerHappy5,
            imagePlayerHappy6,
            imagePlayerIdle1,
            imagePlayerIdle2,
            imagePlayerIdle3,
        }
    }
}
