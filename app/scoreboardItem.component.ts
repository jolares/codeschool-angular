// Input allows us to use this component as an input to ScoreboardComponent
// Output works almost like Input (self explanatory)
// EventEmitter allows us to dispatch events
import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Race } from './race'
import { RaceScoreService } from './raceScore.service'
import { RaceScore } from './raceScore'

@Component({
  selector: 'scoreboard-item',
  template: `
    <!-- If we remove the *ngIf, the page will try to render the template before
         fetching the score variable, hence throwing up an error.
    -->
    <div class="scoreboard-item" [class.finished]="score.currentLap >= score.totalLaps" *ngIf="score">
      <h2>{{race.name}}</h2>
      <p>Lap {{score.currentLap}} of {{score.totalLaps}}</p>
      <ol>
        <li *ngFor="let racer of score.racers let i=index">{{racer}}</li>
      </ol>
    </div>
  `,
  providers: [RaceScoreService],
  styles: [`
    /* Note: it is bad practice to keep styles in-line, but because this code is
     *       so short, we will keep it here.
     */

    .scoreboard-item {
      padding: 10px;
      border: 1.95px solid red;
    }

    .scoreboard-item.finished {
      border: 1.95px solid green;
    }
  `]
})

export class ScoreboardItemComponent {
  score: RaceScore

  @Input() race: Race
  @Output() notification: EventEmitter<string> = new EventEmitter<string>()
  // The instructor later on wrote it in the repo as:
  //   @Output() notification = new EventEmitter<string>()



  constructor(private raceScoreService: RaceScoreService){}

  ngOnInit(){
    this.raceScoreService.getScoreForRace(this.race.id)
      .subscribe(data => {
        this.checkForNotification(data)
        this.score = data
      })
  }

  checkForNotification(newScore){
      if(newScore.currentLap >= newScore.totalLaps) {
        this.notification.emit(`The ${this.race.name} race has finished and ${newScore.racers[0]} is the winner!`)
      }

      // Check to see if there is a new leader of if race is finished
      if(this.score && newScore.racers[0] != this.score.racers[0]) {
        this.notification.emit(`${newScore.racers[0]} has taken the lead in the ${this.race.name} race!`)
      }
    }
  }
