import { useState } from 'react';
import { EWasteLocation } from '../data/locations';
import { calculateDistance } from '../utils/distance';
import LocationDetails from './LocationDetails';

interface LocationCardProps {
  location: EWasteLocation;
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

export default function LocationCard({ location, userLocation }: LocationCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const distance = calculateDistance(
    userLocation.latitude,
    userLocation.longitude,
    location.latitude,
    location.longitude
  );

  const fullAddress = `${location.address}, ${location.city}, ${location.state} ${location.zip}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{location.name}</h3>
          <span className="text-gray-600 font-medium">{distance.toFixed(1)} mi</span>
        </div>
        <p className="text-gray-500 mt-1">{fullAddress}</p>
        
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {location.hours || "Hours not available"}
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-1 flex-wrap">
            {location.acceptedWaste.slice(0, expanded ? 100 : 2).map((type, index) => (
              <span 
                key={index}
                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
              >
                {type}
              </span>
            ))}
            {!expanded && location.acceptedWaste.length > 2 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{location.acceptedWaste.length - 2} more
              </span>
            )}
          </div>
          
          <button className="text-green-600 text-sm font-medium">
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
      
      {expanded && <LocationDetails location={location} userLocation={userLocation} />}
    </div>
  );
} 