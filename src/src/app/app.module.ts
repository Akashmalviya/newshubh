import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { ChartsModule } from 'ng2-charts';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CancelorderComponent } from './_modal/cancelorder/cancelorder.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './front/site-layout/site-layout.component';
import { SiteHeaderComponent } from './front/site-header/site-header.component';
import { SiteFooterComponent } from './front/site-footer/site-footer.component';
import { HomeComponent } from './front/home/home.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserHeaderComponent } from './user/user-header/user-header.component';
import {MatStepperModule} from '@angular/material/stepper';
import { UserSidebarComponent } from './user/user-sidebar/user-sidebar.component';
import { UserFooterComponent } from './user/user-footer/user-footer.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { UserLoginComponent } from './user/user-auth/user-login/user-login.component';
import { UserSignupComponent } from './user/user-auth/user-signup/user-signup.component';
import { MyOrdersComponent } from './user/orders/my-orders/my-orders.component';
// import { NewOrderComponent } from './user/orders/new-order/new-order.component';
import { NewOrderComponent } from './user/orders/new-order/new-order.component';
import { AccountComponent } from './user/account/account.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddressBookComponent } from './user/address-book/address-book.component';
import { OrderDetailsComponent } from './user/orders/order-details/order-details.component';
import { InvoicesComponent } from './user/invoices/invoices.component';
import { SettingsComponent } from './user/settings/settings.component';
import { ReturnOrderComponent } from './user/orders/return-order/return-order.component';
import { TripSupportComponent } from './user/orders/trip-support/trip-support.component';
import { AlertComponent } from './_components/alert/alert.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AlertService } from './_services/alert.service';
import { AuthGuard } from './_helpers/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { TokenService } from './_helpers/token.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './user/user-auth/user-login/forgot-password/forgot-password.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { P404Component } from './p404/p404.component';
import { PaymentGateComponent } from './payment-gate/payment-gate.component';
import { MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AgmCoreModule } from '@agm/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { PaymentStepsComponent } from './user/payment-steps/payment-steps.component';
import { SuborderlistComponent } from './_modal/suborderlist/suborderlist.component';
import { OrderTableComponent } from './user/orders/order-table/order-table.component';
import { StatusModalComponent } from './_modal/status-modal/status-modal.component';
;
import { NotificationModelComponent } from './_modal/notification-model/notification-model.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DeleteAddressComponent } from './_modal/delete-address/delete-address.component';



@NgModule({
  declarations: [
    AppComponent,
    PaymentStepsComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    SiteLayoutComponent,
    HomeComponent,
    UserLayoutComponent,
    UserHeaderComponent,
    UserSidebarComponent,
    UserFooterComponent,
    DashboardComponent,
    UserLoginComponent,
    UserSignupComponent,
    MyOrdersComponent,
    NewOrderComponent,
    AccountComponent,
    AddressBookComponent,
    OrderDetailsComponent,
    InvoicesComponent,
    SettingsComponent,
    ReturnOrderComponent,
    TripSupportComponent,

    AlertComponent,

    ForgotPasswordComponent,
    P404Component,
    PaymentGateComponent,
    CancelorderComponent,
    SuborderlistComponent,
    OrderTableComponent,
    StatusModalComponent,
    NotificationModelComponent,
    DeleteAddressComponent,




  ],
  imports: [
    ChartsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatDividerModule,
    HttpClientModule ,
    BrowserModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatRadioModule,
    GooglePlaceModule,
    MatStepperModule,
    AppRoutingModule,
    MatTooltipModule,
    FormsModule,

    MatInputModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatBadgeModule,
    ImageCropperModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule
  ],
  entryComponents: [CancelorderComponent , SuborderlistComponent,StatusModalComponent,NotificationModelComponent, DeleteAddressComponent] ,
  providers: [AlertService,AuthGuard,AuthenticationService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
