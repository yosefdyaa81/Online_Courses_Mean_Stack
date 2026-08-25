import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TrackService } from '../../core/services/track';
import { Track } from '../../core/models/track';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tracks.html',
  styleUrl: './tracks.css',
})
export class Tracks implements OnInit {

  tracks: Track[] = [];
  loading = true;
  error = '';

  constructor(
    private trackService: TrackService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.trackService.getTracks().subscribe({

      next: (response: any) => {

        this.tracks =
          response.data?.tracks ??
          response.data ??
          response;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error(err);

        this.error = 'Failed to load tracks.';
        this.loading = false;

        this.cdr.detectChanges();
      }

    });

  }
}