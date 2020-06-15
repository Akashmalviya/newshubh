import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './front/site-layout/site-layout.component';
import { HomeComponent } from './front/home/home.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { UserLoginComponent } from './user/user-auth/user-login/user-login.component';
import { UserSignupComponent } from './user/user-auth/user-signup/user-signup.component';
import { MyOrdersComponent } from './user/orders/my-orders/my-orders.component';
import { NewOrderComponent } from './user/orders/new-order/new-order.component';
import { AccountComponent } from './user/account/account.component';
import { AddressBookComponent } from './user/address-book/address-book.component';
import { OrderDetailsComponent } from './user/orders/order-details/order-details.component';
import { InvoicesComponent } from './user/invoices/invoices.component';
import { SettingsComponent } from './user/settings/settings.component';
import { ReturnOrderComponent } from './user/orders/return-order/return-order.component';
import { TripSupportComponent } from './user/orders/trip-support/trip-support.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ForgotPasswordComponent } from './user/user-auth/user-login/forgot-password/forgot-password.component';
import { P404Component } from './p404/p404.component';
import { PaymentStepsComponent } from './user/payment-steps/payment-steps.component';
import { EmailverificationComponent } from './user/user-auth/emailverification/emailverification.component';

const routes: Routes = [
  // Site
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
    ]
  },
  // User
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user', redirectTo: 'user/dashboard', pathMatch: 'full'},
      { path: 'user/dashboard', component: DashboardComponent },
      { path: 'user/account', component: AccountComponent },
      { path: 'user/address-book', component: AddressBookComponent },
      { path: 'user/invoices', component: InvoicesComponent },
      { path: 'user/settings', component: SettingsComponent },
      { path: 'user/orders', component: MyOrdersComponent },
      { path: 'user/orders/new-order', component: NewOrderComponent },
      { path: 'user/orders/details/:id', component: OrderDetailsComponent },
      { path: 'user/invoices/invoicesDetails/:id', component: OrderDetailsComponent },
      { path: 'user/orders/return-order/:id', component: ReturnOrderComponent },
      { path: 'user/orders/trip-support', component: TripSupportComponent },
      { path: 'user/dashboard/details/:id', component: OrderDetailsComponent },
      { path: 'user/payment-steps', component: PaymentStepsComponent }
    ]
  },
  // tslint:disable-next-line: max-line-length
  { path: 'user/login', component: UserLoginComponent,
      children: [
  ]
    },
    {path: 'user/login/forgot-password' , component : ForgotPasswordComponent},

    {path: 'user/verifyEmail' , component : EmailverificationComponent},

  { path: 'user/signup', component: UserSignupComponent },
  // otherwise redirect to home
  { path: '**', redirectTo : ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
