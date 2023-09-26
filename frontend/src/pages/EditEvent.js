import { useRouteLoaderData } from "react-router-dom";
import EventsForm from "../components/EventsForm";

const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");

  return <EventsForm event={data.event} />;
};

export default EditEventPage;
