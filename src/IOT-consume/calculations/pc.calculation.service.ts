import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import Redis from 'ioredis';

@Injectable()
export class PcCalculationService {
  private redis = new Redis();

  private findAvg(values: number[]): number {
    if (values.length === 0) {
      return 0;
    }
    const sum = values.reduce((total, current) => total + current, 0);
    return parseFloat((sum / values.length).toFixed(2));
  }

  private findMax(values: number[]): number {
    if (values.length === 0) {
      return 0;
    }
    return Math.max(...values);
  }

  @Interval(15000)
  async calculateMetrics() {
    const list = await this.redis.lrange('pc', 0, -1);
    const parsedlist = list.map((entry) => JSON.parse(entry));

    const values = parsedlist.map((entry) => entry.value);
    const lastMinValues = values.slice(0, 12);

    const lastMinAvg = this.findAvg(lastMinValues);
    const lastHourAvg = this.findAvg(values);
    const maxPC = this.findMax(values);

    const timestamp = new Date().toISOString();

    const calculatedPcValues = {
      timestamp,
      lastMinAvg,
      lastHourAvg,
      maxPC,
    };

    const pipeline = this.redis.pipeline();
    pipeline.lpush('pc-metrics', JSON.stringify(calculatedPcValues));
    await pipeline.exec();

    console.log('PC Metrics Stored in redis:', calculatedPcValues);

    await this.redis.ltrim('pc-metrics', 0, 9);
  }
}
