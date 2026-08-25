import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/courses';

  getCourses() {
    return this.http.get<any>(this.apiUrl);
  }

  getCourseById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
