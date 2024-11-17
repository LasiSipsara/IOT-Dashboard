import { Controller, Get } from '@nestjs/common';
import Redis from 'ioredis';

@Controller('temp')
export class TempController {
  private redis = new Redis();

  @Get('avg/lastmin')
  async getTempLastMinAvg() {
    // const value = 10.34;
    // return { value };
    const latestMetrics = await this.redis.lrange('temp-metrics', 0, 1);
    const parsedlist = latestMetrics.map((entry) => JSON.parse(entry));

    const values = parsedlist.map((entry) => entry.lastMinAvg);
    // const { lastMinAvg } = JSON.parse(latestMetrics[1]);
    return { value: values[0] };
  }

  @Get('avg/lasthour')
  async getTempLastHourAvg() {
    // const value = 10.34;
    // return { value };

    const latestMetrics = await this.redis.lrange('temp-metrics', 0, 1);

    const parsedlist = latestMetrics.map((entry) => JSON.parse(entry));

    const values = parsedlist.map((entry) => entry.lastHourAvg);
    // const { lastHourAvg } = JSON.parse(latestMetrics[2]);
    return { value: values[0] };
  }

  @Get('max/lasthour')
  async getTempLastHourMax() {
    // const value = 10.34;
    // return { value };

    const latestMetrics = await this.redis.lrange('temp-metrics', 0, 1);
    const parsedlist = latestMetrics.map((entry) => JSON.parse(entry));

    const values = parsedlist.map((entry) => entry.maxTemperature);
    // const { lastHourMax } = JSON.parse(latestMetrics[3]);
    return { value: values[0] };
  }
}
