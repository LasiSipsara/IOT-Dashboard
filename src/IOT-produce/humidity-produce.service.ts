import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Injectable()
export class HumidityProduceService {
  constructor(private readonly _kafka: ProducerService) {}

  @Interval('Humidity', 1000)
  produceHumidity() {
    let value = Math.floor(Math.random() * 101);
    console.log(`produced humidity  ${value}`);
    let time = new Date();
    const message = JSON.stringify({
      type: 'Humidity',
      time: time,
      value: value,
    });

    this._kafka.produce({
      topic: 'humidity-topic',
      messages: [{ value: message }],
    });

    console.log('sent humidity to kafka');
  }
}
