import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { IOTProduceModule } from './IOT-produce/IOT-produce.module';
import { KafkaModule } from './kafka/kafka.module';
import { IotConsumeModule } from './IOT-consume/iot-consume.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    IOTProduceModule,
    KafkaModule,
    IotConsumeModule,
    RedisModule.forRoot({
      url: 'localhost:6379',
      type: 'single',
    }),
  ],
})
export class AppModule {}
