import { useState, useEffect } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '', decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * end;
      
      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(updateCount);
      }
    };

    animationId = requestAnimationFrame(updateCount);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [end, duration]);

  return (
    <span>
      {prefix}{count.toFixed(decimals).toLocaleString()}{suffix}
    </span>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  description: string;
  color: string;
  delay?: number;
}

function StatCard({ icon, title, value, suffix = '', prefix = '', decimals = 0, description, color, delay = 0 }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg transform transition-all duration-500 hover:scale-105 border border-slate-200/50 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className={`text-2xl ${color}`}>{icon}</div>
        <div className={`h-3 w-3 rounded-full ${color.replace('text-', 'bg-')}`}></div>
      </div>
      
      <div className={`text-4xl font-bold ${color} mb-3 tracking-tight`}>
        {isVisible && (
          <AnimatedCounter 
            end={value} 
            suffix={suffix} 
            prefix={prefix} 
            decimals={decimals}
            duration={2000 + delay}
          />
        )}
      </div>
      
      <div className="text-lg font-semibold text-gray-900 mb-2 leading-tight">{title}</div>
      <div className="text-sm text-gray-600 leading-relaxed">{description}</div>
    </div>
  );
}

export default function AnimatedCounterDashboard() {
  // Fix hydration by using mounted state
  const [mounted, setMounted] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [stats, setStats] = useState({
    eWasteGenerated: 0,
    devicesDiscarded: 0,
    toxicWastePrevented: 0
  });

  useEffect(() => {
    setMounted(true);
    
    // Function to calculate and update stats
    const updateStats = () => {
      const now = new Date();
      const secondsThisYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 1000);
      
      // Convert to MegaTons (1 MegaTon = 1,000,000 tons)
      const eWasteTons = secondsThisYear * 1.4; // ~54 million tons per year globally
      const toxicWasteTons = secondsThisYear * 0.8; // Estimated prevention through recycling
      
      setStats({
        eWasteGenerated: eWasteTons / 1000000, // Convert to MegaTons
        devicesDiscarded: Math.floor(secondsThisYear * 170), // ~5.3 billion devices per year
        toxicWastePrevented: toxicWasteTons / 1000000 // Convert to MegaTons
      });
      
      setLastUpdate(now);
    };

    // Initial update
    updateStats();
    
    // Update every 5 minutes (300,000 ms)
    const interval = setInterval(updateStats, 300000);

    return () => clearInterval(interval);
  }, []);

  // Don't render dynamic content until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50 py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Global Impact Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Loading real-time environmental impact data...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50 animate-pulse">
                <div className="h-20 bg-gray-200 rounded mb-6"></div>
                <div className="h-10 bg-gray-200 rounded mb-3"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();
  const nextUpdate = lastUpdate ? new Date(lastUpdate.getTime() + 300000) : new Date();

  const wasteIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  const deviceIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );

  const shieldIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  const goldIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  );

  return (
    <div className="bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50 py-16 px-6 relative overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-32 w-1 h-1 bg-emerald-600/30 rounded-full animate-float"></div>
        <div className="absolute top-64 right-40 w-2 h-2 bg-emerald-700/20 rounded-full animate-float-delay-1"></div>
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-emerald-800/25 rounded-full animate-float-delay-2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Global Impact Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real-time projections based on global e-waste statistics and environmental research
          </p>
          <div className="mt-6 text-sm text-gray-500 space-y-1">
            <div>Updates every 5 minutes • Data for {currentYear}</div>
            {lastUpdate && (
              <div>
                Last updated: {lastUpdate.toLocaleTimeString()} • Next update: {nextUpdate.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard
            icon={wasteIcon}
            title="Electronic Waste Generated"
            value={stats.eWasteGenerated}
            suffix=" MT"
            decimals={2}
            description="Global electronic waste accumulation this year (MegaTons)"
            color="text-red-600"
            delay={0}
          />
          
          <StatCard
            icon={deviceIcon}
            title="Devices Discarded"
            value={stats.devicesDiscarded}
            suffix=""
            description="Smartphones, laptops, and electronics discarded globally"
            color="text-orange-600"
            delay={200}
          />
          
          <StatCard
            icon={shieldIcon}
            title="Toxic Waste Prevented"
            value={stats.toxicWastePrevented}
            suffix=" MT"
            decimals={2}
            description="Toxic materials prevented through proper recycling (MegaTons)"
            color="text-emerald-600"
            delay={400}
          />
          
          <StatCard
            icon={goldIcon}
            title="Gold Recoverable"
            value={12.5}
            suffix=" kg"
            decimals={1}
            description="Precious metals recoverable from discarded devices"
            color="text-amber-600"
            delay={600}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">The Global Crisis</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>E-waste is the fastest-growing waste stream globally</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>Only 20% of e-waste is properly recycled worldwide</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>Contains toxic materials: lead, mercury, cadmium</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>Can contaminate soil and water for decades</div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Data Sources & Methodology</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>UN Global E-waste Monitor 2024 (~54MT annually)</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>WHO Environmental Health Reports</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>EPA Electronic Waste Statistics</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>Real-time projections based on {currentYear} data</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-slate-200/50">
            <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
            <span className="font-semibold text-gray-900">
              Find certified e-waste disposal facilities below
            </span>
            <svg className="w-5 h-5 text-emerald-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 