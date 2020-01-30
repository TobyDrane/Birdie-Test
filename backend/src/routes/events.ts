import { Router } from 'express';
import EventsController from '../controllers/events';

const eventsRouter : Router = Router();

eventsRouter.get('/all', EventsController.getAll);
eventsRouter.get('/all/care_recipient', EventsController.getAllCareRecipientIds);
eventsRouter.get('/single', EventsController.getByTimestamp);
eventsRouter.get('/care_recipient', EventsController.getByCareRecipient);
eventsRouter.get('/mood', EventsController.getMood);

export default eventsRouter;
