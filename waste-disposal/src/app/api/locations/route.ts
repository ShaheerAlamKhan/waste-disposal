import { NextResponse } from 'next/server';
import { locations } from '../../../data/locations';
import { calculateDistance } from '../../../utils/distance';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  
  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Missing latitude or longitude parameters' },
      { status: 400 }
    );
  }
  
  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);
  
  // Filter locations within 50 miles and sort by distance
  const nearbyLocations = locations
    .map(location => {
      const distance = calculateDistance(
        userLat,
        userLng,
        location.latitude,
        location.longitude
      );
      return { ...location, distance };
    })
    .filter(location => location.distance <= 50)
    .sort((a, b) => a.distance - b.distance);
    
  return NextResponse.json(nearbyLocations);
} 