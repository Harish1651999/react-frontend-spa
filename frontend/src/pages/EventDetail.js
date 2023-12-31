import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventsItem from "../components/EventsItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
import { getAuthToken } from "../util/auth";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventsItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for slected event." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Error(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });

    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const eventId = params.eventId;

  const token = getAuthToken();

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
    headers: {
      Authorization: "Bearer" + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }

  return redirect("/events");
}
