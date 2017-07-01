import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import {AppRoutingModule} from './app-routing.module';

import {MemberModule} from './member/member.module';


import { AppComponent }  from './app.component';
import { NotFoundComponent }  from './not-found.component';
import { SignInComponent } from './signIn/sign-in.component';

// import {AuthService} from './services/auth.service'
import { AuthService } from './services/mock_auth.service';


@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  MemberModule,
                  AppRoutingModule,
                  HttpModule
                   ],
  declarations: [ AppComponent,
                  NotFoundComponent,
                  SignInComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ AuthService ]
})
export class AppModule { }
