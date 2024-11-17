import { Controller, Get } from '@nestjs/common';
import { PcCalculationService } from '../calculations/pc.calculation.service';
import Redis from 'ioredis';

@Controller('pc')
export class PcController {
  private redis = new Redis();
  @Get('avg/lastmin')
  async getPCLastMinAvg() {
    const latestMetrics = await this.redis.lrange('pc-metrics', 0, 1);

    const parsedlist = latestMetrics.map((entry) => JSON.parse(entry));

    const values = parsedlist.map((entry) => entry.lastMinAvg);

    return { value: values[0] };
  }

  @Get('avg/lasthour')
  async getPCLastHourAvg() {
    const latestMetrics = await this.redis.lrange('pc-metrics', 0, 1);
    const parsedlist = latestMetrics.map((entry) => JSON.parse(entry));

    const values = parsedlist.map((entry) => entry.lastHourAvg);

    return { value: values[0] };
  }

  @Get('max/lasthour')
  async getPCLastHourMax() {
    const latestMetrics = await this.redis.lrange('pc-metrics', 0, 1);

    const parsedlist = latestMetrics.map((entry) => JSON.parse(entry));

    const values = parsedlist.map((entry) => entry.maxPC);

    return { value: values[0] };
  }
}
