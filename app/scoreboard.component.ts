import { Component } from '@angular/core'
import { Race } from './race'  // establish race data-structure
import { RaceService } from './race.service'
import { ScoreboardItemComponent } from './scoreboardItem.component';

@Component({
  selector: 'scoreboard',
  template: `
    <header class="container">
      <h1>Scoreboard</h1>
      <h3>Race Notifications</h3>
      <ul>
        <li *ngFor="let notification of notifications">{{notification}}</li>
      </ul>
    </header>

    <div class="container-fluid scoreboard-display">
      <div class="row">
        <div class="col-xs-4" *ngFor="let race of races">
          <scoreboard-item [race]="race" (notification)="notifications.unshift($event)"></scoreboard-item>
        </div>
      </div>
    </div>
  `,
  directives: [ScoreboardItemComponent],
  providers: [RaceService],
  styles: [`
    header.container {
      margin-left: 0;
      margin-right:0;
      width: 100%;
      max-width:100%;
    }
    ul {
      width: 100%;
      padding: 10px;
      border: 1.95px solid gray;
      height: 200px;
      overflow: auto;
    }
  `]

})

export class ScoreboardComponent {

  races: Race[]
  notifications: string[] = []

  constructor(private raceService: RaceService){}

  ngOnInit() {

    /* // Uncomment to use mock data. Also edit 'race.service.ts' accordingly.
    this.races = this.raceService.getRaces();
    */

    // uncomment this to load real data. Also edit 'race.service.ts' accordingly.
    this.raceService.getRaces()
        .subscribe(data => {
          this.races = data
        })



  }

}
