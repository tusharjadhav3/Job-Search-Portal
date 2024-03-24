import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jobs } from '../models/jobs';
import { JobInfo } from '../models/job-info';

@Injectable()
export class JobSearchInfoService {
  constructor(private readonly http: HttpClient) {}

  getJobs(): Observable<Jobs[]> {
    return this.http.get<Jobs[]>('/jobs');
  }

  getJobDetails(id: string): Observable<JobInfo> {
    return this.http.get<JobInfo>(`/jobs/${id}`);
  }
}
