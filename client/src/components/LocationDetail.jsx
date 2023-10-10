// src/components/LocationDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLocationById } from '../services/LocationsAPI';
import { getEventByLocationId } from '../services/EventsAPI';

const LocationDetail = () => {
    const { locationId } = useParams();
    const [location, setLocation] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchLocation() {
            const data = await getLocationById(locationId);
            setLocation(data);
        }

        async function fetchEvents() {
            const data = await getEventByLocationId(locationId);
            setEvents(data);
        }

        fetchLocation();
        fetchEvents();
    }, [locationId]);

    if (!location) return <div>Loading...</div>;

    return (
        <div>
            <div className="location-detail">
                <img src={location.image_url} alt={location.name} />
                <h2>{location.name}</h2>
                <p>{location.description}</p>
            </div>
            <div className="events-grid">
                {events.map(event => (
                    <div key={event.event_id} className="event-card">
                        <img src={event.image_url} alt={event.event_name} />
                        <h3>{event.event_name}</h3>
                        <p>{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationDetail;
