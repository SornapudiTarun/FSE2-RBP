import { Component, OnInit } from '@angular/core';
import { courseResponseDTO } from '../CourseResponseDTO';
import { Router } from '@angular/router';
import { CourseServiceService } from '../service/course-service.service';
import { AuthenticationService } from '../service/auth/authentication.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit {
  courses:courseResponseDTO[]=[];
  course:courseResponseDTO|null=null;
  errorMessage:string='';

  

  constructor(private router:Router,private courseService:CourseServiceService,public authenticationService: AuthenticationService ) { }

  ngOnInit(): void {
  }


  findCoursesByCourseName(courseName:string):void{
    this.courseService.findCoursesByCourseName(courseName).subscribe({
      next:(data)=>{
        this.course=data;
        this.courses=[];
        this.errorMessage='';
      },
      error:(err)=>{
        window.location.reload();
        alert('Course not found');
        window.location.reload();
        // this.errorMessage='Course not found'
      }
    });
  }

  findCoursesByTechnology(technology:string):void{
    this.courseService.findCoursesByTechnology(technology).subscribe({
      next:(data)=>{
        this.errorMessage='';
        this.courses=data;
        this.course=null;
      },
      error:(err)=>{
        alert('No Course found for asked technology');
        window.location.reload();
        // this.errorMessage='No Course found for asked technology';
      }
    });
  }



  getCoursesByTechnologyAndDurationRange(technology:string,durationFrom:string,durationTo:string):void{
    this.courseService.getCoursesByTechnologyAndDuration(technology,durationFrom,durationTo).subscribe({
      next:(data)=>{
        this.courses=data;
        this.course=null;
        this.errorMessage='';
      },
      error:(err)=>{
        alert('No Course found for this criteria');
        window.location.reload();
        // this.errorMessage='No Course found for this criteria';
      }
    });
  }

  deleteCourse(courseName:string){
    this.courseService.deleteCourseByName(courseName).subscribe((response:string)=>{
      console.log(response);
      alert(response);
      this.router.navigate(['/lms/get-all-courses']);

    },(error)=>{
      alert('Error while deleting course');
    });
  }


}
