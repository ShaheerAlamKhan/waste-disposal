import { useEffect, useState } from 'react';
import { EWasteLocation } from '../data/locations';
import { detectMobileDevice } from '../utils/deviceDetection';

interface LocationDetailsProps {
  location: EWasteLocation;
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

export default function LocationDetails({ location, userLocation }: LocationDetailsProps) {
  const [isAppleDevice, setIsAppleDevice] = useState(false);
  
  useEffect(() => {
    const deviceType = detectMobileDevice();
    setIsAppleDevice(deviceType === 'ios');
  }, []);

  const handleGetDirections = () => {
    const { latitude, longitude } = location;
    const fullAddress = encodeURIComponent(`${location.address}, ${location.city}, ${location.state} ${location.zip}`);
    
    const mapsUrl = isAppleDevice
      ? `https://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`
      : `https://www.google.com/maps/dir/?api=1&destination=${fullAddress}&travelmode=driving`;
    
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2">Accepted E-Waste:</h4>
        <div className="flex flex-wrap gap-2">
          {location.acceptedWaste.map((type, index) => (
            <span 
              key={index}
              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      
      {location.hours && (
        <div className="mb-3">
          <h4 className="font-medium text-gray-800 mb-1">Hours:</h4>
          <p className="text-gray-600">{location.hours}</p>
        </div>
      )}
      
      {location.website && (
        <div className="mb-3">
          <a 
            href={location.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visit Website
          </a>
        </div>
      )}
      
      {location.phone && (
        <div className="mb-4">
          <a 
            href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {location.phone}
          </a>
        </div>
      )}
      
      <button
        onClick={handleGetDirections}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Get Directions
      </button>
    </div>
  );
} 