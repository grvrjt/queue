import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
  constructor(private readonly mailerService: MailerService) {}
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data,
      )}...`,
    );
  }

  @Process('greet') //job named as 'transcode'
  async transcoded() {
    console.log('in the queueProccessor file ');
    await this.mailerService
      .sendMail({
        to: 'gaurav1993rajput@gmail.com',
        from: 'gaurav1993rajput@gmail.com',
        subject: 'Hello from API',
        text: 'Welcome',
        html: '<b>Welcome < /b>',
      })
      .then(() => {
        console.log('mail sent successfully !!');
      })
      .catch((err) => {
        console.log('Error while sending the mail ...', err);
      });
    return {};
  }
}
