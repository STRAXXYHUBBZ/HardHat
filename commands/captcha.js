const { Captcha } = require('captcha-canvas');
const { MessageAttachment, TeamMember } = require('discord.js');

module.exports = {
    name: "captcha",
    run: async (client, message, args) => {

    const captcha = new Captcha(); //create a captcha canvas of 100x300.
    captcha.async = true //Sync
    captcha.addDecoy(); //Add decoy text on captcha canvas.
    captcha.drawTrace(); //draw trace lines on captcha canvas.
    captcha.drawCaptcha(); //draw captcha text on captcha canvas.

    const captchaAttacment = new MessageAttachment(
    await captcha.png,
    "captcha.png"
    );

   const msg = await member.send({ 
    files: [captchaAttacment], 
    content: "Solve the captcha",
   });
}
};