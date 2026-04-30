import React from 'react';
import './App.css';

const hourlyForecast = [
  { time: 'Now', temp: '72°', condition: 'Sunny' },
  { time: '1 PM', temp: '74°', condition: 'Clear' },
  { time: '2 PM', temp: '76°', condition: 'Bright' },
  { time: '3 PM', temp: '75°', condition: 'Breezy' },
  { time: '4 PM', temp: '73°', condition: 'Mild' },
  { time: '5 PM', temp: '70°', condition: 'Evening' },
];

const weeklyForecast = [
  { day: 'Mon', icon: 'Sun', high: '77°', low: '68°' },
  { day: 'Tue', icon: 'Cloud', high: '74°', low: '66°' },
  { day: 'Wed', icon: 'Rain', high: '71°', low: '64°' },
  { day: 'Thu', icon: 'Wind', high: '73°', low: '65°' },
  { day: 'Fri', icon: 'Sun', high: '79°', low: '69°' },
];

const metrics = [
  { label: 'Feels like', value: '75°' },
  { label: 'Humidity', value: '48%' },
  { label: 'Wind', value: '12 mph' },
  { label: 'UV Index', value: 'High' },
];

const App = () => {
  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="weather-app">
        <header className="topbar">
          <div>
            <p className="eyebrow">Weather Center</p>
            <h1>Forecast that feels polished and calm.</h1>
          </div>

          <button className="location-pill" type="button">
            New York, NY
          </button>
        </header>

        <section className="search-row" aria-label="Weather search">
          <input
            type="search"
            aria-label="Search city"
            placeholder="Search a city, region, or airport"
          />
          <button type="button" className="primary-button">
            Search
          </button>
        </section>

        <section className="hero-grid">
          <article className="current-card">
            <div className="current-card__header">
              <div>
                <p className="card-label">Current weather</p>
                <h2>Mostly sunny</h2>
              </div>
              <div className="weather-mark" aria-hidden="true">
                <span className="weather-mark__core" />
                <span className="weather-mark__ray weather-mark__ray--one" />
                <span className="weather-mark__ray weather-mark__ray--two" />
                <span className="weather-mark__ray weather-mark__ray--three" />
                <span className="weather-mark__ray weather-mark__ray--four" />
              </div>
            </div>

            <div className="temperature-row">
              <strong>72°</strong>
              <div>
                <p>Feels like 75°</p>
                <p>Clear skies with a soft afternoon breeze</p>
              </div>
            </div>

            <div className="metrics-grid">
              {metrics.map((metric) => (
                <div className="metric-card" key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </article>

          <aside className="side-panel">
            <div className="panel-card panel-card--summary">
              <p className="card-label">Today</p>
              <h3>Great visibility and stable conditions</h3>
              <p>
                A bright day with comfortable temperatures, low rain chance, and
                a gentle evening cooldown.
              </p>
            </div>

            <div className="panel-card">
              <div className="panel-card__header">
                <p className="card-label">Hourly</p>
                <span>Next 6 hours</span>
              </div>
              <div className="hourly-list">
                {hourlyForecast.map((item) => (
                  <div className="hourly-item" key={item.time}>
                    <span>{item.time}</span>
                    <strong>{item.temp}</strong>
                    <p>{item.condition}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="forecast-section">
          <div className="section-header">
            <div>
              <p className="card-label">Weekly outlook</p>
              <h3>Five-day forecast</h3>
            </div>
            <span>Updated just now</span>
          </div>

          <div className="forecast-list">
            {weeklyForecast.map((day) => (
              <article className="forecast-card" key={day.day}>
                <span>{day.day}</span>
                <strong>{day.icon}</strong>
                <p>
                  <b>{day.high}</b>
                  <span>{day.low}</span>
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default App;