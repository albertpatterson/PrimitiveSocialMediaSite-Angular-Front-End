import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

// import {SignInComponent} from './signIn/sign-in.component';
import { LogInComponent } from './logIn/log-in.component';
import { NotFoundComponent } from './not-found.component';


const routes: Routes = [
    {path: 'sign-in', component: LogInComponent},
    {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
    { path: '**', component: NotFoundComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {};