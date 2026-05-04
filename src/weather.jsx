import React, { useEffect, useState } from "react";
import axios from "axios";

const cardStyle = {
  background: "rgba(255, 255, 255, 0.92)",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 16,
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
};

const labelStyle = {
  margin: 0,
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#64748b",
};

function formatValue(value, suffix = "") {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${value}${suffix}`;
}

function formatDateTime(value) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString();
}

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityQuery, setCityQuery] = useState("");
  const [citiesList, setCitiesList] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [citiesError, setCitiesError] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [fiveDayLoading, setFiveDayLoading] = useState(false);
  const [fiveDayError, setFiveDayError] = useState(null);

  const citiRows = weather?.data?.citi || [];
  const latestCity = citiRows[0];

  const searchWeather = async (event) => {
    event.preventDefault();

    const trimmedCity = cityQuery.trim();

    if (!trimmedCity) {
      setWeather(null);
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await axios.get("http://localhost:5000/api/weather", {
        params: {
          city: trimmedCity,
        },
      });

      setWeather(response.data);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError?.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setCityQuery("");
    setWeather(null);
    setError(null);
    setLoading(false);
    setFiveDayForecast([]);
    setFiveDayError(null);
  };

  const fetchFiveDayForecast = async (city) => {
    if (!city.trim()) {
      setFiveDayForecast([]);
      return;
    }

    setFiveDayLoading(true);
    setFiveDayError(null);

    try {
      const response = await axios.get("http://localhost:5000/api/five-day-weather", {
        params: { city },
      });

      if (response?.data?.success && Array.isArray(response.data.data)) {
        setFiveDayForecast(response.data.data);
      } else {
        setFiveDayForecast([]);
        setFiveDayError("No forecast data available");
      }
    } catch (err) {
      setFiveDayError(err?.response?.data?.message || "Failed to fetch 5-day forecast");
      setFiveDayForecast([]);
    } finally {
      setFiveDayLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadCities = async () => {
      setCitiesLoading(true);
      setCitiesError(null);

      try {
        const res = await axios.get("http://localhost:5000/api/cities");
        if (!mounted) return;
        if (res?.data?.success && Array.isArray(res.data.data)) {
          setCitiesList(res.data.data);
        } else if (Array.isArray(res.data)) {
          setCitiesList(res.data);
        }
      } catch (err) {
        if (!mounted) return;
        setCitiesError("Could not load city list from server");
        setCitiesList([]);
      } finally {
        if (mounted) setCitiesLoading(false);
      }
    };

    loadCities();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        fontFamily: "Arial, sans-serif",
        background:
          "linear-gradient(180deg, rgba(226, 232, 240, 0.9) 0%, rgba(248, 250, 252, 1) 45%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      <section style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <p style={labelStyle}>Weather Search</p>
          <h2 style={{ margin: "6px 0 0", fontSize: 34 }}>Search weather by city</h2>
          <p style={{ margin: "8px 0 0", color: "#475569" }}>
            Type a city name to fetch matching records.
          </p>
        </div>

        <section
          style={{
            ...cardStyle,
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <form onSubmit={searchWeather} style={{ flex: 1, minWidth: 240 }}>
            <p style={labelStyle}>City name</p>
            {citiesLoading ? (
              <select disabled style={{ width: "100%", marginTop: 8, padding: "12px 14px", borderRadius: 12, border: "1px solid #cbd5e1", fontSize: 16 }}>
                <option>Loading cities…</option>
              </select>
            ) : citiesList && citiesList.length > 0 ? (
              <select
                value={cityQuery}
                onChange={(e) => {
                  const selectedCity = e.target.value;
                  setCityQuery(selectedCity);
                  fetchFiveDayForecast(selectedCity);
                }}
                aria-label="Select city"
                style={{ width: "100%", marginTop: 8, padding: "12px 14px", borderRadius: 12, border: "1px solid #cbd5e1", fontSize: 16 }}
              >
                <option value="">-- Select a city --</option>
                {citiesList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            ) : (
              <select disabled style={{ width: "100%", marginTop: 8, padding: "12px 14px", borderRadius: 12, border: "1px solid #cbd5e1", fontSize: 16 }}>
                <option>{citiesError || "No cities available"}</option>
              </select>
            )}
          </form>

          <div style={{ flex: 1, minWidth: 240 }}>
            <p style={labelStyle}>&nbsp;</p>
            <button
              type="button"
              onClick={searchWeather}
              style={{
                width: "100%",
                border: "none",
                borderRadius: 12,
                background: "#0f172a",
                color: "white",
                padding: "12px 18px",
                cursor: "pointer",
                height: 44,
              }}
            >
              Search
            </button>
          </div>

          <button
            type="button"
            onClick={clearSearch}
            style={{
              border: "none",
              borderRadius: 12,
              background: "#e2e8f0",
              color: "#0f172a",
              padding: "12px 18px",
              cursor: "pointer",
              height: 44,
            }}
          >
            Clear
          </button>
        </section>

        {!weather && !loading && !error && (
          <p style={{ color: "#475569" }}>Search for a city to view weather data.</p>
        )}

        {loading && <p>Loading weather…</p>}

        {error && <p style={{ color: "red" }}>Error fetching weather: {error}</p>}

        {weather && (
          <div style={{ display: "grid", gap: 20 }}>
            <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
              <article style={cardStyle}>
                <p style={labelStyle}>Latest citi record</p>
                <h3 style={{ margin: "8px 0 12px" }}>{latestCity?.city_name || "No city data"}</h3>
                <div style={{ display: "grid", gap: 8, color: "#1e293b" }}>
                  <div><strong>Country:</strong> {formatValue(latestCity?.country)}</div>
                  <div><strong>Condition:</strong> {formatValue(latestCity?.weather_main)}</div>
                  <div><strong>Description:</strong> {formatValue(latestCity?.weather_description)}</div>
                  <div><strong>Temperature:</strong> {formatValue(latestCity?.temperature)}</div>
                  <div><strong>Feels like:</strong> {formatValue(latestCity?.feels_like)}</div>
                  <div><strong>Humidity:</strong> {formatValue(latestCity?.humidity, "%")}</div>
                  <div><strong>Wind speed:</strong> {formatValue(latestCity?.wind_speed)}</div>
                  <div><strong>Recorded at:</strong> {formatDateTime(latestCity?.recorded_at)}</div>
                  <div><strong>weather main:</strong> {formatValue(latestCity?.weather_main)}</div>
                </div>
              </article>
            </section>
          </div>
        )}

        {fiveDayLoading && <p style={{ marginTop: 20, color: "#475569" }}>Loading 5-day forecast…</p>}

        {fiveDayError && (
          <p style={{ marginTop: 20, color: "red" }}>Error: {fiveDayError}</p>
        )}

        {!fiveDayLoading && fiveDayForecast.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <div style={{ marginBottom: 20 }}>
              <p style={labelStyle}>5-Day Forecast</p>
              <h3 style={{ margin: "6px 0 0", fontSize: 24 }}>
                Weather forecast for {cityQuery}
              </h3>
            </div>
            <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {fiveDayForecast.map((forecast, index) => (
                <article key={index} style={cardStyle}>
                  <p style={labelStyle}>{formatDateTime(forecast.datetime)}</p>
                  <div style={{ display: "grid", gap: 8, color: "#1e293b", marginTop: 12 }}>
                    <div><strong>Condition:</strong> {formatValue(forecast.weather_main)}</div>
                    <div><strong>Description:</strong> {formatValue(forecast.weather_description)}</div>
                    <div><strong>Temperature:</strong> {formatValue(forecast.temperature, "°K")}</div>
                    <div><strong>Feels like:</strong> {formatValue(forecast.feels_like, "°K")}</div>
                    <div><strong>Min/Max:</strong> {formatValue(forecast.temp_min, "°K")} / {formatValue(forecast.temp_max, "°K")}</div>
                    <div><strong>Humidity:</strong> {formatValue(forecast.humidity, "%")}</div>
                    <div><strong>Wind speed:</strong> {formatValue(forecast.wind_speed, " m/s")}</div>
                    <div><strong>Wind gust:</strong> {formatValue(forecast.wind_gust, " m/s")}</div>
                    <div><strong>Pressure:</strong> {formatValue(forecast.pressure, " hPa")}</div>
                    <div><strong>Clouds:</strong> {formatValue(forecast.clouds, "%")}</div>
                    <div><strong>Visibility:</strong> {formatValue(forecast.visibility, " m")}</div>
                    <div><strong>Rain probability:</strong> {formatValue(forecast.pop, "")}</div>
                    {forecast.rain_3h && <div><strong>Rain (3h):</strong> {formatValue(forecast.rain_3h, " mm")}</div>}
                  </div>
                </article>
              ))}
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

