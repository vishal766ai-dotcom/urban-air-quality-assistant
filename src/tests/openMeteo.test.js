import { describe, it, expect, vi } from 'vitest';
import { fetchLiveAirQuality } from '../services/openMeteoService';

describe('Open-Meteo Air Quality Service Tests & Fallback Behavior', () => {

  it('returns null safely for invalid coordinates (strings, null, undefined)', async () => {
    expect(await fetchLiveAirQuality('invalid', null)).toBeNull();
    expect(await fetchLiveAirQuality(undefined, 77.20)).toBeNull();
    expect(await fetchLiveAirQuality(28.61, undefined)).toBeNull();
    expect(await fetchLiveAirQuality('28.61', '77.20')).toBeNull();
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

  it('gracefully returns null if fetch throws a network exception or timeout', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() =>
      Promise.reject(new Error('Network connection timeout'))
    );

    const result = await fetchLiveAirQuality(28.61, 77.20);
    expect(result).toBeNull();
  });

  it('gracefully returns null when API returns HTTP 500 internal server error', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      })
    );

    const result = await fetchLiveAirQuality(28.61, 77.20);
    expect(result).toBeNull();
  });

  it('gracefully returns null when API returns HTTP 404 not found', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      })
    );

    const result = await fetchLiveAirQuality(28.61, 77.20);
    expect(result).toBeNull();
  });

  it('gracefully returns null when response JSON is malformed or missing current field', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ error: true, reason: 'No data' })
      })
    );

    const result = await fetchLiveAirQuality(28.61, 77.20);
    expect(result).toBeNull();
  });

  it('populates safe fallback default values when individual pollutant fields are null', async () => {
    const sparseMockData = {
      current: {
        us_aqi: null,
        pm2_5: 50.0,
        pm10: null,
        nitrogen_dioxide: null,
        sulphur_dioxide: null,
        carbon_monoxide: null,
        ozone: null
      }
    };

    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(sparseMockData)
      })
    );

    const result = await fetchLiveAirQuality(28.61, 77.20);
    expect(result).toBeDefined();
    expect(result.currentAQI).toBe(Math.round(50.0 * 2.8));
    expect(result.pollutants.pm25).toBe(50.0);
    expect(result.pollutants.pm10).toBe(40); // default
    expect(result.pollutants.co).toBe(0.6); // 600 / 1000 default
  });

});
