import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

const BASE_URL = 'https://devorder.crowndigital.io/admin/web/v1';


@Injectable({
  providedIn: 'root'
})
export class HtttpServiceService {

  constructor() { }

    // Fetch locations for the dropdown
    static async getLocations(countryUuid: string) {
      try {
        const response = await CapacitorHttp.request({
          method: 'GET',
          url: `${BASE_URL}/masterrestaurant/index`,
          params: { country_uuid: countryUuid }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
      }
    }

    static async postFormData(url: string, payload: any): Promise<any> {
      let headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      try {
        const response = await CapacitorHttp.request({
          url: BASE_URL + url,
          method: 'POST',
          headers: headers,
          data: payload,
        });
        console.log(response);
        return response.data;
      } catch (error) {
        console.error('HTTP Error:', error);
        throw error;
      }
    }
    

}

