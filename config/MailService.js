const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "mail.speridian.com",
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: '',
      pass: "",
    },
  });

    // send mail with defined transport object
  const sendMail = async function (from,to,subject,text){
    await transporter.sendMail({
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: "<b>Test</b>", // html body
    });

  }

  module.exports = {
    sendMail: sendMail,
    transporter: transporter
  }