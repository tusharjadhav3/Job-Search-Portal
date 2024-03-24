import { NgFor, NgIf, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobSearchInfoService } from '../../services/job-search-info.service';
import { Subscription, tap } from 'rxjs';
import { JobInfo } from '../../models/job-info';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, RouterModule, HttpClientModule],
  providers: [JobSearchInfoService],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  jobInfo!: JobInfo;
  subscriptions$: Subscription = new Subscription();
  constructor(
    private readonly jobSearchInfoService: JobSearchInfoService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }
    
  ngOnInit(): void {
    this.getJobDetails();
  }

  getJobDetails(): void {
    const id = this.activatedRoute.snapshot.params['jobId'];
    this.subscriptions$.add(
      this.jobSearchInfoService
        .getJobDetails(id)
        .pipe(
          tap((jobInfo: JobInfo) => {
            this.jobInfo = jobInfo;
          })
        )
        .subscribe()
    );
  }

  goToJobs(): void {
    this.router.navigate(['/jobs']);
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
