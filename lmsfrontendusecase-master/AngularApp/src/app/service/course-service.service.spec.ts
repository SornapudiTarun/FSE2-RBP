import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseServiceService } from './course-service.service';
import { CourseDTO } from '../CourseDTO';
import { courseResponseDTO } from '../CourseResponseDTO';
import { HttpHeaders } from '@angular/common/http';


describe('CourseServiceService', () => {
  let service: CourseServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],      providers:[
        CourseServiceService,
      ]
    });

    service = TestBed.inject(CourseServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all courses', () => {
    const mockCourses: courseResponseDTO[] = [
      { courseName: 'Java', courseDuration: '30:00:00', courseDescription: 'Java Course', technology: 'Java', launchUrl: 'http://java.com' },
      { courseName: 'Angular', courseDuration: '25:00:00', courseDescription: 'Angular Course', technology: 'Angular', launchUrl: 'http://angular.com' }
    ];

    service.getAllCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(service.url + '/api/v1.0/lms/courses/get-all-course');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should find courses by course name', () => {
    const mockCourse: courseResponseDTO = {
      courseName: 'Java',
      courseDuration: '30:00:00',
      courseDescription: 'Java Course',
      technology: 'Java',
      launchUrl: 'http://java.com/example'
    };

    service.findCoursesByCourseName('Java').subscribe(course => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(service.url + '/api/v1.0/lms/courses/find-courses-name/Java');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });

  it('should find courses by technology', () => {
    const mockCourses: courseResponseDTO[] = [
      { courseName: 'Angular', courseDuration: '25:00:00', courseDescription: 'Angular Course', technology: 'Angular', launchUrl: 'http://angular.com' }
    ];

    service.findCoursesByTechnology('Angular').subscribe(courses => {
      expect(courses.length).toBe(1);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(service.url + '/api/v1.0/lms/courses/find-courses-tech/Angular');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should get courses by technology and duration range', () => {
    const mockCourses: courseResponseDTO[] = [
      { courseName: 'Java', courseDuration: '30:00:00', courseDescription: 'Java Course', technology: 'Java', launchUrl: 'http://java.com' }
    ];

    service.getCoursesByTechnologyAndDuration('Java', '10:00:00', '40:00:00').subscribe(courses => {
      expect(courses.length).toBe(1);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(service.url + '/api/v1.0/lms/courses/get/Java/10:00:00/40:00:00');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should delete a course by name', () => {
    service.deleteCourseByName('Java').subscribe(response => {
      expect(response).toBe('Course deleted successfully');
    });

    const req = httpMock.expectOne(service.url + '/api/v1.0/lms/courses/delete-course/Java');
    expect(req.request.method).toBe('DELETE');
    req.flush('Course deleted successfully');
  });

  it('should add a course', () => {
    const newCourse: CourseDTO = {
      courseName: 'React',
      courseDuration: '20:00:00',
      courseDescription: 'React Course',
      technology: 'React',
      launchUrl: 'http://react.com'
    };

    service.addCourse(newCourse).subscribe(response => {
      expect(response).toBe('Course added successfully');
    });

    const req = httpMock.expectOne(service.url + '/api/v1.0/lms/courses/add-course');
    expect(req.request.method).toBe('POST');
    req.flush('Course added successfully');
  });
  
});
