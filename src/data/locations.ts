export interface EWasteLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  acceptedWaste: string[];
  hours?: string;
}

// Real e-waste recycling centers near UCSD campus
export const locations: EWasteLocation[] = [
  {
    id: "1",
    name: "Dream E-Waste",
    address: "4009 Hicock St Suite D",
    city: "San Diego",
    state: "CA",
    zip: "92110",
    latitude: 32.7347,
    longitude: -117.2131,
    phone: "(619) 889-1305",
    acceptedWaste: ["Computers", "Laptops", "Smartphones", "Tablets", "Printers", "Monitors", "TVs", "Servers", "Routers", "Telecommunications Equipment"],
    hours: "Contact for hours"
  },
  {
    id: "2",
    name: "SES Recycling (Secure E-Waste Solutions)",
    address: "8810 Rehco Rd C",
    city: "San Diego",
    state: "CA",
    zip: "92121",
    latitude: 32.9023,
    longitude: -117.2108,
    acceptedWaste: ["All Electronics", "Batteries", "IT Equipment"],
    hours: "Contact through website"
  },
  {
    id: "3",
    name: "Miramar Recycling Center",
    address: "5165 Convoy St",
    city: "San Diego",
    state: "CA",
    zip: "92111",
    latitude: 32.8128,
    longitude: -117.1565,
    phone: "(858) 268-8971",
    acceptedWaste: ["Computer Electronics", "TVs", "Monitors", "Small Appliances"],
    hours: "Mon-Sat: 7am-4pm (Closed Sundays)"
  },
  {
    id: "4",
    name: "Solana Center for Environmental Innovation",
    address: "137 N. El Camino Real",
    city: "Encinitas",
    state: "CA",
    zip: "92024",
    latitude: 33.0370,
    longitude: -117.2920,
    acceptedWaste: ["Electronics", "E-Waste"],
    hours: "Thu: 12pm-5pm, Sat: 9am-12pm (Call ahead - service may be discontinued)"
  },
  {
    id: "5",
    name: "UCSD Geisel Library E-Waste Drop-off",
    address: "9701 Hopkins Dr, 2nd Floor",
    city: "La Jolla",
    state: "CA",
    zip: "92093",
    latitude: 32.8801,
    longitude: -117.2340,
    acceptedWaste: ["iClickers", "Calculators", "Small Appliances"],
    hours: "Mon-Thu: 7:30am-10pm, Fri: 7:30am-6pm, Sat: 10am-6pm, Sun: 10am-10pm"
  }
]; 