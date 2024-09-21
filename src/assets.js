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
    enemy1Image
    /** @type {HTMLImageElement} */
    enemy2Image

    /**
     * @returns Assets
     */
    static async load() {
        const [
            enemy1Image,
            enemy2Image,
        ] = await Promise.all([
            loadImage("assets/enemy1.png"),
            loadImage("assets/enemy2.png"),
        ])

        return {
            enemy1Image,
            enemy2Image,
        }
    }
}
