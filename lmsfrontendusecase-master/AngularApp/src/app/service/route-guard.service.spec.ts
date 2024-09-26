import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouteGuardService } from './route-guard.service';
import { AuthenticationService } from './auth/authentication.service';
import { of } from 'rxjs';


describe('RouteGuardService', () => {
  
  let service: RouteGuardService;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthenticationService: jasmine.SpyObj<AuthenticationService>;


  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthenticationService = jasmine.createSpyObj('AuthenticationService', ['isUserLoggedIn']);

    TestBed.configureTestingModule({
      providers: [
        RouteGuardService,
        { provide: Router, useValue: mockRouter },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
      ],
    });

    service = TestBed.inject(RouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow route activation if the user is logged in', () => {
    mockAuthenticationService.isUserLoggedIn.and.returnValue(true);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = service.canActivate(route, state);

    expect(result).toBeTrue();
    expect(mockAuthenticationService.isUserLoggedIn).toHaveBeenCalled();
  });

  it('should block route activation and navigate to error page if the user is not logged in', () => {
    mockAuthenticationService.isUserLoggedIn.and.returnValue(false);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = service.canActivate(route, state);

    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['lms/error']);
    expect(mockAuthenticationService.isUserLoggedIn).toHaveBeenCalled();
  });
});
