import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SearchCourseComponent } from './search-course.component';
import { CourseServiceService } from '../service/course-service.service';
import { AuthenticationService } from '../service/auth/authentication.service';
import { courseResponseDTO } from '../CourseResponseDTO';

describe('SearchCourseComponent', () => {
  let component: SearchCourseComponent;
  let fixture: ComponentFixture<SearchCourseComponent>;
  let mockCourseService: jasmine.SpyObj<CourseServiceService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    mockCourseService = jasmine.createSpyObj('CourseServiceService', [
      'findCoursesByCourseName',
      'findCoursesByTechnology',
      'getCoursesByTechnologyAndDuration',
      'deleteCourseByName'
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj('AuthenticationService', ['isUserLoggedIn']);

    await TestBed.configureTestingModule({
      declarations: [SearchCourseComponent],
      providers: [
        { provide: CourseServiceService, useValue: mockCourseService },
        { provide: Router, useValue: mockRouter },
        { provide: AuthenticationService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('findCoursesByCourseName', () => {
    it('should find a course by name and set the course property', () => {
      const mockCourse: courseResponseDTO = { courseName: 'Angular', courseDuration: '25:00:00', courseDescription: 'Angular Course', technology: ['Angular'], launchUrl: 'http://angular.com' };
      mockCourseService.findCoursesByCourseName.and.returnValue(of(mockCourse));

      component.findCoursesByCourseName('Angular');

      expect(component.course).toEqual(mockCourse);
      expect(component.courses.length).toBe(0);
      expect(component.errorMessage).toBe('');
    });

    // it('should handle course not found error', () => {
    //   mockCourseService.findCoursesByCourseName.and.returnValue(throwError(() => new Error('Course not found')));

    //   spyOn(window.location, 'reload');

    //   component.findCoursesByCourseName('Unknown');

    //   expect(window.location.reload).toHaveBeenCalled();
    //   expect(component.course).toBeNull();
    // });
  });

  describe('findCoursesByTechnology', () => {
    it('should find courses by technology and set the courses array', () => {
      const mockCourses: courseResponseDTO[] = [{ courseName: 'Angular', courseDuration: '25:00:00', courseDescription: 'Angular Course', technology: ['Angular'], launchUrl: 'http://angular.com' }];
      mockCourseService.findCoursesByTechnology.and.returnValue(of(mockCourses));

      component.findCoursesByTechnology('Angular');

      expect(component.courses).toEqual(mockCourses);
      expect(component.course).toBeNull();
      expect(component.errorMessage).toBe('');
    });

  //   it('should handle no courses found for technology', () => {
  //     mockCourseService.findCoursesByTechnology.and.returnValue(throwError(() => new Error('No Course found')));

  //     spyOn(window.location, 'reload');

  //     component.findCoursesByTechnology('Unknown');

  //     expect(window.location.reload).toHaveBeenCalled();
  //     // expect(component.courses.length).toBe(0);
  //     // expect(component.course).toBeNull();
  //   });
  });

  describe('getCoursesByTechnologyAndDurationRange', () => {
    it('should find courses by technology and duration range', () => {
      const mockCourses: courseResponseDTO[] = [{ courseName: 'Angular', courseDuration: '25:00:00', courseDescription: 'Angular Course', technology: ['Angular'], launchUrl: 'http://angular.com'}];
      mockCourseService.getCoursesByTechnologyAndDuration.and.returnValue(of(mockCourses));

      component.getCoursesByTechnologyAndDurationRange('Angular', '20', '30');

      expect(component.courses).toEqual(mockCourses);
      expect(component.course).toBeNull();
      expect(component.errorMessage).toBe('');
    });

    // it('should handle no courses found for technology and duration range', () => {
    //   mockCourseService.getCoursesByTechnologyAndDuration.and.returnValue(throwError(() => new Error('No Course found')));

    //   spyOn(window.location, 'reload');

    //   component.getCoursesByTechnologyAndDurationRange('Unknown', '10', '20');

    //   expect(window.location.reload).toHaveBeenCalled();
    //   expect(component.courses.length).toBe(0);
    //   expect(component.course).toBeNull();
    // });
  });

  describe('deleteCourse', () => {
    it('should delete a course and navigate to get-all-courses', () => {
      mockCourseService.deleteCourseByName.and.returnValue(of('Course deleted'));

      component.deleteCourse('Java');

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/lms/get-all-courses']);
      expect(mockCourseService.deleteCourseByName).toHaveBeenCalledWith('Java');
    });

    it('should handle error when deleting a course', () => {
      mockCourseService.deleteCourseByName.and.returnValue(throwError(() => new Error('Error while deleting course')));

      spyOn(window, 'alert');

      component.deleteCourse('Unknown');

      expect(window.alert).toHaveBeenCalledWith('Error while deleting course');
    });
  });
});
