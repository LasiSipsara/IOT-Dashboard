import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: Consumer[] = [];

  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  async consume(
    groupId: string,
    topics: ConsumerSubscribeTopics,
    config: ConsumerRunConfig,
  ) {
    const consumer: Consumer = this.kafka.consumer({ groupId: groupId });
    await consumer.connect().catch((e) => console.error(e));
    await consumer.subscribe(topics);
    await consumer.run(config);
    this.consumers.push(consumer);
  }
}
