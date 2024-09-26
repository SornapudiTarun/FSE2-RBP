import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseComponent } from './add-course.component';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseServiceService } from '../service/course-service.service';
import { of,throwError } from 'rxjs';
import { AuthenticationService } from '../service/auth/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { CourseDTO } from '../CourseDTO';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let mockCourseService: jasmine.SpyObj<CourseServiceService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthenticationService:jasmine.SpyObj<AuthenticationService>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async () => {
    mockCourseService = jasmine.createSpyObj('CourseServiceService',['addCourse']);
    mockRouter = jasmine.createSpyObj('Router',['navigate']);
    mockAuthenticationService = jasmine.createSpyObj('AuthenticationService',['isAuthenticated']);
    mockActivatedRoute = {} as ActivatedRoute;

    await TestBed.configureTestingModule({
      declarations: [ AddCourseComponent ],
      imports: [ReactiveFormsModule,FormsModule,RouterTestingModule],
      providers: [
        {provide: CourseServiceService,useValue:mockCourseService},
        {provide: Router, useValue:mockRouter},
        {provide: AuthenticationService, useValue: mockAuthenticationService},
        {provide: ActivatedRoute, useValue:mockActivatedRoute}
      
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it('should call addCourse method on the service when form is valid',()=>{
    const  mockForm = {valid:true} as NgForm;
    component.course={
      courseName:'Test Course',
      courseDuration:'10:00:00',
      courseDescription:'A test course',
      technology:['Angular'],
      launchUrl:'http://example.com'
    };
    mockCourseService.addCourse.and.returnValue(of('Course added successfully'));
    component.onSubmit(mockForm);
    expect(mockCourseService.addCourse).toHaveBeenCalledWith(component.course);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/lms/get-all-courses']);

  });

  it('should not call addCourse if form is invalid', () => {
    const mockForm = {valid:false} as NgForm;
    component.onSubmit(mockForm);
    expect(mockCourseService.addCourse).not.toHaveBeenCalled();
  });

  it('should initialize with default values',()=>{
    expect(component.course).toEqual(new CourseDTO());
    expect(component.technologies).toEqual(['']);
    expect(component.message).toBe('');
  });

  it('should add technology to the technology array',()=>{
    component.addTechnology();
    expect(component.technologies.length).toBe(2);
  });

  it('should remove a technology to the technologies array',()=>{
    component.addTechnology();
    component.removeTechnology(1);
    expect(component.technologies.length).toBe(1);
  });

  it('should handle error if addCourse fails',()=>{
    const mockForm ={valid:true} as NgForm;
    spyOn(window,'alert');
    mockCourseService.addCourse.and.returnValue(throwError('Error occured'));
    component.onSubmit(mockForm);
    expect(window.alert).toHaveBeenCalledWith('Error occured while adding course!!');
  });
  



});
