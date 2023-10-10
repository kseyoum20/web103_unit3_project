import { pool } from '../config/database.js'
const getLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.status(200).json(results.rows)
      } catch (error) {
        res.status(400).json( { error: error.message } )
      }
}
const getLocationById = async (req, res) => {
  try {
    const locationId = req.params.locationId
    const selectQuery = `SELECT name, address, description, image_url FROM locations WHERE location_id = ${locationId}`
    const results = await pool.query(selectQuery)

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

export default {
    getLocations,
    getLocationById
  }