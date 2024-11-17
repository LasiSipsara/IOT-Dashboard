import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';

@Injectable()
export class HumidityConsumeService implements OnModuleInit {
  constructor(private readonly _consumer: ConsumerService) {}

  private redis = new Redis();
  async onModuleInit() {
    this._consumer.consume(
      'humidity-client',
      { topics: ['humidity-topic'] },
      {
        eachMessage: async ({ message }) => {
          //   console.log({
          //     message: JSON.parse(message.value?.toString()),
          //     partition: partition.toString(),
          //     topic: topic.toString(),
          //   });

          const { type, time, value } = JSON.parse(message.value?.toString());

          const entry = JSON.stringify({ time, value });

          const pipeline = this.redis.pipeline();
          pipeline.lpush('hum', entry);
          pipeline.ltrim('hum', 0, 3600 - 1);
          await pipeline.exec();

          console.log('humidity data cached');
        },
      },
    );
  }
}
