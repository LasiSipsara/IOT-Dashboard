import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';

@Injectable()
export class PcConsumeService implements OnModuleInit {
  constructor(private readonly _consumer: ConsumerService) {}

  private redis = new Redis();
  async onModuleInit() {
    this._consumer.consume(
      'pc-client',
      { topics: ['PC-topic'] },
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
          pipeline.lpush('pc', entry);
          pipeline.ltrim('pc', 0, 720 - 1);
          await pipeline.exec();

          console.log('pc data cached');
        },
      },
    );
  }
}
