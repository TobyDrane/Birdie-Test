import { Request, Response } from 'express';
import { getRepository} from "typeorm";

import { Events } from '../entity/events';

// Events Controller
class EventsController {
  // Get all without a filter
  // takes a offset and limit
  static getAll = async (req: Request, res: Response) => {
    const { offset, limit } = req.query;
    if (offset && limit) {
      const eventsRepository = getRepository(Events);
      const events = await eventsRepository.find({
        skip: offset,
        take: limit,
      });
      res.status(200).json(events);
    } else {
      res.status(200).json([]);
    }
  };

  // Gets a singular event by timestamp
  static getByTimestamp = async (req: Request, res: Response) => {
    const { timestamp } = req.query;
    if (timestamp) {
      const eventsRepository = getRepository(Events);
      const event = await eventsRepository.find({
        where: [{ timestamp }]
      });
      res.status(200).json(event);
    } else {
      res.status(200).json([]);
    }
  };

  // Get all events by care_recipient_id
  static getByCareRecipient = async (req: Request, res: Response) => {
    const { id } = req.query;
    if (id) {
      const eventsRepository = getRepository(Events);
      const event = await eventsRepository.find({
        where: [{ care_recipient_id: id }],
      });
      res.status(200).json(event);
    } else {
      res.status(200).json([]);
    }
  };

  // Get all care_recipient_id's
  static getAllCareRecipientIds = async (_: Request, res: Response) => {
    const eventsRepository = getRepository(Events);
    const ids = await eventsRepository
      .createQueryBuilder('care_recipient')
      .select('care_recipient.care_recipient_id')
      .addGroupBy('care_recipient.care_recipient_id')
      .getMany();
    /*
    const ids = await eventsRepository.find({
      select: ['care_recipient_id', 'id'],
    }); */
    res.status(200).json(ids);
  };

  static getMood = async(req: Request, res: Response) => {
    const { recipient_id } = req.query;
    if (recipient_id) {
      const eventsRepository = getRepository(Events);
      const events = await eventsRepository.find({
        where: [{ care_recipient_id: recipient_id, event_type: 'mood_observation' }]
      });
      res.status(200).json(events);
    } else {
      res.status(200).json([]);
    }
  };
}

export default EventsController;
