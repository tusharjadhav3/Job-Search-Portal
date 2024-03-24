import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Jobs } from '../../models/jobs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-favorite',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, RouterModule],
  templateUrl: './job-favorite.component.html',
  styleUrl: './job-favorite.component.css',
})
export class JobFavoriteComponent implements OnInit {
  favoriteJobsList: Jobs[] = [];

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.favoriteJobsList = JSON.parse(
      localStorage.getItem('favoriteJobsList')!
    );
  }

  goToJobDetails(id: number): void {
    this.router.navigate(['/jobs', id]);
  }
}
