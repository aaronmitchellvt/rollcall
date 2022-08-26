import axios from 'axios'
const API_URL = 'api/events/'
// const API_URL = "http://localhost:5000/api/events"

const createEvent = async (eventData) => {
  console.log("Event data: ", eventData)
  const response = await axios.post(API_URL, eventData)
  console.log("Response data: ", response.data)
  return response.data
}

const getEvents = async () => {
  const response = await axios.get(API_URL)
  console.log("Get events response data: ", response.data)
  return response.data
}

const getOneEvent = async (eventId) => {
  const response = await axios.get(`http://localhost:5000/api/events/${eventId}`)
  console.log("One Event Response data: ", response.data)
  return response.data
}

const deleteEvent = async (id) => {
  const response = await axios.delete(`http://localhost:5000/api/events/${id}`)
  return response.data
}

const eventService = {
  createEvent,
  getEvents,
  getOneEvent,
  deleteEvent
}
export default eventService