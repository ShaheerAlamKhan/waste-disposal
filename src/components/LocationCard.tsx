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
    <div id={`location-${location.id}`} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-slate-200/50">
      <div 
        className="p-8 cursor-pointer active:bg-slate-50/50 hover:bg-slate-50/30 transition-all duration-200"
        onClick={toggleExpanded}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-900 leading-tight pr-4">{location.name}</h3>
          <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full border border-emerald-200 shadow-sm flex-shrink-0">
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-emerald-700 font-bold text-lg">
              {distance.toFixed(1)} mi
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">{fullAddress}</p>
        
        {location.hours && (
          <div className="flex items-center mb-6 text-gray-500">
            <svg className="w-5 h-5 mr-2 flex-shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700">{location.hours}</span>
          </div>
        )}
        
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex gap-3 flex-wrap mb-4 sm:mb-0">
            {location.acceptedWaste.slice(0, expanded ? 100 : 3).map((type, index) => (
              <span 
                key={index}
                className="bg-emerald-100 text-emerald-800 text-sm px-4 py-2 rounded-full border border-emerald-200 font-medium shadow-sm"
              >
                {type}
              </span>
            ))}
            {!expanded && location.acceptedWaste.length > 3 && (
              <span className="text-sm text-gray-600 px-4 py-2 border border-slate-200 rounded-full bg-slate-50 font-medium">
                +{location.acceptedWaste.length - 3} more
              </span>
            )}
          </div>
          
          <button 
            className="text-emerald-700 text-sm font-semibold flex items-center px-6 py-3 rounded-full hover:bg-emerald-50 transition-all duration-200 border border-emerald-200 bg-white shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded();
            }}
            aria-expanded={expanded}
            aria-controls={`details-${location.id}`}
          >
            {expanded ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Hide Details
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                View Details
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