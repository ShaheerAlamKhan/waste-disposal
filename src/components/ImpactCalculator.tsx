import { useEffect, useState } from 'react';

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
    name: 'Smartphone',
    toxicMaterials: [
      { material: 'Lead', amount: '0.5g' },
      { material: 'Mercury', amount: '0.02g' },
      { material: 'Cadmium', amount: '0.1g' },
    ],
    co2Saved: '70 kg',
    energySaved: '44 kWh',
    waterSaved: '1,500 L',
    goldRecovered: '0.034g',
  },
  laptop: {
    name: 'Laptop',
    toxicMaterials: [
      { material: 'Lead', amount: '2.5g' },
      { material: 'Mercury', amount: '0.15g' },
      { material: 'Cadmium', amount: '0.5g' },
    ],
    co2Saved: '300 kg',
    energySaved: '200 kWh',
    waterSaved: '5,000 L',
    goldRecovered: '0.2g',
  },
  tablet: {
    name: 'Tablet',
    toxicMaterials: [
      { material: 'Lead', amount: '1.2g' },
      { material: 'Mercury', amount: '0.05g' },
      { material: 'Cadmium', amount: '0.2g' },
    ],
    co2Saved: '120 kg',
    energySaved: '80 kWh',
    waterSaved: '2,200 L',
    goldRecovered: '0.1g',
  },
  monitor: {
    name: 'Monitor/TV',
    toxicMaterials: [
      { material: 'Lead', amount: '4.5g' },
      { material: 'Mercury', amount: '0.8g' },
      { material: 'Cadmium', amount: '1.2g' },
    ],
    co2Saved: '450 kg',
    energySaved: '350 kWh',
    waterSaved: '8,000 L',
    goldRecovered: '0.3g',
  },
  printer: {
    name: 'Printer',
    toxicMaterials: [
      { material: 'Lead', amount: '3.0g' },
      { material: 'Mercury', amount: '0.3g' },
      { material: 'Cadmium', amount: '0.8g' },
    ],
    co2Saved: '180 kg',
    energySaved: '150 kWh',
    waterSaved: '3,500 L',
    goldRecovered: '0.15g',
  },
  iclicker: {
    name: 'iClicker',
    toxicMaterials: [
      { material: 'Lead', amount: '0.35g' },
      { material: 'Mercury', amount: '0.015g' },
      { material: 'Cadmium', amount: '0.07g' },
    ],
    co2Saved: '50 kg',
    energySaved: '30 kWh',
    waterSaved: '1,000 L',
    goldRecovered: '0.02g',
  },
  calculator: {
    name: 'Calculator',
    toxicMaterials: [
      { material: 'Lead', amount: '0.8g' },
      { material: 'Mercury', amount: '0.03g' },
      { material: 'Cadmium', amount: '0.15g' },
    ],
    co2Saved: '90 kg',
    energySaved: '60 kWh',
    waterSaved: '1,800 L',
    goldRecovered: '0.05g',
  },
};

interface ImpactCalculatorProps {
  onClose: () => void;
}

export default function ImpactCalculator({ onClose }: ImpactCalculatorProps) {
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Prevent body scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const currentImpact = selectedDevice ? deviceImpacts[selectedDevice] : null;
  const multipliedImpact = currentImpact
    ? {
        toxicMaterials: currentImpact.toxicMaterials.map((item) => ({
          material: item.material,
          amount: `${(parseFloat(item.amount) * quantity).toFixed(2)}g`,
        })),
        co2Saved: `${(parseFloat(currentImpact.co2Saved) * quantity).toFixed(0)} kg`,
        energySaved: `${(parseFloat(currentImpact.energySaved) * quantity).toFixed(0)} kWh`,
        waterSaved: `${(
          parseFloat(currentImpact.waterSaved.replace(/,/g, '')) * quantity
        ).toLocaleString()} L`,
        goldRecovered: `${(parseFloat(currentImpact.goldRecovered) * quantity).toFixed(3)}g`,
      }
    : null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="impact-calculator-title"
    >
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl bg-surface shadow-2xl ring-1 ring-[color:var(--border)]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border-token px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-white">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </span>
            <div>
              <h2
                id="impact-calculator-title"
                className="text-lg font-bold text-foreground"
              >
                Impact estimator
              </h2>
              <p className="text-sm text-[color:var(--muted-foreground)]">
                Rough estimates per recycled device
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close impact estimator"
            className="rounded-lg p-2 text-[color:var(--muted-foreground)] transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="thin-scroll flex-1 space-y-6 overflow-y-auto px-6 py-5">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">
              Device type
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {Object.entries(deviceImpacts).map(([key, device]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDevice(key)}
                  aria-pressed={selectedDevice === key}
                  className={`rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                    selectedDevice === key
                      ? 'border-brand bg-[color:var(--brand-soft)] text-brand-strong'
                      : 'border-border-token text-[color:var(--muted-foreground)] hover:border-brand/60 hover:text-foreground'
                  }`}
                >
                  {device.name}
                </button>
              ))}
            </div>
          </div>

          {selectedDevice && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-foreground transition-opacity hover:opacity-80"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span
                  className="min-w-[3rem] text-center text-2xl font-bold text-foreground"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-foreground transition-opacity hover:opacity-80"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {multipliedImpact && currentImpact && (
            <div className="rounded-xl border border-brand/25 bg-[color:var(--brand-soft)] p-4">
              <h3 className="mb-4 font-bold text-brand-strong">
                Recycling {quantity}{' '}
                {currentImpact.name.toLowerCase()}
                {quantity > 1 ? 's' : ''} roughly means:
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-surface p-4">
                  <div className="mb-2 text-sm font-semibold text-foreground">
                    Toxic materials kept out of landfill
                  </div>
                  {multipliedImpact.toxicMaterials.map((item) => (
                    <div
                      key={item.material}
                      className="flex justify-between py-0.5 text-sm"
                    >
                      <span className="text-[color:var(--muted-foreground)]">
                        {item.material}
                      </span>
                      <span className="font-semibold text-foreground">
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-rows-3 gap-3">
                  {[
                    { label: 'CO₂ emissions avoided', value: multipliedImpact.co2Saved },
                    { label: 'Energy saved', value: multipliedImpact.energySaved },
                    { label: 'Water conserved', value: multipliedImpact.waterSaved },
                  ].map((tile) => (
                    <div
                      key={tile.label}
                      className="flex items-center justify-between rounded-lg bg-surface px-4 py-2.5"
                    >
                      <span className="text-sm text-[color:var(--muted-foreground)]">
                        {tile.label}
                      </span>
                      <span className="font-bold text-brand">
                        {tile.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-surface px-4 py-2.5 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[color:var(--muted-foreground)]">
                      Recoverable gold
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {multipliedImpact.goldRecovered}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-brand-strong/80">
                Ballpark figures based on published per-device recycling
                estimates — actual recovery varies by device and facility.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
