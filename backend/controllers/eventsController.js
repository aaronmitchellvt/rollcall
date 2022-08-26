const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')
//Get the available events
// GET /api/events
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find()
  res.status(200).json(events)
})

//Post an event to DB
// POST /api/events
const postEvents = asyncHandler(async (req, res) => {
  const { title, date, hours } = req.body
  console.log("Post event Req.body: ", req.body)
  if(!title && !date && !hours) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  const event = await Event.create({ title, date, hours })
  res.status(200).json(event)
})

//Delete an event
// DELETE /api/events/:id
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
  if(!event) {
    res.status(400)
    throw new Error('Event not found')
  }

  await event.remove()
  res.status(200).json({ id: req.params.id })
})

//Update an event
// PUT /api/events/:id
const updateEvents = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
  if(!event) {
    res.status(400)
    throw new Error('Event not found')
  }
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(updatedEvent)
})

module.exports = {
  getEvents,
  postEvents,
  deleteEvent,
  updateEvents
}

//ep #2 around 40-50min for protected routes