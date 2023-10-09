import { pool } from '../config/database.js';
import '../config/dotenv.js';
// Assuming you have data files for locations and events.
import locationData from '../data/locations.js';
import eventData from '../data/events.js';

const createLocationsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS events;  -- Drop events first due to foreign key constraint
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
        location_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        description TEXT,
        image_url TEXT
    );
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 locations table created successfully');
    }
    catch (err) {
        console.error('⚠️ error creating locations table', err);
    }
};

const createEventsTable = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
        event_id SERIAL PRIMARY KEY,
        location_id INTEGER REFERENCES locations(location_id),
        event_name TEXT NOT NULL,
        event_date TIMESTAMP NOT NULL,
        artist TEXT NOT NULL,
        genre TEXT,
        description TEXT,
        ticket_link TEXT,
        image_url TEXT
    );
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 events table created successfully');
    }
    catch (err) {
        console.error('⚠️ error creating events table', err);
    }
};

const seedLocationsTable = async () => {
    await createLocationsTable();

    locationData.forEach((location) => {
        const insertQuery = {
            text: 'INSERT INTO locations (name, address, description, image_url) VALUES ($1, $2, $3, $4)'
        };

        const values = [
            location.name,
            location.address,
            location.description,
            location.image_url
        ];
        
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting location', err);
                return;
            }
            console.log(`✅ ${location.name} added successfully`);
        });
    });
};

const seedEventsTable = async () => {
    await createEventsTable();

    eventData.forEach((event) => {
        const insertQuery = {
            text: 'INSERT INTO events (location_id, event_name, event_date, artist, genre, description, ticket_link, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
        };

        const values = [
            event.location_id,
            event.event_name,
            event.event_date,
            event.artist,
            event.genre,
            event.description,
            event.ticket_link,
            event.image_url
        ];
        
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err);
                return;
            }
            console.log(`✅ ${event.event_name} added successfully`);
        });
    });
};

// Seed both tables
seedLocationsTable().then(() => seedEventsTable());
