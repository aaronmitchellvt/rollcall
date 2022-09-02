import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import eventService from "../features/events/eventService";
// import { eventManager } from "react-toastify/dist/core";

function EventShow(props) {
  // const dispatch = useDispatch();

  const [eventWeather, setEventWeather] = useState(null);
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState("");
  const [registeredPlayers, setRegisteredPlayers] = useState([]);
  const [event, setEvent] = useState({
    title: "",
    date: "",
    hours: "",
    weatherDate: "",
    layoutImg: ""
  });

  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const fetchEventData = async () => {
    const { title, date, hours, weatherDate, layoutImg } = await eventService.getOneEvent(
      id
    );
    console.log("Weather date: ", weatherDate);
    setEvent({
      title: title,
      date: date,
      hours: hours,
      weatherDate: weatherDate,
      layoutImg: layoutImg
    });
    const forecast = await eventService.getWeather(weatherDate);
    const forecastString = forecast
      ? `${forecast.temperature}F - ${forecast.shortForecast}`
      : "Error fetching weather";
    setEventWeather(forecastString);
  };

  const getRegisteredPlayers = async () => {
    const players = await eventService.getRegisteredPlayers(id);
    // console.log("Players: ", players);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    eventService.registerForEvent(id, { estimatedArrivalTime, userId });
    setEstimatedArrivalTime("");
    console.log("onSubmit");
  };

  useEffect(() => {
    fetchEventData();
    // getRegisteredPlayers();
    // getWeather(event.weatherDate);
  }, []);

  return (
    <>
      <h2>{event.title}</h2>
      <h3>{event.date}</h3>
      <h3>{event.hours}</h3>
      <hr />
      <section className="form margin-top-bottom">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Estimated Arrival Time</label>
            <input
              type="text"
              name="estimatedArrivalTime"
              id="estimatedArrivalTime"
              value={estimatedArrivalTime}
              onChange={(e) => {
                setEstimatedArrivalTime(e.target.value);
              }}
            />
            <button type="submit" className="btn btn-block">
              I'll be there!
            </button>
          </div>
        </form>
      </section>
      <hr />
      <section className="margin-top-bottom">
        <h2>These players will be there</h2>
        <ul></ul>
      </section>

      <hr />
      <section className="margin-top-bottom">
        <h2>Event Layout</h2>
      </section>

      <hr />
      <section>
        <img alt="event-layout" src={event.layoutImg} />
        <h2>Weather</h2>
        <p>{eventWeather}</p>
      </section>
    </>
  );
}

export default EventShow;
