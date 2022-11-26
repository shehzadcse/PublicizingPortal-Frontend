import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePassComponent } from '../update-pass/update-pass.component';
import { AdsStatisticsComponent } from './ads-statistics/ads-statistics.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PersonalProfileComponent } from './personal-profile/personal-profile.component';
import { RaiseConcernComponent } from './raise-concern/raise-concern.component';
import { SellBlocksComponent } from './sell-blocks/sell-blocks.component';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';

const routes: Routes = [
  {
    path: '',
    component: VendorProfileComponent,
    children: [ {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'business-profile',
      component: BusinessProfileComponent
    },
    
    {
      path: 'personal-profile',
      component: PersonalProfileComponent
    },
    {
      path: 'ads-statistics',
      component: AdsStatisticsComponent
    },
     
    {
      path: 'raise-concern',
      component: RaiseConcernComponent
    },
    {
      path: 'sell-blocks',
      component: SellBlocksComponent
    },
    {
      path:"update-password",
      component:UpdatePassComponent
    },
    {
      path: 'order-history',
      component: OrderHistoryComponent
    },]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDashboardModuleRoutingModule { }
