import { useState } from "react";
import {useDispatch } from "react-redux";
import { createEvent } from '../features/events/eventSlice'

function EventForm() {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createEvent({title}))
    setTitle('')
    console.log("onSubmit");
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Event</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Event
          </button>
        </div>
      </form>
    </section>
  );
}

export default EventForm;
