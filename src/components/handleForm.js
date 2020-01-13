const bodyParser = require("body-parser")
const express = require("express")
const nodemailer = require("nodemailer")
const app = express()
app.use(bodyParser.urlencoded())
const contactAddress = "http://localhost:8000"
const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.production.GMAIL_ADDRESS,
    pass: process.env.production.GMAIL_PASSWORD,
  },
})
app.post("/korzina", function(req, res) {
  mailer.sendMail(
    {
      from: req.body.from,
      to: [contactAddress],
      subject: req.body.subject || "[No subject]",
      html: req.body.message || "[No message]",
    },
    function(err, info) {
      if (err) return res.status(500).send(err)
      res.json({ success: true })
      console.log('====================================');
      console.log(info);
      console.log('====================================');
    }
  )
})
app.listen(3000)