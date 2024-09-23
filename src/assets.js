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

/**
 * @param {string} url
 * @returns {Promise<HTMLAudioElement>}
 */
async function loadAudio(url) {
    const audio = new Audio(url); // Set the src directly in the constructor
    return new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', () => resolve(audio), { once: true });
        audio.addEventListener('error', () => reject(new Error('Failed to load audio: ' + url)), { once: true });
        audio.load(); // Start loading the audio
    });
}

export class Assets {
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
    imagePlayerMove1
    /** @type {HTMLImageElement} */
    imagePlayerMove2

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

    /** @type {HTMLImageElement} */
    imageEnemyBig1
    /** @type {HTMLImageElement} */
    imageEnemyBig2
    /** @type {HTMLImageElement} */
    imageEnemyBomj1
    /** @type {HTMLImageElement} */
    imageEnemyBomj2
    /** @type {HTMLImageElement} */
    imageEnemyCatdark1
    /** @type {HTMLImageElement} */
    imageEnemyCatdark2
    /** @type {HTMLImageElement} */
    imageEnemyCatlight1
    /** @type {HTMLImageElement} */
    imageEnemyCatlight2
    /** @type {HTMLImageElement} */
    imageEnemyDJ1
    /** @type {HTMLImageElement} */
    imageEnemyDJ2
    /** @type {HTMLImageElement} */
    imageEnemyDJ3
    /** @type {HTMLImageElement} */
    imageEnemyDJ4
    /** @type {HTMLImageElement} */
    imageEnemyMiddle1
    /** @type {HTMLImageElement} */
    imageEnemyMiddle2
    /** @type {HTMLImageElement} */
    imageEnemySalat1
    /** @type {HTMLImageElement} */
    imageEnemySmall1
    /** @type {HTMLImageElement} */
    imageEnemySmall2
    /** @type {HTMLImageElement} */
    imageEnemySolder1
    /** @type {HTMLImageElement} */
    imageEnemySolder2

    /** @type {HTMLImageElement} */
    imageMenu
    /** @type {HTMLImageElement} */
    imagePressEnterToStart

    /** @type {HTMLImageElement} */
    imageLevel1
    /** @type {HTMLImageElement} */
    imageLevel1_2
    /** @type {HTMLImageElement} */
    imageLevel2
    /** @type {HTMLImageElement} */
    imageLevel2_3
    /** @type {HTMLImageElement} */
    imageLevel3

    /** @type {HTMLImageElement} */
    imageBulletBigBallBlue
    /** @type {HTMLImageElement} */
    imageBulletBigBallGreen
    /** @type {HTMLImageElement} */
    imageBulletBigBallPurple
    /** @type {HTMLImageElement} */
    imageBulletBigBallRed
    /** @type {HTMLImageElement} */
    imageBulletCowBlue
    /** @type {HTMLImageElement} */
    imageBulletCowGreen
    /** @type {HTMLImageElement} */
    imageBulletCowPurple
    /** @type {HTMLImageElement} */
    imageBulletCowRed
    /** @type {HTMLImageElement} */
    imageBulletMiddleBallBlue
    /** @type {HTMLImageElement} */
    imageBulletMiddleBallGreen
    /** @type {HTMLImageElement} */
    imageBulletMiddleBallPurple
    /** @type {HTMLImageElement} */
    imageBulletMiddleBallRed
    /** @type {HTMLImageElement} */
    imageBulletMusicalNoteBlue
    /** @type {HTMLImageElement} */
    imageBulletMusicalNoteGreen
    /** @type {HTMLImageElement} */
    imageBulletMusicalNotePurple
    /** @type {HTMLImageElement} */
    imageBulletMusicalNoteRed
    /** @type {HTMLImageElement} */
    imageBulletSeriousBallBlue
    /** @type {HTMLImageElement} */
    imageBulletSeriousBallGreen
    /** @type {HTMLImageElement} */
    imageBulletSeriousBallPurple
    /** @type {HTMLImageElement} */
    imageBulletSeriousBallRed
    /** @type {HTMLImageElement} */
    imageBulletSmallBallBlue
    /** @type {HTMLImageElement} */
    imageBulletSmallBallGreen
    /** @type {HTMLImageElement} */
    imageBulletSmallBallPurple
    /** @type {HTMLImageElement} */
    imageBulletSmallBallRed

    /** @type {HTMLImageElement} */
    imageEventCargo
    /** @type {HTMLImageElement} */
    imageEventChina
    /** @type {HTMLImageElement} */
    imageEventCreditCard
    /** @type {HTMLImageElement} */
    imageEventFish1
    /** @type {HTMLImageElement} */
    imageEventFish2
    /** @type {HTMLImageElement} */
    imageEventFishing1
    /** @type {HTMLImageElement} */
    imageEventFishing2
    /** @type {HTMLImageElement} */
    imageEventXdProduct

    /** @type {HTMLImageElement} */
    imagePressSpaceToSkip1
    /** @type {HTMLImageElement} */
    imagePressSpaceToSkip2

    /** @type {HTMLImageElement} */
    imageFishingTime1
    /** @type {HTMLImageElement} */
    imageFishingTime2

    /** @type {HTMLImageElement} */
    imagePause

    /** @type {HTMLImageElement} */
    imageIconCleaner
    /** @type {HTMLImageElement} */
    imageIconHealing
    /** @type {HTMLImageElement} */
    imageIconHealth1
    /** @type {HTMLImageElement} */
    imageIconHealth2
    /** @type {HTMLImageElement} */
    imageIconInvulnerability
    /** @type {HTMLImageElement} */
    imageIconLife
    /** @type {HTMLImageElement} */
    imageIconSave
    /** @type {HTMLImageElement} */
    imageIconUpgrade

    /** @type {HTMLImageElement} */
    imageEscape
    /** @type {HTMLImageElement} */
    imageCongratulations
    /** @type {HTMLImageElement} */
    imageGameover

    /** @type {HTMLAudioElement} */
    audioMenuTheme
    /** @type {HTMLAudioElement} */
    audioMainTheme
    /** @type {HTMLAudioElement} */
    audioBossTheme

    /** @type {HTMLAudioElement} */
    audioAds
    /** @type {HTMLAudioElement} */
    audioAlarm
    /** @type {HTMLAudioElement} */
    audioBarf
    /** @type {HTMLAudioElement} */
    audioBlaster
    /** @type {HTMLAudioElement} */
    audioDeath
    /** @type {HTMLAudioElement} */
    audioDonk
    /** @type {HTMLAudioElement} */
    audioGet1
    /** @type {HTMLAudioElement} */
    audioGet2
    /** @type {HTMLAudioElement} */
    audioGrowl
    /** @type {HTMLAudioElement} */
    audioGunshot
    /** @type {HTMLAudioElement} */
    audioKick
    /** @type {HTMLAudioElement} */
    audioLaser2
    /** @type {HTMLAudioElement} */
    audioSydney
    /** @type {HTMLAudioElement} */
    audioTok
    /** @type {HTMLAudioElement} */
    audioWeird
    /** @type {HTMLAudioElement} */
    audioWelcome
    /** @type {HTMLAudioElement} */
    audioWhistle
    /** @type {HTMLAudioElement} */
    audioWin
    /** @type {HTMLAudioElement} */
    audioYoink

    /**
     * @returns Assets
     */
    static async load() {
        const [
            imagePlayerDrink1,
            imagePlayerDrink2,
            imagePlayerDrink3,
            imagePlayerDrink4,
            imagePlayerDrink5,
            imagePlayerMove1,
            imagePlayerMove2,
            imagePlayerHappy1,
            imagePlayerHappy2,
            imagePlayerHappy3,
            imagePlayerHappy4,
            imagePlayerHappy5,
            imagePlayerHappy6,
            imagePlayerIdle1,
            imagePlayerIdle2,
            imagePlayerIdle3,
            imageEnemyBig1,
            imageEnemyBig2,
            imageEnemyBomj1,
            imageEnemyBomj2,
            imageEnemyCatdark1,
            imageEnemyCatdark2,
            imageEnemyCatlight1,
            imageEnemyCatlight2,
            imageEnemyDJ1,
            imageEnemyDJ2,
            imageEnemyDJ3,
            imageEnemyDJ4,
            imageEnemyMiddle1,
            imageEnemyMiddle2,
            imageEnemySalat1,
            imageEnemySmall1,
            imageEnemySmall2,
            imageEnemySolder1,
            imageEnemySolder2,
            imageMenu,
            imagePressEnterToStart,
            imageLevel1,
            imageLevel1_2,
            imageLevel2,
            imageLevel2_3,
            imageLevel3,
            imageBulletBigBallBlue,
            imageBulletBigBallGreen,
            imageBulletBigBallPurple,
            imageBulletBigBallRed,
            imageBulletCowBlue,
            imageBulletCowGreen,
            imageBulletCowPurple,
            imageBulletCowRed,
            imageBulletMiddleBallBlue,
            imageBulletMiddleBallGreen,
            imageBulletMiddleBallPurple,
            imageBulletMiddleBallRed,
            imageBulletMusicalNoteBlue,
            imageBulletMusicalNoteGreen,
            imageBulletMusicalNotePurple,
            imageBulletMusicalNoteRed,
            imageBulletSeriousBallBlue,
            imageBulletSeriousBallGreen,
            imageBulletSeriousBallPurple,
            imageBulletSeriousBallRed,
            imageBulletSmallBallBlue,
            imageBulletSmallBallGreen,
            imageBulletSmallBallPurple,
            imageBulletSmallBallRed,
            imageEventCargo,
            imageEventChina,
            imageEventCreditCard,
            imageEventFish1,
            imageEventFish2,
            imageEventFishing1,
            imageEventFishing2,
            imageEventXdProduct,
            imagePressSpaceToSkip1,
            imagePressSpaceToSkip2,
            imageFishingTime1,
            imageFishingTime2,
            imagePause,
            imageIconCleaner,
            imageIconHealing,
            imageIconHealth1,
            imageIconHealth2,
            imageIconInvulnerability,
            imageIconLife,
            imageIconSave,
            imageIconUpgrade,
            imageEscape,
            imageCongratulations,
            imageGameover,
        ] = await Promise.all([
            loadImage("assets/sprites/player-drink-1.png"),
            loadImage("assets/sprites/player-drink-2.png"),
            loadImage("assets/sprites/player-drink-3.png"),
            loadImage("assets/sprites/player-drink-4.png"),
            loadImage("assets/sprites/player-drink-5.png"),
            loadImage("assets/sprites/player-move-1.png"),
            loadImage("assets/sprites/player-move-2.png"),
            loadImage("assets/sprites/player-happy-1.png"),
            loadImage("assets/sprites/player-happy-2.png"),
            loadImage("assets/sprites/player-happy-3.png"),
            loadImage("assets/sprites/player-happy-4.png"),
            loadImage("assets/sprites/player-happy-5.png"),
            loadImage("assets/sprites/player-happy-6.png"),
            loadImage("assets/sprites/player-idle-1.png"),
            loadImage("assets/sprites/player-idle-2.png"),
            loadImage("assets/sprites/player-idle-3.png"),
            loadImage("assets/sprites/enemy-big-1.png"),
            loadImage("assets/sprites/enemy-big-2.png"),
            loadImage("assets/sprites/enemy-bomj-1.png"),
            loadImage("assets/sprites/enemy-bomj-2.png"),
            loadImage("assets/sprites/enemy-cat-dark-1.png"),
            loadImage("assets/sprites/enemy-cat-dark-2.png"),
            loadImage("assets/sprites/enemy-cat-light-1.png"),
            loadImage("assets/sprites/enemy-cat-light-2.png"),
            loadImage("assets/sprites/enemy-DJ-1.png"),
            loadImage("assets/sprites/enemy-DJ-2.png"),
            loadImage("assets/sprites/enemy-DJ-3.png"),
            loadImage("assets/sprites/enemy-DJ-4.png"),
            loadImage("assets/sprites/enemy-middle-1.png"),
            loadImage("assets/sprites/enemy-middle-2.png"),
            loadImage("assets/sprites/enemy-salat-1.png"),
            loadImage("assets/sprites/enemy-small-1.png"),
            loadImage("assets/sprites/enemy-small-2.png"),
            loadImage("assets/sprites/enemy-solder-1.png"),
            loadImage("assets/sprites/enemy-solder-2.png"),
            loadImage("assets/sprites/menu.png"),
            loadImage("assets/sprites/press-enter-to-start.png"),
            loadImage("assets/sprites/level-1.png"),
            loadImage("assets/sprites/level-1-2.png"),
            loadImage("assets/sprites/level-2.png"),
            loadImage("assets/sprites/level-2-3.png"),
            loadImage("assets/sprites/level-3.png"),
            loadImage("assets/sprites/bullet-big-ball-blue.png"),
            loadImage("assets/sprites/bullet-big-ball-green.png"),
            loadImage("assets/sprites/bullet-big-ball-purple.png"),
            loadImage("assets/sprites/bullet-big-ball-red.png"),
            loadImage("assets/sprites/bullet-cow-blue.png"),
            loadImage("assets/sprites/bullet-cow-green.png"),
            loadImage("assets/sprites/bullet-cow-purple.png"),
            loadImage("assets/sprites/bullet-cow-red.png"),
            loadImage("assets/sprites/bullet-middle-ball-blue.png"),
            loadImage("assets/sprites/bullet-middle-ball-green.png"),
            loadImage("assets/sprites/bullet-middle-ball-purple.png"),
            loadImage("assets/sprites/bullet-middle-ball-red.png"),
            loadImage("assets/sprites/bullet-musical-note-blue.png"),
            loadImage("assets/sprites/bullet-musical-note-green.png"),
            loadImage("assets/sprites/bullet-musical-note-purple.png"),
            loadImage("assets/sprites/bullet-musical-note-red.png"),
            loadImage("assets/sprites/bullet-serious-ball-blue.png"),
            loadImage("assets/sprites/bullet-serious-ball-green.png"),
            loadImage("assets/sprites/bullet-serious-ball-purple.png"),
            loadImage("assets/sprites/bullet-serious-ball-red.png"),
            loadImage("assets/sprites/bullet-small-ball-blue.png"),
            loadImage("assets/sprites/bullet-small-ball-green.png"),
            loadImage("assets/sprites/bullet-small-ball-purple.png"),
            loadImage("assets/sprites/bullet-small-ball-red.png"),
            loadImage("assets/sprites/event-cargo.png"),
            loadImage("assets/sprites/event-china.png"),
            loadImage("assets/sprites/event-credit-card.png"),
            loadImage("assets/sprites/event-fish-1.png"),
            loadImage("assets/sprites/event-fish-2.png"),
            loadImage("assets/sprites/event-fishing-1.png"),
            loadImage("assets/sprites/event-fishing-2.png"),
            loadImage("assets/sprites/event-xd-product.png"),
            loadImage("assets/sprites/press-space-to-skip-1.png"),
            loadImage("assets/sprites/press-space-to-skip-2.png"),
            loadImage("assets/sprites/fishing-time-1.png"),
            loadImage("assets/sprites/fishing-time-2.png"),
            loadImage("assets/sprites/pause.png"),
            loadImage("assets/sprites/icon-cleaner.png"),
            loadImage("assets/sprites/icon-healing.png"),
            loadImage("assets/sprites/icon-health-1.png"),
            loadImage("assets/sprites/icon-health-2.png"),
            loadImage("assets/sprites/icon-invulnerability.png"),
            loadImage("assets/sprites/icon-life.png"),
            loadImage("assets/sprites/icon-save.png"),
            loadImage("assets/sprites/icon-upgrade.png"),
            loadImage("assets/sprites/escape.png"),
            loadImage("assets/sprites/congratulations.png"),
            loadImage("assets/sprites/gameover.png"),
        ])

        const [
            audioMenuTheme,
            audioMainTheme,
            audioBossTheme,

            audioAds,
            audioAlarm,
            audioBarf,
            audioBlaster,
            audioDeath,
            audioDonk,
            audioGet1,
            audioGet2,
            audioGrowl,
            audioGunshot,
            audioKick,
            audioLaser2,
            audioSydney,
            audioTok,
            audioWeird,
            audioWelcome,
            audioWhistle,
            audioWin,
            audioYoink,
        ] = await Promise.all([
            loadAudio("assets/music/menu-theme.mp3"),
            loadAudio("assets/music/main-theme.mp3"),
            loadAudio("assets/music/boss-theme.mp3"),

            loadAudio("assets/sounds/ads.wav"),
            loadAudio("assets/sounds/alarm.wav"),
            loadAudio("assets/sounds/barf.wav"),
            loadAudio("assets/sounds/blaster.wav"),
            loadAudio("assets/sounds/death.wav"),
            loadAudio("assets/sounds/donk.wav"),
            loadAudio("assets/sounds/get-1.wav"),
            loadAudio("assets/sounds/get-2.wav"),
            loadAudio("assets/sounds/growl.wav"),
            loadAudio("assets/sounds/gunshot.wav"),
            loadAudio("assets/sounds/kick.wav"),
            loadAudio("assets/sounds/laser-2.wav"),
            loadAudio("assets/sounds/sydney.wav"),
            loadAudio("assets/sounds/tok.wav"),
            loadAudio("assets/sounds/weird.wav"),
            loadAudio("assets/sounds/welcome.wav"),
            loadAudio("assets/sounds/whistle.wav"),
            loadAudio("assets/sounds/win.wav"),
            loadAudio("assets/sounds/yoink.wav"),
        ])

        return {
            imagePlayerDrink1,
            imagePlayerDrink2,
            imagePlayerDrink3,
            imagePlayerDrink4,
            imagePlayerDrink5,
            imagePlayerMove1,
            imagePlayerMove2,
            imagePlayerHappy1,
            imagePlayerHappy2,
            imagePlayerHappy3,
            imagePlayerHappy4,
            imagePlayerHappy5,
            imagePlayerHappy6,
            imagePlayerIdle1,
            imagePlayerIdle2,
            imagePlayerIdle3,
            imageEnemyBig1,
            imageEnemyBig2,
            imageEnemyBomj1,
            imageEnemyBomj2,
            imageEnemyCatdark1,
            imageEnemyCatdark2,
            imageEnemyCatlight1,
            imageEnemyCatlight2,
            imageEnemyDJ1,
            imageEnemyDJ2,
            imageEnemyDJ3,
            imageEnemyDJ4,
            imageEnemyMiddle1,
            imageEnemyMiddle2,
            imageEnemySalat1,
            imageEnemySmall1,
            imageEnemySmall2,
            imageEnemySolder1,
            imageEnemySolder2,
            imageMenu,
            imagePressEnterToStart,
            imageLevel1,
            imageLevel1_2,
            imageLevel2,
            imageLevel2_3,
            imageLevel3,
            imageBulletBigBallBlue,
            imageBulletBigBallGreen,
            imageBulletBigBallPurple,
            imageBulletBigBallRed,
            imageBulletCowBlue,
            imageBulletCowGreen,
            imageBulletCowPurple,
            imageBulletCowRed,
            imageBulletMiddleBallBlue,
            imageBulletMiddleBallGreen,
            imageBulletMiddleBallPurple,
            imageBulletMiddleBallRed,
            imageBulletMusicalNoteBlue,
            imageBulletMusicalNoteGreen,
            imageBulletMusicalNotePurple,
            imageBulletMusicalNoteRed,
            imageBulletSeriousBallBlue,
            imageBulletSeriousBallGreen,
            imageBulletSeriousBallPurple,
            imageBulletSeriousBallRed,
            imageBulletSmallBallBlue,
            imageBulletSmallBallGreen,
            imageBulletSmallBallPurple,
            imageBulletSmallBallRed,
            imageEventCargo,
            imageEventChina,
            imageEventCreditCard,
            imageEventFish1,
            imageEventFish2,
            imageEventFishing1,
            imageEventFishing2,
            imageEventXdProduct,
            imagePressSpaceToSkip1,
            imagePressSpaceToSkip2,
            imageFishingTime1,
            imageFishingTime2,
            imagePause,
            imageIconCleaner,
            imageIconHealing,
            imageIconHealth1,
            imageIconHealth2,
            imageIconInvulnerability,
            imageIconLife,
            imageIconSave,
            imageIconUpgrade,
            imageEscape,
            imageCongratulations,
            imageGameover,
            audioMenuTheme,
            audioMainTheme,
            audioBossTheme,
            audioAds,
            audioAlarm,
            audioBarf,
            audioBlaster,
            audioDeath,
            audioDonk,
            audioGet1,
            audioGet2,
            audioGrowl,
            audioGunshot,
            audioKick,
            audioLaser2,
            audioSydney,
            audioTok,
            audioWeird,
            audioWelcome,
            audioWhistle,
            audioWin,
            audioYoink,
        }
    }
}


/** @type {Assets} */
export const assets = await Assets.load()
