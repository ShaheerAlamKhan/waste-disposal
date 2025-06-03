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
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showResults, setShowResults] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
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

  const calculateImpact = () => {
    if (selectedDevice) {
      setShowResults(true);
    }
  };

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const deviceIcons: Record<string, React.ReactNode> = {
    smartphone: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    laptop: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    tablet: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    monitor: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    printer: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
    iclicker: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <circle cx="12" cy="12" r="3" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6M9 16h6" />
      </svg>
    ),
    calculator: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m0 18v-7a2 2 0 012-2h2a2 2 0 012 2v7m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h.01M7 12h.01M7 16h.01M15 8h.01M15 12h.01M19 8h.01M19 12h.01" />
      </svg>
    )
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
        
        {/* Fixed Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Impact Calculator</h2>
                <p className="text-sm text-gray-600">Calculate your environmental impact</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          
          {/* Device Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Device Type</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(deviceImpacts).map(([key, device]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedDevice(key);
                    setShowResults(false);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedDevice === key
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <div className="text-emerald-600 mb-2 flex justify-center">
                    {deviceIcons[key]}
                  </div>
                  <div className="text-xs font-medium text-center">{device.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          {selectedDevice && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Calculate Button */}
          {selectedDevice && (
            <button
              onClick={calculateImpact}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Calculate Environmental Impact
            </button>
          )}

          {/* Results */}
          {showResults && multipliedImpact && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h3 className="text-lg font-bold text-emerald-800 mb-4">
                Impact: {quantity} {currentImpact?.name.toLowerCase()}{quantity > 1 ? 's' : ''}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Toxic Materials */}
                <div className="bg-white p-4 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="bg-white p-4 rounded-lg border border-emerald-100">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="font-semibold text-gray-900 text-sm">CO₂ Emissions Saved</div>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">{multipliedImpact.co2Saved}</div>
                </div>

                {/* Energy Saved */}
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="font-semibold text-gray-900 text-sm">Energy Saved</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{multipliedImpact.energySaved}</div>
                </div>

                {/* Water Conserved */}
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <div className="font-semibold text-gray-900 text-sm">Water Conserved</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{multipliedImpact.waterSaved}</div>
                </div>

                {/* Gold Recovery */}
                <div className="bg-white p-4 rounded-lg border border-amber-100 sm:col-span-2">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <div className="font-semibold text-gray-900 text-sm">Precious Metals Recovered</div>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <div className="text-2xl font-bold text-amber-600">{multipliedImpact.goldRecovered}</div>
                    <div className="text-xs text-gray-600">
                      ≈ ${(parseFloat(multipliedImpact.goldRecovered) * 65).toFixed(2)} USD
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement */}
              <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-center">
                <div className="font-bold">🌱 Environmental Hero!</div>
                <div className="text-emerald-100 text-sm">Your contribution makes a real difference</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 