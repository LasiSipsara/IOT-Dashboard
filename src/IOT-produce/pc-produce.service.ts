import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Injectable()
export class PcProduceService {
  constructor(private readonly _kafka: ProducerService) {}

  @Interval(5000)
  produceProductCount() {
    let count = Math.floor(Math.random() * 51);
    console.log(`product  count produced  ${count}`);
    let time = new Date();
    const message = JSON.stringify({
      type: 'product count',
      time: time,
      value: count,
    });

    this._kafka.produce({
      topic: 'PC-topic',
      messages: [{ value: message }],
    });
    console.info('sent PC to kafka');
  }
}
