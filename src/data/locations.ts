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

// Sample data - in a real app, this would come from a database or API
export const locations: EWasteLocation[] = [
  {
    id: "1",
    name: "EcoTech Recyclers",
    address: "123 Green St",
    city: "San Diego",
    state: "CA",
    zip: "92122",
    latitude: 32.715736,
    longitude: -117.161087,
    phone: "(925) 123-4567",
    website: "https://example.com/ecotech",
    acceptedWaste: ["Computers", "Monitors", "TVs", "Phones", "Batteries"],
    hours: "Mon-Fri: 9am-5pm, Sat: 10am-2pm"
  },
  {
    id: "2",
    name: "Electronics Disposal Center",
    address: "456 Recycle Ave",
    city: "San Diego",
    state: "CA",
    zip: "92101",
    latitude: 32.7157,
    longitude: -117.1611,
    phone: "(619) 987-6543",
    website: "https://example.com/edcenter",
    acceptedWaste: ["Computers", "Printers", "Microwaves", "Small Appliances"],
    hours: "Mon-Sat: 8am-6pm"
  },
  {
    id: "3",
    name: "Green Planet E-Waste",
    address: "789 Earth Blvd",
    city: "La Jolla",
    state: "CA",
    zip: "92037",
    latitude: 32.8328,
    longitude: -117.2713,
    phone: "(858) 456-7890",
    website: "https://example.com/greenplanet",
    acceptedWaste: ["Computers", "Laptops", "Tablets", "Smartphones", "Wearables", "Batteries"],
    hours: "Tue-Sat: 10am-7pm"
  },
  {
    id: "4",
    name: "City Recycling Facility",
    address: "101 Municipal Way",
    city: "Chula Vista",
    state: "CA",
    zip: "91910",
    latitude: 32.6401,
    longitude: -117.0842,
    phone: "(619) 234-5678",
    acceptedWaste: ["TVs", "Computers", "Printers", "Phones", "Household Batteries"],
    hours: "Mon-Fri: 7am-3pm"
  },
  {
    id: "5",
    name: "TechCycle Solutions",
    address: "222 Innovation Pkwy",
    city: "Escondido",
    state: "CA",
    zip: "92025",
    latitude: 33.1192,
    longitude: -117.0864,
    phone: "(760) 345-6789",
    website: "https://example.com/techcycle",
    acceptedWaste: ["Enterprise IT Equipment", "Servers", "Networking Equipment", "Office Electronics"],
    hours: "By appointment only"
  }
]; 