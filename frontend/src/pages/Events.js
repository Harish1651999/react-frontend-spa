import React from "react";
import EventsList from "../components/EventsList";
import { json, useLoaderData } from "react-router-dom";

const EventsPage = () => {
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />;
};

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/eventsaas");

  if (!response.ok) {
    // throw new Error(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });

    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    return response;
  }
}
