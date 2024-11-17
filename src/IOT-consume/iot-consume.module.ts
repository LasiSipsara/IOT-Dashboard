import { Module } from '@nestjs/common';
import { TempConsumeService } from './consumers/temp-consume.service';
import { PcConsumeService } from './consumers/pc-consume.service';
import { HumidityConsumeService } from './consumers/humidity-consume.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { TempCalculationService } from './calculations/temp.calculation.service';
import { PcCalculationService } from './calculations/pc.calculation.service';
import { HumidityCalculationService } from './calculations/humidity.calculation.service';
import { TempController } from './controllers/temp.controller';
import { HumidityController } from './controllers/humidity.controller';
import { PcController } from './controllers/pc.controller';
import Redis from 'ioredis';

@Module({
  providers: [
    TempConsumeService,
    PcConsumeService,
    HumidityConsumeService,
    TempCalculationService,
    PcCalculationService,
    HumidityCalculationService,
  ],
  imports: [KafkaModule, Redis],
  controllers: [TempController, HumidityController, PcController],
})
export class IotConsumeModule {}
