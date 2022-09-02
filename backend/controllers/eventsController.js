const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')
const User = require('../models/userModel')
const uploadImage = require('../services/uploadImage')
// const { got } = require('got') 

//Get the available events
// GET /api/events
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find()
  res.status(200).json(events)
})

//Get 1 event by id
// GET /api/events/:id
const getOneEvent = asyncHandler(async (req, res) => {
  const id = req.params.id
  const event = await Event.findById(id)
  res.status(200).json(event)
})

//Post an event to DB
// POST /api/events
const postEvents = asyncHandler(uploadImage.single("layoutImg"), async (req, res) => {
  console.log("Hit post on backend")
  const { title, date, hours, weatherDate } = req.body
  console.log("Post event Req.body: ", req.body)
  if(!title && !date && !hours && !weatherDate) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  const event = await Event.create({ title, date, hours, weatherDate, layoutImg: req.file.location })
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

//Register for an event
const registerForEvent = asyncHandler(async (req, res) => {
  console.log('req body: ', req.body)
  const { estimatedArrivalTime, userId } = req.body
  const user = await User.findById(userId)
  const userName = user.name
  console.log("User: ", user.name)
  console.log("est arrival: ", estimatedArrivalTime)
  const event = await Event.findById(req.params.id)
  if(!event) {
    res.status(400)
    throw new Error('Event not found')
  }

  const player = {estimatedArrivalTime, userName}
  console.log("Player to push: ", player)
  await event.players.push(player)
  res.status(200).json(event.players)
})

//Get registered players
//GET /api/events/registered
const getRegisteredPlayers = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
  if(!event) {
    res.status(400)
    throw new Error('Event not found')
  }
  res.status(200).json(event.players)
})

module.exports = {
  getEvents,
  postEvents,
  deleteEvent,
  updateEvents,
  getOneEvent,
  registerForEvent,
  getRegisteredPlayers,
  // getEventWeather
}

//ep #2 around 40-50min for protected routes