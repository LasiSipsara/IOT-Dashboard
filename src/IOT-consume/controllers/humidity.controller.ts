import { Controller, Get } from '@nestjs/common';
import { HumidityCalculationService } from '../calculations/humidity.calculation.service';
import Redis from 'ioredis';

@Controller('humidity')
export class HumidityController {
  private redis = new Redis();

  @Get('avg/lastmin')
  async getTempLastMinAvg() {
    // const value = 10.34;
    // return { value };
    const latestMetrics = await this.redis.lrange('humidity-metrics', 0, 1);

    const parsedlist = latestMetrics.map((entry) => JSON.parse(entry));

    const values = parsedlist.map((entry) => entry.lastMinAvg);

    return { value: values[0] };
  }

  @Get('avg/lasthour')
  async getTempLastHourAvg() {
    // const value = 10.34;
    // return { value };
    const latestMetrics = await this.redis.lrange('humidity-metrics', 0, 1);

    const parsedlist = latestMetrics.map((entry) => JSON.parse(entry));

    const values = parsedlist.map((entry) => entry.lastHourAvg);

    return { value: values[0] };
  }

  @Get('max/lasthour')
  async getTempLastHourMax() {
    // const value = 10.34;
    // return { value };
    const latestMetrics = await this.redis.lrange('humidity-metrics', 0, 1);

    const parsedlist = latestMetrics.map((entry) => JSON.parse(entry));

    const values = parsedlist.map((entry) => entry.maxHumidity);

    return { value: values[0] };
  }
}
