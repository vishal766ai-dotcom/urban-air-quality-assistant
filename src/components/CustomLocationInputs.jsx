import React from 'react';

/**
 * Input fields for City name, region, AQI value, and currency code.
 * @param {{
 *   cityName: string,
 *   setCityName: (v: string) => void,
 *   country: string,
 *   setCountry: (v: string) => void,
 *   aqiValue: number,
 *   setAqiValue: (v: number) => void,
 *   currencyCode: string,
 *   setCurrencyCode: (v: string) => void
 * }} props
 */
export function CustomLocationInputs({
  cityName,
  setCityName,
  country,
  setCountry,
  aqiValue,
  setAqiValue,
  currencyCode,
  setCurrencyCode
}) {
  return (
    <>
      <div>
        <label className="text-xs font-semibold text-slate-300 block mb-1">
          City or Neighborhood Name:
        </label>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="e.g. Gurugram Sector 56, South Delhi, Noida Extension..."
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500"
          required
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-300 block mb-1">
          Region or Country:
        </label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="e.g. India, Pakistan, USA..."
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Current Local AQI:
          </label>
          <input
            type="number"
            min="10"
            max="999"
            value={aqiValue}
            onChange={(e) => setAqiValue(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Currency:
          </label>
          <select
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
          >
            <option value="INR">₹ INR (India)</option>
            <option value="USD">$ USD (US/Global)</option>
            <option value="PKR">Rs PKR (Pakistan)</option>
            <option value="EUR">€ EUR (Europe)</option>
            <option value="GBP">£ GBP (UK)</option>
            <option value="CNY">¥ CNY (China)</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default CustomLocationInputs;
