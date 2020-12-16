import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { AudioConsumer } from './queue.processor';
import { QueueService } from './queue.service';
import * as mockMail from 'nodemailer-mock-transport';
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'audio',
    }),
    MailerModule.forRoot({
      transport: mockMail(),
      defaults: '"No Reply " <noreply@example.com>',
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService, AudioConsumer],
  exports: [QueueService],
})
export class QueueModule {}
