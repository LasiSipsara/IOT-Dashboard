import { Module } from '@nestjs/common';
import { TempProduceServiceService } from './temp-produce.service';
import { HumidityProduceService } from './humidity-produce.service';
import { PcProduceService } from './pc-produce.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  providers: [
    TempProduceServiceService,
    HumidityProduceService,
    PcProduceService,
  ],
  imports: [KafkaModule],
})
export class IOTProduceModule {}
