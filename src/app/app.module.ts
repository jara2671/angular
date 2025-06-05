import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
// Duplicate import removed
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateComponent } from './authentication/authenticate/authenticate.component';
import { LayoutComponent } from './layout/layout-full/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
// Duplicate import removed
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CreatePermitComponent } from './pages/permit/create-permit/create-permit.component';
import { MyPermitsComponent } from './pages/permit/my-permits/my-permits.component';
import { ViewUsersComponent } from './pages/permit/view-users/view-users.component';
import { AssignRolesComponent } from './pages/Roles/assign-roles/assign-roles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PendingPermitsComponent } from './pages/approval/pending-permits/pending-permits.component';
import { ApproveRejectDialogComponent } from './pages/approval/approve-reject-dialog/approve-reject-dialog.component';
import { PermitDetailsDialogComponent } from './pages/approval/permit-details-dialog/permit-details-dialog.component';
import { PendingClosureComponent } from './pages/approval/pending-closure/pending-closure.component';
import { ClosePermitDialogComponent } from './pages/approval/close-permit-dialog/close-permit-dialog.component';
import { AllPermitsComponent } from './pages/permit/all-permits/all-permits.component';
import { PermitDetailsComponent } from './pages/permit/permit-details/permit-details.component';
import { CreateApplicationRequestComponent } from './pages/Applications/create-application-request/create-application-request.component';

 


@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    CreatePermitComponent,
    MyPermitsComponent,
    ViewUsersComponent,
    AssignRolesComponent,
    PendingPermitsComponent,
    ApproveRejectDialogComponent,
    PermitDetailsDialogComponent,
    PendingClosureComponent,
    ClosePermitDialogComponent,
    AllPermitsComponent,
    PermitDetailsComponent,
    CreateApplicationRequestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule,
    MatRadioModule, 
    MatIconModule, 
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    FlexLayoutModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    LoadingBarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule,
    NgxMatSelectSearchModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }