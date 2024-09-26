import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseDTO } from '../CourseDTO';
import { CourseServiceService } from '../service/course-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/auth/authentication.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

    course:CourseDTO= new CourseDTO();
    message=''
    courseResponse:string | undefined;
    
  
    constructor(private router: Router,private courseService:CourseServiceService,public authenticationService: AuthenticationService,private route:ActivatedRoute) { }

    ngOnInit(): void {
      
    }

    

    trackByIndex(index:number,item:any):number{
      return index;
    }
    
 
    
    onSubmit(courseForm:NgForm):void{
      if(courseForm.valid){
        console.log('course',this.course);
        this.courseService.addCourse(this.course).subscribe((response:string)=>{
          console.log(response);
          this.courseResponse=response;
          this.router.navigate(['/lms/get-all-courses'])
         
        },error=>{
          console.log(error);
          alert("Error occured while adding course!!");
        });
      }    
    }

  
}
