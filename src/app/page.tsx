'use client';

import { useState } from 'react';
import FindNearMeButton from '../components/FindNearMeButton';
import LocationList from '../components/LocationList';
import AnimatedCounterDashboard from '../components/AnimatedCounterDashboard';
import { EWasteLocation } from '../data/locations';
import { locations } from '../data/locations';
import { getNearbyLocations } from '../utils/locationUtils';

export default function Home() {
  const [filteredLocations, setFilteredLocations] = useState<(EWasteLocation & { distance: number })[]>([]);
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
      
      // Filter locations by distance directly in the client
      const nearbyLocations = getNearbyLocations(locations, latitude, longitude);
      setFilteredLocations(nearbyLocations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserLocation(null);
    setFilteredLocations([]);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50">
      {/* Subtle Animated Background System */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Geometric shapes instead of emojis */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-600/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-emerald-700/15 rounded-full animate-float-delay-1"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-emerald-800/25 rounded-full animate-float-delay-2"></div>
        <div className="absolute bottom-60 right-20 w-2 h-2 bg-emerald-600/20 rounded-full animate-float"></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-emerald-700/30 rounded-full animate-float-delay-1"></div>
        
        {/* Subtle gradient orbs */}
        <div className="absolute top-32 left-32 w-64 h-64 bg-gradient-to-br from-emerald-100/10 to-emerald-200/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-br from-emerald-200/8 to-emerald-300/5 rounded-full blur-3xl animate-float-delay-2"></div>
      </div>

      <header className="bg-white/95 backdrop-blur-xl shadow-sm sticky top-0 z-20 border-b border-emerald-100/50">
        <div className="max-w-7xl mx-auto py-6 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">E-Waste Locator</h1>
          </div>
          {userLocation && (
            <button 
              onClick={handleReset}
              className="text-emerald-700 hover:text-emerald-800 font-medium px-6 py-2 rounded-full border border-emerald-600 hover:bg-emerald-50 text-sm transition-all duration-200 hover:shadow-md"
            >
              New Search
            </button>
          )}
        </div>
      </header>

      {/* Animated Counter Dashboard */}
      <AnimatedCounterDashboard />

      <main className="flex-grow container mx-auto px-6 py-8 relative z-10">
        {!userLocation && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-12 max-w-3xl bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-emerald-100/50">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Find Electronic Waste Disposal Locations
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Locate certified facilities that accept electronic waste for proper recycling and secure data destruction.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <span className="bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-semibold border border-emerald-200">Environmental Impact</span>
                <span className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold border border-emerald-200">Verified Locations</span>
                <span className="bg-slate-100 text-slate-700 px-6 py-3 rounded-full text-sm font-semibold border border-slate-200">Secure Destruction</span>
              </div>
            </div>
            <FindNearMeButton onClick={handleFindLocations} loading={loading} />
          </div>
        )}

        {loading && (
          <div className="flex flex-col justify-center items-center min-h-[60vh] gap-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-2 border-emerald-200 border-t-emerald-600 shadow-lg"></div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-emerald-100 text-center max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Locating Facilities</h3>
              <p className="text-gray-600">Finding certified e-waste disposal centers near you...</p>
              <div className="flex justify-center gap-1 mt-4">
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-xl max-w-md mx-auto my-8 shadow-lg border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2 text-gray-900">Unable to locate facilities</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={handleFindLocations} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {userLocation && filteredLocations.length > 0 && (
          <div className="animate-fade-in">
            <LocationList locations={filteredLocations} userLocation={userLocation} />
          </div>
        )}

        {userLocation && filteredLocations.length === 0 && !loading && !error && (
          <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg max-w-md mx-auto my-8 border border-emerald-100">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No Facilities Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find any certified e-waste disposal facilities in your immediate area.
            </p>
            <button 
              onClick={handleReset} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
            >
              Search Again
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white/95 backdrop-blur-xl border-t border-emerald-100/50 mt-auto py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 mb-2">© {new Date().getFullYear()} E-Waste Disposal Locator</p>
          <p className="text-emerald-700 font-medium">Sustainable technology disposal for a cleaner future</p>
        </div>
      </footer>
    </div>
  );
}

