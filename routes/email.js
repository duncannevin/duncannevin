const express = require('express')
const router = express.Router()
const axios = require('axios')

/* GET users listing. */
router.post('/send', function (req, res, next) {
  const data = {
    service_id: process.env.SERVICE_ID || 'NEEDS .env FILE',
    template_id: process.env.TEMPLATE_ID || 'NEEDS .env FILE',
    user_id: process.env.USER_ID || 'NEEDS .env FILE',
    template_params: req.body
  }

  axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
    .then(() => {
      res.status(201).send({msg: 'Sent!'})
    })
    .catch((err) => {
      res.status(err.status).send(err)
    })
})

module.exports = router
