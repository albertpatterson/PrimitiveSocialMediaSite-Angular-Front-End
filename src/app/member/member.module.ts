import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'

import {MemberRoutingModule} from './member-routing.module';

import {MemberComponent} from './member.component';
import {HomeComponent} from './home/home.component';
import {MessagesComponent} from './messages/messages.component';
import {OtherComponent} from './other/other.component';
import {SearchComponent} from './search/search.component';
import {PremiumComponent} from './premium/premium.component';


import {AuthService} from './../services/auth.service'
import {MessageService} from './services/message.service';
import {PostService} from './services/post.service';
import {SearchService} from './services/search.service';
import {PremiumService} from './services/premium.service';


@NgModule({
    imports: [  MemberRoutingModule,
                CommonModule,
                FormsModule],

    declarations: [ MemberComponent, 
                    HomeComponent,
                    MessagesComponent,
                    OtherComponent,
                    SearchComponent,
                    PremiumComponent],

    providers: [    AuthService,
                    MessageService, 
                    PostService,
                    SearchService,
                    PremiumService]
})
export class MemberModule {};