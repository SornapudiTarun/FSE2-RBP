import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of,throwError } from 'rxjs';
import { UserDataService,Users } from '../service/data/users/user-data.service';

import { RegisterComponent } from './register.component';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockUserDataService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockUserDataService = jasmine.createSpyObj('UserDataService',['register']);
    mockRouter = jasmine.createSpyObj('Router',['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: UserDataService, useValue: mockUserDataService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call register() on UserDataService when register() is called', () => {
    const mockUser = new Users('testuser', 'test@test.com', 'password123');
    mockUserDataService.register.and.returnValue(of(mockUser));

    // Set form input values
    component.userName = 'testuser';
    component.email = 'test@test.com';
    component.password = 'password123';

    // Call the register method
    component.register();

    expect(mockUserDataService.register).toHaveBeenCalledWith(new Users('testuser', 'test@test.com', 'password123'));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['lms/login']);
  });

  it('should handle error when registration fails', () => {
    // Simulate an error response
    mockUserDataService.register.and.returnValue(throwError({ status: 400 }));

    // Call the register method
    component.register();

    expect(component.errorBool).toBeTrue();
  });

});
