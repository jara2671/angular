import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout-full/layout.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { AuthGuard } from './interceptors/auth.guard';
import { AuthenticateComponent } from './authentication/authenticate/authenticate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePermitComponent } from './pages/permit/create-permit/create-permit.component';
import { MyPermitsComponent } from './pages/permit/my-permits/my-permits.component';
import { ViewUsersComponent } from './pages/permit/view-users/view-users.component';
import { PendingPermitsComponent } from './pages/approval/pending-permits/pending-permits.component';
import { PendingClosureComponent } from './pages/approval/pending-closure/pending-closure.component';
import { AllPermitsComponent } from './pages/permit/all-permits/all-permits.component';
import { PermitDetailsComponent } from './pages/permit/permit-details/permit-details.component';
import { CreateApplicationRequestComponent } from './pages/Applications/create-application-request/create-application-request.component';


const routes: Routes = [
  { path: "", component: AuthenticateComponent },
  { path: "forgotPassword", component: ForgotPasswordComponent },
  { path: "resetPassword", component: ResetPasswordComponent },
  {
    path: "home",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent},
      { path: "create-application-request", component: CreateApplicationRequestComponent},
      { path: "my-permits", component: MyPermitsComponent},
      { path: "view-users", component: ViewUsersComponent },
      { path: "pending-permits", component: PendingPermitsComponent },
      { path: "pending-closure", component: PendingClosureComponent },
      { path: "all-permits", component: AllPermitsComponent},
      { path: "permit-details", component: PermitDetailsComponent},


    ]
  },
  { path: "**", redirectTo: "/home", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

