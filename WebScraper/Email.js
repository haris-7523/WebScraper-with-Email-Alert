const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hasnainkhanzada089@gmail.com',
      pass: 'nfbjrrofkunjyulx'
    },
    tls: {
      rejectUnauthorized: false
  }
  });

var mailOptions = {
        from: 'hasnainkhanzada089@gmail.com',
        to: 'hariszahid90@gmail.com',
        subject: '',
        text:''
      };

function sendMail(subject,text,link,url) {
mailOptions.subject = subject;
mailOptions.html = "<a href="+url+link+ ">" + text + "</a>";
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {sendMail};