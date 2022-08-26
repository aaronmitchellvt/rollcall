const express = require('express')
const router = express.Router()
const { getEvents, postEvents, deleteEvent, updateEvents, getOneEvent } = require('../controllers/eventsController')

router.get('/', getEvents)

router.get('/:id', getOneEvent)

router.post('/', postEvents)

router.delete('/:id', deleteEvent)

router.put('/:id', updateEvents)


module.exports = router
