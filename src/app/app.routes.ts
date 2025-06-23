import { Routes } from '@angular/router';
import { PeriodicElementsResolver } from '@lib/periodic-elements';

export const routes: Routes = [
  {
    resolve: [PeriodicElementsResolver],
    path: '',
    loadComponent: () => import('./pages/home/home-page.component').then((c) => c.HomePageComponent)
  }
];
