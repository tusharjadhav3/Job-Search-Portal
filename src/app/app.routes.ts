import { Routes } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobFavoriteComponent } from './components/job-favorite/job-favorite.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobsComponent, pathMatch: 'full' },
  {
    path: 'favorites',
    component: JobFavoriteComponent,
    pathMatch: 'full',
  },
  {
    path: 'jobs/:jobId',
    component: JobDetailsComponent,
    pathMatch: 'full',
  },
];
