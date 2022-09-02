import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../features/events/eventSlice";
import Dropzone from "react-dropzone";

function EventForm() {
  const [eventPayload, setEventPayload] = useState({
    title: "",
    date: "",
    hours: "",
    weatherDate: "",
    layoutImg: {},
  });

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const newEventBody = new FormData()
    newEventBody.append("title", eventPayload.title)
    newEventBody.append("date", eventPayload.date)
    newEventBody.append("hours", eventPayload.hours)
    newEventBody.append("weatherDate", eventPayload.weatherDate)
    newEventBody.append("layoutImg", eventPayload.layoutImg)
    dispatch(createEvent(newEventBody));
    setEventPayload({
      title: "",
      date: "",
      hours: "",
      layoutImg: {}
    });
    console.log("onSubmit");
  };

  const handleInputChange = (event) => {
    setEventPayload({
      ...eventPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleImageUpload = (acceptedImage) => {
    setEventPayload({
      ...eventPayload,
      layoutImg: acceptedImage[0],
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

          <label htmlFor="text">Date for Weather</label>
          <input
            type="text"
            name="weatherDate"
            id="weatherDate"
            placeholder="Format Ex. 08-31-2022"
            value={eventPayload.weatherDate}
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

          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Upload Layout Image - drag 'n' drop or click to upload</p>
                </div>
              </section>
            )}
          </Dropzone>


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
