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

  const toggleExpanded = () => {
    setExpanded(!expanded);
    
    // Scroll into view when expanding (with a slight delay for animation)
    if (!expanded) {
      setTimeout(() => {
        const element = document.getElementById(`location-${location.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div id={`location-${location.id}`} className="bg-white rounded-lg shadow-md overflow-hidden mb-5 transition-shadow duration-200 hover:shadow-lg">
      <div 
        className="p-4 sm:p-5 cursor-pointer active:bg-gray-100 hover:bg-gray-50 transition-colors duration-200"
        onClick={toggleExpanded}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-medium text-gray-900 leading-tight">{location.name}</h3>
          <span className="text-gray-600 font-medium text-lg bg-gray-100 px-2 py-1 rounded-full ml-2 min-w-[60px] text-center">
            {distance.toFixed(1)} mi
          </span>
        </div>
        
        <p className="text-gray-600 mt-2 break-words">{fullAddress}</p>
        
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="truncate">{location.hours || "Hours not available"}</span>
        </div>
        
        <div className="flex flex-wrap justify-between items-center mt-4">
          <div className="flex gap-2 flex-wrap mb-2 sm:mb-0">
            {location.acceptedWaste.slice(0, expanded ? 100 : 2).map((type, index) => (
              <span 
                key={index}
                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >
                {type}
              </span>
            ))}
            {!expanded && location.acceptedWaste.length > 2 && (
              <span className="text-xs text-gray-500 px-2 py-1 border border-gray-200 rounded-full">
                +{location.acceptedWaste.length - 2} more
              </span>
            )}
          </div>
          
          <button 
            className="text-green-600 text-sm font-medium flex items-center mt-1 sm:mt-0 px-3 py-1 rounded-full hover:bg-green-50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded();
            }}
            aria-expanded={expanded}
            aria-controls={`details-${location.id}`}
          >
            {expanded ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Hide Details
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                See Details
              </>
            )}
          </button>
        </div>
      </div>
      
      <div 
        id={`details-${location.id}`}
        className={`transition-all duration-300 ease-in-out ${expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        {expanded && <LocationDetails location={location} userLocation={userLocation} />}
      </div>
    </div>
  );
} 