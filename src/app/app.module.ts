import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartComponent } from './cart/cart.component';
import { SelectPageComponent } from './select-page/select-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DemoNgZorroAntdModule } from './ng-antd.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import en from '@angular/common/locales/en';


registerLocaleData(en);

/** config ng-zorro-antd i18n **/
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { VendorDashboardModuleModule } from './vendor-dashboard-module/vendor-dashboard-module.module';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { NgxMarqueeModule } from 'ngx-marquee';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CartComponent,
    SelectPageComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule,
 
    NgxMarqueeModule,
    AppRoutingModule,

    RouterModule,
    
  
    InfiniteScrollModule,
 
    SocialLoginModule,
    VendorDashboardModuleModule,
  
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '273754596045-n5845ueadab9k5kutuq24emu7kb9leku.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err:any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }

      
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
