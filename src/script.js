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

let mouseX = 0
let mouseY = 0

addEventListener("mousemove", (e) => {
    const r = canvas.getBoundingClientRect()
    mouseX = e.clientX - r.x - 25
    mouseY = e.clientY - r.y - 25
})

const mainLoop = () => {
    context.fillStyle = "#181840"
    context.fillRect(0, 0, 800, 600)

    context.fillStyle = "#E03030"
    context.fillRect(mouseX, mouseY, 50, 50)

    window.requestAnimationFrame(mainLoop)
}

window.requestAnimationFrame(mainLoop)
