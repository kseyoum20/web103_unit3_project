import express from 'express'

// import controllers for events and locations
import EventsController from '../controllers/events.js'

const router = express.Router()
// define routes to get events and locations

router.get('/', EventsController.getEvents)

router.get('/:locationId', EventsController.getEventByLocationId)

export default router