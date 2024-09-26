import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseDTO } from '../CourseDTO';
import { Observable } from 'rxjs';
import { courseResponseDTO } from '../CourseResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
 
  constructor(private http: HttpClient) { }

  url = "http://localhost:8081";

  private getHeaders(token:string):HttpHeaders{
    
    return new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });

  }


  getAllCourses():Observable<courseResponseDTO[]>{
    let token= sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.get<courseResponseDTO[]>(this.url+`/api/v1.0/lms/courses/get-all-course`,{headers});
  }

  findCoursesByCourseName(courseName:string):Observable<courseResponseDTO>{
    let token= sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.get<courseResponseDTO>(this.url+`/api/v1.0/lms/courses/find-courses-name/${courseName}`,{headers})
  }

  findCoursesByTechnology(technology:string):Observable<courseResponseDTO[]>{
    let token= sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.get<courseResponseDTO[]>(this.url+`/api/v1.0/lms/courses/find-courses-tech/${technology}`,{headers})
  }

  getCoursesByTechnologyAndDuration(technology:string,durationFrom:string,durationTo:string):Observable<courseResponseDTO[]>{
    let token= sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.get<courseResponseDTO[]>(this.url+`/api/v1.0/lms/courses/get/${technology}/${durationFrom}/${durationTo}`,{headers})
  }

  deleteCourseByName(courseName: string):Observable<string> {
    let token= sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.delete(this.url+`/api/v1.0/lms/courses/delete-course/${courseName}`,{headers,responseType:'text'});
  }

  addCourse(course:CourseDTO):Observable<string> {
    let token=sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(this.url +`/api/v1.0/lms/courses/add-course`,course,{headers,responseType:'text'});
  }





}
