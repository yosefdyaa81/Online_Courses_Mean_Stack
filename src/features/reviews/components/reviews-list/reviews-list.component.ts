import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { IReview } from '../../models/ireview';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css']
})
export class ReviewsListComponent implements OnInit {
  reviewList: IReview[] = [];


  constructor(
    private reviewService: ReviewService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  this.loadReviews();
}

loadReviews() {
    this.reviewService.getReviews().subscribe({
      next: (res) => {
        console.log('Reviews from backend:', res);
        this.reviewList = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching reviews:', err)
    });
  }

// deleteReview(id: string): void {
//   const confirmDelete = confirm('Are you sure you want to delete this review?');
//   if (!confirmDelete) return;

//   this.reviewService.deleteReview(id).subscribe({
//     next: () => {
//       this.reviewList = this.reviewList.filter(r => r._id !== id);
//       alert('Review deleted successfully!');
//     },
//     error: (err) => console.error('Error deleting review:', err)
//   });
// }



}
