import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorDashboardModuleRoutingModule } from './vendor-dashboard-module-routing.module';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { PersonalProfileComponent } from './personal-profile/personal-profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdsStatisticsComponent } from './ads-statistics/ads-statistics.component';
import { SellBlocksComponent } from './sell-blocks/sell-blocks.component';
import { RaiseConcernComponent } from './raise-concern/raise-concern.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../ng-antd.module';
import { UpdatePassComponent } from '../update-pass/update-pass.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    VendorProfileComponent,
    SidebarComponent,
    BusinessProfileComponent,
    PersonalProfileComponent,
    OrderHistoryComponent,
    AdsStatisticsComponent,
    SellBlocksComponent,
    RaiseConcernComponent,
    DashboardComponent,
    UpdatePassComponent
  ],
  imports: [
    CommonModule,
    VendorDashboardModuleRoutingModule,
    NgChartsModule,
    FormsModule,
    DemoNgZorroAntdModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_KEY
    })
  ]
})
export class VendorDashboardModuleModule { }
