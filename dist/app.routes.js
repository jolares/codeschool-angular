"use strict";
var router_1 = require('@angular/router');
var about_component_1 = require('./about.component');
var races_component_1 = require('./races.component');
var scoreboard_component_1 = require('./scoreboard.component');
var pagenotfound_component_1 = require('./pagenotfound.component');
exports.routes = [
    { path: '', component: about_component_1.AboutComponent },
    { path: 'schedule', component: races_component_1.RacesComponent },
    { path: 'scoreboard', component: scoreboard_component_1.ScoreboardComponent },
    { path: '**', component: pagenotfound_component_1.PageNotFoundComponent }
];
// This seems unnecesary, but must be include in the current version of Angular2.
// Bring providers into app
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map