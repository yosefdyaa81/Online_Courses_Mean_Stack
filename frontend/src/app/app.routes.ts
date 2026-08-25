import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'tracks',
    pathMatch: 'full'
  },

  {
    path: 'tracks',
    loadComponent: () =>
      import('./features/tracks/tracks')
        .then(m => m.Tracks)
  },

  {
    path: 'tracks/:id',
    loadComponent: () =>
      import('./features/track-details/track-details')
        .then(m => m.TrackDetails)
  },

  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./features/course-details/course-details')
        .then(m => m.CourseDetails)
  },

  {
    path: '**',
    redirectTo: 'tracks'
  }

];
