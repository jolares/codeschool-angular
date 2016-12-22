"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Input allows us to use this component as an input to ScoreboardComponent
// Output works almost like Input (self explanatory)
// EventEmitter allows us to dispatch events
var core_1 = require('@angular/core');
var race_1 = require('./race');
var raceScore_service_1 = require('./raceScore.service');
var ScoreboardItemComponent = (function () {
    // The instructor later on wrote it in the repo as:
    //   @Output() notification = new EventEmitter<string>()
    function ScoreboardItemComponent(raceScoreService) {
        this.raceScoreService = raceScoreService;
        this.notification = new core_1.EventEmitter();
    }
    ScoreboardItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.raceScoreService.getScoreForRace(this.race.id)
            .subscribe(function (data) {
            _this.checkForNotification(data);
            _this.score = data;
        });
    };
    ScoreboardItemComponent.prototype.checkForNotification = function (newScore) {
        if (newScore.currentLap >= newScore.totalLaps) {
            this.notification.emit("The " + this.race.name + " race has finished and " + newScore.racers[0] + " is the winner!");
        }
        // Check to see if there is a new leader of if race is finished
        if (this.score && newScore.racers[0] != this.score.racers[0]) {
            this.notification.emit(newScore.racers[0] + " has taken the lead in the " + this.race.name + " race!");
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', race_1.Race)
    ], ScoreboardItemComponent.prototype, "race", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ScoreboardItemComponent.prototype, "notification", void 0);
    ScoreboardItemComponent = __decorate([
        core_1.Component({
            selector: 'scoreboard-item',
            template: "\n    <!-- If we remove the *ngIf, the page will try to render the template before\n         fetching the score variable, hence throwing up an error.\n    -->\n    <div class=\"scoreboard-item\" [class.finished]=\"score.currentLap >= score.totalLaps\" *ngIf=\"score\">\n      <h2>{{race.name}}</h2>\n      <p>Lap {{score.currentLap}} of {{score.totalLaps}}</p>\n      <ol>\n        <li *ngFor=\"let racer of score.racers let i=index\">{{racer}}</li>\n      </ol>\n    </div>\n  ",
            providers: [raceScore_service_1.RaceScoreService],
            styles: ["\n    /* Note: it is bad practice to keep styles in-line, but because this code is\n     *       so short, we will keep it here.\n     */\n\n    .scoreboard-item {\n      padding: 10px;\n      border: 1.95px solid red;\n    }\n\n    .scoreboard-item.finished {\n      border: 1.95px solid green;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [raceScore_service_1.RaceScoreService])
    ], ScoreboardItemComponent);
    return ScoreboardItemComponent;
}());
exports.ScoreboardItemComponent = ScoreboardItemComponent;
//# sourceMappingURL=scoreboardItem.component.js.map