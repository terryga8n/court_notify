const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'mutandwa05@gmail.com',
    pass: 'nhat cfsd dgyr qdoa'
  }
});

function sendCaseUpdateEmail(to, caseNumber, updateDetails) {
  const mailOptions = {
    from: 'your_email@gmail.com',
    to,
    subject: `Update on Case ${caseNumber}`,
    text: `There has been an update to your case:\n\n${updateDetails}\n\nPlease log in to the Court Notify system for more details.`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendCaseUpdateEmail };