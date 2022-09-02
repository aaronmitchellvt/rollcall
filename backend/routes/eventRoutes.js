const express = require('express')
const router = express.Router()
const { getEvents, postEvents, deleteEvent, updateEvents, getOneEvent, registerForEvent, getRegisteredPlayers } = require('../controllers/eventsController')
const uploadImage = require('../services/uploadImage')
const Event = require('../models/eventModel')

router.get('/', getEvents)

router.get('/registered/:id', getRegisteredPlayers)

router.get('/:id', getOneEvent)

router.post('/', uploadImage.single("layoutImg"), async (req, res) => {
  const { title, date, hours, weatherDate } = req.body

  if(!title && !date && !hours && !weatherDate) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  const event = await Event.create({ title, date, hours, weatherDate, layoutImg: req.file.location })
  res.status(200).json(event)
})

router.post('/register/:id', registerForEvent)

router.delete('/:id', deleteEvent)

router.put('/:id', updateEvents)


module.exports = router
