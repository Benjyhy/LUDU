import axios from 'axios';
import { GOOGLE_CLOUD_API_KEY } from '@env';
import store from '../store';

export async function getZipCode(latitude, longitude) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_CLOUD_API_KEY}`;
  try {
    const response = await axios.get(url);
    const result = response.data;
    let zipCode = null;
    for (const component of result.results[0].address_components) {
      if (component.types.includes('postal_code')) {
        zipCode = component.long_name;
        break;
      }
    }
    return zipCode;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getLatLongFromAddress(address) {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json';
  const params = {
    address: `${address} Lille`,
    key: GOOGLE_CLOUD_API_KEY,
  };
  try {
    const response = await axios.get(url, { params });
    const result = response.data;
    const { lat, lng } = result.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error(error);
    return null;
  }
}
