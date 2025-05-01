import { EWasteLocation } from '../data/locations';
import { calculateDistance } from './distance';

/**
 * Filters and sorts locations by distance from a given point
 * @param locations Array of locations to filter
 * @param userLat User's latitude
 * @param userLng User's longitude
 * @param maxDistanceMiles Maximum distance in miles (default: 50)
 * @returns Locations sorted by distance, with a distance property added
 */
export function getNearbyLocations(
  locations: EWasteLocation[], 
  userLat: number, 
  userLng: number, 
  maxDistanceMiles = 50
) {
  return locations
    .map(location => {
      const distance = calculateDistance(
        userLat,
        userLng,
        location.latitude,
        location.longitude
      );
      return { ...location, distance };
    })
    .filter(location => location.distance <= maxDistanceMiles)
    .sort((a, b) => a.distance - b.distance);
} 