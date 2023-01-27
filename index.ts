import { RGBot } from "rg-bot";

const BLUE_SCORE = [160, -385]

/**
 * This strategy is the simplest example of how to get started with the rg-bot package.
 * The Bot will run around and gather Poppies until it has 100 in its inventory.
 */
export function configureBot(bot: RGBot) {

    bot.setDebug(true);

    // This is our main loop. The Bot will invoke this on spawn.
    // goal: collect 100 Poppies
    async function getFlag() {
        let flag = bot.findBlock("white_banner", {maxDistance: 100})
        if (flag) {
            bot.chat("Going to get the flag!");
            await bot.approachBlock(flag)
        } else {
            bot.chat("Did not find the flag")
        }
    }

    bot.on("playerCollect", async (collector, collected) => {
        bot.chat(JSON.stringify(collector))
        bot.chat(JSON.stringify(collected))
    })

    // Have the Bot begin our main loop when it spawns into the game
    bot.on('spawn', async () => {
        bot.chat('Get ready to face your doom!');
    });

    bot.on('chat', async (username: string, message: string) => {
        if (message == "get flag") {
            getFlag();
        }
    })

}