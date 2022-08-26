import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {deleteEvent} from '../features/events/eventSlice'

function EventTile({event}) {
  console.log("Event from event tile: ", event)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state)=>state.auth)
  let isAdmin = false
  if(user && user.email === "admin@email.com") {
    isAdmin = true
  }

  const onClick = () => {
    navigate(`/events/${event._id}`)
  }

  return (
    <div className='goal'>
      <div>
        <h2>{event.title}</h2>
        <h3>{event.date}</h3>
        <h3>{event.hours}</h3>
      </div>
      <button className='btn btn-block' onClick={onClick}>More Info</button>
      {isAdmin && <button onClick={() => dispatch(deleteEvent(event._id))} className='btn-delete btn-block'>Delete Event</button>}
    </div>
  )
}

export default EventTile