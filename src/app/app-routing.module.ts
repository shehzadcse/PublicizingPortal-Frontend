import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SelectPageComponent } from './select-page/select-page.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'create-ads',
    component: SelectPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
  },
  {
    path: 'vendor-profile',
    loadChildren: () => import('./vendor-dashboard-module/vendor-dashboard-module.module').then(m => m.VendorDashboardModuleModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
