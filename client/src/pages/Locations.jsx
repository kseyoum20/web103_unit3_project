import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllLocations } from '../services/LocationsAPI'
import unitygrid from '../assets/unitygrid.jpg'
import '../css/Locations.css'

const Locations = () => {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const fetchLocations = async () => {
            const locationsData = await getAllLocations();
            setLocations(locationsData);
        }

        fetchLocations();
    }, []);

    return (
        <div className='available-locations'>
            {locations.map((location, index) => (
                <Link to={`/locations/${location.location_id}`} key={location.location_id}>
                    {/* Add your SVG or card component to represent each location here */}
                </Link>
            ))}
        </div>
    )
}

export default Locations
