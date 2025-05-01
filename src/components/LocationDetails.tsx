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

export default function LocationDetails({ location }: LocationDetailsProps) {
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'other'>('other');
  
  useEffect(() => {
    const type = detectMobileDevice();
    setDeviceType(type);
  }, []);

  const handleGetDirections = () => {
    const { latitude, longitude } = location;
    const fullAddress = encodeURIComponent(`${location.address}, ${location.city}, ${location.state} ${location.zip}`);
    
    // Use different map URLs based on device type
    let mapsUrl = '';
    
    if (deviceType === 'ios') {
      mapsUrl = `https://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`;
    } else if (deviceType === 'android') {
      mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${fullAddress}&travelmode=driving`;
    } else {
      // For desktop/other, offer both options
      mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${fullAddress}&travelmode=driving`;
    }
    
    window.open(mapsUrl, '_blank');
  };

  const handleCall = () => {
    if (location.phone) {
      window.location.href = `tel:${location.phone.replace(/[^0-9]/g, '')}`;
    }
  };

  const shareLocation = () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator && deviceType !== 'other') {
      const shareData = {
        title: `E-Waste Disposal: ${location.name}`,
        text: `Check out this e-waste disposal location: ${location.name} - ${location.address}, ${location.city}, ${location.state} ${location.zip}`,
        url: `https://maps.google.com/?q=${location.latitude},${location.longitude}`,
      };

      navigator.share(shareData)
        .catch(err => console.log('Error sharing', err));
    }
  };

  return (
    <div className="p-5 border-t border-gray-200 bg-gray-50">
      <div className="mb-5">
        <h4 className="font-semibold text-gray-800 mb-3">Accepted E-Waste:</h4>
        <div className="flex flex-wrap gap-2">
          {location.acceptedWaste.map((type, index) => (
            <span 
              key={index}
              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      
      {location.hours && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Hours:</h4>
          <p className="text-gray-600">{location.hours}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        <button
          onClick={handleGetDirections}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 touch-manipulation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Get Directions
        </button>
        
        {location.phone && (
          <button
            onClick={handleCall}
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 touch-manipulation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call
          </button>
        )}
      </div>
      
      <div className="flex mt-4 justify-between">
        {location.website && (
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
        )}
        
        {typeof navigator !== 'undefined' && 'share' in navigator && deviceType !== 'other' && (
          <button 
            onClick={shareLocation}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        )}
      </div>
    </div>
  );
} 