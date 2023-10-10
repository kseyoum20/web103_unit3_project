import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import { useParams } from 'react-router-dom';
import '../css/LocationEvents.css';
import { getLocationById } from '../services/LocationsAPI';
import { getEventByLocationId } from '../services/EventsAPI';

const LocationEvents = () => {
    const [location, setLocation] = useState({});
    const [events, setEvents] = useState([]);

    // Extract locationId from the route parameters
    const { locationId } = useParams();

    useEffect(() => {
        (async () => {
            try {
                // Fetch location details by ID
                const locationData = await getLocationById(locationId);
                setLocation(locationData);

                // Fetch events for the given location
                const eventsData = await getEventByLocationId(locationId);
                setEvents(eventsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, [locationId]);

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image_url} alt={location.name} />
                </div>
                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}</p>
                </div>
            </header>
            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.event_id}
                            id={event.event_id}
                            title={event.event_name}
                            date={event.event_date}
                            time={event.time}
                            image={event.image_url}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    );
}

export default LocationEvents;
