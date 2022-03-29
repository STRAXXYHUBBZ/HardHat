const client = require("../index")
const { Captcha } = require('captcha-canvas');
const { MessageAttachment, MessageEmbed } = require('discord.js');

client.on('guildMemberAdd', async (member) => {
    const captcha = new Captcha(); //create a captcha canvas of 100x300.
    captcha.async = true //Sync
    captcha.addDecoy(); //Add decoy text on captcha canvas.
    captcha.drawTrace(); //draw trace lines on captcha canvas.
    captcha.drawCaptcha(); //draw captcha text on captcha canvas.

    const captchaAttacment = new MessageAttachment(
    await captcha.png,
    "captcha.png"
    );

    const captchaEmbed = new MessageEmbed()
    .setDescription("Please complete this captcha!")
    .setImage("attachment://captcha.png")
    .setColor("#FFF480")

    const msg = await member.send({ 
        files: [captchaAttacment], 
        embeds: [captchaEmbed],
    });

    const filter = (message) => {
        if(message.author.id !== member.id) return;
        if(message.content === captcha.text) return true;
        else member.send("Invalid Answer!")
    }
    try {
        const response = await msg.channel.awaitMessages({
         filter, 
         max: 1, 
         time: 10000,
         errors: ["time"],
});
    if(response) {
        console.log("yay!")
    }
    } catch(err){
        await member.send('You have not verified, you will be removed from this server if you do not verify! ``10`` Seconds remaining.')
        member.kick("Didn't answer captcha");
    }
});
