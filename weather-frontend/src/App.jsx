import { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setWeather('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/get-weather`, { location });
      setWeather(response.data.weather);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button 
          type="submit" 
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {weather && <p className="mt-4">{weather}</p>}
    </div>
  );
};

export default WeatherApp;