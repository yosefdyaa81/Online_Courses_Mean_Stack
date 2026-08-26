import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../courses/services/course.service';
import { Course } from '../../../courses/services/icourse';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  courses: Course[] = [];
  selectedCourseId: string = '';
  rating: number = 0;
  comment: string = '';

  constructor(
    private reviewService: ReviewService,
    private courseService: CourseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCoursesName().subscribe({
      next: (res) => {
        console.log('Courses from backend:', res);
        this.courses = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching courses:', err)
    });
  }

  submitReview() {
    const token = localStorage.getItem('token');
  if (!token) {
    alert('You must login first!');
    return;
  }

    const newReview = {
      course: this.selectedCourseId,
      rating: this.rating,
      comment: this.comment
    };

    this.reviewService.addReview(newReview).subscribe({
      next: () => {
        alert('Review submitted successfully!');
        this.router.navigate(['/reviews']);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error adding review:', err)
    });
  }
}
