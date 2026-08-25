import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TrackService } from '../../core/services/track';
import { Track } from '../../core/models/track';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './track-details.html',
  styleUrl: './track-details.css'
})
export class TrackDetails implements OnInit {

  track?: Track;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.error = 'Track not found.';
      this.loading = false;

      this.cdr.detectChanges();

      return;
    }

    this.trackService.getTrackById(id).subscribe({

      next: (response: any) => {

        this.track =
          response.data?.track ??
          response.data ??
          response;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error(err);

        this.error = 'Failed to load track.';
        this.loading = false;

        this.cdr.detectChanges();
      }

    });

  }
}