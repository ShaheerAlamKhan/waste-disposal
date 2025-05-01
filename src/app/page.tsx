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
        navigator.geolocation.getCurrentPosition(
          resolve, 
          reject,
          { 
            enableHighAccuracy: true, 
            timeout: 10000, 
            maximumAge: 0 
          }
        );
      });
      
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
      
      // Use dynamic import to get locations in production (for static export)
      let nearbyLocations;
      if (process.env.NODE_ENV === 'production') {
        // In production, import the locations directly
        const { locations } = await import('../data/locations');
        const { calculateDistance } = await import('../utils/distance');
        
        // Filter and sort locations manually instead of using the API
        nearbyLocations = locations
          .map(location => {
            const distance = calculateDistance(
              latitude,
              longitude,
              location.latitude,
              location.longitude
            );
            return { ...location, distance };
          })
          .filter(location => location.distance <= 50)
          .sort((a, b) => a.distance - b.distance);
      } else {
        // In development, use the API
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        const response = await fetch(`${basePath}/api/locations?lat=${latitude}&lng=${longitude}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        
        nearbyLocations = await response.json();
      }
      
      setLocations(nearbyLocations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserLocation(null);
    setLocations([]);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-3 px-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-green-600">E-Waste Locator</h1>
          {userLocation && (
            <button 
              onClick={handleReset}
              className="text-green-600 font-medium px-3 py-1 rounded-full border border-green-600 text-sm"
            >
              New Search
            </button>
          )}
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        {!userLocation && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">Find E-Waste Disposal Locations Near You</h2>
            <p className="text-gray-600 max-w-lg text-center mb-8">
              Locate the nearest facilities that accept electronic waste for proper recycling and disposal.
            </p>
            <FindNearMeButton onClick={handleFindLocations} loading={loading} />
          </div>
        )}

        {loading && (
          <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <p className="text-gray-600">Finding locations near you...</p>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center p-6 bg-red-50 rounded-lg max-w-md mx-auto my-8 shadow">
            <h3 className="font-bold mb-2">Error</h3>
            <p>{error}</p>
            <button 
              onClick={handleFindLocations} 
              className="mt-4 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {userLocation && locations.length > 0 && (
          <LocationList locations={locations} userLocation={userLocation} />
        )}

        {userLocation && locations.length === 0 && !loading && !error && (
          <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md mx-auto my-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">No Locations Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any e-waste disposal locations near you. Try again later or expand your search area.
            </p>
            <button 
              onClick={handleReset} 
              className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              New Search
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} E-Waste Disposal Locator | All data is simulated for demonstration purposes</p>
        </div>
      </footer>
    </div>
  );
}
