import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin-layout/admin-header/admin-header.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserHeaderComponent } from './user-layout/user-header/user-header.component';
import { UserDashboardComponent } from './user-layout/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-layout/admin-dashboard/admin-dashboard.component';
import { AddStaffComponent } from './admin-layout/add-staff/add-staff.component';
import { StaffComponent } from './admin-layout/staff/staff.component';
import { TimeScheduleComponent } from './admin-layout/time-schedule/time-schedule.component';
import { CtsPopupComponent } from './admin-layout/time-schedule/cts-popup/cts-popup.component';
import { StaffScheduleComponent } from './admin-layout/staff-schedule/staff-schedule.component';
import { SsPopupComponent } from './admin-layout/staff-schedule/ss-popup/ss-popup.component';
import { SchedulingStaffComponent } from './admin-layout/staff-schedule/scheduling-staff/scheduling-staff.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    AddStaffComponent,
    StaffComponent,
    TimeScheduleComponent,
    CtsPopupComponent,
    StaffScheduleComponent,
    SsPopupComponent,
    SchedulingStaffComponent,
    UserLayoutComponent,
    UserHeaderComponent,
    UserDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
