import { useState, useEffect } from 'react';

interface DeviceImpact {
  name: string;
  toxicMaterials: { material: string; amount: string }[];
  co2Saved: string;
  energySaved: string;
  waterSaved: string;
  goldRecovered: string;
}

const deviceImpacts: Record<string, DeviceImpact> = {
  smartphone: {
    name: "Smartphone",
    toxicMaterials: [
      { material: "Lead", amount: "0.5g" },
      { material: "Mercury", amount: "0.02g" },
      { material: "Cadmium", amount: "0.1g" }
    ],
    co2Saved: "70 kg",
    energySaved: "44 kWh",
    waterSaved: "1,500 L",
    goldRecovered: "0.034g"
  },
  laptop: {
    name: "Laptop",
    toxicMaterials: [
      { material: "Lead", amount: "2.5g" },
      { material: "Mercury", amount: "0.15g" },
      { material: "Cadmium", amount: "0.5g" }
    ],
    co2Saved: "300 kg",
    energySaved: "200 kWh",
    waterSaved: "5,000 L",
    goldRecovered: "0.2g"
  },
  tablet: {
    name: "Tablet",
    toxicMaterials: [
      { material: "Lead", amount: "1.2g" },
      { material: "Mercury", amount: "0.05g" },
      { material: "Cadmium", amount: "0.2g" }
    ],
    co2Saved: "120 kg",
    energySaved: "80 kWh",
    waterSaved: "2,200 L",
    goldRecovered: "0.1g"
  },
  monitor: {
    name: "Monitor/TV",
    toxicMaterials: [
      { material: "Lead", amount: "4.5g" },
      { material: "Mercury", amount: "0.8g" },
      { material: "Cadmium", amount: "1.2g" }
    ],
    co2Saved: "450 kg",
    energySaved: "350 kWh",
    waterSaved: "8,000 L",
    goldRecovered: "0.3g"
  },
  printer: {
    name: "Printer",
    toxicMaterials: [
      { material: "Lead", amount: "3.0g" },
      { material: "Mercury", amount: "0.3g" },
      { material: "Cadmium", amount: "0.8g" }
    ],
    co2Saved: "180 kg",
    energySaved: "150 kWh",
    waterSaved: "3,500 L",
    goldRecovered: "0.15g"
  },
  iclicker: {
    name: "iClicker",
    toxicMaterials: [
      { material: "Lead", amount: "0.35g" },
      { material: "Mercury", amount: "0.015g" },
      { material: "Cadmium", amount: "0.07g" }
    ],
    co2Saved: "50 kg",
    energySaved: "30 kWh",
    waterSaved: "1,000 L",
    goldRecovered: "0.02g"
  },
  calculator: {
    name: "Calculator",
    toxicMaterials: [
      { material: "Lead", amount: "0.8g" },
      { material: "Mercury", amount: "0.03g" },
      { material: "Cadmium", amount: "0.15g" }
    ],
    co2Saved: "90 kg",
    energySaved: "60 kWh",
    waterSaved: "1,800 L",
    goldRecovered: "0.05g"
  }
};

interface ImpactCalculatorProps {
  onClose: () => void;
}

export default function ImpactCalculator({ onClose }: ImpactCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showResults, setShowResults] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and prevent body scroll
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());
    
    const handleResize = () => setIsMobile(checkMobile());
    window.addEventListener('resize', handleResize);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const currentImpact = selectedDevice ? deviceImpacts[selectedDevice] : null;
  const multipliedImpact = currentImpact ? {
    toxicMaterials: currentImpact.toxicMaterials.map(item => ({
      material: item.material,
      amount: `${(parseFloat(item.amount) * quantity).toFixed(2)}g`
    })),
    co2Saved: `${(parseFloat(currentImpact.co2Saved) * quantity).toFixed(0)} kg`,
    energySaved: `${(parseFloat(currentImpact.energySaved) * quantity).toFixed(0)} kWh`,
    waterSaved: `${(parseFloat(currentImpact.waterSaved.replace(/,/g, '')) * quantity).toLocaleString()} L`,
    goldRecovered: `${(parseFloat(currentImpact.goldRecovered) * quantity).toFixed(3)}g`
  } : null;

  const deviceIcons: Record<string, React.ReactNode> = {
    smartphone: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    laptop: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    tablet: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    monitor: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    printer: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
    iclicker: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <circle cx="12" cy="12" r="3" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6M9 16h6" />
      </svg>
    ),
    calculator: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m0 18v-7a2 2 0 012-2h2a2 2 0 012 2v7m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h.01M7 12h.01M7 16h.01M15 8h.01M15 12h.01M19 8h.01M19 12h.01" />
      </svg>
    )
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedDevice) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 3) setShowResults(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isMobile) {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black z-[9999] ${isMobile ? 'bg-opacity-100' : 'bg-opacity-60 flex items-center justify-center p-4'}`}
      onClick={handleBackdropClick}
    >
      <div className={`bg-white shadow-2xl transform transition-all duration-200 ${
        isMobile 
          ? 'w-full h-full flex flex-col' 
          : 'rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden'
      }`}>
        
        {/* Header */}
        <div className={`bg-white border-b border-slate-200 ${isMobile ? 'pt-safe-area-inset-top px-4 py-6' : 'p-6'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className={`font-bold text-gray-900 leading-tight ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                  Impact Calculator
                </h2>
                <p className="text-gray-600 text-sm">Step {currentStep} of 3</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-3 rounded-full transition-colors duration-200 flex-shrink-0"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 ${isMobile ? 'overflow-y-auto pb-safe-area-inset-bottom' : 'overflow-y-auto'}`}>
          
          {/* Step 1: Device Selection */}
          {currentStep === 1 && (
            <div className={`${isMobile ? 'p-4 space-y-6' : 'p-8 space-y-8'}`}>
              <div>
                <h3 className={`font-bold text-gray-900 mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                  Select Your Device Type
                </h3>
                <p className="text-gray-600 mb-6">Choose the electronic device you want to recycle</p>
              </div>
              
              <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
                {Object.entries(deviceImpacts).map(([key, device]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDevice(key)}
                    className={`${isMobile ? 'p-4' : 'p-6'} rounded-2xl border-2 transition-all duration-200 active:scale-95 ${
                      selectedDevice === key
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg'
                        : 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <div className="text-emerald-600 mb-3 flex justify-center">
                      {deviceIcons[key]}
                    </div>
                    <div className={`font-semibold text-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {device.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Quantity Selection */}
          {currentStep === 2 && (
            <div className={`${isMobile ? 'p-4 space-y-6' : 'p-8 space-y-8'}`}>
              <div>
                <h3 className={`font-bold text-gray-900 mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                  How Many {deviceImpacts[selectedDevice]?.name}s?
                </h3>
                <p className="text-gray-600 mb-6">Specify the quantity you plan to recycle</p>
              </div>
              
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`${isMobile ? 'w-16 h-16' : 'w-12 h-12'} rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 flex items-center justify-center font-bold transition-all duration-200 active:scale-95`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                  </svg>
                </button>
                
                <div className="text-center">
                  <div className={`font-bold text-gray-900 ${isMobile ? 'text-6xl' : 'text-4xl'}`}>
                    {quantity}
                  </div>
                  <div className="text-gray-500 mt-2">
                    {quantity === 1 ? 'device' : 'devices'}
                  </div>
                </div>
                
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`${isMobile ? 'w-16 h-16' : 'w-12 h-12'} rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 flex items-center justify-center font-bold transition-all duration-200 active:scale-95`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {currentStep === 3 && showResults && multipliedImpact && (
            <div className={`${isMobile ? 'p-4 space-y-4' : 'p-8 space-y-6'}`}>
              <div className="text-center mb-6">
                <h3 className={`font-bold text-emerald-800 mb-2 ${isMobile ? 'text-lg' : 'text-2xl'}`}>
                  Impact: {quantity} {currentImpact?.name.toLowerCase()}{quantity > 1 ? 's' : ''}
                </h3>
                <p className="text-gray-600">Your positive environmental contribution</p>
              </div>
              
              <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {/* Toxic Materials */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div className="font-semibold text-gray-900 text-sm">Toxic Materials Prevented</div>
                  </div>
                  {multipliedImpact.toxicMaterials.map((item, index) => (
                    <div key={index} className="flex justify-between py-1 text-sm">
                      <span className="text-gray-700">{item.material}</span>
                      <span className="font-bold text-red-600">{item.amount}</span>
                    </div>
                  ))}
                </div>

                {/* CO₂ Saved */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="font-semibold text-gray-900 text-sm">CO₂ Emissions Saved</div>
                  </div>
                  <div className={`font-bold text-emerald-600 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                    {multipliedImpact.co2Saved}
                  </div>
                </div>

                {/* Energy Saved */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="font-semibold text-gray-900 text-sm">Energy Saved</div>
                  </div>
                  <div className={`font-bold text-blue-600 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                    {multipliedImpact.energySaved}
                  </div>
                </div>

                {/* Water Conserved */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <div className="font-semibold text-gray-900 text-sm">Water Conserved</div>
                  </div>
                  <div className={`font-bold text-blue-600 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                    {multipliedImpact.waterSaved}
                  </div>
                </div>

                {/* Gold Recovery - spans full width */}
                <div className={`bg-amber-50 border border-amber-200 rounded-xl p-4 ${!isMobile ? 'md:col-span-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <div className="font-semibold text-gray-900 text-sm">Precious Metals Recovered</div>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <div className={`font-bold text-amber-600 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                      {multipliedImpact.goldRecovered}
                    </div>
                    <div className="text-xs text-gray-600">
                      ≈ ${(parseFloat(multipliedImpact.goldRecovered) * 65).toFixed(2)} USD
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-center">
                <div className={`font-bold mb-1 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                  🌱 Environmental Hero!
                </div>
                <div className="text-emerald-100 text-sm">
                  Your contribution makes a real difference
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className={`bg-white border-t border-slate-200 ${isMobile ? 'p-4 pb-safe-area-inset-bottom' : 'p-6'}`}>
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className={`flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold ${isMobile ? 'py-4' : 'py-3'} px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={currentStep === 1 && !selectedDevice}
                className={`flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold ${isMobile ? 'py-4' : 'py-3'} px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95`}
              >
                {currentStep === 1 ? 'Select Device' : 'Calculate Impact'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={onClose}
                className={`flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold ${isMobile ? 'py-4' : 'py-3'} px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 