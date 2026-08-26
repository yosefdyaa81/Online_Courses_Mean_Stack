import { Routes } from '@angular/router';
// import { LandingComponent } from '../features/landing/landing.component';
import { ReviewsListComponent } from '../features/reviews/components/reviews-list/reviews-list.component';
import { AddReviewComponent } from '../features/reviews/components/add-review/add-review.component';

export const routes: Routes = [
  // { path: '', component: LandingComponent },
  { path: 'reviews', component: ReviewsListComponent },
  // { path: 'add-review', component: AddReviewComponent }
  { path: 'reviews/add', component: AddReviewComponent },
  { path: '', redirectTo: 'reviews', pathMatch: 'full' }
];
