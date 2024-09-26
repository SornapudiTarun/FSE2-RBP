import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../service/auth/authentication.service';
import { UserDataService } from '../service/data/users/user-data.service';
import { TokenResponse } from '../TokenResponse';
import { LoginDetails } from '../login-details';
import { UserLogin } from '../UserLogin';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockUserDataService: any;
  let mockRouter: any;
  let mockAuthService: any;


  beforeEach(async () => {

    mockUserDataService = jasmine.createSpyObj('UserDataService', ['authenticateUser', 'validateToken']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj('AuthenticationService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: UserDataService, useValue: mockUserDataService },
        { provide: Router, useValue: mockRouter },
        { provide: AuthenticationService, useValue: mockAuthService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful login and navigate to courses', () => {
    // Mock login details
    const loginDetails: LoginDetails = {
      email: 'test@test.com',
      jwt: 'mock-token',
    };

    // Mock token response
    const tokenResponse: TokenResponse = {
      emailId: 'test@test.com',
      role: ['ROLE_USER'],
      isTokenValid: true,
      isExpired: false,
    };

    // Simulate a successful user authentication
    mockUserDataService.authenticateUser.and.returnValue(of(loginDetails));

    // Simulate successful token validation
    mockUserDataService.validateToken.and.returnValue(of(tokenResponse));

    // Set input values
    component.loginId = 'test@test.com';
    component.password = 'password123';

    // Call the handleLogin method
    component.handleLogin();

    // Expectations
    expect(mockUserDataService.authenticateUser).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password123' });
    expect(sessionStorage.getItem('token')).toBe('mock-token');
    expect(sessionStorage.getItem('authenticatedUser')).toBe('test@test.com');
    expect(mockUserDataService.validateToken).toHaveBeenCalledWith('mock-token');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['lms/get-all-courses']);
  });


  

});
