import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async testing(): Promise<any> {
    try {
      //add the task named 'transcode' to the queue
      const job = await this.audioQueue.add(
        'greet',
        {
          say: 'Welcome',
        },
        {
          delay: 3000,
          // lifo: true,
          priority: 1,
        },
      );
      return {
        success: true,
        message: `result after adding the queue ${JSON.stringify(job)}`,
      };
    } catch (err) {
      return false;
    }
  }
}
