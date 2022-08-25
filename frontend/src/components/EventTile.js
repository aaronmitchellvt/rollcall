import React from 'react'

function EventTile({event}) {
  return (
    <div className='goal'>
      <div>
        <h2>{event.title}</h2>
      </div>
    </div>
  )
}

export default EventTile