var nodemailer = require("nodemailer");

const sendEmail = (res, email, subject, content) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.GOOGLE_EMAIL,
    to: email,
    subject,
    text: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      return res.json({ message: "Success" });
    }
  });
};

module.exports = sendEmail;
