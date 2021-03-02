import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { VerifyPageComponent } from './verify-page/verify-page.component';
import { AuthGuard } from './auth/auth.guard';

/*
  This module is responsible for all the routing within the app.
  The path 'main-app' corresponds to a lazily-loaded route,
  future lazy-loaded components must be declared in this way.
  canActivate expects a "Guard"(a class outlining authorization settings),
  the current guard only prohibits unauthenticated users from accessing 
  those components.
  Routes appear in the browser as:
    https://website.com/{your-route-here}
*/
const routes: Routes = [
  // This is the default route
  { path: '', component: LoginpageComponent },
  { 
    path: 'main-app', 
    loadChildren: () => import('./main-app/main-app.module')
      .then(m => m.MainAppModule),
    canActivate: [AuthGuard],
  },
  { 
    path: 'verify-page', 
    component: VerifyPageComponent,
    canActivate: [AuthGuard]
  },
  // { 
  //   path: 'mailbox', 
  //   loadChildren: () => import('./mailbox/mailbox.module')
  //     .then(m => m.MailboxModule),
  //   canActivate: [AuthGuard],
  // },
  /*
    This is the wildcard route.
    If a user attempts to access a route that doesnt exist
    this will redirect them to a specified route or component.
    Currently set to the defualt route.
    NOTE: Becuase of Nginx settings the default route must also
    be specified in the Nginx configuration on the server.
  */
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
