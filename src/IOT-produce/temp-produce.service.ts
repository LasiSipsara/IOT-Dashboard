import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Injectable()
export class TempProduceServiceService {
  constructor(private readonly _kafka: ProducerService) {}

  @Interval('Temperature', 500)
  produceTemp() {
    const max = 30;
    const min = 20;
    let value = parseFloat((Math.random() * (max - min) + min).toFixed(2));
    let time = new Date();
    console.log(`temp produced ${value}  ${time}`);

    const message = JSON.stringify({
      type: 'temperature',
      time: time,
      value: value,
    });

    this._kafka.produce({
      topic: 'temp-topic',
      messages: [
        {
          value: message,
        },
      ],
    });
    console.info('sent temp to kafka');
  }
}
