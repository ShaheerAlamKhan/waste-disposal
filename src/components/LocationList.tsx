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
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-2">No Locations Found</h2>
        <p className="text-gray-600">
          We couldn't find any e-waste disposal locations near you. Try expanding your search area.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby E-Waste Disposal Locations</h2>
      {locations.map((location) => (
        <LocationCard 
          key={location.id} 
          location={location} 
          userLocation={userLocation} 
        />
      ))}
    </div>
  );
} 