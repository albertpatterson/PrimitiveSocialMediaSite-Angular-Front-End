import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {MemberComponent} from './member.component';
import {HomeComponent} from './home/home.component';
import {MessagesComponent} from './messages/messages.component';
import {OtherComponent} from './other/other.component';
import {SearchComponent} from './search/search.component';
import {PremiumComponent} from './premium/premium.component';


const routes: Routes = [
    {   path: 'member',
        component: MemberComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'other', component: OtherComponent},
            {path: 'messages', component: MessagesComponent},
            {path: 'search/:pattern', component: SearchComponent},
            {path: 'premium', component: PremiumComponent}
        ]}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberRoutingModule {};