// src/components/LocationsGrid.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllLocations } from '../services/LocationsAPI';

const LocationsGrid = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllLocations();
            setLocations(data);
        }

        fetchData();
    }, []);

    return (
        <div className="locations-grid">
            {locations.map(location => (
                <Link key={location.location_id} to={`/location/${location.location_id}`}>
                    <div className="location-card">
                        <img src={location.image_url} alt={location.name} />
                        <h3>{location.name}</h3>
                        <p>{location.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default LocationsGrid;
