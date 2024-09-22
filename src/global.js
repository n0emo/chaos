import { Game } from "./game.js"
import { Assets } from "./assets.js"
import { Pool } from "./pool.js"
import { Renderer } from "./render.js"
import { EventState } from "./state.js"

const canvas = document.querySelector("canvas")
if (!canvas) {
    throw Error("Error getting context")
}

/** @type {Renderer} */
export const renderer = new Renderer(canvas)

/** @type {EventState} */
export const state = new EventState(canvas)

/** @type {Pool} */
export const pool = new Pool()

/** @type {Game} */
export const game = Game.load()
