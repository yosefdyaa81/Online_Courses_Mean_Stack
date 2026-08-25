import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/tracks';

  getTracks(): Observable<Track[]> {
  return this.http.get<Track[]>(this.apiUrl);
}

  getTrackById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }



}

