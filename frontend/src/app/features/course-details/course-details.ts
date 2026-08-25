import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../core/services/course';
import { TopicService } from '../../core/services/topic';

import { Course } from '../../core/models/course';
import { Topic } from '../../core/models/topic';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit {

  course?: Course;
  topics: Topic[] = [];

  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private topicService: TopicService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.error = 'Course not found.';
      this.loading = false;

      this.cdr.detectChanges();

      return;
    }

    // Get Course
    this.courseService.getCourseById(id).subscribe({

      next: (response: any) => {

        this.course =
          response.data?.course ??
          response.data ??
          response;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error('Failed to load course:', err);

        this.error = 'Failed to load course.';
        this.loading = false;

        this.cdr.detectChanges();
      }

    });

    // Get Topics
    this.topicService.getTopicsByCourse(id).subscribe({

      next: (response: any) => {

        this.topics =
          response.data?.topics ??
          response.data ??
          response;

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error('Failed to load topics:', err);

        this.cdr.detectChanges();
      }

    });

  }

  openPlaylist(url: string): void {

    window.open(url, '_blank');

  }

}