'use client';

import { useState } from 'react';
import FindNearMeButton from '../components/FindNearMeButton';
import LocationList from '../components/LocationList';
import { EWasteLocation } from '../data/locations';

export default function Home() {
  const [locations, setLocations] = useState<EWasteLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleFindLocations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Request user's location
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }
      
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
      
      // Fetch nearby locations
      const response = await fetch(`/api/locations?lat=${latitude}&lng=${longitude}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      
      const data = await response.json();
      setLocations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-green-600">E-Waste Disposal Locator</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!userLocation && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Find E-Waste Disposal Locations Near You</h2>
            <p className="text-gray-600 max-w-lg text-center mb-8">
              Locate the nearest facilities that accept electronic waste for proper recycling and disposal.
            </p>
            <FindNearMeButton onClick={handleFindLocations} loading={loading} />
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg max-w-md mx-auto">
            Error: {error}
          </div>
        )}

        {userLocation && locations.length > 0 && (
          <LocationList locations={locations} userLocation={userLocation} />
        )}

        {userLocation && locations.length === 0 && !loading && !error && (
          <div className="text-center p-4">
            No e-waste disposal locations found nearby.
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} E-Waste Disposal Locator | All data is simulated for demonstration purposes</p>
        </div>
      </footer>
    </div>
  );
}
