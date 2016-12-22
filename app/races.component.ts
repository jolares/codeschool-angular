import { Component } from '@angular/core';
import { Race } from './race';  // establish race data-structure
import { RaceService } from './race.service';

@Component({
  selector: 'my-races',
  templateUrl: 'app/races.component.html',
  styleUrls:['app/races.component.css'],
  providers: [RaceService]
})
export class RacesComponent {
  heading = "Ultra Racing Schedule"
  cash = 10000;
  races: Race[];

  constructor(private raceService: RaceService) { }

  ngOnInit() {

    /* // Uncomment to use mock data. Also edit 'race.service.ts' accordingly.
    this.races = this.raceService.getRaces();
    */

    // uncomment this to load real data. Also edit 'race.service.ts' accordingly.
    this.raceService.getRaces()
        .subscribe(data => this.races = data);

  }

  totalCost() {
    let sum = 0;
    if (this.races) {
      for (let race of this.races) {
        if (race.isRacing) sum += race.entryFee;
      }
    }
    return sum;
  }

  castDate(date) {
    return new Date(date);
  }

  cashLeft() {
    return this.cash - this.totalCost();
  }

  enterRace(race) {
    if (this.cashLeft() > race.entryFee) {
      race.isRacing = true;
    } else {
      alert("You don't have enough cash");
    }
  }

  cancelRace(race) {
    race.isRacing = false;
  }

}
