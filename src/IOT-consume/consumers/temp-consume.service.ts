import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';

@Injectable()
export class TempConsumeService implements OnModuleInit {
  constructor(private readonly _consumer: ConsumerService) {}

  private redis = new Redis();
  async onModuleInit() {
    this._consumer.consume(
      'temp-client',
      { topics: ['temp-topic'] },
      {
        eachMessage: async ({ message }) => {
          // console.log({
          //   message: JSON.parse(message.value?.toString()),
          //   partition: partition.toString(),
          //   topic: topic.toString(),
          // });
          const { type, time, value } = JSON.parse(message.value?.toString());

          const entry = JSON.stringify({ time, value });

          const pipeline = this.redis.pipeline();
          pipeline.lpush('temp', entry);
          pipeline.ltrim('temp', 0, 7200 - 1);
          await pipeline.exec();

          console.log('Humidity data cached');
        },
      },
    );
  }
}
