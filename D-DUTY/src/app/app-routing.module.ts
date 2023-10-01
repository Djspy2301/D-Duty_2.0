import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminAuthGuard } from './guard/admin-guard.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { AdminDashboardComponent } from './admin-layout/admin-dashboard/admin-dashboard.component';
import { AddStaffComponent } from './admin-layout/add-staff/add-staff.component';
import { UserDashboardComponent } from './user-layout/user-dashboard/user-dashboard.component';
import { UserAuthGuard } from './guard/user-guard.guard';
import { NoPageComponent } from './no-page/no-page.component';
import { StaffComponent } from './admin-layout/staff/staff.component';
import { TimeScheduleComponent } from './admin-layout/time-schedule/time-schedule.component';
import { StaffScheduleComponent } from './admin-layout/staff-schedule/staff-schedule.component';
import { DutyComponent } from './user-layout/duty/duty.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin/:id',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'add-staff',
        component: AddStaffComponent,
      },
      {
        path: 'staff',
        component: StaffComponent,
      },
      { path: 'time-schedule', component: TimeScheduleComponent },
      { path: 'staff-schedule', component: StaffScheduleComponent },
      { path: 'profile', component: ProfileComponent },
    ],
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'user/:id',
    component: UserLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: UserDashboardComponent,
      },
      {
        path: 'duty',
        component: DutyComponent,
      },
      { path: 'profile', component: ProfileComponent },
    ],
    canActivate: [UserAuthGuard],
  },
  { path: '**', component: NoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
