import express from 'express'
// import controllers for events and locations
import LocationsController from '../controllers/locations.js'

const router = express.Router()

// define routes to get events and locations
router.get('/', LocationsController.getLocations)

router.get('/:locationId', LocationsController.getLocationById)

export default router