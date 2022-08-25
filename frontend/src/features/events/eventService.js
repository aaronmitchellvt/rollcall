import axios from 'axios'
const API_URL = '/api/events/'

const createEvent = async (eventData) => {
  console.log("Event data: ", eventData)
  const response = await axios.post(API_URL, eventData)
  return response.data
}

const getEvents = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const eventService = {
  createEvent,
  getEvents
}

export default eventService