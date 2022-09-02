import axios from 'axios'
const API_URL = 'api/events/'
// const API_URL = "http://localhost:5000/api/events"

const createEvent = async (eventData) => {
  console.log("Event data: ", eventData)
  const response = await axios.post(`http://localhost:5000/api/events/`, eventData, {
    headers: {
      'Accept' : 'image/jpeg'
    }
  })
  console.log("Response data: ", response.data)
  return response.data
}

const getEventWeather = async () => {
  const response = await axios.get(`http://localhost:5000/api/events/weather`)
  console.log("Weather response: ", response.data)
  return response.data
}

const getEvents = async () => {
  const response = await axios.get(API_URL)
  console.log("Get events response data: ", response.data)
  return response.data
}

const getOneEvent = async (eventId) => {
  const response = await axios.get(`http://localhost:5000/api/events/${eventId}`)
  // console.log("One Event Response data: ", response.data)
  return response.data
}

const deleteEvent = async (id) => {
  const response = await axios.delete(`http://localhost:5000/api/events/${id}`)
  return response.data
}

const registerForEvent = async (eventId, {estimatedArrivalTime, userId}) => {
  const response = await axios.post(`http://localhost:5000/api/events/register/${eventId}`, {estimatedArrivalTime, userId})
  return response.data
}

const getRegisteredPlayers = async (eventId) => {
  const response = await axios.get(`http://localhost:5000/api/events/registered/${eventId}`)
  return response.data
}

const getWeather = async (time) => {
  const response = await axios.get(
    "https://api.weather.gov/gridpoints/GYX/32,21/forecast"
  );
  const periods = response.data.properties.periods;

  let foundForecast = periods.find((period) => {
    const trimmedDate = period.startTime.slice(0, 10);
    if (trimmedDate === time && period.isDaytime) {
      return true;
    } else {
      return false;
    }
  });
  return foundForecast
};

const eventService = {
  createEvent,
  getEvents,
  getOneEvent,
  deleteEvent,
  registerForEvent,
  getRegisteredPlayers,
  getEventWeather, 
  getWeather
}
export default eventService