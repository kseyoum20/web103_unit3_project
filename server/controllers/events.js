import { pool } from '../config/database.js'
const getEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
        res.status(200).json(results.rows)
      } catch (error) {
        res.status(400).json( { error: error.message } )
      }
}
const getEventByLocationId = async (req, res) => {
    try {
      const locationId = req.params.locationId
      const selectQuery = `SELECT event_name, event_date, artist, description, image_url FROM events WHERE location_id = ${locationId}`
      const results = await pool.query(selectQuery)
  
      res.status(200).json(results.rows)
    } catch (error) {
      res.status(409).json( { error: error.message } )
    }
  }
export default {
    getEvents,
    getEventByLocationId
  }