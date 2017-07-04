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
import {MessageFormComponent} from './utils/messageForm/message-form.component';
import {PostComponent} from './utils/post/post.component';



import {AuthService} from './../services/auth.service'
import {MessageService} from './services/message.service';
import {PostService} from './services/post.service';
import {PersonalDataService} from './services/personal-data.service';
import {PremiumService} from './services/premium.service';
import {SubscriptionService} from './services/subscription.service';

// import {AuthService} from './../services/mock_auth.service'
// import {MessageService} from './services/mock_message.service';
// import {PostService} from './services/mock_post.service';
// import {SearchService} from './services/mock_search.service';
// import {PremiumService} from './services/mock_premium.service';


@NgModule({
    imports: [  MemberRoutingModule,
                CommonModule,
                FormsModule],

    declarations: [ MemberComponent, 
                    HomeComponent,
                    MessagesComponent,
                    OtherComponent,
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