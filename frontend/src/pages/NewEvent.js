import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventsForm";

const NewEventPage = () => {
  return <EventForm method="post" />;
};

export default NewEventPage;
