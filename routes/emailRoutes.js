require('dotenv').config();

var express=require('express');
var cors = require('./../cors');
const emailRouter = express.Router();
var nodemailer = require('nodemailer');
var mailGun = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: process.env.KEY ,
    domain: process.env.DOMAIN
  }
};


emailRouter.route('/')

.options(cors.cors,(req,res)=>{
    console.log("Coming email here");
    res.sendStatus(200);
})

// route which captures form details and sends it to your personal mail
.post(cors.cors,(req,res,next)=>{
    
  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
    here we are using gmail as our service 
    In Auth object , we specify our email and password
  */
  var transporter = nodemailer.createTransport(mailGun(auth)); 

  /*
    In mail options we specify from and to address, subject and HTML content.
    In our case , we use our personal email as from and to address,
    Subject is Contact name and 
    html is our form details which we parsed using bodyParser.
  */
  var mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: req.body.name+" | "+req.body.subject,
    text: req.body.message
  };
  
  /* Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
   call back as parameter 
  */

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    //  console.log(error);
      res.json({message: "error"}) // if error occurs send error as response to client
    } else {
 //     console.log('Email sent: ' + info.response);
      res.json({message: "success"})//if mail is sent successfully send Sent successfully as response
    }
  });
})


module.exports = emailRouter;