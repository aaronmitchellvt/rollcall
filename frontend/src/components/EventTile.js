import React from 'react'

function EventTile({event}) {
  console.log("Event from event tile: ", event)
  return (
    <div className='goal'>
      <div>
        <h2>{event.title}</h2>
        <h3>{event.date}</h3>
        <h3>{event.hours}</h3>
      </div>
    </div>
  )
}

export default EventTile