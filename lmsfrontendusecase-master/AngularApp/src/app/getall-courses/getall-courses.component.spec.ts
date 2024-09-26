import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallCoursesComponent } from './getall-courses.component';
import { CourseServiceService } from '../service/course-service.service';
import { AuthenticationService } from '../service/auth/authentication.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { courseResponseDTO } from '../CourseResponseDTO';
import { of,throwError } from 'rxjs';


describe('GetallCoursesComponent', () => {
  let component: GetallCoursesComponent;
  let fixture: ComponentFixture<GetallCoursesComponent>;
  let mockCourseService : jasmine.SpyObj<CourseServiceService>;
  let mockRouter : jasmine.SpyObj<Router>;
  let mockAuthenticationService : jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    mockCourseService = jasmine.createSpyObj('CourseServiceService',['getAllCourses','deleteCourseByName']);
    mockRouter = jasmine.createSpyObj('Router',['navigate']);
    mockAuthenticationService = jasmine.createSpyObj('AuthenticationService',['isAuthenticated']);
    await TestBed.configureTestingModule({
      declarations: [ GetallCoursesComponent ],
      providers:[
        {provide:CourseServiceService,useValue:mockCourseService},
        {provide:Router,useValue:mockRouter},
        {provide:AuthenticationService,useValue:mockAuthenticationService}
      ]


    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetallCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should fetch all courses on initialization',()=>{
    const mockCourses : courseResponseDTO[]=[
      {courseName:'course 1',courseDuration:'10:00:00',courseDescription:'Description 1',technology:'Tech1',launchUrl:'http://example.com/1'},
      {courseName:'course 2',courseDuration:'20:00:00',courseDescription:'Description 2',technology:'Tech2',launchUrl:'http://example.com/2'},
    ];
    mockCourseService.getAllCourses.and.returnValue(of(mockCourses));
    component.ngOnInit();
    expect(component.courses).toEqual(mockCourses);
    expect(mockCourseService.getAllCourses).toHaveBeenCalled();
  });


  it('should handle error when fetching courses fails ',()=>{
    spyOn(console,'error');
    mockCourseService.getAllCourses.and.returnValue(throwError('Error fetching courses'));
    component.ngOnInit();
    expect(component.courses).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error fetching courses','Error fetching courses');
  });

  it('should call delete course on courseService when deleteCourse is invoked',()=>{
    spyOn(window.location,'reload');
    mockCourseService.deleteCourseByName.and.returnValue(of('Course deleted successfully'));
    component.deleteCourse('course 1');
    expect(mockCourseService.deleteCourseByName).toHaveBeenCalledWith('Course 1');
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should handle error when deleting a course fails',()=>{
    spyOn(window,'alert');
    mockCourseService.deleteCourseByName.and.returnValue(throwError('Error while deleting course'));
    component.deleteCourse('course1');
    expect(window.alert).toHaveBeenCalledWith('Error while deleting course');
  });



});
