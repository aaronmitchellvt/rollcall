import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
// import { getOneEvent } from '../features/events/eventService'
import eventService from "../features/events/eventService"

function EventShow(props) {

  const [event, setEvent] = useState({
    title: "",
    date: "",
    hours: ""
  })

  const {id} = useParams()
  console.log("Event ID: ", id)

  const fetchEventData = async() => {
    const eventData = await eventService.getOneEvent(id)
    setEvent({
      title: eventData.title,
      date: eventData.date,
      hours: eventData.hours
    })
  }


  useEffect(()=> {
    fetchEventData()
  }, [])

  return (
    <>
      <h2>{event.title}</h2>
      <h3>{event.date}</h3>
      <h3>{event.hours}</h3>
    </>
  )
}

export default EventShow