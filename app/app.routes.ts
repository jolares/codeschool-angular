import { provideRouter, RouterConfig } from '@angular/router'
import { AboutComponent } from './about.component'
import { RacesComponent } from './races.component'
import { ScoreboardComponent } from './scoreboard.component'
import { PageNotFoundComponent } from './pagenotfound.component'


export const routes: RouterConfig = [
  { path: '', component: AboutComponent },
  { path: 'schedule', component: RacesComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: '**', component: PageNotFoundComponent }
]

// This seems unnecesary, but must be include in the current version of Angular2.
// Bring providers into app
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
]
