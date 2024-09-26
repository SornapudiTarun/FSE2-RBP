import { Component, OnInit } from '@angular/core';
import { courseResponseDTO } from '../CourseResponseDTO';
import { Router } from '@angular/router';
import { CourseServiceService } from '../service/course-service.service';
import { AuthenticationService } from '../service/auth/authentication.service';

@Component({
  selector: 'app-getall-courses',
  templateUrl: './getall-courses.component.html',
  styleUrls: ['./getall-courses.component.css']
})
export class GetallCoursesComponent implements OnInit {

  courses:courseResponseDTO[]=[];


  constructor(private router:Router,private courseService:CourseServiceService,public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data:courseResponseDTO[])=>{
      this.courses=data;
    },error=>{
      console.error('Error fetching courses',error);
    }
    );
  }

  deleteCourse(courseName:string){
    this.courseService.deleteCourseByName(courseName).subscribe((response:string)=>{
      console.log(response);
      alert(response);
      window.location.reload();

    },(error)=>{
      alert('Error while deleting course');
    });
  }

}
