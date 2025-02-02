import api from './api';
import { Venue } from '../types/venue.types';

export const updateVenueDetails = async (venueId: string, venueData: Partial<Venue>) => {
  const response = await api.put(`/venues/${venueId}`, venueData);
  return response.data;
};
