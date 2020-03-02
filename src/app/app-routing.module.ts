import { ServerResolver } from './servers/server/server-resolver.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ]},
  {path: 'servers',
  //  canActivate: [AuthGuard],
   canActivateChild: [AuthGuard],
   component: ServersComponent,
   children: [
    {path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
    {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
  ]},
  // {path: 'not-found', component: NotFoundComponent},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    // tslint:disable-next-line:max-line-length
    // What this hashtag will do is, it informs your web server, hey only care about the part in this URL before this hashtag, so all the parts thereafter will be ignored by your web server. Therefore this will run even on servers which don't return the index.html file in case of 404 errors because they will only care about the part in front of the hashtag. That's how it works by default and the part after the hashtag can now be parsed by your client, by Angular.
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  // tslint:disable-next-line:max-line-length
  // Exports simply tells Angular, hey from this module, if I were to add this module to the imports of another module, what should be accessible to this module which imports this module? And the one thing we want to make accessible is our router module.
  exports: [RouterModule]
})

export class AppRoutingModule {
}
