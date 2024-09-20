import { Pool } from "./pool.js"
import { Renderer } from "./render.js"
import { EventState } from "./state.js"

const canvas = document.querySelector("canvas")
if (!canvas) {
    throw Error("Error getting context")
}

canvas.width = 800
canvas.height = 600

const renderer = new Renderer(canvas)
const state = new EventState(canvas)
const pool = new Pool()

export { canvas, renderer, state, pool }
