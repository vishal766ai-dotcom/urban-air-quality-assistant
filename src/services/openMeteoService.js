/**
 * Open-Meteo Free Real-Time Air Quality API Service (Zero Key Required).
 * Fetches live ground-level atmospheric pollutants & hourly forecasts for any coordinates.
 */

/**
 * Evaluates atmospheric inversion severity label from AQI value without nested ternaries.
 * @param {number} aqi
 * @returns {'Severe' | 'Moderate' | 'Low'}
 */
function getInversionSeverity(aqi) {
  if (aqi > 250) return 'Severe';
  if (aqi > 150) return 'Moderate';
  return 'Low';
}

/**
 * Fetches live air quality from Open-Meteo free API.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<any | null>} Parsed live atmospheric data or null on failure.
 */
export async function fetchLiveAirQuality(lat, lon) {
  if (typeof lat !== 'number' || typeof lon !== 'number') return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&hourly=pm2_5,pm10,us_aqi&timezone=auto`;
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) return null;
    const data = await response.json();
    if (!data || !data.current) return null;

    const current = data.current;
    const rawAqi = current.us_aqi || Math.round(current.pm2_5 * 2.8);
    const safeAqi = Math.max(10, Math.min(500, Math.round(rawAqi)));

    // Parse next 8-9 hours from hourly array
    const hourly = data.hourly || {};
    const times = hourly.time || [];
    const aqis = hourly.us_aqi || [];
    const pm25s = hourly.pm2_5 || [];
    
    // Find current hour index or start from 0
    const nowIsoHour = new Date().toISOString().substring(0, 13);
    let startIdx = times.findIndex(t => t.startsWith(nowIsoHour));
    if (startIdx < 0) startIdx = 0;

    const formattedForecast = [];
    for (let i = startIdx; i < Math.min(times.length, startIdx + 9); i++) {
      const timeStr = times[i] || '';
      const hourPart = timeStr.includes('T') ? timeStr.split('T')[1].substring(0, 5) : `+${i}h`;
      const slotAqi = Math.max(10, Math.round(aqis[i] || (pm25s[i] * 2.5) || safeAqi));
      const hourNum = parseInt(hourPart.split(':')[0], 10);
      const isDaytimeDispersion = hourNum >= 13 && hourNum <= 15;

      formattedForecast.push({
        hour: hourPart,
        aqi: slotAqi,
        temp: 18,
        safeVentilation: slotAqi <= 150 && isDaytimeDispersion,
        inversion: getInversionSeverity(slotAqi)
      });
    }

    return {
      isLive: true,
      currentAQI: safeAqi,
      pollutants: {
        pm25: Number((current.pm2_5 || 25).toFixed(1)),
        pm10: Number((current.pm10 || 40).toFixed(1)),
        no2: Number((current.nitrogen_dioxide || 30).toFixed(1)),
        so2: Number((current.sulphur_dioxide || 10).toFixed(1)),
        co: Number(((current.carbon_monoxide || 600) / 1000).toFixed(1)),
        o3: Number((current.ozone || 35).toFixed(1))
      },
      hourlyForecast: formattedForecast.length ? formattedForecast : null,
      syncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

export default fetchLiveAirQuality;
