const canvas = document.querySelector("canvas")
if (!canvas) {
    throw Error("Error getting context")
}

canvas.width = 800
canvas.height = 600

const context = canvas.getContext("2d")
if (!context) {
    throw Error("Error getting context")
}

let t = 0

const mainLoop = () => {
    context.fillStyle = "blue"
    context.fillRect(0, 0, 800, 600)

    const x = Math.sin(t * 0.01 * 2 * Math.PI) * 100 + 300

    context.fillStyle = "red"
    context.fillRect(x, 200, 50, 50)

    t++

    window.requestAnimationFrame(mainLoop)
}

window.requestAnimationFrame(mainLoop)
