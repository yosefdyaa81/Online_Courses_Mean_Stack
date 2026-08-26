import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Course } from './icourse';


@Injectable({
   providedIn: 'root'
   })
export class CourseService {
  private apiUrl = 'http://localhost:5000/api/courses';

  constructor(
    private http: HttpClient
  ) {}

  getCoursesName(): Observable<Course[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res.data.courses) // هنا بنوصل للـ Array الصح
    );
  }
}
