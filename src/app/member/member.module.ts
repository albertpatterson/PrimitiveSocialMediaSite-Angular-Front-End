import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'

import {MemberComponent} from './member.component';
import {HomeComponent} from './home/home.component';
import {MessagesComponent} from './messages/messages.component';
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {PremiumComponent} from './premium/premium.component';
import {MessageFormComponent} from './utils/messageForm/message-form.component';
import {PostComponent} from './utils/post/post.component';

import {AuthService} from './../services/auth.service'
import {MessageService} from './services/message.service';
import {PostService} from './services/post.service';
import {PersonalDataService} from './services/personal-data.service';
import {PremiumService} from './services/premium.service';
import {SubscriptionService} from './services/subscription.service';

import { TooltipModule } from '../tooltip/tooltip.module'


@NgModule({
    imports: [  CommonModule,
                FormsModule,
                TooltipModule],

    declarations: [ MemberComponent, 
                    HomeComponent,
                    MessagesComponent,
                    ProfileComponent,
                    SearchComponent,
                    PremiumComponent,
                    MessageFormComponent, 
                    PostComponent],

    providers: [    AuthService,
                    MessageService, 
                    PostService,
                    PersonalDataService,
                    PremiumService,
                    SubscriptionService]
})
export class MemberModule {};