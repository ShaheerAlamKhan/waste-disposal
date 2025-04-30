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
    city: "Springfield",
    state: "IL",
    zip: "62701",
    latitude: 39.78,
    longitude: -89.65,
    phone: "(555) 123-4567",
    website: "https://example.com/ecotech",
    acceptedWaste: ["Computers", "Monitors", "TVs", "Phones", "Batteries"],
    hours: "Mon-Fri: 9am-5pm, Sat: 10am-2pm"
  },
  {
    id: "2",
    name: "Electronics Disposal Center",
    address: "456 Recycle Ave",
    city: "Springfield",
    state: "IL",
    zip: "62702",
    latitude: 39.76,
    longitude: -89.68,
    phone: "(555) 987-6543",
    website: "https://example.com/edcenter",
    acceptedWaste: ["Computers", "Printers", "Microwaves", "Small Appliances"],
    hours: "Mon-Sat: 8am-6pm"
  },
  {
    id: "3",
    name: "Green Planet E-Waste",
    address: "789 Earth Blvd",
    city: "Greenfield",
    state: "IL",
    zip: "62044",
    latitude: 39.34,
    longitude: -90.21,
    phone: "(555) 456-7890",
    website: "https://example.com/greenplanet",
    acceptedWaste: ["Computers", "Laptops", "Tablets", "Smartphones", "Wearables", "Batteries"],
    hours: "Tue-Sat: 10am-7pm"
  },
  {
    id: "4",
    name: "City Recycling Facility",
    address: "101 Municipal Way",
    city: "Capital City",
    state: "IL",
    zip: "62756",
    latitude: 39.85,
    longitude: -89.72,
    phone: "(555) 234-5678",
    acceptedWaste: ["TVs", "Computers", "Printers", "Phones", "Household Batteries"],
    hours: "Mon-Fri: 7am-3pm"
  },
  {
    id: "5",
    name: "TechCycle Solutions",
    address: "222 Innovation Pkwy",
    city: "Techville",
    state: "IL",
    zip: "62707",
    latitude: 39.80,
    longitude: -89.60,
    phone: "(555) 345-6789",
    website: "https://example.com/techcycle",
    acceptedWaste: ["Enterprise IT Equipment", "Servers", "Networking Equipment", "Office Electronics"],
    hours: "By appointment only"
  }
]; 