import { useState, useEffect, useCallback } from 'react';
import { LiveWeatherData } from '../../types';

// WMO Weather Interpretation Codes (WW)
export function interpretWeatherCode(code: number): { condition: string; iconType: 'sun' | 'cloud-sun' | 'cloud' | 'rain' | 'storm' | 'fog' } {
  switch (code) {
    case 0:
      return { condition: 'Clear Sky', iconType: 'sun' };
    case 1:
      return { condition: 'Mainly Clear', iconType: 'cloud-sun' };
    case 2:
      return { condition: 'Partly Cloudy', iconType: 'cloud-sun' };
    case 3:
      return { condition: 'Overcast', iconType: 'cloud' };
    case 45:
    case 48:
      return { condition: 'Fog & Mist', iconType: 'fog' };
    case 51:
    case 53:
    case 55:
      return { condition: 'Light Drizzle', iconType: 'rain' };
    case 61:
    case 63:
    case 65:
      return { condition: 'Rain', iconType: 'rain' };
    case 80:
    case 81:
    case 82:
      return { condition: 'Rain Showers', iconType: 'rain' };
    case 95:
    case 96:
    case 99:
      return { condition: 'Thunderstorm', iconType: 'storm' };
    default:
      return { condition: 'Partly Cloudy', iconType: 'cloud-sun' };
  }
}

export function calculateSprayAdvisory(windSpeed: number, weatherCode: number): { badge: string; notice: string; isSafe: boolean } {
  const isRain = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weatherCode);

  if (isRain) {
    return {
      badge: 'Rain Alert - No Spray',
      notice: 'Active rain or precipitation detected. Postpone knapsack spraying to prevent chemical wash-off.',
      isSafe: false,
    };
  }

  if (windSpeed > 20) {
    return {
      badge: 'High Drift Warning',
      notice: `High wind (${windSpeed} km/h). Knapsack spraying unsafe due to high droplet drift risk.`,
      isSafe: false,
    };
  }

  if (windSpeed >= 15) {
    return {
      badge: 'Spray Caution',
      notice: `Moderate wind (${windSpeed} km/h). Use coarse anti-drift nozzles and low boom height.`,
      isSafe: true,
    };
  }

  if (windSpeed >= 5) {
    return {
      badge: 'Ideal Spray Window',
      notice: `Optimal wind (${windSpeed} km/h). Ideal conditions for uniform knapsack droplet deposition.`,
      isSafe: true,
    };
  }

  return {
    badge: 'Spray Caution (Inversion)',
    notice: `Very low wind (${windSpeed} km/h). Caution against atmospheric inversion trapping chemical vapor.`,
    isSafe: true,
  };
}

const DEFAULT_WEATHER: LiveWeatherData = {
  location: 'Krishnagiri, Tamil Nadu',
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 58,
  windSpeed: 12,
  weatherCode: 2,
  sprayCautionBadge: 'Ideal Spray Window',
  sprayCautionNotice: 'Optimal wind (12 km/h). Ideal conditions for uniform knapsack droplet deposition.',
  isLive: false,
  latitude: 12.52,
  longitude: 78.21,
  updatedAt: new Date().toISOString(),
};

const STORAGE_KEY = 'farmate_live_weather_cache_v2';

export async function fetchLiveWeatherByCoords(lat: number, lon: number, customLocationName?: string): Promise<LiveWeatherData> {
  try {
    // 1. Fetch current weather from Open-Meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Open-Meteo request failed');
    const data = await res.json();
    const current = data.current;

    const temp = Math.round(current.temperature_2m);
    const humidity = Math.round(current.relative_humidity_2m);
    const windSpeed = Math.round(current.wind_speed_10m);
    const weatherCode = current.weather_code;

    const { condition } = interpretWeatherCode(weatherCode);
    const sprayAdv = calculateSprayAdvisory(windSpeed, weatherCode);

    // 2. Reverse geocode location name if not provided
    let locationName = customLocationName;
    if (!locationName) {
      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
          { headers: { 'Accept-Language': 'en' } }
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          const addr = geoData.address;
          const city = addr.city || addr.town || addr.district || addr.county || addr.state_district;
          const state = addr.state;
          if (city && state) {
            locationName = `${city}, ${state}`;
          } else if (geoData.name) {
            locationName = geoData.name;
          }
        }
      } catch (e) {
        console.warn('Reverse geocoding notice:', e);
      }
    }

    const weatherData: LiveWeatherData = {
      location: locationName || 'Local Farm Area',
      temperature: temp,
      condition,
      humidity,
      windSpeed,
      weatherCode,
      sprayCautionBadge: sprayAdv.badge,
      sprayCautionNotice: sprayAdv.notice,
      isLive: true,
      latitude: lat,
      longitude: lon,
      updatedAt: new Date().toISOString(),
    };

    // Cache locally
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(weatherData));
    } catch (e) {}

    return weatherData;
  } catch (err) {
    console.warn('Live weather fetch fallback:', err);
    return DEFAULT_WEATHER;
  }
}

export function useLiveWeather(initialLocation?: string) {
  const [weather, setWeather] = useState<LiveWeatherData>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed;
      }
    } catch (e) {}
    return {
      ...DEFAULT_WEATHER,
      location: initialLocation || DEFAULT_WEATHER.location,
    };
  });

  const [loading, setLoading] = useState(false);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied'>('prompt');

  const detectLocationAndWeather = useCallback(async (promptUser: boolean = false) => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported by this browser');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setPermissionState('granted');
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const data = await fetchLiveWeatherByCoords(lat, lon);
        setWeather(data);
        setLoading(false);
      },
      async (err) => {
        console.warn('Geolocation access denied or timed out:', err.message);
        setPermissionState('denied');
        // Fallback: Use Krishnagiri, Tamil Nadu coordinates or previous cached
        const data = await fetchLiveWeatherByCoords(12.52, 78.21, initialLocation || 'Krishnagiri, Tamil Nadu');
        setWeather(data);
        setLoading(false);
      },
      {
        timeout: 10000,
        maximumAge: 300000, // 5 min cache
        enableHighAccuracy: false,
      }
    );
  }, [initialLocation]);

  useEffect(() => {
    // Auto-detect on mount
    detectLocationAndWeather();
  }, [detectLocationAndWeather]);

  return {
    weather,
    loading,
    permissionState,
    refreshLocation: () => detectLocationAndWeather(true),
  };
}
