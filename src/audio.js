/**
 * @param {HTMLAudioElement} sound
 */
export function playSound(sound) {
    sound.currentTime = 0
    sound.volume = 0.55
    sound.play().catch((e) => {})
}
