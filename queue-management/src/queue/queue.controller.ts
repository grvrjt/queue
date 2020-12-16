import { Controller, Post } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queues')
export class QueueController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly queueService: QueueService) {}
  @Post()
  async testingQueue(): Promise<any> {
    const result = this.queueService.testing();
    return result;
  }
}
