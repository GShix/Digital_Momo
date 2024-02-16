const nodeMailer = require('nodemailer');
const sendEmail = async(options)=>{
    var transporter =nodeMailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from:"Digital MO:MO",
        to: options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailOptions)
}
module.exports  = sendEmail