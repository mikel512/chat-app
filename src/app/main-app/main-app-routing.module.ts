import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainAppComponent } from './main-app.component';

/*
  This is an example of the default routing for a
  lazy-loaded module. Additional routes can be added in within this
  module(as children routes). They will show up in the browser as:
    https://website.com/main-app/{your-route-here}
*/
const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }