import { EWasteLocation } from '../data/locations';
import LocationCard from './LocationCard';

interface LocationListProps {
  locations: EWasteLocation[];
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

export default function LocationList({ locations, userLocation }: LocationListProps) {
  if (locations.length === 0) {
    return (
      <div className="text-center p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Facilities Found</h2>
        <p className="text-gray-600">
          We couldn&apos;t find any certified e-waste disposal facilities in your search area.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-900">
            Certified E-Waste Facilities
          </h2>
          <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
        </div>
        <p className="text-lg text-gray-600">
          {locations.length} verified location{locations.length !== 1 ? 's' : ''} found in your area
        </p>
      </div>
      
      <div className="space-y-6">
        {locations.map((location, index) => (
          <div 
            key={location.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <LocationCard 
              location={location} 
              userLocation={userLocation} 
            />
          </div>
        ))}
      </div>
    </div>
  );
} 