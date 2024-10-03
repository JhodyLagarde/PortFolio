const express = require('express');
const nodeMailer = require('nodemailer');

require('dotenv').config();

const app = express();

//Middleware
app.use(express.static('../FrontEnd'));
app.use(express.json());

//Route

app.post('/', (req, res) => {
  console.log(req.body);

  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: "",   //contact.jhody.lagarde@gmail.com
      pass: ""    //process.env.pass
    }
  });
  
  const mailOptions = {
    from: req.body.email,
    to: 'contact.jhody.lagarde@gmail.com',
    subject: `Message de ${req.body.name}: ${req.body.object}`,
    text: req.body.message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  })

})

module.exports = app;