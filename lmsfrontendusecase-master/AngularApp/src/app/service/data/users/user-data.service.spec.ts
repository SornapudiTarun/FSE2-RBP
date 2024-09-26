import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserDataService, Users } from './user-data.service';
import { UserLogin } from 'src/app/UserLogin';
import { TokenResponse } from 'src/app/TokenResponse';
import { LoginDetails } from 'src/app/login-details';

describe('UserDataService', () => {
  let service: UserDataService;
  let httpMock : HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[UserDataService]
    });
    service = TestBed.inject(UserDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user via POST request', () => {
    const mockUser: Users = new Users('JohnDoe', 'john@example.com', 'password123');
    
    service.register(mockUser).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.url}/api/v1.0/lms/auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush({ success: true });
  });

  it('should authenticate a user via POST request', () => {
    const mockUser: UserLogin = {
      email: 'john@example.com',
      password: 'password123'
    };

    const mockResponse: LoginDetails = {
      email: 'john@example.com',
      jwt: 'mock-jwt-token'
    };

    service.authenticateUser(mockUser).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.url}/api/v1.0/lms/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockResponse);
  });

});
