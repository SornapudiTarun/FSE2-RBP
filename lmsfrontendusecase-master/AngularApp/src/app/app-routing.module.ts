import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuardService } from './service/route-guard.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { GetallCoursesComponent } from './getall-courses/getall-courses.component';
import { SearchCourseComponent } from './search-course/search-course.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lms/login', component: LoginComponent },
  { path: 'lms/register', component: RegisterComponent },
  { path: 'lms/addCourse',component:AddCourseComponent},
  { path: 'lms/:loginId/course-search',component:SearchCourseComponent,canActivate:[RouteGuardService]},
  { path: 'lms/get-all-courses', component: GetallCoursesComponent, canActivate:[RouteGuardService] },
  { path: 'lms/logout', component: LogoutComponent, canActivate:[RouteGuardService] },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
