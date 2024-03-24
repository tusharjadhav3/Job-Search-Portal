import { Component, OnDestroy, OnInit } from '@angular/core';
import { Jobs } from '../../models/jobs';
import { Subscription, tap } from 'rxjs';
import { JobSearchInfoService } from '../../services/job-search-info.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, RouterModule, HttpClientModule],
  providers: [JobSearchInfoService],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent implements OnInit, OnDestroy {
  jobsList: Jobs[] = [];
  favoriteJobsList: Jobs[] = [];
  subscriptions$: Subscription = new Subscription();
  constructor(
    private readonly jobSearchInfoService: JobSearchInfoService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    this.subscriptions$.add(
      this.jobSearchInfoService
        .getJobs()
        .pipe(
          tap((jobsList: Jobs[]) => {
            this.favoriteJobsList = JSON.parse(
              localStorage.getItem('favoriteJobsList')!
            );
            this.jobsList = jobsList.map((job: Jobs) => ({
              ...job,
              isFavorite: this.setIsFavorite(job),
            }));
          })
        )
        .subscribe()
    );
  }

  setIsFavorite(job: Jobs): boolean {
    return this.favoriteJobsList?.length &&
      this.favoriteJobsList.filter((favJob: Jobs) => favJob.id === job.id)
        ?.length
      ? true
      : false;
  }

  addToFavorite(job: Jobs): void {
    job.isFavorite = !job.isFavorite;
    this.favoriteJobsList = this.jobsList.filter((job: Jobs) => job.isFavorite);
    localStorage.setItem(
      'favoriteJobsList',
      JSON.stringify(this.favoriteJobsList)
    );
  }

  goToJobDetails(id: number): void {
    this.router.navigate(['/jobs', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
