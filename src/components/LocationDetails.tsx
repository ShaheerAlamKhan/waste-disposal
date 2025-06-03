import { useEffect, useState } from 'react';
import { EWasteLocation } from '../data/locations';
import { detectMobileDevice } from '../utils/deviceDetection';
import ImpactCalculator from './ImpactCalculator';

interface LocationDetailsProps {
  location: EWasteLocation;
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

export default function LocationDetails({ location }: LocationDetailsProps) {
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'other'>('other');
  const [showImpactCalculator, setShowImpactCalculator] = useState(false);
  
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
    <>
      <div className="p-8 border-t border-slate-200 bg-gradient-to-br from-slate-50/50 to-emerald-50/30">
        <div className="mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Accepted Electronic Waste</h4>
          <div className="flex flex-wrap gap-3">
            {location.acceptedWaste.map((type, index) => (
              <span 
                key={index}
                className="bg-emerald-100 text-emerald-800 text-sm px-4 py-2 rounded-full border border-emerald-200 font-medium shadow-sm hover:bg-emerald-200 transition-colors duration-200"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        
        {/* Impact Calculator Section */}
        <div className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200/50 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Calculate Environmental Impact</h4>
              <p className="text-gray-600 leading-relaxed">Discover the positive environmental effects of recycling your devices at this facility</p>
            </div>
          </div>
          <button
            onClick={() => setShowImpactCalculator(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Calculate My Impact
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={handleGetDirections}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get Directions
          </button>
          
          {location.phone && (
            <button
              onClick={handleCall}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Facility
            </button>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          {location.website && (
            <a 
              href={location.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2 hover:underline transition-colors duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Website
            </a>
          )}
          
          {typeof navigator !== 'undefined' && 'share' in navigator && deviceType !== 'other' && (
            <button 
              onClick={shareLocation}
              className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2 transition-colors duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Location
            </button>
          )}
        </div>
      </div>

      {/* Impact Calculator Modal */}
      {showImpactCalculator && (
        <ImpactCalculator onClose={() => setShowImpactCalculator(false)} />
      )}
    </>
  );
} 