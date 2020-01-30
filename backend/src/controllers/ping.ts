import { Request, Response } from 'express';

// Ping Controller
class PingController {
  static ping = async (_: Request, res : Response) => {
    res.status(200).json({
      greetings: 'Thank you for spending some time on this test. All the best 🙌'
    });
  };
}

export default PingController;
