import { RACES } from './mocks';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Race } from './race';
import 'rxjs/add/operator/map';

@Injectable()
export class RaceService {

  constructor(private http: Http) {}

  /* // Uncomment this function to use mock data.
  // Also edit 'races.components.ts' accordingly
  getRaces() {
    return RACES;
  }
  */

  // Uncomment this fuction and comment the one above to load real data.
  // Also edit 'races.components.ts accordingly.
  getRaces() {
    return this.http.get('app/races.json')
          .map(response => <Race[]>response.json().racesData);
  }

}
