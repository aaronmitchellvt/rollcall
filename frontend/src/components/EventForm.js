import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../features/events/eventSlice";

function EventForm() {
  const [eventPayload, setEventPayload] = useState({
    title: "",
    date: "",
    hours: "",
  });

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createEvent(eventPayload));
    setEventPayload({
      title: "",
      date: "",
      hours: "",
    });
    console.log("onSubmit");
  };

  const handleInputChange = (event) => {
    setEventPayload({
      ...eventPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Event Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={eventPayload.title}
            onChange={handleInputChange}
          />

          <label htmlFor="text">Date</label>
          <input
            type="text"
            name="date"
            id="date"
            value={eventPayload.date}
            onChange={handleInputChange}
          />

          <label htmlFor="text">Hours</label>
          <input
            type="text"
            name="hours"
            id="hours"
            value={eventPayload.hours}
            onChange={handleInputChange}
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
