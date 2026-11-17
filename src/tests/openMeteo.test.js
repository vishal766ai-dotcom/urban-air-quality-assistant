import { describe, it, expect, vi } from 'vitest';
import { fetchLiveAirQuality } from '../services/openMeteoService';

describe('Open-Meteo Air Quality Service Tests', () => {
  it('returns null safely for invalid coordinates', async () => {
    const res = await fetchLiveAirQuality('invalid', null);
    expect(res).toBeNull();
  });

  it('handles simulated network fetch correctly and maps air quality fields', async () => {
    const mockData = {
      current: {
        us_aqi: 165,
        pm2_5: 38.4,
        pm10: 55.2,
        nitrogen_dioxide: 28.1,
        sulphur_dioxide: 12.0,
        carbon_monoxide: 850,
        ozone: 42.0
      },
      hourly: {
        time: ['2026-11-17T12:00', '2026-11-17T13:00'],
        us_aqi: [165, 150],
        pm2_5: [38.4, 32.1]
      }
    };

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );

    const result = await fetchLiveAirQuality(28.61, 77.20);
    expect(result).toBeDefined();
    expect(result.isLive).toBe(true);
    expect(result.currentAQI).toBe(165);
    expect(result.pollutants.pm25).toBe(38.4);
    expect(result.pollutants.co).toBe(Number((850 / 1000).toFixed(1)));
  });

  it('gracefully returns null if fetch throws an exception', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );

    const result = await fetchLiveAirQuality(28.61, 77.20);
    expect(result).toBeNull();
  });
});
